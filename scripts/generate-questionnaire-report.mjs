#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import questions, { DIMENSIONS } from "../src/data/questions.js";
import {
  buildDimensionScores,
  correctedItemTotalCorrelation,
  cronbachAlpha,
} from "../src/utils/psychometrics.js";
import { computeBigFiveScores } from "../src/utils/bigFive.js";
import { pearsonCorrelation } from "../src/utils/stats.js";
import { DIMENSION_LABELS, TRAITS } from "../src/utils/validationConstants.js";

const parseArgs = (argv) => {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--input") args.input = argv[i + 1];
    if (token === "--outdir") args.outdir = argv[i + 1];
  }
  return args;
};

const toNumberOrNull = (value) => {
  if (value === "" || value === undefined || value === null) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const pad = (n) => String(n).padStart(2, "0");

const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let cell = "";
  let i = 0;
  let inQuotes = false;

  while (i < text.length) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i += 2;
        continue;
      }
      if (ch === '"') {
        inQuotes = false;
        i += 1;
        continue;
      }
      cell += ch;
      i += 1;
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (ch === ",") {
      row.push(cell);
      cell = "";
      i += 1;
      continue;
    }

    if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      i += 1;
      continue;
    }

    if (ch === "\r") {
      i += 1;
      continue;
    }

    cell += ch;
    i += 1;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
};

const rowsToObjects = (rows) => {
  if (!rows.length) return [];
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] ?? "";
    });
    return obj;
  });
};

const pickSeries = (obj, keys) => keys.map((k) => toNumberOrNull(obj[k]));

const normalizeRecord = (row) => {
  const basicKeys = Array.from({ length: 10 }, (_, i) => `basic_q${pad(i + 1)}`);
  const detailKeys = Array.from({ length: 15 }, (_, i) => `detail_q${pad(i + 11)}`);
  const big5Keys = Array.from({ length: 10 }, (_, i) => `big5_q${pad(i + 1)}`);
  const qKeys = Array.from({ length: 25 }, (_, i) => `Q${pad(i + 1)}`);

  const basicFromPrefixed = pickSeries(row, basicKeys);
  const detailFromPrefixed = pickSeries(row, detailKeys);
  const big5FromPrefixed = pickSeries(row, big5Keys);
  const allQ = pickSeries(row, qKeys);

  const basicAnswers =
    basicFromPrefixed.some((v) => v !== null)
      ? basicFromPrefixed
      : allQ.some((v) => v !== null)
        ? allQ.slice(0, 10)
        : Array.isArray(row.basicAnswers)
          ? row.basicAnswers
          : [];

  const detailAnswers =
    detailFromPrefixed.some((v) => v !== null)
      ? detailFromPrefixed
      : allQ.some((v) => v !== null)
        ? allQ.slice(10, 25)
        : Array.isArray(row.detailAnswers)
          ? row.detailAnswers
          : [];

  const bigFiveAnswers =
    big5FromPrefixed.some((v) => v !== null)
      ? big5FromPrefixed
      : Array.isArray(row.bigFiveAnswers)
        ? row.bigFiveAnswers
        : [];

  return {
    sessionId: row.sessionId || row.session_id || null,
    mbtiType: row.mbtiType || row.mbti_type || null,
    basicAnswers: basicAnswers.map((v) => (v === null ? undefined : v)),
    detailAnswers: detailAnswers.map((v) => (v === null ? undefined : v)),
    bigFiveAnswers: bigFiveAnswers.map((v) => (v === null ? undefined : v)),
    bigFiveScores: row.bigFiveScores || null,
  };
};

const toMarkdownTable = (headers, rows) => {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((r) => `| ${r.join(" | ")} |`).join("\n");
  return [head, sep, body].filter(Boolean).join("\n");
};

