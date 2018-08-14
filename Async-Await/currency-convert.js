require('dotenv').config();
const axios = require('axios');

const myKey = process.env.KEY;

console.log(myKey)

// const getExchangeRate = (from, to) => {
//     return axios.get(`http://data.fixer.io/api/latest?access_key={myKey}`).then((response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name);
//     });
// }

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => 
//         convertedAmount = (amount * rate).toFixed(2);
//         console.log(convertedAmount);
//         return getCountries(to);
//     }).then((countries) => {
//         console.log(countries);
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
//     });
// }


// ========================= using async await ===================================

const getExchangeRate = async (from, to) => {

    try {
        const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${myKey}`);

        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if(isNaN(rate))
        throw new Error();  //this will be catched by the catch block below, which in turn will throw its own error

        return rate;
        
    } catch (error) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
    }

    

};

const getCountries = async (currencyCode) => {
    
    try {
        const response = await axios(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
    
}

const convertCurrency = async (from, to, amount) => {

    var rate = await getExchangeRate(from, to);
    var countries = await getCountries(to);

    var convertedAmount = (amount * rate).toFixed(2);

    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
}

convertCurrency('PKR', 'PKR', 200).then((message) => {
    console.log(message);
}).catch((e) => {
    console.log(e.message);
});