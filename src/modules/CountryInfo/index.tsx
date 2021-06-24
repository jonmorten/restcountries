import "bulma";

import { Countries } from "./Countries";
import { Languages } from "./Languages";
import { Loader } from "../../components/Loader";
import { useCountriesFetch } from "./hooks";

export const CountryInfo = () => {
  const { data, error, loading } = useCountriesFetch();

  return (
    <div>
      {loading && <Loader />}

      {error && <p>{error}</p>}

      {data && (
        <div>
          <Countries countries={data} />
          <Languages countries={data} />
        </div>
      )}
    </div>
  );
};
