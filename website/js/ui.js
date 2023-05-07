import { formatDate } from './utils.js';

export function renderAnimeList(animeList) {
    const animeListContainer = document.getElementById('anime-list');
    animeListContainer.innerHTML = '';

    animeList.forEach(anime => {
        const animeBox = document.createElement('div');
        animeBox.classList.add('anime-box');
        const countdown = startCountdown(anime);
        animeBox.appendChild(countdown);

        animeBox.insertAdjacentHTML('beforeend', `
            <img src="${anime.image}" alt="${anime.title} cover image" class="anime-image" />
            <h2>${anime.title}</h2>
            <div class="episode-counter" data-anime-id="${anime.id}">${anime.currentEpisode} / ${anime.totalEpisodes}</div>
        `);

        animeBox.addEventListener('click', () => {
            displayAnimeDetails(anime);
        });

        animeListContainer.appendChild(animeBox);
    });
}
export function displayAnimeDetails(anime) {
    const animeDetails = `
        <h2>${anime.title}</h2>
        <img src="${anime.image}" alt="${anime.title} cover image" />
        <p>Air Date: ${formatDate(anime.airTime)}</p>
        <p>Airing Day: ${anime.airingDay}</p>
        <p>Duration: ${anime.duration} min</p>
        <p>Score: ${anime.score}</p>
        <p>Current Episode: ${anime.currentEpisode} / ${anime.totalEpisodes}</p>
        <p>Synopsis: ${anime.synopsis}</p>
    `;
    const detailsContainer = document.getElementById('anime-details');
    detailsContainer.innerHTML = animeDetails;
    const modal = document.getElementById('anime-modal');
    modal.style.display = "block";
    const closeModal = document.getElementById('close-modal');
    closeModal.onclick = () => {
        modal.style.display = "none";
    }
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}
export function startCountdown(anime) {
    const countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';

    function updateCountdown() {
        const now = new Date().getTime();
        const airTime = new Date(anime.airTime).getTime();
        let distance = airTime - now;

        if (distance <= 0) {
            const nextAirTime = new Date(anime.airTime);
            nextAirTime.setDate(nextAirTime.getDate() + 7);
            anime.airTime = nextAirTime;
            distance = nextAirTime.getTime() - now;

            // Increment currentEpisode by 1 if it's less than totalEpisodes
            if (anime.currentEpisode < anime.totalEpisodes) {
                anime.currentEpisode += 1;
            }
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Next episode in: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Update the episode counter in the DOM
        const episodeCounter = document.querySelector(`.episode-counter[data-anime-id="${anime.id}"]`);
        if (episodeCounter) {
            episodeCounter.textContent = `${anime.currentEpisode} / ${anime.totalEpisodes}`;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    return countdownElement;
}