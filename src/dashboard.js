import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ApiStore from './apiStore'
import Card from './card';
import Chart from './chart';

const moment = require('moment');

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [globalCount, setGlobalCount] = useState({});
  const [countryCount, setCounrtyCount] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [chartLabels, setChartLabels] = useState([]);
  const [confirmedLine, setConfirmedLine] = useState([]);
  const [deathLine, setDeathLine] = useState([]);
  const [recoveredLine, setRecoveredLine] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({ "Country": 'India', "Slug": "india" });

  const selectedDate = new Date();

  const changeSelectedCountry = (country) => {
    setSelectedCountry(country);
  }

  // To list the countries with and without search 
  const countryListData = () => {
    if (searchKey) {
      let result = countryList.filter(o => o.Country.toLowerCase().includes(searchKey.toLowerCase()));
      return result.map((country) => countryData(country));
    } else {
      return countryList.map((country) => countryData(country));
    }
  }

  // Returns each contry list row
  const countryData = (data) => {
    return (
      <div key={data.Slug} className="country-row" onClick={changeSelectedCountry.bind(null, data)}>
        {data.Country}
      </div>
    )
  }

  // Search for country
  const searchHandler = (event) => {
    const val = event.target.value;
    setSearchKey(val);
  }

  useEffect(() => {
    // Gets the global count
    ApiStore.getGlobalCount().then((response) => {
      setSummary(response.data);
      setGlobalCount({
        Confirmed: response.data.Global.TotalConfirmed,
        Deaths: response.data.Global.TotalDeaths,
        // Recovered: response.data.Global.TotalRecovered,
        // Active: response.data.Global.TotalConfirmed - response.data.Global.TotalRecovered - response.data.Global.TotalDeaths
      });
      if (response.data.Countries) {
        let countryinfo = response.data.Countries.filter((country) => {
          return country.Slug === "india";
        })
        setCounrtyCount({
          Confirmed: countryinfo[0].TotalConfirmed,
          Deaths: countryinfo[0].TotalDeaths,
        })
      } else {
        setCounrtyCount({
          Confirmed: "NA",
          Deaths: "NA",
        })
      }
    }, (error) => {
      setGlobalCount({
        "Confirmed": "NA",
        "Deaths": "NA",
        // "Recovered": "NA",
        // "Active": "NA"
      })
    });
    // To get the country list and the corresponding 3 letter codes to get the covid data
    ApiStore.getCountryCodes().then((response) => {
      response.data.sort((a, b) => {
        const nameA = a.Country.toLowerCase();
        const nameB = b.Country.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      })
      setCountryList(response.data);
    })
  }, []);

  useEffect(() => {
    // Gets the country count for the last available day and for the last 30 days for the chart plot
    // Takes 3 letter code of country to fetch the data 
    if (summary && summary.Countries) {
      let countryinfo = summary.Countries.filter((country) => {
        return country.Slug === selectedCountry.Slug;
      })
      setCounrtyCount({
        Confirmed: countryinfo[0].TotalConfirmed,
        Deaths: countryinfo[0].TotalDeaths,
      })
    }
    ApiStore.getCountryChartCount(selectedCountry.Slug, selectedDate, moment).then((response) => {
      const data = Object.keys(response.data);
      const labels = [];
      const confirmed = [];
      // const recovered = [];
      const deaths = [];
      data.forEach((key) => {
        confirmed.push(response.data[key].Confirmed);
        // recovered.push(response.data.result[key].recovered);
        deaths.push(response.data[key].Deaths);
        labels.push(moment(response.data[key].Date, 'YYYY-MM-DD').format('MMM DD'));
      })
      setChartLabels(labels);
      setConfirmedLine(confirmed);
      setDeathLine(deaths);
      // setRecoveredLine(recovered);
    }, (error) => {
    });
  }, [selectedCountry]);

  // Shows individual counts 
  const showCards = (details) => {
    const data = Object.keys(details);
    return data.map((key) => {
      return <Card label={key} count={details[key]} />
    })
  }

  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <span className="title">COVID19</span>
          <span className="date">{moment(selectedDate).format('DD/MM/YYYY')}</span>
        </div>
        <div className="display-flex">
          <div className="card-block">
            <div className="card-container-title">World</div>
            <div className="card-container">
              {showCards(globalCount)}
            </div>
          </div>
          <div className="card-block no-boder">
            <div className="card-container-title">{selectedCountry.Country}</div>
            <div className="card-container">
              {showCards(countryCount)}
            </div>
          </div>
        </div>
        <div className="details-container">
          <div className="left-panel">
            <input className="search-field" onChange={searchHandler} value={searchKey} placeholder="Search by Country" ></input>
            <div className="country-list">
              {countryList && countryList.length ? countryListData() : <span>No list</span>}
            </div>
          </div>
          <div className="right-panel">
            <div className="chart-container">
              <Chart chartLabels={chartLabels} confirmedLine={confirmedLine} deathLine={deathLine} />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="credits">
            <div>API : <code><a href="https://covidapi.info/" rel="noopener noreferrer" target="_blank"> covidapi.info</a></code></div>
            <div className="margin-left-20">Dataset : <code><a href="https://github.com/CSSEGISandData/COVID-19" rel="noopener noreferrer" target="_blank"> John Hopkins University</a></code></div>
            <div className="margin-15">
              <code className="made-by">Coded with <FavoriteIcon className="love" /> by Prajwal
                <a href="https://github.com/PrajwalMathad" rel="noopener noreferrer" target="_blank"><i className="fab fa-github"></i></a>
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
