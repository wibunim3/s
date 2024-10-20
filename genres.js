let animeList = [];
let genreCountMap = {}; // Menyimpan jumlah anime per genre

// Fungsi untuk mengambil data dari file JSON
async function fetchAnimeData() {
    const response = await fetch("animeData.json");
    animeList = await response.json();

    extractGenres();
    displayGenres();
}

// Fungsi untuk mengekstrak semua genre dari data anime dan menghitung jumlahnya
function extractGenres() {
    const genresSet = new Set();

    animeList.forEach(anime => {
        const genres = anime.genre.split(", ").map(g => g.trim());

        // Tambahkan setiap genre ke set dan hitung jumlah anime
        genres.forEach(genre => {
            genresSet.add(genre);
            genreCountMap[genre] = (genreCountMap[genre] || 0) + 1; // Hitung jumlah anime per genre
        });
    });

    genresList = Array.from(genresSet).sort(); // Urutkan genre secara alfabetis
}

// Fungsi untuk menampilkan daftar genre beserta jumlah anime
function displayGenres() {
    const container = document.getElementById("genresContainer");
    container.innerHTML = ""; // Kosongkan kontainer sebelum mengisi data

    genresList.forEach(genre => {
        const genreItem = document.createElement("div");
        genreItem.className = "genre-item";

        // Tampilkan genre dan jumlah anime yang sesuai
        genreItem.innerHTML = `
        <div class="row-cells">
          <div clss="title-cell">
          <span class="dashicons dashicons-arrow-right-alt2"></span>
            <a class="series" href="genre.html?genre=${encodeURIComponent(genre)}">
                ${genre} 
            </a>
            <span class="skoraniser">
            (${genreCountMap[genre]})
            </span>
            </div>
            </div>
        `;

        container.appendChild(genreItem);
    });
}

// Ambil elemen input dan tombol pencarian
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchform");
const searchButton = document.getElementById("searchButton");

// Fungsi untuk melakukan pencarian
function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
}

// Event listener untuk klik tombol pencarian
searchButton.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah form submit default
    performSearch();
});

// Event listener untuk tekan tombol Enter di form
searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form submit default
    performSearch();
});

// Fungsi untuk menampilkan anime yang difilter
function displayFilteredAnime(query) {
    const filteredAnime = animeList.filter(
        anime =>
            anime.title.toLowerCase().includes(query.toLowerCase()) ||
            anime.genre.toLowerCase().includes(query.toLowerCase())
    );

    const container = document.getElementById("animeContainer");
    container.innerHTML = "";

    const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    filteredAnime.slice(startIndex, endIndex).forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="anime-title">${anime.title}</div>
            <div class="anime-info">Genre: ${anime.genre}</div>
            <div class="anime-info">Rating: ${anime.rating}</div>
            <p>${anime.synopsis}</p>
        `;

        // Tambahkan event listener untuk mengalihkan ke halaman detail
        card.addEventListener("click", () => {
            window.location.href = `detail.html?id=${anime.id}`;
        });

        container.appendChild(card);
    });

    // Pagination
    document.getElementById("prevPage").style.display =
        currentPage === 1 ? "none" : "inline";
    document.getElementById("nextPage").style.display =
        currentPage === totalPages ? "none" : "inline";
}

// Panggil fungsi untuk mengambil data saat halaman dimuat
fetchAnimeData();
