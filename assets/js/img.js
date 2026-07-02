let images = [];
let modalInstance;
let carouselInstance;

document.addEventListener("DOMContentLoaded", () => {

    modalInstance = new bootstrap.Modal(document.getElementById("imageModal"));
    carouselInstance = new bootstrap.Carousel(document.getElementById("galleryCarousel"), {
        interval: false,
        wrap: true
    });

    fetch("imagedata.json")
        .then(res => res.json())
        .then(data => {
            buildGallery(data);
            buildCarousel();
        });

});

/* ---------------------------
   BUILD GALLERY
---------------------------- */
function buildGallery(data) {

    const gallery = document.getElementById("gallery");

    Object.entries(data).forEach(([folder, imgs]) => {

        const section = document.createElement("div");
        section.className = "mb-4 mb-md-5";

        section.innerHTML = `
            <h5 class="mb-3">
                <span class="badge bg-success-subtle text-success px-3 py-2">
                    ${folder}
                </span>
            </h5>
        `;

        const row = document.createElement("div");

        // RESPONSIVE FIX (important)
        row.className = "row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3";

        imgs.forEach(img => {

            const fullPath = `assets/images/${img}`;
            const index = images.length;

            images.push(fullPath);

            const col = document.createElement("div");

            col.innerHTML = `
                <div class="card border-0 shadow-sm h-100"
                     role="button"
                     onclick="openModal(${index})">

                    <img src="${fullPath}"
                         class="img-fluid rounded"
                         style="aspect-ratio: 1/1; object-fit: cover;"
                         loading="lazy"
                         alt="gallery">

                </div>
            `;

            row.appendChild(col);
        });

        section.appendChild(row);
        gallery.appendChild(section);
    });
}

/* ---------------------------
   BUILD CAROUSEL
---------------------------- */
function buildCarousel() {

    const inner = document.getElementById("carouselInner");
    inner.innerHTML = "";

    images.forEach((src, i) => {

        const item = document.createElement("div");
        item.className = "carousel-item" + (i === 0 ? " active" : "");

        item.innerHTML = `
            <div class="d-flex justify-content-center align-items-center bg-dark"
                 style="height:80vh;">

                <img src="${src}"
                     class="img-fluid"
                     style="max-height:75vh; object-fit:contain;"
                     alt="preview">

            </div>
        `;

        inner.appendChild(item);
    });
}

/* ---------------------------
   OPEN MODAL
---------------------------- */
function openModal(index) {
    modalInstance.show();

    setTimeout(() => {
        carouselInstance.to(index);
    }, 120);
}