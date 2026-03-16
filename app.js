document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("gallery");

    if (typeof portfolioData === 'undefined' || !Array.isArray(portfolioData)) {
        console.error("No valid portfolioData found in data.js");
        return;
    }

    // Generate gallery items
    portfolioData.forEach((item) => {
        const itemElement = document.createElement("article");
        itemElement.classList.add("gallery-item");

        itemElement.innerHTML = `
            <img src="assets/images/${item.filename}" alt="${item.title}" loading="lazy" />
            <div class="item-info">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>
        `;
        galleryContainer.appendChild(itemElement);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when out of view to allow re-animation when scrolling back up
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach(item => {
        observer.observe(item);
    });
});
