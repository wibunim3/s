// Fungsi untuk mendapatkan query parameter dari URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fungsi untuk memuat detail anime berdasarkan ID
async function loadAnimeDetail() {
    const animeId = getQueryParam("id");
    const response = await fetch("animeData.json");
    const data = await response.json();

    // Cari anime berdasarkan ID
    const anime = data.find(anime => anime.id === animeId);

    if (anime) {
        // Tampilkan detail anime

        const animeDetail = document.getElementById("anime-detail");

        // Pecah genre menjadi array dan buat setiap genre menjadi tautan
        const genreLinks = anime.genre
            .split(", ")
            .map(
                genre =>
                    `<a href="genre.html?genre=${encodeURIComponent(
                        genre
                    )}">${genre}</a>`
            )
            .join(" ");
        // Tautan ke episode pertama dan terakhir
        const firstEpisodeUrl = `video.html?id=${encodeURIComponent(
            animeId
        )}&episode=1`;
        const lastEpisodeUrl = `video.html?id=${encodeURIComponent(
            animeId
        )}&episode=${anime.episodes.length}`;

        animeDetail.innerHTML = `
        <nav class="bottomtitle breadcrumbs"></nav>
        <h1 class="entry-title cs">${anime.title}</h1>
        <div class="kotakseries">
          <div class="poster">
            <img src="${anime.image}" alt="${anime.title}">
          </div>
          <div class="data">
            <div class="extra">
            <span class="statusseries">Currently Airing</span>
            <span class="durasiseries">${anime.totalepisode} : Episode</span>
            <span class="ratedseries">PG-13 - Teens 13 or older</span>
            <span class="dateseries">Tahun: ${anime.summer}</span></div>
            <div class="scoreseries"><span class="dashicons dashicons-star-empty"></span>
              <span class="nilaiseries">${anime.rating}</span>
              <span class="typeseries">${anime.type}</span></div>
               <div class="sys">
               
               <div class="latestest">
               <div class="latestheader">Episode Pertama</div>
               <div class="latestepisode">
               <a href="${lastEpisodeUrl}">Episode ${anime.episode}</a></div>
               </div>
               
               <div class="latestest">
               <div class="latestheader">Episode Terakhir</div>
               <div class="latestepisode">
               <a href="${firstEpisodeUrl}">Episode 1</a></div>
               </div>
               
               <div class="tagline">${genreLinks}</div>
               <div class="clear"></div>
               <div class="bottomtitle">
               <span class="entry-author author"> <span class="dashicons dashicons-admin-users fn"></span> <strong class="fn">WibuNim3</strong></span>
               <span class="dashicons dashicons-clock"></span>
               <span class="updated">${anime.summer}</span></div>
            </div>
          </div>
          
          <div class="bottomtitle">
          <span class="infoseries"><b>Popularity:</b> ${anime.popularity}</span>
          <span class="infoseries"><b>Members:</b> ${anime.member}</span>
          <span class="infoseries"><b>Duration:</b> ${anime.durasi}</span>
          </div>
         </div>
         
         <div class="entry-content seriesdesc"><h2 class="bold"><strong>Synopsis:</strong></h2><br> ${anime.synopsis}</div>
         <div class="clear"></div>
         
         <div class="episodelist">
         <div class="top">
         <span class="t1"><span class="dashicons dashicons-sort"></span> Daftar Episode</span></div>
         <ul class="misha_posts_wrap2"><li>
         <span class="t1">
         <ul id="episode-list"></ul>
         </span></li></ul></div>
         
         <p><strong>Total Episodes:</strong> </p>
            `;

        // Tampilkan daftar episode
        displayEpisodes(anime.episodes);
    } else {
        document.getElementById(
            "anime-detail"
        ).innerHTML = `<p>Anime not found.</p>`;
    }
}

// Fungsi untuk menampilkan daftar episode
// Fungsi untuk menampilkan daftar episode
function displayEpisodes(episodes) {
    const episodeList = document.getElementById("episode-list");
    episodeList.innerHTML = "<h3>Episodes:</h3>";

    // Balik urutan episode agar episode terakhir ada di atas
    episodes.reverse().forEach((episode, index) => {
        const episodeItem = document.createElement("li");
        episodeItem.textContent = episode.title;
        
        // Redirect ke halaman video dengan ID anime dan episode yang dipilih
        episodeItem.addEventListener("click", () => {
            window.location.href = `video.html?id=${encodeURIComponent(
                getQueryParam("id")
            )}&episode=${episodes.length - index}`;
        });
        
        episodeList.appendChild(episodeItem);
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

// Panggil fungsi untuk memuat detail anime
loadAnimeDetail();
