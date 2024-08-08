import './style.css';
const location = document.querySelector('#location');
const search = document.querySelector('#search');
const scale = document.querySelector('#scale');
const content = document.querySelector('#content');
function celsius(degree) {
  return (((degree - 32) /(9/5)).toFixed(1));
}
function unpackDay(day) {
  const date = day.datetime;
  const temp = day.temp;
  const conditions = day.conditions;
  const high = day.tempmax;
  const low = day.tempmin;
  const icon = day.icon;
  
  return({date, temp, high, low, conditions, icon});
}
function createCard(day) {
  const card = document.createElement('div');
  card.classList = ('card');
  const date = document.createElement('div');
  date.classList = ('date');
  date.textContent = day.date;
  card.appendChild(date);
  const conditions = document.createElement('div');
  conditions.classList = ('conditions');
  conditions.textContent = day.conditions;
  card.appendChild(conditions);
  const image = document.createElement('img');
  image.src = 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/' + day.icon + '.svg';
  card.appendChild(image);
  const tempRange = document.createElement('div');
  tempRange.classList = ('range');
  if (scale.classList.contains('f')){
    const low = document.createElement('div');
    low.classList = ('low');
    low.textContent = day.low + '°F';
    tempRange.appendChild(low);
    const temp = document.createElement('div');
    temp.classList = ('temp');
    temp.textContent = day.temp + '°F';
    tempRange.appendChild(temp);
    const high = document.createElement('div');
    high.classList = ('high');
    high.textContent = day.high + '°F';
    tempRange.appendChild(high);
  } else if (scale.classList.contains('c')) {
    const low = document.createElement('div');
    low.classList = ('low');
    low.textContent = celsius(day.low) + '°C';
    tempRange.appendChild(low);
    const temp = document.createElement('div');
    temp.classList = ('temp');
    temp.textContent = celsius(day.temp) + '°C';
    tempRange.appendChild(temp);
    const high = document.createElement('div');
    high.classList = ('high');
    high.textContent = celsius(day.high) + '°C';
    tempRange.appendChild(high);
  }
  card.appendChild(tempRange);
  content.appendChild(card);
}

async function getWeather(input) {
  try {
const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + input + '?unitGroup=us&key=AYXXCY999QGTZNWMMDFN8YMJK&contentType=json&iconSet=icons1', {mode: 'cors'});
const Data = await response.json();
return(Data);
}  catch (error) {
  console.log(error)
  alert('Error obtaining results');
} }
async function display(input){
  try{
  const data = await getWeather(input);
  content.textContent = '';
  console.log(data);
  const day0 = unpackDay(data.days[0]);
  const day1 = unpackDay(data.days[1]);
  const day2 = unpackDay(data.days[2]);
  const day3 = unpackDay(data.days[3]);
  const day4 = unpackDay(data.days[4]);
  const day5 = unpackDay(data.days[5]);
  const day6 = unpackDay(data.days[6]);
  createCard(day0);
  createCard(day1);
  createCard(day2);
  createCard(day3);
  createCard(day4);
  createCard(day5);
  createCard(day6);
  } catch (error) {
    console.log(error);
  }
}

scale.addEventListener('click', function() {
  if (scale.classList.contains('f')) {
    scale.classList = 'c';
    scale.textContent = 'Change to Farenheit';
    if (location.value) {
      display(location.value)
    }
  } else if (scale.classList.contains('c')) {
    scale.classList = 'f';
    scale.textContent = 'Change to Celsius';
    if (location.value) {
      display(location.value)
    }
  }
})
search.addEventListener('click', function(){
  console.log(location.value);
  display(location.value);
})
