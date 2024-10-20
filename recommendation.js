// Fungsi untuk memuat rekomendasi anime berdasarkan genre
async function loadAnimeRecommendations(genre) {
    const response = await fetch("animeData.json");
    const data = await response.json();

    // Filter anime berdasarkan genre yang dipilih
    const filteredAnime = data.filter(anime => anime.genre.includes(genre));

    const recommendationContainer = document.getElementById("recommendation-container");
    recommendationContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan rekomendasi baru

    // Tampilkan anime yang sesuai dengan genre
    filteredAnime.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.className = "anime-card";

        animeCard.innerHTML = `
          <article class="animeseries post-121870">
            <div class="sera">
              <div class="limit">
              <div class="play">
                   <span class="dashicons dashicons-video-alt3"></span></div>
            <img src="${anime.image}" alt="${anime.title}" class="anime-image">
            
            <h4 class="title less nlat entry-title"><span>${anime.title}</span></h4>
            
            
            
              </div>
            </div>
          </article>
        `;

        // Tambahkan event listener untuk mengarahkan ke halaman detail saat kartu anime diklik
        animeCard.addEventListener("click", () => {
            window.location.href = `detail.html?id=${anime.id}`;
        });

        recommendationContainer.appendChild(animeCard);
    });
}

// Fungsi untuk memuat rekomendasi acak saat halaman di-refresh
async function loadRandomRecommendations() {
    const response = await fetch("animeData.json");
    const data = await response.json();

    // Pilih 5 anime secara acak
    const randomAnime = [];
    while (randomAnime.length < 5) {
        const randomIndex = Math.floor(Math.random() * data.length);
        if (!randomAnime.includes(data[randomIndex])) {
            randomAnime.push(data[randomIndex]);
        }
    }

    const recommendationContainer = document.getElementById("recommendation-container");
    recommendationContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan rekomendasi baru

    // Tampilkan anime yang dipilih secara acak
    randomAnime.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.className = "anime-card";

        animeCard.innerHTML = `
           <article class="animeseries post-121870">
            <div class="sera">
              <div class="limit">
              <div class="play">
                   <span class="dashicons dashicons-video-alt3"></span></div>
            <img src="${anime.image}" alt="${anime.title}" class="anime-image">
            
            <h4 class="title less nlat entry-title"><span>${anime.title}</span></h4>
        `;

        // Tambahkan event listener untuk mengarahkan ke halaman detail saat kartu anime diklik
        animeCard.addEventListener("click", () => {
            window.location.href = `detail.html?id=${anime.id}`;
        });

        recommendationContainer.appendChild(animeCard);
    });
}

// Memuat rekomendasi acak saat halaman di-refresh
loadRandomRecommendations();