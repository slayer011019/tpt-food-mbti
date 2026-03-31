# Questionnaire Validation Guide

## Goal

This project currently uses a 25-item taste questionnaire across 5 dimensions (`TB`, `IP`, `CR`, `DS`, `MU`).
This guide defines a practical validation workflow so item quality can be measured and iterated.

## What Changed in Code

- Added questionnaire metadata in `src/data/questions.js`:
  - `QUESTIONNAIRE_VERSION`
  - per-item `id` (`Q01`...`Q25`)
  - per-item `phase` (`basic` or `detail`)
  - per-item `scale` (`1-5`)
- Added psychometric utilities in `src/utils/psychometrics.js`:
  - `buildDimensionScores(answers, questionBank, phase)`
  - `cronbachAlpha(responsesMatrix, items)`
  - `correctedItemTotalCorrelation(responsesMatrix, items)`
- Added response storage and export in `src/utils/responseStore.js`:
  - local record upsert by session
  - JSON / CSV export format for reporting
- Added Big Five auxiliary test:
  - page: `src/pages/BigFiveTestPage.jsx`
  - scorer: `src/utils/bigFive.js`
- Added validation dashboard page:
  - route: `/validation-dashboard`
  - page: `src/pages/ValidationDashboard.jsx`
- Added automated report script:
  - `npm run report:questionnaire -- --input <records.json|records.csv>`

## Data You Need

For stable reliability estimates, collect at least:

- Pilot: `n >= 100`
- Better: `n >= 200`

Each response should include raw item answers in order (`Q01`...`Q25`).

## Recommended Analysis Steps

1. Compute reliability per dimension (`5 items each`) with Cronbach's alpha.
2. Compute corrected item-total correlation (CITC / `rit`) per item.
3. Flag weak items and revise wording.

Suggested thresholds (pragmatic):

- Alpha:
  - `>= .70` acceptable for early-stage use
  - `>= .80` preferred for production profiling
- CITC (`rit`):
  - `< .20` likely weak
  - `.20-.30` borderline
  - `>= .30` acceptable

## Revision Rules

When an item is weak:

1. Make sentence shorter and behavior-specific.
2. Remove double-barreled wording.
3. Keep one latent idea per item.
4. Preserve reverse-keyed balance, but avoid too many complex negatives.

## Notes

- MBTI-style labels are useful for UX but should not be treated as clinical personality diagnostics.
- If you later want stronger construct validity, add a short Big Five marker scale and test convergent validity.

## Quick Workflow

1. Run tests in the app and collect responses.
2. Open `/validation-dashboard`.
3. Export JSON or CSV.
4. Generate report:
   - `npm run report:questionnaire -- --input ./path/to/exported.json`
