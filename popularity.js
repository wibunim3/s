document.addEventListener("DOMContentLoaded", () => {
    const animeCardsContainer = document.getElementById("anime-cards");

    // Fetch data from animeData.json
    fetch("animeData.json")
        .then(response => response.json())
        .then(animeData => {
            // Sort anime data by popularity
            animeData.sort((a, b) => b.popularity - a.popularity);

            // Take top 10 anime
            const top10Anime = animeData.slice(0, 10);

            top10Anime.forEach(anime => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                  <li class="fullwdth">
                  <div class="top">
                    <img src="${anime.image}" width="95"
                                    height="95"
                                    alt="${anime.title}"
                                    loading="lazy">

                        <h4>${anime.title}</h4>
                        
                        <div class="descs">
                        <p>${anime.synopsis.substring(0, 100)}...</p></div>
                        <div class="boxinfores">
                                <span
                                    class="dashicons dashicons-star-empty"
                                ></span>
                                <span class="nilaiseries">${
                                    anime.rating
                                }</span>
                            <span class="popularity">Popularity: ${
                            anime.popularity
                        }</span>
                        
                        </div>
                        <span class="genrebatas"
                                ><span class="genre">Genre: ${
                                    anime.genre
                                }</span></span
                            >
                        
                    </div>
                    </li>
                `;
                
                        // Tambahkan event listener untuk mengalihkan ke halaman detail
        card.addEventListener("click", () => {
            window.location.href = `detail.html?id=${anime.id}`;
        });
                
                animeCardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching anime data:", error));
});
