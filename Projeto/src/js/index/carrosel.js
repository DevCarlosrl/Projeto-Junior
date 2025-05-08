document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.package-card');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // inclui o gap
    const visibleCards = Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);
    
    // Criar dots de navegação
    function createDots() {
        for (let i = 0; i < cards.length - visibleCards + 1; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Ir para slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Atualizar carrossel
    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;
        
        // Atualizar dots ativos
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Esconder/mostrar botões de navegação conforme necessário
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentIndex >= cards.length - visibleCards ? 'none' : 'flex';
    }
    
    // Event listeners para botões
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Inicializar
    createDots();
    updateCarousel();
    
    // Responsividade - recarregar quando a janela for redimensionada
    window.addEventListener('resize', function() {
        const newVisibleCards = Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);
        if (newVisibleCards !== visibleCards) {
            location.reload();
        }
    });
});