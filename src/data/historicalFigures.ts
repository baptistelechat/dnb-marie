export interface HistoricalFigure {
  id: string;
  name: string;
  primaryKeyword: string;
  keywords: string[];
  // TODO Phase 1 : sourcer 2-3 photos Wikimedia Commons par personnage et vérifier chaque URL
  photos: string[];
  period: string;
  role: string;
}

export const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: "petain",
    name: "Pétain",
    primaryKeyword: "Collaboration",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/P%C3%A9tain_-_portrait_photographique.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/Philippe_P%C3%A9tain_-_photo_Henri_Manuel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/34/Philippe_P%C3%A9tain_%28en_civil%2C_autour_de_1930%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Philippe_P%C3%A9tain_%28before_1918%29.jpg",
      "https://www.cheminsdememoire.gouv.fr/sites/default/files/styles/fiche_visuel/public/2018-08/petain_1928.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e4/PETAIN%2C_HENRI_P._MARSHALL_LCCN2016862650.jpg",
    ],
    period: "Seconde Guerre mondiale",
    role: "Chef de l'État français (régime de Vichy), symbole de la collaboration",
  },
  {
    id: "lenine",
    name: "Lénine",
    primaryKeyword: "Révolution russe",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Iljitsj_Oeljanov_Lenin%2C_de_Russische_revolutionair_en_communistische_%28partij%29_leider_van_de%2C_SFA001006857.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/83/Lenin_1920.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/30/Vladimir_Lenin_and_Lev_Kamenev.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/c0/Lenin_in_1920_%28cropped%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/76/L-Vladimir_speaking.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/c/c6/Lenin-last-photo.jpg",
    ],
    period: "Révolution russe",
    role: "Chef du parti bolchevique, fondateur de l'URSS",
  },
  {
    id: "staline",
    name: "Staline",
    primaryKeyword: "Totalitarisme / URSS",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Stalin_in_1937.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Joseph_Stalin_official_portrait.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Joseph_Stalin_1911_mug_shot_%28cropped%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9c/Stalin_in_1939.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/38/Bundesarchiv_Bild_183-H27337%2C_Moskau%2C_Stalin_und_Ribbentrop_im_Kreml.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/J.V._Stalin_TASS_Portrait.jpg",
    ],
    period: "Entre-deux-guerres / Seconde Guerre mondiale",
    role: "Dirigeant de l'URSS (1924–1953), régime totalitaire soviétique",
  },
  {
    id: "hitler",
    name: "Hitler",
    primaryKeyword: "Nazisme",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Bundesarchiv_Bild_183-H1216-0500-002%2C_Adolf_Hitler.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/Adolf_Hitler_1933_Portrait.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/2/23/Adolf_Hitler_1938_Portrait_%283x4_cropped%29.jpg",
    ],
    period: "Entre-deux-guerres / Seconde Guerre mondiale",
    role: "Chancelier puis Führer d'Allemagne, fondateur du régime nazi",
  },
  {
    id: "blum",
    name: "Léon Blum",
    primaryKeyword: "Front populaire",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/L%C3%A9on_Blum_directeur_du_Populaire_-_photo_Henri_Manuel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/da/L%C3%A9on_Blum_Meurisse_b_1927.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/23/L%C3%A9on_Blum.jpg",
    ],
    period: "Entre-deux-guerres",
    role: "Président du Conseil (1936), chef du gouvernement du Front populaire",
  },
  {
    id: "degaulle",
    name: "Le général de Gaulle",
    primaryKeyword: "Résistance / GPRF",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/e/ea/General_Charles_de_Gaulle_in_1945.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/82/Charles_de_Gaulle_micro_BBC_Londres.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Commander_of_Free_French_Forces_General_Charles_de_Gaulle_seated_at_his_desk_in_London_during_the_Second_World_War._D1973.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Charles_de_Gaulle_et_son_%C3%A9pouse_%C3%A0_Londres.jpg",
    ],
    period: "Seconde Guerre mondiale",
    role: "Appel du 18 juin 1940, chef de la France libre, président du GPRF",
  },
  {
    id: "moulin",
    name: "Jean Moulin",
    primaryKeyword: "CNR / Martyr",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Moulin_Harcourt_1937.jpg",
      "https://museedelaresistanceenligne.org/musee/doc/image/recto/grande/3328.jpg",
      "https://cdn.essentiels.bnf.fr/media/images/cache/crop/rc/c4ox9tBr/uploads/media/image/20240311170358000000_085.jpg",
    ],
    period: "Seconde Guerre mondiale",
    role: "Résistant, fondateur et premier président du Conseil National de la Résistance, mort sous la torture en 1943",
  },
  {
    id: "elize",
    name: "Raphaël Élizé",
    primaryKeyword: "Premier maire noir de France",
    keywords: [],
    photos: [
      "https://outremermemory.com/wp-content/uploads/2021/02/Raphael-2.png",
      "https://www.lalibre.be/resizer/v2/HYJCOLTZRFEE3EJ4BIMARDEI4Y.jpg?auth=901a42f82dafe2cca83a5198001fbc0894e1cd4c25e98d570be3f391df108b9f&width=1200&height=800&quality=85&focal=321%2C438",
    ],
    period: "Entre-deux-guerres / Seconde Guerre mondiale",
    role: "Premier maire noir de France (Sablé-sur-Sarthe, 1929), mort en déportation en 1945",
  },
  {
    id: "tillion",
    name: "Germaine Tillion",
    primaryKeyword: "Déportée / Ethnologue",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/3/37/%C2%A9_assoc_GT_Photo_G_Tillion_carte_d%27%C3%A9tudiante_1934.jpg",
      "https://upload.wikimedia.org/wikipedia/en/2/27/Germaine_Tillion.jpg",
    ],
    period: "Seconde Guerre mondiale",
    role: "Résistante, déportée à Ravensbrück, ethnologue",
  },
  {
    id: "gaulle-antonioz",
    name: "Geneviève de Gaulle-Antonioz",
    primaryKeyword: "Résistante / Ravensbrück",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/GdGA_StreetArt.jpg",
      "https://museedelaresistanceenligne.org/musee/doc/image/recto/grande/1895.jpg",
    ],
    period: "Seconde Guerre mondiale",
    role: "Résistante, déportée à Ravensbrück, nièce du général de Gaulle",
  },
  {
    id: "baker",
    name: "Joséphine Baker",
    primaryKeyword: "Espionne / Droits civiques",
    keywords: [],
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/4/45/Josephine_Baker.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2d/Manuel_-_Josephine_Baker.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Josefine_Baker.jpg",
      "https://imagesdefense.gouv.fr/media/catalog/product/cache/15c2d697f4361d5a5843ebce5d137147/5/1/5109161_21_1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Jos%C3%A9phine_Baker_-_photo_Henri_Manuel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Baker_Harcourt_1940_2.jpg",
    ],
    period: "Seconde Guerre mondiale",
    role: "Artiste, résistante, espionne pour la France libre, militante des droits civiques",
  },
];
