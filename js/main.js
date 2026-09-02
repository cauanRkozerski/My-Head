// ==========================================================================
// Projeto My-Head - Script de Animação com GSAP
// Atividade: GitFlow, Pull Request e Deploy no GitHub Pages
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const headImg = document.getElementById('head-img');
  const btnToggle = document.getElementById('btn-toggle-spin');
  const btnSpeedUp = document.getElementById('btn-speed-up');
  const btnSlowDown = document.getElementById('btn-slow-down');
  const btnSwitchImg = document.getElementById('btn-switch-img');
  const speedLabel = document.getElementById('speed-label');

  if (!headImg) return;

  // Imagens para rotação: Imagem base da aula e foto de perfil
  const imgOptions = [
    { src: 'img/cabeca.jpg', label: 'Cabeça da Aula' },
    { src: 'https://github.com/cauanRkozerski.png', label: 'Avatar Cauan' }
  ];
  let currentImgIndex = 0;

  // Configuração inicial da rotação contínua com GSAP (TweenMax)
  const baseDuration = 10;
  let isSpinning = true;

  // Criação do tween de rotação infinita 360°
  const spinTween = gsap.to(headImg, {
    rotation: 360,
    duration: baseDuration,
    ease: 'none',
    repeat: -1
  });

  // Atualização do indicador de velocidade
  const updateSpeedDisplay = () => {
    if (speedLabel) {
      const scale = spinTween.timeScale();
      speedLabel.textContent = !isSpinning ? 'Pausado' : `${scale.toFixed(1)}x`;
    }
  };

  // Controle de Pausa / Retomada
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      isSpinning = !isSpinning;
      if (isSpinning) {
        spinTween.play();
        btnToggle.innerHTML = '<span class="btn-icon">⏸️</span> Pausar';
      } else {
        spinTween.pause();
        btnToggle.innerHTML = '<span class="btn-icon">▶️</span> Girar';
      }
      updateSpeedDisplay();
    });
  }

  // Acelerar rotação
  if (btnSpeedUp) {
    btnSpeedUp.addEventListener('click', () => {
      const current = spinTween.timeScale();
      if (current < 4.5) {
        spinTween.timeScale(current + 0.5);
      }
      if (!isSpinning) {
        spinTween.play();
        isSpinning = true;
        if (btnToggle) btnToggle.innerHTML = '<span class="btn-icon">⏸️</span> Pausar';
      }
      updateSpeedDisplay();
    });
  }

  // Desacelerar rotação
  if (btnSlowDown) {
    btnSlowDown.addEventListener('click', () => {
      const current = spinTween.timeScale();
      if (current > 0.5) {
        spinTween.timeScale(current - 0.5);
      }
      updateSpeedDisplay();
    });
  }

  // Alternar entre imagem da aula e foto do GitHub
  if (btnSwitchImg) {
    btnSwitchImg.addEventListener('click', () => {
      currentImgIndex = (currentImgIndex + 1) % imgOptions.length;
      headImg.src = imgOptions[currentImgIndex].src;
      btnSwitchImg.innerHTML = `<span class="btn-icon">🔄</span> Alternar: ${imgOptions[currentImgIndex].label}`;
    });
  }

  // Efeito interativo de pulso ao clicar na cabeça
  headImg.addEventListener('click', () => {
    gsap.to(headImg, {
      scale: 1.15,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });
  });

  updateSpeedDisplay();
});
