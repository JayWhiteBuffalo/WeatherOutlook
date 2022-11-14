
const searchBtn = document.getElementById('searchBtn');
//const city = cityInput.val().trim();
//const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f94d7942393e88c574f5bb107287fd0f`;
let searchHistoryArr = [];

let now = moment().format('L');

const handleSubmit = (e) => {
  if (e)
  e.preventDefault();
  let cityInput = document.getElementById('city-search').value
  currentWeather(cityInput);
}

//

//populate page function
function populateSearch(response) {
  //console.log(response);
  let cityTitle = response.name;
  let cityTemp = response.main.temp;
  let cityWind = response.wind.speed;
  let cityHumidity = response.main.humidity;
  let weatherImg = response.weather.main;
  document.getElementById('city-title').innerHTML = cityTitle;
  document.getElementById('city-temp').innerHTML = "Temperature : " + cityTemp + " *F";
  document.getElementById('city-wind').innerHTML = "Wind : " + cityWind + " mph";
  document.getElementById('city-humidity').innerHTML = "Humidity : " + cityHumidity + " %";
  weatherForcast(response);
};
//Get current weather
function currentWeather(cityInput) {
  const apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=f94d7942393e88c574f5bb107287fd0f`;
  $.ajax({
      url: apiCurrentUrl,
      method: "GET"
  }).then(function (response) {
    populateSearch(response);
  })
};

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
          pop5daycards(data)}
          );
  
};

function pop5daycards(data) {
  for (let i =1; i < data.daily.length; i++) {
    if(i === 6) {break;}
    let day = moment().add(i, 'd').format('MMMM do YYYY');
    let card = document.createElement('div');
        card.classList.add('forecast-card');
    let cardDate = document.createElement('b');
        cardDate.classList.add('forecast-date');
        cardDate.innerText = day;
    let cardInfo = document.createElement('div');
        cardInfo.classList.add('forecast-info');
    let cardTemp = document.createElement('p');
        cardTemp.innerText = ("Temp : " + data.daily[i].temp.max) + " *F";
    let cardWind = document.createElement('p');
        cardWind.innerText = ("Wind : " + data.daily[i].wind_speed + " MPH");
    let cardHumid = document.createElement('p');
        cardHumid.innerText = ("Humidity : " + data.daily[i].humidity + " %");

    card.append(cardDate,cardInfo,cardTemp,cardWind,cardHumid);
    let container = document.getElementById('card-container');
    // Function was running twice so this was put in to prevent additional cards
    let numberOfCards = container.getElementsByTagName('*').length;
    if (numberOfCards < 30)
    {container.appendChild(card)}
    else {break};
  }
};






//Button Event
searchBtn.addEventListener("click", handleSubmit);