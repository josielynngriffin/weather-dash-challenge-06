console.log("test");
console.log(dayjs());
//selector variables
let futureForecastCont = $('#future-forecast__container');
let currentDate= dayjs();
let todayContainer = $('#current-date');
todayContainer.text(currentDate.format('MMM D, YYYY'));
let forecastDateCont = $('#forecast-date');
let searchedInput = $('#searchedCity__input');

let searchButton = $('#search__button');
let searchHistoryButton = $('#search-history__button');
let openWeatherAPI = '';
let lat= '';
let lon= '';
let forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +'&lon=' + lon + '&appid=b55644b1672c2e922502f7ab98105758';
//save user submission, use geocoding api

let searchHistory = [];
searchButton.on('click', function(event){
    event.preventDefault();
    console.log('search clicked');
    
    let searchedCity= searchedInput.val();
    searchHistory.push(searchedCity);

    console.log(searchedCity);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    console.log('sh: ' + searchHistory);
    //function to propogate search history
})






//let geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' +searchedCity +'&limit=5&appid=b55644b1672c2e922502f7ab98105758';






//SCRAPPED CODE --- DATES DATA IN API

/*$(function forecastDates() {
    let forecastArray= futureForecastCont.children('div').children('div').children('#forecast-date');
    console.log(forecastArray);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let forecastDates = forecastArray.map(function(tomorrow) {
        tomorrow.getDate() + 1;
    })
    console.log(forecastDates);
    /*for (let i=0;i <forecastArray.length; i++) {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        console.log(tomorrow);
        forecastDates.push(tomorrow);
        console.log(forecastDates);
        //forecastArray[i] = forecastArray[i] +1;
        //forecastDateCont.text()
    }
});

forecastDates();*/
//use dayJS to acquire current date and dates for the five day forecast
//iterate over, adding one for each day?
