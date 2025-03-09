console.log("✅ events.js cargado correctamente");

//import Swiper from "swiper";
//import "swiper/css";
document.addEventListener('DOMContentLoaded', () => {

  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      const target = el.dataset.target;
      const $target = document.getElementById(target);

      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});

document.addEventListener('DOMContentLoaded', () => {
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
});

document.addEventListener("DOMContentLoaded", function () {
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
});




document.addEventListener("DOMContentLoaded", function () {
  console.log("Script cargado correctamente");

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

  document.querySelectorAll(".swiper-slide img").forEach(img => {
    img.addEventListener("click", function () {
      console.log(" Imagen clickeada:", img.src);
      // Obtener el ID del video desde la URL de la imagen de miniatura
      const videoId = img.src.split("/vi/")[1].split("/")[0];
      // Cambiar el video en el iframe
      changeVideo(videoId);
      if (!modal) {
        console.error("No se encontró el modal con id 'videoModal'");
        return;
      }
      modal.style.display = "flex";
      //modal.classList.add("is-active");
      console.log("Modal abierta con video:", videoId);
    });
  });


  closeModal.addEventListener("click", function () {
    console.log(" Cerrando modal...");
    modal.style.display = "none";
    player.stopVideo();
  });

  // modal.addEventListener("click", function (event) {
  //   if (event.target === modal) {
  //     console.log(" Cerrando modal por clic fuera...");
  //     modal.style.display = "none";
  //     player.stopVideo();
  //   }
  // });
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