const main = () => {
  const { input, outdir = "reports" } = parseArgs(process.argv.slice(2));

  if (!input) {
    console.error("Usage: npm run report:questionnaire -- --input <records.json|records.csv> [--outdir reports]");
    process.exit(1);
  }

  const raw = fs.readFileSync(input, "utf8");
  const ext = path.extname(input).toLowerCase();

  let rawRows = [];
  if (ext === ".json") {
    const parsed = JSON.parse(raw);
    rawRows = Array.isArray(parsed) ? parsed : [];
  } else if (ext === ".csv") {
    rawRows = rowsToObjects(parseCsv(raw));
  } else {
    console.error("Unsupported input format. Use .json or .csv");
    process.exit(1);
  }

  const records = rawRows.map(normalizeRecord);

  const basicItems = questions.slice(0, 10);
  const detailItems = questions.slice(10);

  const basicRows = records
    .map((r) => (Array.isArray(r.basicAnswers) ? r.basicAnswers.slice(0, 10) : []))
    .filter((row) => row.length === 10);
  const detailRows = records
    .map((r) => (Array.isArray(r.detailAnswers) ? r.detailAnswers.slice(0, 15) : []))
    .filter((row) => row.length === 15);

  const basicRit = correctedItemTotalCorrelation(basicRows, basicItems);
  const detailRit = correctedItemTotalCorrelation(detailRows, detailItems);

  const weakItems = [...basicRit, ...detailRit]
    .filter((x) => x.rit < 0.3)
    .sort((a, b) => a.rit - b.rit)
    .map((x) => {
      const q = questions.find((item) => item.id === x.id);
      return {
        id: x.id,
        dimension: x.dimension,
        rit: x.rit,
        phase: q?.phase || "unknown",
        question: q?.question || "",
      };
    });

  const alphaByDimension = DIMENSIONS.map((dim) => {
    const basicIndices = basicItems
      .map((item, idx) => (item.dimension === dim ? idx : -1))
      .filter((idx) => idx >= 0);
    const detailIndices = detailItems
      .map((item, idx) => (item.dimension === dim ? idx : -1))
      .filter((idx) => idx >= 0);

    const basicDimItems = basicItems.filter((item) => item.dimension === dim);
    const detailDimItems = detailItems.filter((item) => item.dimension === dim);

    const basicDimRows = basicRows.map((row) => basicIndices.map((idx) => row[idx]));
    const detailDimRows = detailRows.map((row) => detailIndices.map((idx) => row[idx]));

    return {
      dimension: dim,
      basicAlpha: cronbachAlpha(basicDimRows, basicDimItems),
      detailAlpha: cronbachAlpha(detailDimRows, detailDimItems),
    };
  });

  const convergentRows = records
    .map((r) => {
      if (!Array.isArray(r.basicAnswers) || r.basicAnswers.length < 10) return null;
      const scoreObj =
        r.bigFiveScores ||
        (Array.isArray(r.bigFiveAnswers) && r.bigFiveAnswers.length === 10
          ? computeBigFiveScores(r.bigFiveAnswers)
          : null);
      if (!scoreObj) return null;

      const dim = buildDimensionScores(r.basicAnswers.slice(0, 10), questions, "basic");
      if (!dim) return null;

      return {
        TB: dim.TB.avg,
        IP: dim.IP.avg,
        CR: dim.CR.avg,
        DS: dim.DS.avg,
        MU: dim.MU.avg,
        ...scoreObj,
      };
    })
    .filter(Boolean);

  const convergentMatrix = DIMENSIONS.map((dim) => {
    const values = TRAITS.map((trait) => {
      const xs = convergentRows.map((r) => r[dim]);
      const ys = convergentRows.map((r) => r[trait]);
      const r = pearsonCorrelation(xs, ys);
      return r === null ? "n/a" : r.toFixed(3);
    });

    return [DIMENSION_LABELS[dim], ...values];
  });

  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  fs.mkdirSync(outdir, { recursive: true });

  const reportPath = path.join(outdir, `questionnaire-report-${ts}.md`);
  const weakCsvPath = path.join(outdir, `weak-items-${ts}.csv`);

  const alphaTable = toMarkdownTable(
    ["Dimension", "Basic alpha", "Detail alpha"],
    alphaByDimension.map((row) => [
      DIMENSION_LABELS[row.dimension],
      row.basicAlpha === null ? "n/a" : row.basicAlpha.toFixed(3),
      row.detailAlpha === null ? "n/a" : row.detailAlpha.toFixed(3),
    ]),
  );

  const convTable = toMarkdownTable(
    ["Dimension", ...TRAITS],
    convergentMatrix,
  );

  const weakPreview = weakItems
    .slice(0, 15)
    .map((item) => `- ${item.id} (${item.dimension}, rit=${item.rit.toFixed(3)}): ${item.question}`)
    .join("\n");

  const markdown = `# Questionnaire Report\n\nGenerated: ${new Date().toISOString()}\n\n## Sample\n- Raw records: ${records.length}\n- Basic complete: ${basicRows.length}\n- Detail complete: ${detailRows.length}\n- Convergent set (basic + big5): ${convergentRows.length}\n\n## Reliability (Cronbach alpha)\n${alphaTable}\n\n## Weak Items (rit < .30)\n- Count: ${weakItems.length}\n${weakPreview || "- none"}\n\n## Convergent Validity (Exploratory Pearson r)\n${convTable}\n\n## Files\n- Weak item CSV: ${weakCsvPath}\n`;

  const weakCsvHeader = ["id", "dimension", "phase", "rit", "question"].join(",");
  const weakCsvRows = weakItems
    .map((item) =>
      [
        item.id,
        item.dimension,
        item.phase,
        item.rit.toFixed(4),
        `"${item.question.replaceAll('"', '""')}"`,
      ].join(","),
    )
    .join("\n");

  fs.writeFileSync(reportPath, markdown, "utf8");
  fs.writeFileSync(weakCsvPath, `${weakCsvHeader}\n${weakCsvRows}`, "utf8");

  console.log(`Report written: ${reportPath}`);
  console.log(`Weak item CSV: ${weakCsvPath}`);
};

main();
