import "bulma";

import { CountryInfo } from "./modules/CountryInfo";

function App() {
  return (
    <main className="container">
      <h1 className="is-size-1 mt-3 mb-4">The Countries of the World</h1>

      <CountryInfo />
    </main>
  );
}

export default App;
