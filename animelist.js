let itemsPerPage = 12; // Jumlah item per halaman
let currentPage = 1; // Halaman saat ini

// Fungsi untuk memuat JSON
async function loadAnimeData() {
    const response = await fetch("animeData.json"); // Pastikan path ke file JSON benar
    const data = await response.json();
    return data;
}

// Fungsi untuk menampilkan kartu anime berdasarkan halaman
async function displayAnimeCards(page) {
    const animeData = await loadAnimeData();
    const animeListContainer = document.getElementById("anime-list");

    // Bersihkan daftar anime sebelumnya
    animeListContainer.innerHTML = "";

    // Urutkan data anime berdasarkan abjad (title)
    animeData.sort((a, b) => a.title.localeCompare(b.title));

    // Tentukan item mana yang akan ditampilkan berdasarkan halaman saat ini
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = animeData.slice(startIndex, endIndex);

    // Tampilkan anime yang sesuai dengan halaman
    paginatedData.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.classList.add("anime-card");

        // Buat isi kartu
        animeCard.innerHTML = `
            <li>
        <div class="top">
            <img src="${anime.image}" alt="${anime.title}" width="75" height="90" loading="lazy">
            <div class="anime-title"><h3>${anime.title}</h3></div>
            <div class="descs"><p>${anime.synopsis}</p></div
            
            <div class="anime-info">Rating: ${anime.rating}</div>
            
        </div>
            <div class="genrebatas">
              <div class="anime-info"><h5>Genre: ${anime.genre}</h5></div>
            </div>
            <div class="boxinfores">
              <span class="dashicons dashicons-star-empty"></span>
              <span class="nilaiseries">N/A</span>
              <span class="dashicons dashicons-desktop"></span>
              <span class="typeseries">TV</span>
              <span class="rsrated">Fall 2024</span>
            </div>
            </li>
        `;

        // Event listener untuk klik kartu, mengarahkan ke halaman video.html dengan id anime
        animeCard.addEventListener("click", function () {
            window.location.href = `detail.html?id=${encodeURIComponent(anime.id)}`;
        });

        // Tambahkan kartu ke kontainer
        animeListContainer.appendChild(animeCard);
    });

    // Setup pagination
    setupPagination(animeData.length, page);

    // Scroll ke atas setelah klik pagination
    window.scrollTo(0, 0);
}

// Fungsi untuk setup pagination
function setupPagination(totalItems, currentPage) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Tombol Prev
    const prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.disabled = currentPage === 1; // Disable jika di halaman pertama
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayAnimeCards(currentPage);
        }
    });
    paginationContainer.appendChild(prevButton);

    // Tombol-tombol untuk setiap halaman
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("page-button");
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayAnimeCards(currentPage);
        });
        paginationContainer.appendChild(pageButton);
    }

    // Tombol Next
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages; // Disable jika di halaman terakhir
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayAnimeCards(currentPage);
        }
    });
    paginationContainer.appendChild(nextButton);
}

// Fungsi untuk melakukan pencarian
function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
}

// Ambil elemen input dan tombol pencarian
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchform");
const searchButton = document.getElementById("searchButton");

// Event listener untuk klik tombol pencarian
searchButton.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah form submit default
    performSearch();
});

// Event listener untuk tekan tombol Enter di form pencarian
searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form submit default
    performSearch();
});

// Panggil fungsi untuk menampilkan kartu anime pertama kali
displayAnimeCards(currentPage);