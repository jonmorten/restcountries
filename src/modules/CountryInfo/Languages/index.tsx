import { Country } from "../../../types";
import { formatPopulation } from "../lib";

type Props = {
  countries: Country[];
};

type FormattedLanguage = {
  code: string;
  countries: string[];
  name: string;
  population: number;
};

type LanguageMap = Record<string, FormattedLanguage>;

export const Languages = ({ countries }: Props) => {
  const languages = countries.reduce<LanguageMap>((out, country) => {
    country.languages.forEach((language) => {
      const code = language.iso639_1;
      const entry = out[code];
      if (entry) {
        entry.countries.push(country.name);
        entry.population += country.population;
      } else {
        out[code] = {
          code,
          countries: [country.name],
          name: language.name,
          population: country.population,
        };
      }
    });

    return out;
  }, {});

  const formattedLanguages = Object.keys(languages)
    .map((key) => languages[key])
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <h2 className="is-size-3 mt-3 mb-4">Languages</h2>

      <table className="table mb-6" aria-label="Languages">
        <thead>
          <tr>
            <th>Language</th>
            <th>Countries</th>
            <th>Population (in millions)</th>
          </tr>
        </thead>

        <tbody>
          {formattedLanguages.map((language) => (
            <tr key={String(language.code)}>
              <td>
                <span className="sticky-cell-content">{language.name}</span>
              </td>
              <td className="content">
                {language.countries.length === 0 && "N/A"}

                {language.countries.length === 1 && language.countries[0]}

                {language.countries.length > 1 && (
                  <ul className="mt-0">
                    {language.countries.map((country) => (
                      <li key={country}>{country}</li>
                    ))}
                  </ul>
                )}
              </td>
              <td className="has-text-right">
                <span className="sticky-cell-content">
                  {formatPopulation(language.population)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
