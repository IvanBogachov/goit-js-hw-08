import { throttle } from "lodash";

let getEL = selector => document.querySelector(selector)

const form = getEL('.feedback-form');
const email = getEL('input[name="email"]');
const message = getEL('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener(
    'input',
    throttle(e => {
        const objectToSave = { email: email.value, message: message.value };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
    }, 500
    )
);

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log({ email: email.value, message: message.value });
    form.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
 }

)

const load = key => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error('Get state error: ', error.message);
    }
};

const storageData = load(LOCALSTORAGE_KEY);
if (storageData) {
    email.value = storageData.email;
    message.value = storageData.message;
};