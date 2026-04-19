import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const form = document.querySelector('.contacts-form');
const email = form.elements.email;
const message = form.elements.message;
const modal = document.querySelector('.contacts-backdrop');
const body = document.querySelector('body');
const closeBtn = document.querySelector('.contacts-modal-btn');
const input = document.querySelector('.form-input');
const correctEmailSvg = document.querySelector('.success-filled');
const errorMessage = document.querySelector('.error-message');
const EMAIL_PATTERN = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

form.addEventListener('submit', submitForm);
modal.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', closeModal);
input.addEventListener('input', checkValidEmail);

async function submitForm(event) {
  event.preventDefault();
  correctEmailSvg.classList.add('visually-hidden');
  if (!isEmailValid(input.value.trim())) {
    errorMessage.classList.remove('visually-hidden');
    input.classList.add('error');
    return;
  }
  try {
    const botToken = '8715031429:AAFEq33qK1rT2ptsz5NW2jrEW2UcUa5h9s0';
    const chatId = '548019148';
    const text = `📩 Новое сообщение с портфолио!\n\n📧 Email: ${input.value.trim()}\n💬 Сообщение: ${message.value.trim()}`;

    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });

    body.classList.add('contacts-no-scroll');
    modal.classList.remove('contacts-is-hidden');
    form.reset();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to send message. Please try again later.',
      position: 'topRight',
    });
    console.log(error);
  }
}

function closeModal(event) {
  if (modal.classList.contains('contacts-is-hidden')) {
    return;
  }
  if (
    event.target === modal ||
    event.currentTarget.nodeName === 'BUTTON' ||
    event.key === 'Escape'
  ) {
    body.classList.remove('contacts-no-scroll');
    modal.classList.add('contacts-is-hidden');
  }
}

function isEmailValid(email) {
  return EMAIL_PATTERN.test(email);
}

function checkValidEmail() {
  errorMessage.classList.add('visually-hidden');
  input.classList.remove('error');
  correctEmailSvg.classList.add('visually-hidden');

  if (isEmailValid(input.value)) {
    correctEmailSvg.classList.remove('visually-hidden');
  }
}
