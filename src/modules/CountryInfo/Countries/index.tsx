import { Country } from "../../../types";

type Props = {
  countries: Country[];
};

const formatPopulation = (value: number): string => {
  const formattedValue = (value / 1000000).toFixed(1);
  return formattedValue === "0.0" ? "0.1" : formattedValue;
};

const formatArea = (value: number): string | number => {
  if (!value) {
    return "N/A";
  }

  return Math.round(value / 2.59);
};

export const Countries = ({ countries }: Props) => {
  const [smallestAreaIndex, largestAreaIndex, population] = countries.reduce(
    (out, { area, population }, index) => {
      const currentSmallest = countries[out[0]];
      const currentLargest = countries[out[1]];

      if (area) {
        if (area < currentSmallest.area) {
          out[0] = index;
        }
        if (area > currentLargest.area) {
          out[1] = index;
        }
      }

      out[2] += population;

      return out;
    },
    [0, 0, 0]
  );

  const populationAverage = population / countries.length;
  const smallestAreaCountry = countries[smallestAreaIndex];
  const largestAreaCountry = countries[largestAreaIndex];

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Population (in millions)</th>
            <th>Area (in square miles)</th>
          </tr>
        </thead>

        <tbody>
          {countries.map((country) => (
            <tr key={country.name}>
              <td>{country.name}</td>
              <td>{country.region || "N/A"}</td>
              <td className="has-text-right">
                {formatPopulation(country.population)}
              </td>
              <td className="has-text-right">{formatArea(country.area)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl>
        <dt>
          <strong>Population average:</strong>
        </dt>
        <dd>{formatPopulation(populationAverage)} millions</dd>

        <dt>
          <strong>Smallest country by area:</strong>
        </dt>
        <dd>
          {smallestAreaCountry.name} ({formatArea(smallestAreaCountry.area)}{" "}
          square miles)
        </dd>

        <dt>
          <strong>Largest country by area:</strong>
        </dt>
        <dd>
          {largestAreaCountry.name} ({formatArea(largestAreaCountry.area)}{" "}
          square miles)
        </dd>
      </dl>
    </div>
  );
};
