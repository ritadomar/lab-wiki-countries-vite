import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CountryDetailsPage() {
  const { countryId } = useParams();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then(response => {
        // const singleCountry = response.data.find(
        //   country => country.alpha3Code === countryId
        // );
        setCountryData(response.data);
        console.log(response);
      });
  }, [countryId]);

  return (
    <section className="container">
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Country Details</p>
      {!countryData && <p>Loading...</p>}
      {countryData && (
        <>
          <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${countryData.alpha2Code.toLowerCase()}.png`}
            alt=""
          />
          <h1>{countryData.name.common}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{countryData.capital[0]}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {countryData.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul style={{ listStyle: 'none' }}>
                    {countryData.borders.map(border => {
                      return (
                        <li key={border}>
                          <Link to={`/${border}`}>{border}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

export default CountryDetailsPage;
