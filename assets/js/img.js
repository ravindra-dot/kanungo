let images = [];
let modalInstance;
let carouselInstance;
function prepareImages(data) {
  images = [];

  Object.values(data).forEach((activity) => {
    activity.images.forEach((img) => {
      images.push({
        src: `assets/images/${img}`,
        title: activity.title,
        description: activity.description,
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  modalInstance = new bootstrap.Modal(document.getElementById("imageModal"));

  carouselInstance = new bootstrap.Carousel(
    document.getElementById("galleryCarousel"),
    {
      interval: false,
      wrap: true,
    },
  );

  fetch("imagedata.json")
    .then((res) => res.json())
    .then((data) => {
      // buildGallery(data);
      prepareImages(data);
      buildCarousel();
    });
});

/* ---------------------------
   BUILD GALLERY
---------------------------- */

// function buildGallery(data) {

//     // const gallery = document.getElementById("gallery");
//     const Independence_Day = document.getElementById("1");
//     const Dusshera = document.getElementById("2");
//     const Cricket_Tournament = document.getElementById("3");
//     const Dahi_Handi = document.getElementById("4");

//     Object.entries(data).forEach(([key, activity]) => {

//         const section = document.createElement("div");
//         section.className = "mb-5";

//         section.innerHTML = `
//             <div class="mb-3 text-center">

//                 <h3 class="fw-bold" id="${activity.title}">
//                     ${activity.title}
//                 </h3>

//                 <p class="text-secondary">
//                     ${activity.description}
//                 </p>

//             </div>
//         `;

//         const row = document.createElement("div");
//         row.className = "row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3";

//         activity.images.forEach(img => {

//             const fullPath = `assets/images/${img}`;

//             const index = images.length;

//             images.push({
//                 src: fullPath,
//                 title: activity.title,
//                 description: activity.description
//             });

//             const col = document.createElement("div");

//             col.className = "col";

//             col.innerHTML = `
//                 <div class="card border-0 shadow-sm h-100"
//                      role="button"
//                      onclick="openModal(${index})">

//                     <img src="${fullPath}"
//                          class="img-fluid rounded"
//                          loading="lazy"
//                          style="aspect-ratio:1/1;object-fit:cover;">

//                 </div>
//             `;

//             row.appendChild(col);

//         });

//         section.appendChild(row);

//         // gallery.appendChild(section);
//         if (key ==="15-august"){
//             Independence_Day.append(section);
//         }
//         else if(key ==="Dusshera"){
//             Dusshera.append(section);
//         }
//         else if(key ==="Cricket-Tournament"){
//             Cricket_Tournament.append(section);
//         }
//         else if(key ==="DAHI-HANDI"){
//             Dahi_Handi.append(section);
//         };

//     });

// }

/* ---------------------------
   BUILD CAROUSEL
---------------------------- */

function buildCarousel() {
  const inner = document.getElementById("carouselInner");

  inner.innerHTML = "";

  images.forEach((image, i) => {
    const item = document.createElement("div");

    item.className = "carousel-item" + (i === 0 ? " active" : "");

    item.innerHTML = `

        <div class="d-flex flex-column justify-content-center align-items-center bg-dark"
             style="height:80vh;">

            <img src="${image.src}"
                 class="img-fluid"
                 style="max-height:70vh;object-fit:contain;"
                 alt="${image.title}">

            <div class="text-center text-white mt-3 px-3">
                <h4>${image.title}</h4>
            </div>
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
