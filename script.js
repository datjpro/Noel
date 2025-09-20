// JavaScript cho website Noel
document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo tất cả các chức năng
  initSnowfall();
  initMusicControl();
  initCountdown();
  initPageAnimations();
});

// Hiệu ứng tuyết rơi
function initSnowfall() {
  const snowflakesContainer = document.getElementById("snowflakes");
  const snowflakeChars = ["❄", "❅", "❆", "✻", "✼", "❋"];

  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.innerHTML =
      snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];

    // Vị trí ngẫu nhiên
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.fontSize = Math.random() * 20 + 10 + "px";

    // Thời gian rơi ngẫu nhiên
    const fallDuration = Math.random() * 10 + 5;
    snowflake.style.animationDuration = fallDuration + "s";

    // Độ trong suốt ngẫu nhiên
    snowflake.style.opacity = Math.random() * 0.8 + 0.2;

    snowflakesContainer.appendChild(snowflake);

    // Xóa snowflake sau khi animation kết thúc
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake);
      }
    }, fallDuration * 1000);
  }

  // Tạo tuyết rơi liên tục
  setInterval(createSnowflake, 200);
}

// Điều khiển nhạc nền
function initMusicControl() {
  const musicBtn = document.getElementById("musicBtn");
  const music = document.getElementById("christmasMusic");
  const playIcon = musicBtn.querySelector(".play-icon");
  const pauseIcon = musicBtn.querySelector(".pause-icon");

  let isPlaying = false;

  // Tạo âm thanh Noel bằng Web Audio API thay vì file âm thanh
  let audioContext;
  let oscillator;
  let gainNode;

  function createChristmasSound() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Tạo một giai điệu đơn giản kiểu Jingle Bells
    const frequencies = [
      261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25,
    ]; // C4 to C5
    const melody = [4, 4, 4, 4, 4, 4, 2, 5, 3, 4, 1]; // Simplified Jingle Bells

    let noteIndex = 0;

    function playNote() {
      if (oscillator) {
        oscillator.stop();
      }

      oscillator = audioContext.createOscillator();
      gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(
        frequencies[melody[noteIndex]],
        audioContext.currentTime
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);

      noteIndex = (noteIndex + 1) % melody.length;

      if (isPlaying) {
        setTimeout(playNote, 600);
      }
    }

    playNote();
  }

  musicBtn.addEventListener("click", function () {
    if (isPlaying) {
      // Dừng nhạc
      isPlaying = false;
      playIcon.style.display = "inline";
      pauseIcon.style.display = "none";
      if (oscillator) {
        oscillator.stop();
      }
    } else {
      // Phát nhạc
      isPlaying = true;
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline";
      createChristmasSound();
    }
  });
}

// Đếm ngược đến Noel
function initCountdown() {
  const countdownElement = document.getElementById("countdown");
  const daysElement = document.getElementById("days");

  function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25); // 25 tháng 12

    // Nếu Noel năm nay đã qua, tính đến Noel năm sau
    if (now > christmas) {
      christmas = new Date(currentYear + 1, 11, 25);
    }

    const timeDiff = christmas.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysLeft === 0) {
      countdownElement.innerHTML = "🎄 Hôm nay là Noel! 🎄";
      countdownElement.style.fontSize = "1.5rem";
      countdownElement.style.color = "#ff6b9d";
    } else {
      daysElement.textContent = daysLeft;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 3600000); // Cập nhật mỗi giờ
}

// Hiệu ứng pháo hoa khi nhấn "Có"
function showFireworks() {
  const container = document.getElementById("fireworksContainer");
  const colors = [
    "#ff6b9d",
    "#ffa502",
    "#2ed573",
    "#3742fa",
    "#ff4757",
    "#ff6348",
  ];

  // Tạo nhiều pháo hoa
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      createFirework(container, colors);
    }, i * 200);
  }

  // Hiển thị thông báo đặc biệt
  setTimeout(() => {
    showSpecialMessage();
  }, 2000);
}

