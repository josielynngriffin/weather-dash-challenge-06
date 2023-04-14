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
let searchHistoryCont = $('#search-history__cont');
//let searchHistoryButton = $('#search-history__button');
let openWeatherAPI = '';


searchButton.on('click', startSearch) 
//save user submission, use geocoding api
let searchHistory = [];
function startSearch(event){
    event.preventDefault();
    console.log('search clicked');
    
    let searchedCity= searchedInput.val();
    searchHistory.push(searchedCity);

    console.log(searchedCity);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    console.log('sh: ' + searchHistory);
    //function to propogate search history ((will not stay here))
    showHistory();
    //function to search with city with geo
    searchCity(searchedCity);
}
//function to retrieve, create elements, and append search history to page
function showHistory () {
    let retrievedHistory = JSON.parse(localStorage.getItem('searchHistory'));
    console.log('retrieved: ' + retrievedHistory);
    for (let i=0; i < retrievedHistory.length; i++) {
        let generatedSearchButton = document.createElement('button');
        $(generatedSearchButton).addClass('btn').addClass('btn-outline-success').addClass('m-2');
        $(generatedSearchButton).attr('id', 'search-history__button');
        $(generatedSearchButton).text(retrievedHistory[i]);
        console.log(generatedSearchButton);
        $(searchHistoryCont).append(generatedSearchButton);
    }
    /*$(retrievedHistory).each( function(){
        let generatedSearchButton = $('<button></button>').addClass('btn-outline-success', 'btn').attr('id', 'search-history__button');
        //$('#search-history__button')
        generatedSearchButton.text(retrievedHistory.indexOf());
        console.log(generatedSearchButton);
        $(searchHistoryCont).append(generatedSearchButton);
    });*/
}

//function to search geo


function searchCity(searchedCity){
    console.log('searched city :' + searchedCity);
    let geoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' +searchedCity +'&limit=5&appid=b55644b1672c2e922502f7ab98105758';
    console.log(geoURL);
    fetch(geoURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log('GEOAPI: ' + data);
            console.log(data);
           getWeather(data);
        })
};

//function to search weather api

//proxy to fix cors issue
/*const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});*/
function getWeather(data) {
    let lat= data[0].lat;
    let lon= data[0].lon;
    console.log(lat);
    console.log(lon);
    //let forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +'&lon=' + lon + '&appid=b55644b1672c2e922502f7ab98105758';
    //let forecastURL= 'api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=imperial&appid=b55644b1672c2e922502f7ab98105758';
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=`+lat+`&lon=`+lon+ `&units=metric&appid=b55644b1672c2e922502f7ab98105758`;
    console.log(forecastURL);
    fetch(forecastURL)
            .then(function (response) {
                /*if(response.ok) {
                    return response.json()
                } else {alert('Error' + response.status)}*/
                return response.json();
                
            })
            .then(function (data) {
                console.log(data)
                getCurrentWeather(data);
            })
};

function getCurrentWeather(data) {
    let currentWeatherCity = $('#current-forecast__city');
    console.log(currentWeatherCity);
    //currentWeatherCity.textContent = 'data.city.name';
    //$(currentWeatherCity).text(data.city.name);
    //todayContainer.insertAdjacentHtml('afterbegin', data.city.name);
    todayContainer.insertAdjacentHTML= "afterbegin", data.city.name;
    console.log(currentWeatherCity);
    
    //let todayContainer = $('#current-date');
    //todayContainer.text(currentDate.format('MMM D, YYYY'));
};
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
