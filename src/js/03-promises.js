import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }, delay);
  });
};

     function onFormSubmit (event) {
        event.preventDefault();
const {delay, step, amount} = event.currentTarget;
const delayValue = Number(delay.value.trim());
const stepValue = Number(step.value.trim());
const amountValue = Number(amount.value.trim());
let totalDelay = 0;

for (let i = 1; i <= amountValue; i++) {
  totalDelay = delayValue + stepValue * (i-1); 
  createPromise(i, totalDelay)
  .then(resolve => Notify.success(resolve))
  .catch(reject => Notify.failure(reject));
};
};