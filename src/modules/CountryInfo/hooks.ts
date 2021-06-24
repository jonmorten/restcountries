import axios from "axios";
import { useEffect, useState } from "react";

import { Country } from "../../types";

const fields = ["name", "region", "area", "population", "languages"];
const baseUrl = "https://restcountries.eu/rest/v2/all";
const url = `${baseUrl}?fields=${fields.join(";")}`;

// const url = "https://httpstat.us/404";

export const useCountriesFetch = () => {
  const [data, setData] = useState<Country[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        const { code, description } = error.response.data;
        setError(`${code}: ${description}`);
      })
      .then(() => {
        setLoading(false);
      });

    return () => {
      // TODO Use cancellation token
      // https://github.com/axios/axios#cancellation
    };
  }, []);

  return { data, error, loading };
};
