const themeSwitch = document.querySelector("#checkbox");
        const body = document.body;

        // Check if user has a theme preference in localStorage
        if (localStorage.getItem("darkMode") === "enabled") {
            body.classList.add("dark-theme");
            themeSwitch.checked = true;
        }

        themeSwitch.addEventListener("change", function () {
            if (this.checked) {
                body.classList.add("dark-theme");
                localStorage.setItem("darkMode", "enabled");
            } else {
                body.classList.remove("dark-theme");
                localStorage.setItem("darkMode", "disabled");
            }
        });