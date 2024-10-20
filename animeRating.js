document.addEventListener("DOMContentLoaded", () => {
    const animeCardsContainer = document.getElementById("anime-rating");

    // Fetch data from animeData.json
    fetch("animeData.json")
        .then(response => response.json())
        .then(animeData => {
            // Sort anime data by popularity
            animeData.sort((a, b) => b.rating - a.rating);

            // Take top 10 anime
            const top10Anime = animeData.slice(0, 7);

            top10Anime.forEach(anime => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                <li>
                  <div class="lefts"><h4>${anime.title}</h4></div>
                  
                  <div class="rights">
                     <span class="video"># ${anime.rating}</span>
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
