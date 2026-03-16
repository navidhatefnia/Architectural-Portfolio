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

        const baseName = item.filename.split('.').slice(0, -1).join('.');
        const extension = item.filename.split('.').pop();

        // Potential placeholder paths
        const placeholderPaths = [
            `assets/images/${baseName}_1.jpg`,
            `assets/images/${baseName}_2.jpg`,
            `assets/images/${baseName}_3.jpg`
        ];

        itemElement.innerHTML = `
            <div class="gallery-item-layout">
                <div class="placeholders-column">
                    ${placeholderPaths.map(path => `
                        <div class="placeholder">
                            <img src="${path}" 
                                 onload="this.style.display='block'; this.parentElement.classList.add('has-image')" 
                                 onerror="this.style.display='none'; this.parentElement.classList.remove('has-image')" 
                                 style="display:none;" />
                        </div>
                    `).join('')}
                </div>
                <div class="main-image-container">
                    <img src="assets/images/${item.filename}" alt="${item.title}" loading="lazy" />
                    <div class="item-info">
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                    </div>
                </div>
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll(".gallery-item").forEach(item => {
        observer.observe(item);
    });
});
