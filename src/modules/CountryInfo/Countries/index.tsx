import { useState } from "react";

import styles from "./styles.scss";
import { Country } from "../../../types";
import { formatPopulation } from "../lib";

type Props = {
  countries: Country[];
};

type SortDirection = "ascending" | "descending" | "none";

const formatArea = (value: number): string | number => {
  if (!value) {
    return "N/A";
  }

  return Math.round(value / 2.59);
};

const sorters: Record<string, Function> = {
  ascending: (field: string) => {
    switch (field) {
      case "area":
      case "population":
        return (a: Country, b: Country) => a[field] - b[field];

      case "name":
      case "region":
        return (a: Country, b: Country) => a[field].localeCompare(b[field]);
    }
    return () => 1;
  },
  descending: (field: string) => {
    switch (field) {
      case "area":
      case "population":
        return (a: Country, b: Country) => b[field] - a[field];

      case "name":
      case "region":
        return (a: Country, b: Country) => b[field].localeCompare(a[field]);
    }
    return () => -1;
  },
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

  const [sortDirection, setSortDirection] = useState<SortDirection>("none");
  const [sortField, setSortField] = useState<string | null>(null);

  const handleSort = (field: string) => {
    if (field === sortField) {
      if (sortDirection === "ascending") {
        setSortDirection("descending");
      } else {
        setSortField(null);
        setSortDirection("none");
      }
    } else {
      setSortField(field);
      setSortDirection("ascending");
    }
  };

  const sortedCountries =
    sortField && sortDirection
      ? [...countries].sort(sorters[sortDirection](sortField))
      : countries;

  return (
    <div className="mb-6">
      <h2 className="is-size-3 mt-3 mb-4">Countries</h2>

      <table className="table" aria-label="Countries">
        <thead>
          <tr>
            <th aria-sort={sortField === "name" ? sortDirection : "none"}>
              <button
                type="button"
                className={styles.button}
                onClick={() => handleSort("name")}
                title={"Sort by region"}
              >
                Name
                <span
                  className={
                    sortField === "name" ? "ml-3" : "ml-3 visually-hidden"
                  }
                  aria-hidden
                >
                  {sortDirection === "ascending" ? "🔼" : "🔽"}
                </span>
              </button>
            </th>

            <th aria-sort={sortField === "region" ? sortDirection : "none"}>
              <button
                type="button"
                className={styles.button}
                title="Sort by region"
                onClick={() => handleSort("region")}
              >
                Region
                <span
                  className={
                    sortField === "region" ? "ml-3" : "ml-3 visually-hidden"
                  }
                  aria-hidden
                >
                  {sortDirection === "ascending" ? "🔼" : "🔽"}
                </span>
              </button>
            </th>

            <th aria-sort={sortField === "population" ? sortDirection : "none"}>
              <button
                type="button"
                className={styles.button}
                title="Sort by population"
                onClick={() => handleSort("population")}
              >
                Population (in millions)
                <span
                  className={
                    sortField === "population" ? "ml-3" : "ml-3 visually-hidden"
                  }
                  aria-hidden
                >
                  {sortDirection === "ascending" ? "🔼" : "🔽"}
                </span>
              </button>
            </th>

            <th aria-sort={sortField === "area" ? sortDirection : "none"}>
              <button
                type="button"
                className={styles.button}
                title="Sort by area"
                onClick={() => handleSort("area")}
              >
                Area (in square miles)
                <span
                  className={
                    sortField === "area" ? "ml-3" : "ml-3 visually-hidden"
                  }
                  aria-hidden
                >
                  {sortDirection === "ascending" ? "🔼" : "🔽"}
                </span>
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedCountries.map((country) => (
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
