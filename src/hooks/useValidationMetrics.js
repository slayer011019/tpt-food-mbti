import { useMemo } from "react";
import questions, { DIMENSIONS } from "../data/questions";
import {
  buildDimensionScores,
  correctedItemTotalCorrelation,
  cronbachAlpha,
} from "../utils/psychometrics";
import { pearsonCorrelation } from "../utils/stats.js";
import { TRAITS } from "../utils/validationConstants";

export default function useValidationMetrics(records) {
  return useMemo(() => {
    const basicItems = questions.slice(0, 10);
    const detailItems = questions.slice(10);

    const basicRows = records
      .map((r) => (Array.isArray(r.basicAnswers) ? r.basicAnswers.slice(0, 10) : null))
      .filter((row) => row && row.length === 10);
    const detailRows = records
      .map((r) => (Array.isArray(r.detailAnswers) ? r.detailAnswers.slice(0, 15) : null))
      .filter((row) => row && row.length === 15);

    const basicRit = correctedItemTotalCorrelation(basicRows, basicItems);
    const detailRit = correctedItemTotalCorrelation(detailRows, detailItems);

    const weakItems = [...basicRit, ...detailRit]
      .filter((x) => x.rit < 0.3)
      .sort((a, b) => a.rit - b.rit)
      .map((x) => {
        const item = questions.find((q) => q.id === x.id);
        return {
          ...x,
          question: item?.question || "",
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

      const basicDimRows = basicRows
        .map((row) => basicIndices.map((idx) => row[idx]))
        .filter((row) => row.length === basicDimItems.length);
      const detailDimRows = detailRows
        .map((row) => detailIndices.map((idx) => row[idx]))
        .filter((row) => row.length === detailDimItems.length);

      return {
        dimension: dim,
        basicAlpha: cronbachAlpha(basicDimRows, basicDimItems),
        detailAlpha: cronbachAlpha(detailDimRows, detailDimItems),
      };
    });

    const convergentRows = records
      .map((r) => {
        if (!Array.isArray(r.basicAnswers) || r.basicAnswers.length < 10) return null;
        if (!r.bigFiveScores) return null;

        const dimScores = buildDimensionScores(r.basicAnswers.slice(0, 10), questions, "basic");
        if (!dimScores) return null;

        return {
          TB: dimScores.TB.avg,
          IP: dimScores.IP.avg,
          CR: dimScores.CR.avg,
          DS: dimScores.DS.avg,
          MU: dimScores.MU.avg,
          ...r.bigFiveScores,
        };
      })
      .filter(Boolean);

    const convergentMatrix = DIMENSIONS.map((dim) => {
      const row = { dimension: dim, correlations: {} };

      TRAITS.forEach((trait) => {
        const xs = convergentRows.map((r) => r[dim]);
        const ys = convergentRows.map((r) => r[trait]);
        const r = pearsonCorrelation(xs, ys);
        row.correlations[trait] = r === null ? null : Number(r.toFixed(3));
      });

      return row;
    });

    return {
      basicCount: basicRows.length,
      detailCount: detailRows.length,
      bigFiveCount: records.filter((r) => Array.isArray(r.bigFiveAnswers) && r.bigFiveAnswers.length === 10)
        .length,
      alphaByDimension,
      weakItems,
      convergentN: convergentRows.length,
      convergentMatrix,
    };
  }, [records]);
}
