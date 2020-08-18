import axios from 'axios';

const ApiStore = {
    getGlobalCount : () => {
        return axios.get('https://covidapi.info/api/v1/global');
      },
    
    getCountryCount : (code) => {
    return axios.get(`https://covidapi.info/api/v1/country/${code}/latest`);
    },

    getCountryChartCount : (code, selectedDate, moment) => {
    return axios.get(`https://covidapi.info/api/v1/country/${code}/timeseries/${moment(selectedDate).subtract(30 ,'days').format('YYYY-MM-DD')}/${moment(selectedDate).format('YYYY-MM-DD')}`);
    },

    getCountryCodes : () => {
    return axios.get(`https://restcountries.eu/rest/v2/all`);
    }
}

export default ApiStore;
