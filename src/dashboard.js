import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Line, Bar } from 'react-chartjs-2';

const moment = require('moment');
const axios = require('axios');

const CssTextField = withStyles({
  root: {
    '& input': {
      color: 'whitesmoke',
    },
    '& label': {
      color: 'whitesmoke'
    },
    '& label.Mui-focused': {
      color: '#448aff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#448aff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'whitesmoke',
      },
      '&:hover fieldset': {
        borderColor: 'whitesmoke',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#448aff',
      },
    },
  },
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: '1vw 1vw 1vw 0',
    width: '90%'
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const [globalCount, setGlobalCount] = useState({});
  const [countryCount, setCounrtyCount] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartLabels, setChartLabels] = useState([]);
  const [confirmedLine, setConfirmedLine] = useState([]);
  const [deathLine, setDeathLine] = useState([]);
  const [recoveredLine, setRecoveredLine] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({ "name": 'India', "alpha3Code": "IND" });

  const getGlobalCount = () => {
    return axios.get('https://covidapi.info/api/v1/global');
  }

  const getCountryCount = (code) => {
    return axios.get(`https://covidapi.info/api/v1/country/${code}/latest`);
  }

  const getCountryChartCount = (code) => {
    return axios.get(`https://covidapi.info/api/v1/country/${code}/timeseries/${moment(selectedDate).subtract(30 ,'days').format('YYYY-MM-DD')}/${moment(selectedDate).format('YYYY-MM-DD')}`);
  }

  const getCountryCodes = () => {
    return axios.get(`https://restcountries.eu/rest/v2/all`);
  }

  const changeSelectedCountry = (country) => {
    setSelectedCountry(country);
  }

  const countryListData = () => {
    if (searchKey) {
      let result = countryList.filter(o => o.name.toLowerCase().includes(searchKey.toLowerCase()));
      return result.map((country) => countryData(country));
    } else {
      return countryList.map((country) => countryData(country));
    }
  }

  const countryData = (data) => {
    return (
      <div className="country-row" onClick={changeSelectedCountry.bind(null, data)}>
        {data.name}
      </div>
    )
  }

  const searchHandler = (event) => {
    const val = event.target.value;
    setSearchKey(val);
  }

  useEffect(() => {
    getGlobalCount().then((response) => {
      setGlobalCount(response.data.result);
    }, (error) => {

    });
  }, []);

  useEffect(() => {
    getCountryCount(selectedCountry.alpha3Code).then((response) => {
      const data = Object.keys(response.data.result);
      data.forEach((key) => {
        setCounrtyCount(response.data.result[key]);
      })
    }, (error) => {
      setCounrtyCount({
        "confirmed": "N/A",
        "deaths": "N/A",
        "recovered": "N/A",
        "active": "N/A"
      })
    });

    getCountryChartCount(selectedCountry.alpha3Code).then((response) => {
      const data = Object.keys(response.data.result);
      const labels = [];
      const confirmed = [];
      const recovered = [];
      const deaths = [];
      data.forEach((key) => {
        confirmed.push(response.data.result[key].confirmed);
        recovered.push(response.data.result[key].recovered);
        deaths.push(response.data.result[key].deaths);
        labels.push(moment(response.data.result[key].date, 'YYYY-MM-DD').format('MMM DD'));
      })
      setChartLabels(labels);
      setConfirmedLine(confirmed);
      setDeathLine(deaths);
      setRecoveredLine(recovered);
    }, (error) => {
    });
  }, [selectedCountry]);

  useEffect(() => {
    getCountryCodes().then((response) => {
      const filteredlist = [];
      filteredlist.push(response.data.map((one) => {
        return ({ 'name': one.name, 'code': one.alpha3Code })
      }));
      setCountryList(response.data);
    })
  }, []);

  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <span className="title">COVID19</span>
          <span className="date">{moment(selectedDate).format('DD/MM/YYYY')}</span>
        </div>
        <div className="display-flex">
          <div className="card-block">
            <div className="card-container-title">Global</div>
            <div className="card-container">
              <div className="cards">
                <div className="confirmed-card">Confirmed</div>
                <div className="count">{globalCount.confirmed}</div>
              </div>
              <div className="cards">
                <div className="death-card">Death</div>
                <div className="count">{globalCount.deaths}</div>
              </div>
              <div className="cards">
                <div className="recovered-card">Recovered</div>
                <div className="count">{globalCount.recovered}</div>
              </div>
              <div className="cards">
                <div className="active-card">Active</div>
                <div className="count">{globalCount.confirmed - globalCount.recovered - globalCount.deaths}</div>
              </div>
            </div>
          </div>
          <div className="card-block no-boder">
            <div className="card-container-title">{selectedCountry.name}</div>
            <div className="card-container">
              <div className="cards">
                <div className="confirmed-card">Confirmed</div>
                <div className="count">{countryCount.confirmed}</div>
              </div>
              <div className="cards">
                <div className="death-card">Death</div>
                <div className="count">{countryCount.deaths}</div>
              </div>
              <div className="cards">
                <div className="recovered-card">Recovered</div>
                <div className="count">{countryCount.recovered}</div>
              </div>
              <div className="cards">
                <div className="active-card">Active</div>
                {countryCount.active ? <div className="count">{countryCount.active}</div> : <div className="count">{countryCount.confirmed - countryCount.recovered - countryCount.deaths}</div>}
              </div>

            </div>
          </div>
        </div>
        <div className="details-container">
          <div className="left-panel">
            <CssTextField onChange={searchHandler} value={searchKey} className={classes.margin} label="Search by Country" variant="outlined" id="custom-css-outlined-input" />
            <div className="country-list">
              {countryList && countryList.length ? countryListData() : <span>No list</span>}
            </div>
          </div>
          <div className="right-panel">
            <div className="chart-container">
              <Line
                width={500}
                height={180}
                data={{
                  labels: chartLabels,
                  datasets: [
                    {
                      label: 'Confirmed',
                      fill: false,
                      lineTension: 0.5,
                      color: 'rgb(239,245,252,1)',
                      backgroundColor: 'rgb(68,138,255,1)',
                      pointBackgroundColor: 'rgb(68,138,255,0.8)',
                      borderColor: 'rgb(68,138,255,1)',
                      borderWidth: 2,
                      data: confirmedLine
                    },
                    {
                      label: 'Deaths',
                      fill: false,
                      lineTension: 0.5,
                      color: 'rgb(239,245,252,1)',
                      backgroundColor: 'rgb(255,82,82,1)',
                      pointBackgroundColor: 'rgb(255,82,82,0.8)',
                      borderColor: 'rgb(255,82,82,1)',
                      borderWidth: 2,
                      data: deathLine
                    },
                    {
                      label: 'Recovered',
                      fill: false,
                      lineTension: 0.5,
                      color: 'rgb(239,245,252,1)',
                      backgroundColor: 'rgb(178,255,89,1)',
                      pointBackgroundColor: 'rgb(178,255,89,0.8)',
                      borderColor: 'rgb(178,255,89,1)',
                      borderWidth: 2,
                      data: recoveredLine
                    }
                  ]
                }}
                options={{
                  title: {
                    display: false
                  },
                  legend: {
                    display: true,
                    position: 'top'
                  }
                }}
              />
            </div>

          </div>
        </div>
        <div className="footer">
          <div className="credits">
            <div>API : <code><a href="https://covidapi.info/" rel="noopener noreferrer" target="_blank"> covidapi.info</a></code></div>
            <div className="margin-left-20">Dataset : <code><a href="https://github.com/CSSEGISandData/COVID-19" rel="noopener noreferrer" target="_blank"> John Hopkins University</a></code></div>
            <div className="margin-15">
              <code className="made-by">Coded with <FavoriteIcon className="love" /> by Prajwal
              <a href="https://github.com/PrajwalMathad" rel="noopener noreferrer" target="_blank"><i class="fab fa-github"></i></a>
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
