import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const inputRef = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
startButton.setAttribute('disabled', true);

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let timerId = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startButton.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
      clearInterval(timerId);
      daysRef.textContent = '00';
      hoursRef.textContent = '00';
      minutesRef.textContent = '00';
      secondsRef.textContent = '00';
      return;
    }
    selectedDate = selectedDates[0];
    startButton.addEventListener('click', handleClick);
    startButton.removeAttribute('disabled');
  },
};

const fp = flatpickr(inputRef, options);

const convertMs = (ms) => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
};

function handleClick() {
  toStartCounting(selectedDate);
};

function toStartCounting(selectedDate) {
  startButton.removeEventListener('click', handleClick);
  startButton.setAttribute('disabled', true);
    clearInterval(timerId);
     Notify.info('Countdown started !!!');
  timerId = setInterval(() => {
       const currentDate = new Date();
    const remainingTime = selectedDate.getTime() - currentDate.getTime();

    if (remainingTime <= 0) {
      clearInterval(timerId);
      daysRef.textContent = '00';
      hoursRef.textContent = '00';
      minutesRef.textContent = '00';
      secondsRef.textContent = '00';
      return Notify.info('The time is up !!!');
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minutesRef.textContent = addLeadingZero(minutes);
    secondsRef.textContent = addLeadingZero(seconds);
  }, 1000);
}



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
//     // тоже что и Number(+new Date(targetDate)) или (+new Date(targetDate))
//     // тоже что и (new Date(targetDate).getTime())
//   }, 1000);

//   const renderTimer = string => {
//     document.querySelector('span').innerText = string;
//   };
// };

// timer(new Date('2023/03/03'));

