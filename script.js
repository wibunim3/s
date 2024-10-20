let itemsPerPage = 20; // Jumlah item per halaman
let displayedItems = 0; // Menyimpan jumlah item yang telah ditampilkan

// Fungsi untuk memuat JSON
async function loadAnimeData() {
    const response = await fetch("animeIndex.json"); // Pastikan path ke file JSON benar
    const data = await response.json();
    return data;
}

// Fungsi untuk menampilkan kartu anime
async function displayAnimeCards() {
    const animeData = await loadAnimeData();
    const animeListContainer = document.getElementById("anime-list");
    const loadMoreButton = document.getElementById("load-more");

    // Menampilkan sebagian data sesuai dengan jumlah displayedItems dan itemsPerPage
    const sliceData = animeData.slice(
        displayedItems,
        displayedItems + itemsPerPage
    );

    sliceData.forEach(anime => {
        // Buat elemen kartu anime
        const animeCard = document.createElement("div");
        animeCard.classList.add("anime-card");

        // Buat isi kartu
        animeCard.innerHTML = `
        <article class="animeseries post-139458">
          <div class="sera">
             <div class="limit">
                <span class="types episodes">
                    <span class="dashicons dashicons-plus-alt"></span>${anime.episode}</span>
                <div class="play">
                    <span class="dashicons dashicons-video-alt3"></span></div>
                <img src="${anime.image}" alt="${anime.title}" width="210" height="210" loading="lazy"/>
                <h3 class="title less nlat entry-title"><span>${anime.title}</span></h3>
            </div>
          </div>
        </article>
        `;

        // Event listener untuk klik kartu, mengarahkan ke halaman video.html dengan episode terakhir
        animeCard.addEventListener("click", function () {
            const lastEpisode = anime.episodes.length; // Mendapatkan episode terakhir
            window.location.href = `video.html?id=${encodeURIComponent(anime.id)}&episode=${lastEpisode}`;
        });

        // Tambahkan kartu ke kontainer
        animeListContainer.appendChild(animeCard);
    });

    // Update jumlah item yang telah ditampilkan
    displayedItems += sliceData.length;

    // Tampilkan atau sembunyikan tombol "Load More" berdasarkan jumlah item yang tersisa
    if (displayedItems < animeData.length) {
        loadMoreButton.style.display = "block";
    } else {
        loadMoreButton.style.display = "none"; // Sembunyikan tombol jika tidak ada lagi data yang dimuat
    }
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

// Event listener untuk tombol "Load More"
document
    .getElementById("load-more")
    .addEventListener("click", displayAnimeCards);

// Panggil fungsi untuk menampilkan kartu anime pertama kali
displayAnimeCards();