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
let searchHistoryCont = document.getElementById('search-history__cont');
//let searchHistoryButton = $('#search-history__button');
let openWeatherAPI = '';


searchButton.on('click', startSearch) 
//save user submission, use geocoding api
let searchHistory = [];
function startSearch(event){
    event.preventDefault();
    console.log('search clicked');
    
    let searchedCity= searchedInput.val();
    if(searchedCity && !searchHistory.includes(searchedCity)) {
        searchHistory.push(searchedCity);
         localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        console.log('sh: ' + searchHistory);
        showHistory();
    }
    

    console.log(searchedCity);
   
    //console.log('sh: ' + searchHistory);
    //function to propogate search history ((will not stay here))
    
    //function to search with city with geo
    searchCity(searchedCity);
}
//function to retrieve, create elements, and append search history to page
function showHistory () {
    searchHistoryCont.innerHTML= '';
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
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=`+lat+`&lon=`+lon+ `&units=imperial&appid=b55644b1672c2e922502f7ab98105758`;
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
                getForecastWeather(data);
            })
};

function getCurrentWeather(data) {
   
    //let currentWeatherCity = $('#current-forecast__city');
    let currentWeatherCity = document.getElementById("current-forecast__city");
    let currentWeatherTemp = document.getElementById("current-forecast__temp");
    let currentWeatherWind = document.getElementById("current-forecast__wind");
    let currentWeatherHumid = document.getElementById("current-forecast__humid");
    currentWeatherCity.innerHTML = '';
    //let currentWeatherIcon = document.getElementById('current-forecast__icon');
    let currentWeatherIconCont = document.getElementById('current-forecast__icon');
    currentWeatherIconCont.innerHTML = '';
    let currentWeatherIcon = document.createElement('img');
    let currenticon= '';
    console.log(currentWeatherCity);
    currentWeatherCity.textContent = data.city.name;
    
    //currentWeatherTemop.textContent = 
    currentWeatherIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+data.list[0].weather[0].icon+'.png');
    $(currentWeatherIcon).addClass('card-img-top');
    currentWeatherIconCont.append(currentWeatherIcon);
    currentWeatherTemp.textContent = 'Temp: ' + data.list[0].main.temp + ' °F';
    currentWeatherHumid.textContent = 'Humidity: ' + data.list[0].main.humidity + ' %';
    currentWeatherWind.textContent = 'Wind Speed: ' + data.list[0].wind.speed + ' MPH';
    //currentWeatherCity.textContent= data.city.name;
    //$(currentWeatherCity).text(data.city.name);
    //todayContainer.insertAdjacentHtml= 'afterbegin', data.city.name;
    //todayContainer.insertAdjacentHTML()= "afterbegin", data.cityname;
    console.log(currentWeatherCity);
    
    //let todayContainer = $('#current-date');
    //todayContainer.text(currentDate.format('MMM D, YYYY'));
};

function getForecastWeather(data) {
    let forecastCards = [
        {
            forecastnum: 1,
            listnum:6,
        }, 
        {
            forecastnum:2,
            listnum:14,
        },
        {
            forecastnum:3,
            listnum:22,
        },
        {
            forecastnum:4,
            listnum:30,
        },
        {
            forecastnum:5,
            listnum:38,
        },
    ]
    let finalForecast = forecastCards.length;
    let currentForecastI = 0
    let currentForecastCard = forecastCards[currentForecastI];
    
    for (currentForecastI; currentForecastI < forecastCards.length; currentForecastI++) {
        let currentForecastNum = forecastCards[currentForecastI].forecastnum;
        let currentForecastListNum = forecastCards[currentForecastI].listnum;
        let currentForecastDateId= 'forecast-' + currentForecastNum + '__date';
        console.log(currentForecastDateId);
        let forecastWeatherTemp= document.getElementById('forecast-'+ currentForecastNum+'__temp');
        let forecastWeatherWind = document.getElementById('forecast-'+ currentForecastNum+'__wind');
        let forecastWeatherHumid = document.getElementById('forecast-' + currentForecastNum+'__humid');
        forecastWeatherTemp.textContent = 'Temp: ' + data.list[currentForecastListNum].main.temp + ' °F';
        forecastWeatherHumid.textContent = 'Humidity: ' + data.list[currentForecastListNum].main.humidity + ' %';
        forecastWeatherWind.textContent = 'Wind Speed: ' + data.list[currentForecastListNum].wind.speed + ' MPH';
        let forecastDate = document.getElementById('forecast-'+currentForecastNum+'__date');
        let forecastDateVal = data.list[currentForecastListNum].dt_txt;
        let forecastDateFix= dayjs(forecastDateVal).format('MM/DD/YYYY');
        forecastDate.textContent= forecastDateFix;
        let forecastWeatherIconCont = document.getElementById('forecast-'+currentForecastNum+'__icon');
        forecastWeatherIconCont.innerHTML = '';
        let forecastWeatherIcon = document.createElement('img');
        forecastWeatherIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+data.list[currentForecastListNum].weather[0].icon+'.png');
        $(forecastWeatherIcon).addClass('forecast-img');
        forecastWeatherIconCont.append(forecastWeatherIcon);
        //forecastDate.textContent = data.list[currentForecastListNum].dt_txt;

    };
    
    //forecastCards.forEach()

    
};
showHistory();

$(searchHistoryCont).on('click', 'button', function(event){
    event.preventDefault();
    console.log('history click')
    let historyCity= event.target.textContent;
    searchCity(historyCity);
});


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
