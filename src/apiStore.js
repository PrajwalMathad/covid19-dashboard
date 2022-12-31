import axios from 'axios';

const ApiStore = {
    getGlobalCount : () => {
        return axios.get('https://api.covid19api.com/summary');
      },
    
    getCountryCount : (code) => {
    return axios.get(`https://covidapi.info/api/v1/country/${code}/latest`);
    },

    getCountryChartCount : (code, selectedDate, moment) => {
    return axios.get(`https://api.covid19api.com/country/${code}?from=${moment(selectedDate).subtract(30 ,'days').format('YYYY-MM-DD')}&to=${moment(selectedDate).format('YYYY-MM-DD')}`)
    },

    getCountryCodes : () => {
    return axios.get(`https://api.covid19api.com/countries`);
    }
}

export default ApiStore;
