import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const myInput = document.querySelector('#datetime-picker');
const inputButton = document.querySelector('[data-start]');
const daysToEndAction = document.querySelector('[data-days]');
const hoursToEndAction = document.querySelector('[data-hours]');
const minutesToEndAction = document.querySelector('[data-minutes]');
const secondsToEndAction = document.querySelector('[data-seconds]');
let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      inputButton.setAttribute('disabled', 'true');
      return;
    }

    inputButton.removeAttribute('disabled');
    return (selectedDate = selectedDates[0].getTime());
  },
};

const fp = flatpickr(myInput, options);

function startTimer() {
  let timerId = null;
  let isActive = false;

  function stopTimer() {
    if (
      (secondsToEndAction.textContent === '00') &
      (minutesToEndAction.textContent === '00') &
      (hoursToEndAction.textContent === '00') &
      (daysToEndAction.textContent === '00')
    ) {
      clearInterval(timerId);
    }
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function onShowTimeToEndAction({ days, hours, minutes, seconds }) {
    daysToEndAction.textContent = days;
    hoursToEndAction.textContent = hours;
    minutesToEndAction.textContent = minutes;
    secondsToEndAction.textContent = seconds;
  }

  function onStart(convertTime) {
    onShowTimeToEndAction(convertTime);
  }

  function onTick(time) {
    onShowTimeToEndAction(time);
    stopTimer();
  }

  return function () {
    if (isActive) {
      return;
    }

    isActive = true;

    let currentTime = Date.now();
    const startTime = selectedDate - currentTime;
    const convertTime = convertMs(startTime);

    onStart(convertTime);

    timerId = setInterval(() => {
      currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      const time = convertMs(deltaTime);

      onTick(time);
    }, 1000);
  };
}

const timer = startTimer();

inputButton.addEventListener('click', timer);
inputButton.setAttribute('disabled', 'true');

// my test work

// // time constants:
// const msInsecond = 1000;
// const secondsInMin = 60;
// const minsInHour = 60;
// const hoursInDay = 24;

// const timer = targetDate => {
//   setInterval(() => {
//     // the difference between the optional date and the current time
//     const delta = new Date(targetDate) - new Date();
//     const seconds = String(
//       Math.floor((delta / msInsecond) % secondsInMin)
//     ).padStart(2, '0');
//     const minutes = String(
//       Math.floor((delta / (msInsecond * secondsInMin)) % minsInHour)
//     ).padStart(2, '0');
//     const hours = String(
//       Math.floor(
//         (delta / (msInsecond * secondsInMin * minsInHour)) % hoursInDay
//       )
//     ).padStart(2, '0');
//     const days = Math.floor(
//       delta / (msInsecond * secondsInMin * minsInHour * hoursInDay)
//     );

//     const timeFormat = `${days}:${hours}:${minutes}:${seconds}`;

//     const datePicker = document.querySelector('#datetime-picker');

//     renderTimer(timeFormat);
//     // тоже что и Number(+new Date(targetDate)) или (+new Date(targetDate)) тоже что и (new Date(targetDate).getTime())
//   }, 1000);

//   const renderTimer = string => {
//     document.querySelector('span').innerText = string;
//   };
// };

// timer(new Date('2023/03/03'));