function createFirework(container, colors) {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.1;

  // Tạo nhiều hạt pháo hoa
  for (let i = 0; i < 20; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = x + "px";
    firework.style.top = y + "px";
    firework.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    // Hướng bắn ngẫu nhiên
    const angle = (i / 20) * 2 * Math.PI;
    const velocity = Math.random() * 100 + 50;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    firework.style.setProperty("--dx", dx + "px");
    firework.style.setProperty("--dy", dy + "px");

    container.appendChild(firework);

    // Xóa sau khi animation kết thúc
    setTimeout(() => {
      if (firework.parentNode) {
        firework.parentNode.removeChild(firework);
      }
    }, 1000);
  }
}

// Hiệu ứng trái tim bay khi nhấn "Để em suy nghĩ"
function showHearts() {
  const container = document.getElementById("heartsContainer");
  const hearts = ["💖", "💕", "💗", "💓", "💝", "💘"];

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight - 50 + "px";

      container.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 3000);
    }, i * 300);
  }

  // Hiển thị thông báo dễ thương
  setTimeout(() => {
    showThinkingMessage();
  }, 1500);
}

// Thông báo đặc biệt khi chọn "Có"
function showSpecialMessage() {
  const message = document.createElement("div");
  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        font-size: 1.5rem;
        font-family: 'Dancing Script', cursive;
        z-index: 10000;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        animation: bounceIn 0.5s ease-out;
    `;

  message.innerHTML = `
        <h2 style="margin-bottom: 20px;">🎉 Yeyyy! 🎉</h2>
        <p>Anh rất vui vì em đồng ý!</p>
        <p>Chúng ta sẽ có một Noel thật tuyệt vời! 💕</p>
        <button onclick="this.parentNode.remove()" style="
            margin-top: 20px;
            background: white;
            color: #c44569;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
        ">Đóng ❤️</button>
    `;

  document.body.appendChild(message);

  // Tự động xóa sau 10 giây
  setTimeout(() => {
    if (message.parentNode) {
      message.parentNode.removeChild(message);
    }
  }, 10000);
}

// Thông báo khi chọn "Để em suy nghĩ"
function showThinkingMessage() {
  const message = document.createElement("div");
  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #74b9ff, #0984e3);
        color: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        font-size: 1.3rem;
        font-family: 'Dancing Script', cursive;
        z-index: 10000;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        animation: bounceIn 0.5s ease-out;
    `;

  message.innerHTML = `
        <h2 style="margin-bottom: 20px;">🤔 Không sao đâu em! 🤔</h2>
        <p>Anh sẽ đợi em suy nghĩ nhé!</p>
        <p>Dù sao thì anh cũng chúc em Noel vui vẻ! 🎄</p>
        <button onclick="this.parentNode.remove()" style="
            margin-top: 20px;
            background: white;
            color: #0984e3;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
        ">Đóng 💙</button>
    `;

  document.body.appendChild(message);

  setTimeout(() => {
    if (message.parentNode) {
      message.parentNode.removeChild(message);
    }
  }, 10000);
}

// Animation cho các phần tử khi load trang
function initPageAnimations() {
  // Thêm CSS cho bounceIn animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.3);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.05);
            }
            70% {
                transform: translate(-50%, -50%) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
  document.head.appendChild(style);

  // Animate các phần tử khi scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
      }
    });
  }, observerOptions);

  // Quan sát các phần tử
  const elementsToAnimate = [
    ".message-container",
    ".christmas-tree",
    ".santa-container",
  ];

  elementsToAnimate.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      observer.observe(element);
    });
  });
}

// Thêm hiệu ứng cursor tuyết
document.addEventListener("mousemove", function (e) {
  // Tạo tuyết nhỏ theo con trở chuột (throttle để tránh lag)
  if (Math.random() > 0.8) {
    const snowflake = document.createElement("div");
    snowflake.innerHTML = "❄";
    snowflake.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            color: rgba(255,255,255,0.7);
            pointer-events: none;
            z-index: 1000;
            font-size: 12px;
            animation: fadeOut 1s ease-out forwards;
        `;

    document.body.appendChild(snowflake);

    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake);
      }
    }, 1000);
  }
});

// CSS cho fadeOut
const fadeOutStyle = document.createElement("style");
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 0.7;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-50px);
        }
    }
`;
document.head.appendChild(fadeOutStyle);
