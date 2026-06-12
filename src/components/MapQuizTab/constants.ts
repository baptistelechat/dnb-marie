export const NUMERIC_TO_ALPHA2: Readonly<Record<string, string>> = {
  "040": "AT",
  "056": "BE",
  "100": "BG",
  "196": "CY",
  "191": "HR",
  "203": "CZ",
  "208": "DK",
  "233": "EE",
  "246": "FI",
  "250": "FR",
  "276": "DE",
  "300": "GR",
  "348": "HU",
  "372": "IE",
  "380": "IT",
  "428": "LV",
  "440": "LT",
  "442": "LU",
  "470": "MT",
  "528": "NL",
  "616": "PL",
  "620": "PT",
  "642": "RO",
  "703": "SK",
  "705": "SI",
  "724": "ES",
  "752": "SE",
} as const;

export const CANDY_COLORS = [
  { fill: "#fce4ec", stroke: "#f48fb1", vivid: "#e91e63" },
  { fill: "#ede7f6", stroke: "#b39ddb", vivid: "#7e57c2" },
  { fill: "#e3f2fd", stroke: "#90caf9", vivid: "#42a5f5" },
  { fill: "#e8f5e9", stroke: "#a5d6a7", vivid: "#43a047" },
  { fill: "#fff3e0", stroke: "#ffcc80", vivid: "#ff9800" },
  { fill: "#fffde7", stroke: "#fff176", vivid: "#f9a825" },
];

export const WORLD_ATLAS_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
