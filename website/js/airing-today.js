// js/airing-today.js
import { animeData } from './data.js';
import { formatDate } from './utils.js';
import { displayAnimeDetails, startCountdown } from './ui.js';

function getToday() {
    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[today.getDay()];
}

export function createAiringTodayList(animeData) {
    const today = getToday();
    const airingTodayList = animeData.filter(anime => anime.airingDay === today);

    const airingTodayContainer = document.getElementById('airing-today-list');
    airingTodayContainer.innerHTML = '';

    airingTodayList.forEach(anime => {
        const animeBox = document.createElement('div');
        animeBox.classList.add('anime-box');

        const countdown = startCountdown(anime);
        animeBox.appendChild(countdown);

        animeBox.insertAdjacentHTML('beforeend', `
            <img src="${anime.image}" alt="${anime.title} cover image" class="anime-image" />
            <h2>${anime.title}</h2>
            <div class="episode-counter">${anime.currentEpisode} / ${anime.totalEpisodes}</div>
        `);

        animeBox.addEventListener('click', () => {
            displayAnimeDetails(anime);
        });

        airingTodayContainer.appendChild(animeBox);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createAiringTodayList(animeData);
});

document.addEventListener('DOMContentLoaded', () => {
    createAiringTodayList(animeData);
});

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDate = new Date();
const dayOfWeek = days[currentDate.getDay()];
document.getElementById('day-of-week').innerHTML = dayOfWeek;

