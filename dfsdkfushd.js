document.addEventListener('DOMContentLoaded', function () {
      // Elemen penting
      const welcomeScreen = document.getElementById('welcomeScreen');
      const invitationContainer = document.getElementById('invitationContainer');
      const openBtn = document.getElementById('openInvitation');
      const navbar = document.getElementById('navbar');

      // Musik
      const music = document.getElementById('weddingMusic');
      const musicBtn = document.getElementById('musicToggle');
      const musicIcon = musicBtn ? musicBtn.querySelector('i') : null;
      let isPlaying = false;

      // Baca parameter URL ?nama=...
      function getQueryParam(key) {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
      }
      const namaParam = getQueryParam('nama'); // pakai 'nama' konsisten dgn bahasa Indonesia
      if (namaParam) {
        const decodeNama = decodeURIComponent(namaParam.replace(/\+/g, ' '));
        const guestNameEl = document.getElementById('guestName');
        if (guestNameEl) guestNameEl.textContent = decodeNama;
        // juga isi field form (opsional)
        const namaFormInput = document.getElementById('namaForm');
        if (namaFormInput) namaFormInput.value = decodeNama;
      }

      // Tombol buka undangan
      openBtn.addEventListener('click', async function () {
        // sembunyikan welcome, tampilkan invitation
        welcomeScreen.style.display = 'none';
        invitationContainer.style.display = 'block';
        invitationContainer.classList.add('show-invitation');
        document.body.style.overflow = 'auto';
        navbar.style.display = 'flex';

        // coba mainkan musik (user gesture)
        try {
          await music.play();
          isPlaying = true;
          if (musicIcon) {
            musicIcon.classList.remove('bi-music-note-beamed');
            musicIcon.classList.add('bi-pause-circle');
          }
        } catch (err) {
          // kalau autoplay diblokir, biarkan tanpa error
          console.warn('Music play failed:', err);
        }
      });

      // Toggle musik dari navbar
      if (musicBtn) {
        musicBtn.addEventListener('click', async function (e) {
          e.preventDefault();
          if (!isPlaying) {
            try {
              await music.play();
              isPlaying = true;
              musicBtn.classList.add('playing');
              if (musicIcon) { musicIcon.classList.remove('bi-music-note-beamed'); musicIcon.classList.add('bi-pause-circle'); }
            } catch (err) {
              console.warn('Music play failed:', err);
            }
          } else {
            music.pause();
            isPlaying = false;
            musicBtn.classList.remove('playing');
            if (musicIcon) { musicIcon.classList.remove('bi-pause-circle'); musicIcon.classList.add('bi-music-note-beamed'); }
          }
        });
      }

      // Form submit (Google Apps Script)
      const form = document.getElementById('my-form');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          const data = new FormData(form);
          const action = form.action;
          fetch(action, {
            method: 'POST',
            body: data
          })
            .then(() => {
              alert('Konfirmasi berhasil dikirim. Terima kasih!');
              form.reset();
            })
            .catch(err => {
              console.error(err);
              alert('Terjadi kesalahan. Silakan coba lagi.');
            });
        });
      }

      // Fade on scroll
      const fadeElements = document.querySelectorAll('.fade-scroll');
      function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        fadeElements.forEach(el => {
          const elementTop = el.getBoundingClientRect().top;
          if (elementTop < triggerBottom) el.classList.add('active'); else el.classList.remove('active');
        });
      }
      window.addEventListener('scroll', checkScroll);
      checkScroll();

      // Countdown ke 6 Desember 2025 pukul 11:00 WIB
      const targetDate = new Date('Dec 06, 2025 11:00:00 GMT+0700').getTime();

      function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
          document.getElementById('days').textContent = '00';
          document.getElementById('hours').textContent = '00';
          document.getElementById('minutes').textContent = '00';
          document.getElementById('seconds').textContent = '00';
          clearInterval(countdownInterval);
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
      }

      const countdownInterval = setInterval(updateCountdown, 1000);
      updateCountdown(); // panggil sekali saat load

      // Gallery popup
      window.openFull = function (img) {
        const popup = document.getElementById('popupFoto');
        const popupImg = document.getElementById('popupImg');
        popupImg.src = img.src;
        popup.style.display = 'flex';
        popup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };
      window.closeFull = function () {
        const popup = document.getElementById('popupFoto');
        popup.style.display = 'none';
        popup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
      };

      // Copy rekening
  // Data rekening bisa kamu ubah dari sini
  const rekening = {
    number: "1600004460172",
    name: "Paulus Panunggul Yudho Widodo Purba"
  };

  // Ambil elemen HTML
  const accountNumber = document.getElementById("accountNumber");
  const accountName = document.getElementById("accountName");
  const copyButton = document.getElementById("copyButton");

  // Isi otomatis dari JS
  accountNumber.textContent = rekening.number;
  accountName.textContent = rekening.name;

  // Fungsi untuk copy text
  copyButton.addEventListener("click", function() {
    navigator.clipboard.writeText(rekening.number);
    copyButton.textContent = "Copied!";
    setTimeout(() => copyButton.textContent = "Copy", 1500);
  });



    });