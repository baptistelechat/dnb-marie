export interface Region {
  code: string; // Code INSEE région
  name: string;
  capital: string; // Chef-lieu de région
  isDom: boolean;
}

export const FRENCH_REGIONS: Region[] = [
  // 13 régions métropolitaines
  { code: "84", name: "Auvergne-Rhône-Alpes", capital: "Lyon", isDom: false },
  {
    code: "27",
    name: "Bourgogne-Franche-Comté",
    capital: "Dijon",
    isDom: false,
  },
  { code: "53", name: "Bretagne", capital: "Rennes", isDom: false },
  { code: "24", name: "Centre-Val de Loire", capital: "Orléans", isDom: false },
  { code: "94", name: "Corse", capital: "Ajaccio", isDom: false },
  { code: "44", name: "Grand Est", capital: "Strasbourg", isDom: false },
  { code: "32", name: "Hauts-de-France", capital: "Lille", isDom: false },
  { code: "11", name: "Île-de-France", capital: "Paris", isDom: false },
  { code: "28", name: "Normandie", capital: "Rouen", isDom: false },
  { code: "75", name: "Nouvelle-Aquitaine", capital: "Bordeaux", isDom: false },
  { code: "76", name: "Occitanie", capital: "Toulouse", isDom: false },
  { code: "52", name: "Pays de la Loire", capital: "Nantes", isDom: false },
  {
    code: "93",
    name: "Provence-Alpes-Côte d'Azur",
    capital: "Marseille",
    isDom: false,
  },
  // 5 DOM
  { code: "01", name: "Guadeloupe", capital: "Basse-Terre", isDom: true },
  { code: "02", name: "Martinique", capital: "Fort-de-France", isDom: true },
  { code: "03", name: "Guyane", capital: "Cayenne", isDom: true },
  { code: "04", name: "La Réunion", capital: "Saint-Denis", isDom: true },
  { code: "06", name: "Mayotte", capital: "Mamoudzou", isDom: true },
];

export const METRO_REGIONS = FRENCH_REGIONS.filter((r) => !r.isDom);
export const DOM_REGIONS = FRENCH_REGIONS.filter((r) => r.isDom);

export const REGION_LOGOS: Partial<Record<string, string>> = {
  "84": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_the_region_Auvergne-Rh%C3%B4ne-Alpes.svg/langfr-330px-Flag_of_the_region_Auvergne-Rh%C3%B4ne-Alpes.svg.png",
  "27": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bourgogne-Franche-Comt%C3%A9_2016.svg/langfr-330px-Bourgogne-Franche-Comt%C3%A9_2016.svg.png",
  "53": "https://upload.wikimedia.org/wikipedia/fr/thumb/8/83/R%C3%A9gion-bretagne-logo.svg/langfr-330px-R%C3%A9gion-bretagne-logo.svg.png",
  "24": "https://upload.wikimedia.org/wikipedia/fr/thumb/2/25/Logo_region_centre-val_de_loire.svg/langfr-330px-Logo_region_centre-val_de_loire.svg.png",
  "94": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Flag_of_Corsica.svg/langfr-330px-Flag_of_Corsica.svg.png",
  "44": "https://upload.wikimedia.org/wikipedia/fr/thumb/c/cc/Logo_R%C3%A9gion_Grand_Est_-_2022.svg/langfr-330px-Logo_R%C3%A9gion_Grand_Est_-_2022.svg.png",
  "32": "https://upload.wikimedia.org/wikipedia/fr/thumb/2/2e/R%C3%A9gion_Hauts-de-France_logo_2016.svg/langfr-330px-R%C3%A9gion_Hauts-de-France_logo_2016.svg.png",
  "11": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/R%C3%A9gion_%C3%8Ele-de-France_%28logo%29.svg/120px-R%C3%A9gion_%C3%8Ele-de-France_%28logo%29.svg.png",
  "28": "https://upload.wikimedia.org/wikipedia/fr/thumb/7/72/Logo_R%C3%A9gion_Normandie.svg/langfr-330px-Logo_R%C3%A9gion_Normandie.svg.png",
  "75": "https://upload.wikimedia.org/wikipedia/fr/thumb/9/93/Logo_Nouvelle-Aquitaine_2019.svg/langfr-330px-Logo_Nouvelle-Aquitaine_2019.svg.png",
  "76": "https://upload.wikimedia.org/wikipedia/fr/thumb/8/89/Logo_Occitanie_2017.svg/langfr-330px-Logo_Occitanie_2017.svg.png",
  "52": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/LOGO_R0V15B160.svg/langfr-330px-LOGO_R0V15B160.svg.png",
  "93": "https://upload.wikimedia.org/wikipedia/fr/thumb/3/34/Logo_marque_R%C3%A9gion_Sud.svg/langfr-330px-Logo_marque_R%C3%A9gion_Sud.svg.png",
  "01": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Unofficial_flag_of_Guadeloupe_%28local%29.svg/330px-Unofficial_flag_of_Guadeloupe_%28local%29.svg.png",
  "02": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_the_Territorial_Collectivity_of_Martinique.svg/330px-Flag_of_the_Territorial_Collectivity_of_Martinique.svg.png",
  "03": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_French_Guyana_%28Regional%29.svg/330px-Flag_of_French_Guyana_%28Regional%29.svg.png",
  "04": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Armoiries_R%C3%A9union.svg/langfr-330px-Armoiries_R%C3%A9union.svg.png",
  "06": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Mayotte_%28Local%29.svg/330px-Flag_of_Mayotte_%28Local%29.svg.png",
};
