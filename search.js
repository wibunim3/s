let currentPage = 1;
const itemsPerPage = 10;
let animeList = [];

// Fungsi untuk mengambil data dari file JSON
async function fetchAnimeData() {
    const response = await fetch("animeData.json");
    animeList = await response.json();
    const query = new URLSearchParams(window.location.search).get("query");
    displayFilteredAnime(query);
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
    if (!query) {
        displayAnime(currentPage); // Tampilkan semua jika tidak ada query
        return;
    }

    const filteredAnime = animeList.filter(
        anime =>
            anime.title.toLowerCase().includes(query.toLowerCase()) ||
            anime.genre.toLowerCase().includes(query.toLowerCase())
    );

    const container = document.getElementById("animeContainer");
    container.innerHTML = "";

    if (filteredAnime.length === 0) {
        container.innerHTML = "<p>No anime found for this search.</p>";
        return;
    }

    const totalPages = Math.ceil(filteredAnime.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    filteredAnime.slice(startIndex, endIndex).forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.innerHTML = `
            <li>
                <div>
                    <div class="top">
                        <img src="${anime.image}" alt="${anime.title}" width="75" height="120" loading="lazy">
                        <div class="anime-title"><h2>${anime.title}</h2></div>
                        <div class="descs"><p>${anime.synopsis}</p></div>
                        <div class="anime-info"><h3>Rating: ${anime.rating}</h3>
                        <h3>popularity: ${anime.popularity} </h3></div>
                        <div class="anime-info"><h3>Genre: ${anime.genre}</h3></div>
                    </div>
                </div>
            </li>
        `;

        card.addEventListener("click", () => {
            window.location.href = `detail.html?id=${anime.id}`;
        });

        container.appendChild(card);
    });

    document.getElementById("prevPage").style.display =
        currentPage === 1 ? "none" : "inline";
    document.getElementById("nextPage").style.display =
        currentPage === totalPages ? "none" : "inline";
}

// Navigasi Pagination
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayFilteredAnime(
            new URLSearchParams(window.location.search).get("query")
        );
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(animeList.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayFilteredAnime(
            new URLSearchParams(window.location.search).get("query")
        );
    }
});

// Panggil fungsi untuk mengambil data saat halaman dimuat
fetchAnimeData();