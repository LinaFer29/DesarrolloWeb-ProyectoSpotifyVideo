console.log("✅ events.js cargado correctamente");

//import Swiper from "swiper";
//import "swiper/css";

function openAndCloseModal() {

  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

}

function loadSwiper() {
  console.log("Swiper cargando...");
  const swiper = new Swiper(".swiper", {
    slidesPerView: 3, // Cantidad de slides visibles
    spaceBetween: 10, // Espacio entre slides
    loop: true, // Repetición infinita
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 2000, // Tiempo entre cada desplazamiento automático
      //disableOnInteraction: false, // 🔹 Permite que siga en auto después de un clic
    },
  });

  console.log("Swiper cargado correctamente", swiper);
}

async function loadCarrouselContent() {
  console.log("cargando videos")

  const swiperWrapperTop = document.querySelector("#top-swiper .swiper-wrapper");
  const swiperWrapperBottom = document.querySelector("#bottom-swiper .swiper-wrapper");
  try {
    const response = await fetch("../resources/videos.json");
    const videos = await response.json();

    swiperWrapperTop.innerHTML = "";

    for (let i = 0; i < 8; i++) {
      const video = videos[i];
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      const img = document.createElement("img");
      img.src = video.thumbnail;
      img.alt = video.title;
      img.dataset.videoId = video.id; // Guardar ID del video para futuras interacciones

      slide.appendChild(img);
      swiperWrapperTop.appendChild(slide);

    }

    for (let i = (videos.length - 1); i >= 8; i--) {
      const video = videos[i];
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      const img = document.createElement("img");
      img.src = video.thumbnail;
      img.alt = video.title;
      img.dataset.videoId = video.id; // Guardar ID del video para futuras interacciones

      slide.appendChild(img);
      swiperWrapperBottom.appendChild(slide);

    }

    console.log("videos:", videos)
  } catch (error) {
    console.error("Error al cargar los videos:", error);
  }

}

function openAndCloseVideoModal() {
  console.log("openAndCloseVideoModal");

  const modal = document.getElementById("videoModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.querySelector("#videoModal .close");

  if (!modal) {
    console.error(" No se encontró el modal");
    return;
  }
  if (!closeModal) {
    console.error(" No se encontró el botón de cierre");
    return;
  }

  document.addEventListener("click", function (event) {
    if (event.target.matches(".swiper-slide img")) {
      console.log(" Imagen clickeada:", event.target.src);

      const videoId = event.target.dataset.videoId; // Usamos el dataset asignado antes

      if (!videoId) {
        console.error("No se pudo obtener el ID del video.");
        return;
      }

      changeVideo(videoId);
      modal.style.display = "flex";
      console.log("Modal abierta con video:", videoId);
    }
  });

  closeModal.addEventListener("click", function () {
    console.log(" Cerrando modal...");
    modal.style.display = "none";
    player.stopVideo();
  });
}


function abrirModal(idModal) {
  document.getElementById(idModal).style.display = "flex";
}

function cerrarModal(idModal) {
  document.getElementById(idModal).style.display = "none";
}

function openAndCloseButtonsModal() {
  // Asigna eventos a los botones
  document.getElementById("btnInicio").addEventListener("click", function () {
    abrirModal("modalInicio");
  });

  document.getElementById("btnBuscar").addEventListener("click", function () {
    abrirModal("modalBuscar");
  });

  document.getElementById("btnLibreria").addEventListener("click", function () {
    abrirModal("modalLibreria");
  });

  document.getElementById("btnCrear").addEventListener("click", function () {
    abrirModal("modalCrear");
  });

  document.getElementById("btnFavoritos").addEventListener("click", function () {
    abrirModal("modalFavoritos");
  });

  // Cerrar modal cuando se haga clic en la "X"
  document.querySelectorAll(".close").forEach(function (btnCerrar) {
    btnCerrar.addEventListener("click", function () {
      cerrarModal(this.parentElement.parentElement.id);
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // Functions to open and close a modal
  await loadCarrouselContent();
  openAndCloseModal();
  loadSwiper();
  openAndCloseVideoModal();
  openAndCloseButtonsModal();

});

let player;
// Cargar la API de YouTube
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-player', {
    height: '360',
    width: '640',
    videoId: '', // No carga video inicialmente
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  console.log("Reproductor listo");
}

function changeVideo(videoId) {
  if (player) {
    player.loadVideoById(videoId);
  } else {
    player = new YT.Player('video-player', {
      height: '360',
      width: '640',
      videoId: videoId
    });
  }
}
