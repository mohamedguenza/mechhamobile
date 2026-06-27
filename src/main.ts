console.log('Mecha Chameleon Landing Page Loaded');

// Add subtle parallax to clouds on mouse move
document.addEventListener('mousemove', (e: MouseEvent) => {
  const clouds = document.querySelectorAll<HTMLElement>('.cloud');
  const x: number = (e.clientX - window.innerWidth / 2) / 50;
  const y: number = (e.clientY - window.innerHeight / 2) / 50;

  clouds.forEach((cloud: HTMLElement, index: number) => {
    const factor: number = (index + 1) * 0.5;
    cloud.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// Modal Logic
const modalBackdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');

function openModal(event?: MouseEvent) {
  if (!modalBackdrop || !modalContent) return;
  
  // If we have an event, set the transform origin to the button's center
  if (event && event.currentTarget instanceof HTMLElement) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x: number = rect.left + rect.width / 2;
    const y: number = rect.top + rect.height / 2;
    modalContent.style.transformOrigin = `${x}px ${y}px`;
  } else {
    modalContent.style.transformOrigin = 'center';
  }

  modalBackdrop.classList.remove('hidden');
  
  // Use requestAnimationFrame for smoother entry
  requestAnimationFrame(() => {
    modalBackdrop.classList.remove('opacity-0');
    modalContent.classList.remove('scale-0', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
  });
  
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalBackdrop || !modalContent) return;
  
  modalBackdrop.classList.add('opacity-0');
  modalContent.classList.remove('scale-100', 'opacity-100');
  modalContent.classList.add('scale-0', 'opacity-0');
  
  setTimeout(() => {
    modalBackdrop.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 400); // Match transition duration
}

// Expose to window for inline onclick handlers
(window as any).openModal = openModal;
(window as any).closeModal = closeModal;

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });
}
