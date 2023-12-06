import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [countriesData, setCountriesData] = useState(null);

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries')
      .then(response => {
        console.log(response.data);
        setCountriesData(response.data);
      });
  }, []);

  return (
    <section
      className="container"
      style={{ maxHeight: '90vh', overflow: 'scroll' }}
    >
      <h1 style={{ fontSize: '24px' }}>
        WikiCountries: Your Guide to the World
      </h1>

      <div className="list-group">
        {!countriesData && <p>Loading...</p>}
        {countriesData &&
          [...countriesData]
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map(country => {
              return (
                <Link
                  className="list-group-item list-group-item-action"
                  to={`/${country.alpha3Code}`}
                  key={country._id}
                >
                  <img
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                    alt={`${country.name.common}'s flag`}
                    style={{ width: '30px' }}
                  />
                  {` ${country.name.common}`}
                </Link>
              );
            })}
      </div>
    </section>
  );
}

export default HomePage;
