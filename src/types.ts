export type Language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

export type Country = {
  name: string;
  region: string;
  area: number;
  population: number;
  languages: Language[];
};
