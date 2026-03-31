export const mean = (arr) =>
  arr.length ? arr.reduce((sum, value) => sum + value, 0) / arr.length : 0;

export const sampleVariance = (arr) => {
  if (arr.length < 2) return 0;
  const avg = mean(arr);
  const ss = arr.reduce((sum, value) => sum + (value - avg) ** 2, 0);
  return ss / (arr.length - 1);
};

export const sampleCovariance = (xs, ys) => {
  if (xs.length !== ys.length || xs.length < 2) return 0;
  const mx = mean(xs);
  const my = mean(ys);
  const total = xs.reduce((sum, x, idx) => sum + (x - mx) * (ys[idx] - my), 0);
  return total / (xs.length - 1);
};

export const pearsonCorrelation = (xs, ys) => {
  const vx = sampleVariance(xs);
  const vy = sampleVariance(ys);
  if (vx === 0 || vy === 0) return null;
  return sampleCovariance(xs, ys) / Math.sqrt(vx * vy);
};
