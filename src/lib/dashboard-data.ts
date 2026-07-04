// Illustrative history for the last 7 months, purely for the dashboard
// chart. The current month (Jul) is never read from here — it's always
// computed live from the connected accounts / advances in app-state.
export const MONTH_LABELS = [
  "Dez",
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
] as const;

export const EARNINGS_HISTORY = [1180, 1340, 1080, 2050, 1420, 1560, 1490];
export const ADVANCES_HISTORY = [420, 610, 340, 980, 560, 700, 610];
