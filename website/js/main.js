import { animeData } from './data.js';
import { renderAnimeList, displayAnimeDetails } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    renderAnimeList(animeData);
});

// Open the menu Icon
document.querySelector(".menu-icon").addEventListener("click", function () {
    var dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});