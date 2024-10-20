document.addEventListener("DOMContentLoaded", () => {
    const animeCardsContainer = document.getElementById("anime-cards");

    // Fetch data from animeData.json
    fetch("animeData.json")
        .then(response => response.json())
        .then(animeData => {
            // Sort anime data by popularity
            animeData.sort((a, b) => b.member - a.member);

            // Take top 10 anime
            const top10Anime = animeData.slice(0, 12);

            top10Anime.forEach(anime => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                  <div class="bor">
                            <div class="limit">
                    <img src="${anime.image}" alt="${anime.title}">
                    
                    </div>
                    </div>
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
