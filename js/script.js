//date and time
const time = document.querySelector(".time");
const dateItem = document.querySelector(".date")

setInterval(function () {
  showTime();
  showDate();
}, 1000);

function showTime() {
  const currentTime = new Date().toLocaleTimeString().replace(/ .*/, '');
  time.textContent = currentTime
}

function showDate() {
  const date = new Date()
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = date.toLocaleDateString('en-US', options)
  dateItem.textContent = currentDate
}


//greeting
const greeting = document.querySelector(".greeting");

const date = new Date();
const hours = date.getHours();

let greetingText = '';

function getTimeOfDay() {
  if (hours >= 6 && hours < 12) {
    greetingText = 'morning'
  }
  if (hours >= 12 && hours < 18) {
    greetingText = 'afternoon'
  }
  if (hours >= 18 && hours < 24) {
    greetingText = 'evening'
  }
  if (hours >= 0 && hours < 6) {
    greetingText = 'night'
  }
  return `Good ${greetingText}`
}

greeting.textContent = getTimeOfDay();



//input name
const nameInput = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem('name', nameInput.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameInput.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)


//slider
const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

let randomNum;
function getRandomNum(min, max) {
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum
}
getRandomNum(1, 20)


function randomBg() {
  let bgNum
  if (randomNum < 10) {
    bgNum = `0${randomNum}`
  } else bgNum = randomNum
  return bgNum
}

function changeBgImg() {
  body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greetingText}/${randomBg()}.jpg)`
}
changeBgImg()

function getSlideNext() {
  randomNum++
  if (randomNum >= 20) {
    randomNum = 1;
  }
  changeBgImg()
}

function getSlidePrev() {
  randomNum--
  if (randomNum < 1) {
    randomNum = 20;
  }
  changeBgImg()
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


//weather
const weatherIcon = document.querySelector('.weather-icon');
const weatherDescription = document.querySelector('.weather-description');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector('.city');



async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c74a77e53331195493f238fffde5957b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`
}
getWeather()



//quote of the day
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  const quotes = 'js/data.json';
  const res = await fetch(quotes);
  const data = await res.json();

  function quoteRandomNum() {
    return Math.floor(Math.random() * quotes.length);
  }

  function newQuote() {
    const quoteRandom = quoteRandomNum();
    quote.textContent = data[quoteRandom].text;
    author.textContent = data[quoteRandom].author;
  }
  newQuote()

  changeQuote.addEventListener('click', newQuote);
}
getQuotes();



//audio player
import playList from './playList.js';
const play = document.querySelector(".play")
const playNextBtn = document.querySelector(".play-next")
const playPrevBtn = document.querySelector(".play-prev")

const audio = new Audio();

let isPlay = false;

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
}

function pauseAudio() {
  audio.pause();
  isPlay = false;
}

play.addEventListener('click', function () {
  if (isPlay === false) {
    playAudio()
  } else {
    pauseAudio()
  }
})

function toggleBtn() {
  play.classList.toggle('pause');
}
play.addEventListener('click', toggleBtn);


let playNum = 0;

function playNext() {
  playNum++
  if (playNum > playList.length - 1) {
    playNum = 0
  }
  playAudio()
}

function playPrev() {
  playNum--
  if (playNum < 0) {
    playNum = playList.length - 1
  }
  playAudio()
}

playNextBtn.addEventListener('click', playNext)
playPrevBtn.addEventListener('click', playPrev)


//playlist
const li = document.createElement('li');
const ul = document.querySelector('.play-list')
li.classList.add('play-item');

for (let i = 0; i < playList.length; i++) {
  li.textContent = playList[i].title
  ul.append(li)
}
