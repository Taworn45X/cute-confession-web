// ========================================================
// 💖 CUTE CONFESSION WEB - BULLETPROOF SCRIPT 💖
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const storyCard = document.getElementById("storyCard");
  const slideClickArea = document.getElementById("slideClickArea");
  const slideBadge = document.getElementById("slideBadge");
  const slideImage = document.getElementById("slideImage");
  const imageSkeleton = document.getElementById("imageSkeleton");
  const slideTitle = document.getElementById("slideTitle");
  const slideHighlight = document.getElementById("slideHighlight");
  const slideSubtext = document.getElementById("slideSubtext");
  const trollProps = document.getElementById("trollProps");
  const choiceContainer = document.getElementById("choiceContainer");
  const catPointerBox = document.getElementById("catPointerBox");
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const btnYesText = document.getElementById("btnYesText");
  const btnNoText = document.getElementById("btnNoText");
  const choiceTip = document.getElementById("choiceTip");
  
  // Progress & dots
  const progressBars = document.querySelectorAll(".progress-segment");
  const footerDots = document.querySelectorAll(".footer-dots .dot");
  
  // Audio & Music
  const musicWidget = document.getElementById("musicWidget");
  const bgmAudio = document.getElementById("bgmAudio");

  // Punch Overlay
  const punchOverlay = document.getElementById("punchOverlay");
  const punchBubble = document.getElementById("punchBubble");
  const btnPunchOk = document.getElementById("btnPunchOk");

  // Ending Overlay
  const endingOverlay = document.getElementById("endingOverlay");
  const kanekiImg = document.getElementById("kanekiImg");
  const contractSender = document.getElementById("contractSender");
  const contractReceiver = document.getElementById("contractReceiver");
  const btnLineShare = document.getElementById("btnLineShare");
  const btnReplay = document.getElementById("btnReplay");

  // Optional elements (guarded)
  const btnTogglePose = document.getElementById("btnTogglePose");
  const contractDate = document.getElementById("contractDate");
  const contractQuote = document.getElementById("contractQuote");

  // QR Modal
  const qrPill = document.getElementById("qrPill");
  const qrModal = document.getElementById("qrModal");
  const btnCloseQr = document.getElementById("btnCloseQr");

  // State
  let currentSlide = 0;
  let noClickCount = 0;
  let isAudioPlaying = false;
  let audioContext = null;
  let currentPoseIndex = 0;

  // Setup BGM URL
  if (CONFIG.bgmUrl) {
    bgmAudio.src = CONFIG.bgmUrl;
  }

  function triggerHaptic(pattern) {
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  // ==========================================
  // ✨ SUBTLE TAP RIPPLE & MINI PARTICLES
  // ==========================================
  function createTapEffect(x, y) {
    const ripple = document.createElement("div");
    ripple.className = "tap-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    const heartSymbols = ["💖", "✨", "🌸", "🤍"];
    for (let i = 0; i < 2; i++) {
      const heart = document.createElement("div");
      heart.className = "touch-heart";
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      const offsetX = (Math.random() - 0.5) * 35;
      const offsetY = (Math.random() - 0.5) * 25;
      heart.style.left = `${x + offsetX}px`;
      heart.style.top = `${y + offsetY}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 750);
    }
  }

  window.addEventListener("pointerdown", (e) => {
    createTapEffect(e.clientX, e.clientY);
  });

  // ==========================================
  // 🔊 WEB AUDIO API SYNTHESIZER
  // ==========================================
  function initAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume();
    }
  }

  function playPopSound() {
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      const now = audioContext.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  function playPunchSound() {
    if (!audioContext) return;
    try {
      const now = audioContext.currentTime;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);
      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.26);

      const bufferSize = audioContext.sampleRate * 0.08;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioContext.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = audioContext.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 1000;
      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      noise.start(now);
    } catch (e) {}
  }

  function playAnimeDramaticSound() {
    if (!audioContext) return;
    try {
      const now = audioContext.currentTime;
      const freqs = [130.81, 155.56, 196.00, 246.94, 392.00];
      freqs.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + 1.2);
        
        const filter = audioContext.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, now);
        filter.frequency.exponentialRampToValueAtTime(400, now + 1.2);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now + idx * 0.03);
        osc.stop(now + 1.5);
      });
    } catch (e) {}
  }

  function playVictoryFanfare() {
    if (!audioContext) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        const time = audioContext.currentTime + 0.3 + i * 0.12;
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(time);
        osc.stop(time + 0.55);
      });
    } catch (e) {}
  }

  // ==========================================
  // 🎵 MUSIC TOGGLE & SYNTHESIZER FALLBACK
  // ==========================================
  let musicBoxInterval = null;
  let isMusicBoxPlaying = false;

  function startMusicBoxBgm() {
    if (isMusicBoxPlaying || !audioContext) return;
    isMusicBoxPlaying = true;
    musicWidget.classList.add("playing");
    isAudioPlaying = true;

    // Sweet romantic Kalimba/Music-box chord progression:
    // Cmaj7 -> Am7 -> Fadd9 -> G
    const melody = [
      { notes: [261.63, 329.63, 392.00, 493.88], delay: 0 },
      { notes: [523.25], delay: 350 },
      { notes: [392.00], delay: 700 },
      { notes: [329.63], delay: 1050 },

      { notes: [220.00, 261.63, 329.63, 392.00], delay: 1400 },
      { notes: [440.00], delay: 1750 },
      { notes: [329.63], delay: 2100 },
      { notes: [261.63], delay: 2450 },

      { notes: [174.61, 261.63, 329.63, 440.00], delay: 2800 },
      { notes: [523.25], delay: 3150 },
      { notes: [440.00], delay: 3500 },
      { notes: [329.63], delay: 3850 },

      { notes: [196.00, 246.94, 293.66, 392.00], delay: 4200 },
      { notes: [493.88], delay: 4550 },
      { notes: [392.00], delay: 4900 },
      { notes: [293.66], delay: 5250 }
    ];

    function playKalimbaNote(freq, time) {
      if (!audioContext || audioContext.state === "suspended") return;
      try {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.045, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.9);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(time);
        osc.stop(time + 0.95);
      } catch (e) {}
    }

    function playLoop() {
      if (!isMusicBoxPlaying || !audioContext) return;
      const now = audioContext.currentTime;
      melody.forEach(step => {
        const noteTime = now + (step.delay / 1000);
        step.notes.forEach(f => playKalimbaNote(f, noteTime));
      });
    }

    playLoop();
    musicBoxInterval = setInterval(() => {
      if (!isMusicBoxPlaying) return;
      playLoop();
    }, 5600);
  }

  function stopMusicBoxBgm() {
    isMusicBoxPlaying = false;
    if (musicBoxInterval) {
      clearInterval(musicBoxInterval);
      musicBoxInterval = null;
    }
    musicWidget.classList.remove("playing");
    isAudioPlaying = false;
  }

  function toggleMusic() {
    initAudioContext();
    if (isAudioPlaying) {
      if (!bgmAudio.paused) bgmAudio.pause();
      stopMusicBoxBgm();
    } else {
      if (bgmAudio.src && !bgmAudio.error) {
        bgmAudio.play().then(() => {
          isAudioPlaying = true;
          musicWidget.classList.add("playing");
        }).catch(() => {
          startMusicBoxBgm();
        });
      } else {
        startMusicBoxBgm();
      }
    }
  }

  musicWidget.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  bgmAudio.addEventListener("error", () => {
    if (isAudioPlaying) {
      startMusicBoxBgm();
    }
  });

  function handleFirstUserInteraction() {
    initAudioContext();
    if (!isAudioPlaying) {
      if (bgmAudio.src && !bgmAudio.error) {
        bgmAudio.play().then(() => {
          isAudioPlaying = true;
          musicWidget.classList.add("playing");
        }).catch(() => {
          startMusicBoxBgm();
        });
      } else {
        startMusicBoxBgm();
      }
    }
    document.removeEventListener("touchstart", handleFirstUserInteraction);
    document.removeEventListener("pointerdown", handleFirstUserInteraction);
    document.removeEventListener("click", handleFirstUserInteraction);
  }
  document.addEventListener("touchstart", handleFirstUserInteraction, { once: true, passive: true });
  document.addEventListener("pointerdown", handleFirstUserInteraction, { once: true });
  document.addEventListener("click", handleFirstUserInteraction, { once: true });

  // ==========================================
  // 🖼️ SLIDE RENDERER
  // ==========================================
  function renderSlide(index) {
    if (index > 0) {
      playPopSound();
      triggerHaptic(20);
    }

    progressBars.forEach((bar, i) => {
      bar.classList.toggle("active", i <= index);
    });
    footerDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    slideImage.classList.remove("pop-in");
    void slideImage.offsetWidth;
    slideImage.classList.add("pop-in");

    if (index === 3) {
      trollProps.style.display = "block";
    } else {
      trollProps.style.display = "none";
    }

    if (index < 4) {
      choiceContainer.style.display = "none";
      if (catPointerBox) catPointerBox.style.display = "none";
      slideClickArea.style.cursor = "pointer";

      const slideData = CONFIG.slides[index];
      slideBadge.textContent = slideData.badge || `✨ สไลด์ที่ ${index + 1}`;
      slideTitle.textContent = slideData.title;
      slideHighlight.textContent = slideData.highlight || "";
      slideSubtext.textContent = slideData.subtext || "แตะที่จอเพื่อไปต่อนะ";

      imageSkeleton.style.opacity = "1";
      slideImage.src = slideData.gif;
      slideImage.onload = () => { imageSkeleton.style.opacity = "0"; };
      slideImage.onerror = () => { imageSkeleton.style.opacity = "0"; };

    } else {
      // Slide 5: The Grand Question Slide!
      choiceContainer.style.display = "block";
      slideClickArea.style.cursor = "default";

      const qData = CONFIG.questionSlide;
      slideBadge.textContent = qData.badge;
      slideTitle.textContent = qData.title;
      slideHighlight.textContent = "";
      slideSubtext.textContent = qData.subtext;
      btnYesText.textContent = qData.yesBtnText;
      btnNoText.textContent = qData.noBtnText;

      imageSkeleton.style.opacity = "1";
      slideImage.src = qData.gif;
      slideImage.onload = () => { imageSkeleton.style.opacity = "0"; };

      launchHeartExplosion();
    }
  }

  // Instagram Story style tap navigation
  slideClickArea.addEventListener("click", (e) => {
    if (e.target.closest("#choiceContainer")) return;

    if (currentSlide < 4) {
      const rect = slideClickArea.getBoundingClientRect();
      const isBackTap = e.clientX > 0 && ((e.clientX - rect.left) < rect.width * 0.28);
      
      if (isBackTap && currentSlide > 0) {
        currentSlide--;
        renderSlide(currentSlide);
      } else {
        currentSlide++;
        renderSlide(currentSlide);
      }
    }
  });

  // ==========================================
  // 💥 "ไม่เป็น" BUTTON (PUNCH MEME + POINTING CAT)
  // ==========================================
  function handleNoAction(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    noClickCount++;

    triggerHaptic([80, 50, 150]);
    playPunchSound();

    storyCard.classList.remove("screen-shake");
    void storyCard.offsetWidth;
    storyCard.classList.add("screen-shake");

    const msgs = CONFIG.catPunch.messages;
    punchBubble.textContent = msgs[Math.floor(Math.random() * msgs.length)];

    punchOverlay.classList.add("show");

    // Transform buttons
    const yesScale = 1 + (noClickCount * 0.2);
    btnYes.style.transform = `scale(${yesScale})`;

    const noScale = Math.max(0.42, 1 - (noClickCount * 0.16));
    btnNo.style.transform = `scale(${noScale})`;

    const attempts = CONFIG.questionSlide.noAttempts;
    choiceTip.textContent = attempts[Math.min(noClickCount - 1, attempts.length - 1)];

    if (catPointerBox) {
      catPointerBox.style.display = "flex";
    }

    if (noClickCount >= 2) {
      btnNo.addEventListener("touchstart", dodgeButton, { passive: true });
      btnNo.addEventListener("mouseenter", dodgeButton);
    }
  }

  btnNo.addEventListener("click", handleNoAction);

  function dodgeButton() {
    const randomX = (Math.random() - 0.5) * 140;
    const randomY = (Math.random() - 0.5) * 80;
    btnNo.style.transform = `scale(0.42) translate(${randomX}px, ${randomY}px)`;
  }

  btnPunchOk.addEventListener("click", () => {
    punchOverlay.classList.remove("show");
  });
  punchOverlay.addEventListener("click", (e) => {
    if (e.target === punchOverlay) {
      punchOverlay.classList.remove("show");
    }
  });

  // ==========================================
  // 💖 "เป็น" BUTTON (KANEKI CLIMAX ENDING)
  // ==========================================
  btnYes.addEventListener("click", (e) => {
    e.stopPropagation();

    triggerHaptic([50, 50, 50, 50, 120]);
    playAnimeDramaticSound();
    playVictoryFanfare();

    fireEpicConfetti();

    if (contractSender) contractSender.textContent = CONFIG.senderName || "เค้า";
    if (contractReceiver) contractReceiver.textContent = CONFIG.receiverName || "เธอ";

    // Show Kaneki Image directly
    if (kanekiImg) {
      kanekiImg.src = "assets/kaneki_laugh.gif";
    }

    // Instantly reveal the Ending Screen!
    setTimeout(() => {
      endingOverlay.classList.add("show");
    }, 200);
  });

  if (btnTogglePose) {
    btnTogglePose.addEventListener("click", () => {
      currentPoseIndex++;
      triggerHaptic(40);
      playAnimeDramaticSound();
      const chars = CONFIG.ending.characters;
      if (chars && chars.length > 0) {
        const current = chars[currentPoseIndex % chars.length];
        if (kanekiImg) kanekiImg.src = current.gif;
      }
    });
  }

  if (btnLineShare) {
    btnLineShare.addEventListener("click", () => {
      const textToShare = encodeURIComponent(CONFIG.ending.lineShareMessage);
      const lineUrl = `https://line.me/R/msg/text/?${textToShare}`;
      window.open(lineUrl, "_blank");
    });
  }

  btnReplay.addEventListener("click", () => {
    endingOverlay.classList.remove("show");
    currentSlide = 0;
    noClickCount = 0;
    btnYes.style.transform = "scale(1)";
    btnNo.style.transform = "scale(1)";
    if (catPointerBox) catPointerBox.style.display = "none";
    btnNo.removeEventListener("touchstart", dodgeButton);
    btnNo.removeEventListener("mouseenter", dodgeButton);
    renderSlide(0);
  });

  // QR Modal (Dynamic for localhost, LAN, or Git/online URL)
  if (qrPill && qrModal && btnCloseQr) {
    qrPill.addEventListener("click", () => {
      const currentUrl = window.location.href;
      const qrImg = document.getElementById("qrImg");
      const qrUrlText = document.getElementById("qrUrlText");
      const qrDesc = document.getElementById("qrDesc");

      if (qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`;
      }
      if (qrUrlText) {
        qrUrlText.textContent = currentUrl;
      }
      if (qrDesc) {
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
          qrDesc.textContent = "เปิดบนคอมอยู่: สแกนเล่นบนมือถือผ่าน Wi-Fi เดียวกัน หรือแชร์ลิงก์ให้เพื่อนได้เลย!";
        } else {
          qrDesc.textContent = "ใช้มือถือเครื่องไหนก็ได้สแกนเข้าเล่นได้ทันที! 📱";
        }
      }
      qrModal.classList.add("show");
    });
    btnCloseQr.addEventListener("click", () => {
      qrModal.classList.remove("show");
    });
    qrModal.addEventListener("click", (e) => {
      if (e.target === qrModal) {
        qrModal.classList.remove("show");
      }
    });
  }

  function fireEpicConfetti() {
    if (typeof confetti === "function") {
      const end = Date.now() + 3 * 1000;
      const colors = ["#ff4d6d", "#ff758c", "#ffd166", "#06d6a0", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }

  function launchHeartExplosion() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 22,
        spread: 55,
        origin: { y: 0.6 },
        colors: ["#ff4d6d", "#ff758c", "#ffccd5"]
      });
    }
  }

  function spawnBackgroundHearts() {
    const container = document.getElementById("bgDecorations");
    const symbols = ["💖", "🌸", "✨", "🤍", "🌷"];
    const count = window.innerWidth < 500 ? 10 : 16;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = `${Math.random() * 95}%`;
      heart.style.animationDuration = `${7 + Math.random() * 6}s`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      heart.style.fontSize = `${0.9 + Math.random() * 0.9}rem`;
      container.appendChild(heart);
    }
  }

  spawnBackgroundHearts();
  renderSlide(0);
});
