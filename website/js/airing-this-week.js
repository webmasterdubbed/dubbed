
import { animeData } from './data.js';
import { formatDate } from './utils.js';
import { displayAnimeDetails, startCountdown } from './ui.js';

function createAiringThisWeekList(animeData) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    daysOfWeek.forEach(day => {
        const dayBox = document.getElementById(day);
        dayBox.innerHTML = `<h2>${day}</h2>`;

        const dayAnimeList = animeData.filter(anime => anime.airingDay === day);

        dayAnimeList.forEach(anime => {
            const animeBox = document.createElement('div');
            animeBox.classList.add('anime-box');

            const countdown = startCountdown(anime);
            animeBox.appendChild(countdown);

            animeBox.insertAdjacentHTML('beforeend', `
                <img src="${anime.image}" alt="${anime.title} cover image" class="anime-image" />
                <h3>${anime.title}</h3>
                <div class="episode-counter">${anime.currentEpisode} / ${anime.totalEpisodes}</div>
            `);

            animeBox.addEventListener('click', () => {
                displayAnimeDetails(anime);
            });

            dayBox.appendChild(animeBox);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createAiringThisWeekList(animeData);
});