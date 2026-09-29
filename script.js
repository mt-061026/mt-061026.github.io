// Основные данные приглашения.
const wedding = {
  firstName: 'Михаил',
  secondName: 'Татьяна',
  namesShort: 'Михаил и Татьяна',
  dateLong: '6 октября 2026',
  dateDay: '06',
  dateMonth: 'Октябрь',
  dateYear: '2026',
  dateNote: 'Вторник · начало в 14:30',
  dateTime: '2026-10-06T14:30:00+03:00',
  venue: 'Артиленд',
  address: 'Балашиха, Новское шоссе, 10, корпус 1',
  mapUrl: 'https://yandex.ru/maps/?text=' + encodeURIComponent('Артиленд, Балашиха, Новское шоссе, 10, корпус 1')
};

for (const element of document.querySelectorAll('[data-edit]')) {
  element.textContent = wedding[element.dataset.edit] ?? '';
}

if (wedding.firstName !== 'Имя' && wedding.secondName !== 'Имя') {
  document.title = `${wedding.firstName} и ${wedding.secondName} — приглашение`;
}

if (wedding.mapUrl) {
  const mapLink = document.querySelector('#map-link');
  mapLink.href = wedding.mapUrl;
  mapLink.removeAttribute('aria-disabled');
  mapLink.target = '_blank';
  mapLink.rel = 'noopener noreferrer';
} else {
  document.querySelector('#map-link').addEventListener('click', event => event.preventDefault());
}

const weddingDate = wedding.dateTime ? new Date(wedding.dateTime) : null;
if (weddingDate && !Number.isNaN(weddingDate.getTime())) {
  const updateCountdown = () => {
    const remaining = Math.max(0, weddingDate.getTime() - Date.now());
    document.querySelector('#days').textContent = String(Math.floor(remaining / 86400000)).padStart(2, '0');
    document.querySelector('#hours').textContent = String(Math.floor(remaining / 3600000) % 24).padStart(2, '0');
    document.querySelector('#minutes').textContent = String(Math.floor(remaining / 60000) % 60).padStart(2, '0');
  };
  updateCountdown();
  setInterval(updateCountdown, 60000);
}
