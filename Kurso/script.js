let albums = [];

// Функція для завантаження даних
async function loadAlbums() {
    try {
        const response = await fetch('12-albums.json');
        albums = await response.json();
        displayAlbums(albums);
        populateFilters();
    } catch (error) {
        console.error('Помилка завантаження даних:', error);
    }
}

// Відображення альбомів
function displayAlbums(albumsToDisplay) {
    const albumCards = document.getElementById('albumCards');
    albumCards.innerHTML = '';
    albumsToDisplay.forEach(album => {
        const card = document.createElement('div');
        card.className = 'album-card';
        card.innerHTML = `
            <img src="${album.coverUrl}" alt="${album.title}" style="width:100%">
            <h3>${album.title}</h3>
            <p>${album.artist}</p>
            <p>${album.genre}</p>
            <p>${album.releaseYear}</p>
        `;
        card.onclick = () => openModal(album);
        albumCards.appendChild(card);
    });
}

// Заповнення фільтрів
function populateFilters() {
    const genres = [...new Set(albums.map(album => album.genre))];
    const artists = [...new Set(albums.map(album => album.artist))];

    const genreFilter = document.getElementById('genreFilter');
    const artistFilter = document.getElementById('artistFilter');

    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });

    artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist;
        option.textContent = artist;
        artistFilter.appendChild(option);
    });

    genreFilter.onchange = filterAlbums;
    artistFilter.onchange = filterAlbums;
    document.getElementById('search').oninput = filterAlbums;
    document.getElementById('yearFilter').oninput = filterAlbums;
    document.getElementById('sortAsc').onclick = () => sortAlbums('asc');
    document.getElementById('sortDesc').onclick = () => sortAlbums('desc');
}

// Фільтрація альбомів
function filterAlbums() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const genreValue = document.getElementById('genreFilter').value;
    const artistValue = document.getElementById('artistFilter').value;
    const yearValue = document.getElementById('yearFilter').value;

    const filteredAlbums = albums.filter(album => {
        return (album.title.toLowerCase().includes(searchValue) || 
                album.artist.toLowerCase().includes(searchValue)) &&
               (genreValue ? album.genre === genreValue : true) &&
               (artistValue ? album.artist === artistValue : true) &&
               (yearValue ? album.releaseYear === parseInt(yearValue) : true);
    });

    displayAlbums(filteredAlbums);
}

// Сортування альбомів
function sortAlbums(order) {
    const sortedAlbums = [...albums].sort((a, b) => {
        return order === 'asc' ? a.releaseYear - b.releaseYear : b.releaseYear - a.releaseYear;
    });
    displayAlbums(sortedAlbums);
}

// Відкриття модального вікна
function openModal(album) {
    document.getElementById('modalTitle').textContent = album.title;
    document.getElementById('modalTracks').textContent = `Треки: ${album.tracks.join(', ')}`;
    document.getElementById('albumModal').style.display = 'flex';
}

// Закриття модального вікна
document.getElementById('closeModal').onclick = () => {
    document.getElementById('albumModal').style.display = 'none';
};

// Завантаження альбомів при завантаженні сторінки
window.onload = loadAlbums;
