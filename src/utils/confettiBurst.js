import confetti from 'canvas-confetti';

// Trigger romantic heart and rose petal confetti for level unlock
export function triggerLevelUnlockConfetti() {
  const count = 70;
  const defaults = {
    origin: { y: 0.65 },
    colors: ['#e6194b', '#ff2a6d', '#ff758f', '#ffb3c6', '#ffd166', '#ffffff'],
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-tier realistic spread
  fire(0.25, {
    spread: 30,
    startVelocity: 45,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.1,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.4,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

// Grand 21st birthday celebration fireworks & floating hearts
export function triggerGrandFinaleConfetti() {
  const duration = 6 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#e6194b', '#ff2a6d', '#ff758f', '#ffb3c6', '#fae19c', '#d4af37', '#ffffff'];

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });

    // Right cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });

    // Center ceiling heart shower
    if (Math.random() < 0.4) {
      confetti({
        particleCount: 15,
        spread: 100,
        origin: { x: 0.5, y: 0.2 },
        colors: ['#ff2a6d', '#ff758f', '#fae19c'],
        shapes: ['circle'],
        scalar: 1.2,
      });
    }
  }, 350);
}
