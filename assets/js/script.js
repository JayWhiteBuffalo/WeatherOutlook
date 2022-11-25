
const searchBtn = document.getElementById('searchBtn');
const historyBtn = document.getElementsByClassName('historybtn');
let cityInput = document.getElementById('city-search').value
//const city = cityInput.val().trim();
//const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f94d7942393e88c574f5bb107287fd0f`;
let searchHistoryArr = [];

let now = moment().format('L');

const handleSubmit = (e) => {
  if (e)
  e.preventDefault();
  let cityInput = document.getElementById('city-search').value
  currentWeather(cityInput);
  savedSeaches(cityInput);
}

//

//populate page function
function populateSearch(response) {
  //removes previous weather img tag

  console.log(response);
  let cityTitle = response.name;
  let cityTemp = response.main.temp;
  let cityWind = response.wind.speed;
  let cityHumidity = response.main.humidity;
  let icon = response.weather[0].icon;
  let weatherIcon = `http://openweathermap.org/img/w/${icon}.png`;
  let iconEl = $(`<img id = "cityIcon" src= "${weatherIcon}" alt="weather icon"></img>`);
  document.getElementById('city-title').innerHTML = cityTitle;
  document.getElementById('city-temp').innerHTML = "Temperature : " + cityTemp + " *F";
  document.getElementById('city-wind').innerHTML = "Wind : " + cityWind + " mph";
  document.getElementById('city-humidity').innerHTML = "Humidity : " + cityHumidity + " %";
  $("#searchCity").append(iconEl);
  weatherForcast(response);
};
//Get current weather
function currentWeather(cityInput) {
  const apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=f94d7942393e88c574f5bb107287fd0f`;
  $.ajax({
      url: apiCurrentUrl,
      method: "GET"
  }).then(function (response) {
    localStorage.setItem(cityInput, cityInput)
    populateSearch(response);
  })
  
};


//Create Seach history button
function savedSeaches(cityInput) {
  let savedBtn = document.createElement('btn');
      savedBtn.setAttribute('id', cityInput);
      savedBtn.setAttribute('type', 'click');
      //savedBtn.setAttribute('onclick', currentWeather(cityInput));
      savedBtn.classList.add('historybtn');
      savedBtn.textContent = cityInput;
      savedBtn.onclick = historyHandle;
  document.getElementById("savedSeach").append(savedBtn);
}


//Get 5 Day Forcast
function weatherForcast(response) {
  let lat = response.coord.lat;
  let lon = response.coord.lon;

  const forcastCall = `https://api.openweathermap.org/data/3.0/onecall?lat=`+lat+`&lon=`+lon+`&units=imperial&appid=f94d7942393e88c574f5bb107287fd0f`;
  fetch(forcastCall)
      .then((data) => {
        return data.json()
      })
      .then((data) =>{
        clearCards();
          pop5daycards(data)}
          );
  
};

function clearCards(){

    $('.forecast-card').siblings('div').remove();
}; 



function pop5daycards(data) {
  for (let i =1; i < data.daily.length; i++) {
    if(i === 6) {break;}
    let unixTime =  (data.daily[i].dt)
    let day = new Date(unixTime * 1000).toLocaleDateString("en-US")
    let card = document.createElement('div');
        card.classList.add('forecast-card');
    let cardDate = document.createElement('b');
        cardDate.classList.add('forecast-date');
        cardDate.innerText = day;
    let icon = data.daily[i].weather[0].icon;
    let weatherIcon = `http://openweathermap.org/img/w/${icon}.png`;
    let iconEl = document.createElement('img');
        iconEl.setAttribute('src', weatherIcon)
    let cardInfo = document.createElement('div');
        cardInfo.classList.add('forecast-info');
    let cardTemp = document.createElement('p');
        cardTemp.innerText = ("Temp : " + data.daily[i].temp.max) + " *F";
    let cardWind = document.createElement('p');
        cardWind.innerText = ("Wind : " + data.daily[i].wind_speed + " MPH");
    let cardHumid = document.createElement('p');
        cardHumid.innerText = ("Humidity : " + data.daily[i].humidity + " %");

    card.append(cardDate,iconEl,cardInfo,cardTemp,cardWind,cardHumid);
    let container = document.getElementById('card-container');
    // Function was running twice so this was put in to prevent additional cards
    let numberOfCards = container.getElementsByTagName('*').length;
    if (numberOfCards < 30)
    {container.appendChild(card)}
    else {break};
  }
};

//run history buttons
function historyHandle (city){
  let cityName = city.target.innerText;
  let pastSearch = localStorage.getItem(cityName);
  currentWeather(pastSearch);
}




//Button Event
searchBtn.addEventListener("click", handleSubmit);

