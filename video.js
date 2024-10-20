// Fungsi untuk mendapatkan query parameter dari URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fungsi untuk memuat data episode berdasarkan ID anime dan nomor episode
async function loadEpisodeData() {
    const animeId = getQueryParam("id");
    const episodeNumber = getQueryParam("episode");
    const response = await fetch("animeData.json");
    const data = await response.json();

    // Cari anime berdasarkan ID
    const anime = data.find(anime => anime.id === animeId);

    if (anime) {
        const episode = anime.episodes[episodeNumber - 1];
        if (episode) {
            displayServers(episode.videoUrl);
            
            // Muat server pertama secara otomatis
            loadVideo(episode.videoUrl[Object.keys(episode.videoUrl)[0]]);

            // Tampilkan judul dan gambar episode di atas video
            document.getElementById("episode-title").textContent = episode.title;
            document.getElementById("anime-title").textContent = anime.title;
            document.getElementById("episode-image").src = anime.images;

            // Tampilkan navigasi episode di bawah video
            displayEpisodeNavigation(anime);

            // Tambahkan tautan untuk kembali ke halaman detail
            const backButtonContainer = document.getElementById("back-button-container");
            const backLink = document.createElement("a");
            backLink.href = `detail.html?id=${encodeURIComponent(animeId)}`;
            backLink.textContent = "All Episode";
            backLink.className = "back-link"; // Tambahkan kelas CSS jika diperlukan
            backButtonContainer.appendChild(backLink);
        }
    } else {
        document.getElementById("video-container").innerHTML =
            "<p>Anime tidak ditemukan.</p>";
    }
}

// Fungsi untuk menampilkan server-server yang tersedia
function displayServers(servers) {
    const serverNavigation = document.getElementById("server-navigation");
    serverNavigation.innerHTML = "";

    // Simpan elemen server yang aktif saat ini
    let activeServer = null;

    // Iterasi server dan buat elemen div sebagai tombol yang dapat diklik
    Object.keys(servers).forEach(serverName => {
        const serverDiv = document.createElement("div");
        serverDiv.className = `server-div ${serverName.toLowerCase()}`; // Gunakan nama server sebagai class
        serverDiv.id = `server-${serverName.toLowerCase()}`; // Gunakan nama server sebagai ID
        serverDiv.textContent = serverName;

        // Tambahkan event listener agar elemen bisa diklik
        serverDiv.addEventListener("click", () => {
            loadVideo(servers[serverName]);

            // Hapus kelas active dari server sebelumnya, tambahkan ke yang baru
            if (activeServer) {
                activeServer.classList.remove("active");
            }
            serverDiv.classList.add("active");
            activeServer = serverDiv; // Update server yang aktif
        });

        // Tambahkan elemen div ke dalam kontainer
        serverNavigation.appendChild(serverDiv);
    });

    // Set default server pertama sebagai aktif
    const firstServer = serverNavigation.firstChild;
    if (firstServer) {
        firstServer.classList.add("active");
        loadVideo(servers[firstServer.textContent]);
        activeServer = firstServer;
    }
}

// Fungsi untuk memuat video di iframe
function loadVideo(url) {
    const videoPlayer = document.getElementById("video-player");
    videoPlayer.src = url;
}

// Fungsi untuk menampilkan navigasi episode
function displayEpisodeNavigation(anime) {
    const episodeNavigation = document.getElementById("episode-navigation");
    episodeNavigation.innerHTML = "<h3Episodes:</h3>";

    // Iterasi setiap episode dan buat tombol navigasi
    anime.episodes.forEach((episode, index) => {
        const episodeButton = document.createElement("li");
        episodeButton.textContent = `Ep ${index + 1}`;
        episodeButton.className = "episode-button";
        episodeButton.addEventListener("click", () => {
            window.location.href = `video.html?id=${encodeURIComponent(
                anime.id
            )}&episode=${index + 1}`;
        });
        episodeNavigation.appendChild(episodeButton);
    });

    // Setup prev/next navigation
    const currentEpisodeNumber = parseInt(getQueryParam("episode"), 10);
    setupNavigation(anime.episodes, currentEpisodeNumber);
}

// Fungsi untuk setup navigasi antar episode berdasarkan nomor
function setupNavigation(episodes, currentEpisodeNumber) {
    const prevLink = document.getElementById("prev-episode");
    const nextLink = document.getElementById("next-episode");

    // Navigasi episode sebelumnya
    if (currentEpisodeNumber > 1) {
        prevLink.href = `video.html?id=${getQueryParam("id")}&episode=${currentEpisodeNumber - 1}`;
    } else {
        prevLink.href = "#"; // Tidak aktif jika di episode pertama
        prevLink.classList.add("disabled"); // Tambahkan kelas untuk menonaktifkan
    }

    // Navigasi episode berikutnya
    if (currentEpisodeNumber < episodes.length) {
        nextLink.href = `video.html?id=${getQueryParam("id")}&episode=${currentEpisodeNumber + 1}`;
    } else {
        nextLink.href = "#"; // Tidak aktif jika di episode terakhir
        nextLink.classList.add("disabled"); // Tambahkan kelas untuk menonaktifkan
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

// Panggil fungsi untuk memuat data episode
loadEpisodeData();