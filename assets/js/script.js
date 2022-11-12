
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
//Get current weather
function currentWeather(cityInput) {
  const apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=f94d7942393e88c574f5bb107287fd0f`;
  $.ajax({
      url: apiCurrentUrl,
      method: "GET"
  }).then(function (response) {
    console.log(response);

  })
}




//Button Event
searchBtn.addEventListener("click", handleSubmit);