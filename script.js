// ==================== ИНТЕРАКТИВНАЯ КАРТА "ПУТЬ ДРУЖБЫ" ====================
const journeyPoints = document.querySelectorAll('.journey-point');
const journeyTitle = document.getElementById('journeyTitle');
const journeyText = document.getElementById('journeyText');

journeyPoints.forEach(point => {
    point.addEventListener('click', () => {
        const title = point.dataset.title;
        const text = point.dataset.text;
        
        journeyTitle.textContent = title;
        journeyText.textContent = text;
        
        // Анимация
        journeyTitle.style.animation = 'none';
        journeyText.style.animation = 'none';
        void journeyTitle.offsetWidth;
        journeyTitle.style.animation = 'fadeIn 0.5s';
        journeyText.style.animation = 'fadeIn 0.5s';
    });
});

// ==================== ЭМОЦИОНАЛЬНЫЙ СЛАЙДЕР ====================
const emotionSlider = document.getElementById('emotionSlider');
const emotionCharacter = document.getElementById('emotionCharacter');
const emotionText = document.getElementById('emotionText');

const emotions = [
    { emoji: '😿', text: 'Страх и одиночество' },
    { emoji: '😰', text: 'Тревога' },
    { emoji: '😟', text: 'Осторожность' },
    { emoji: '😐', text: 'Нейтральность' },
    { emoji: '🙂', text: 'Интерес' },
    { emoji: '😊', text: 'Доверие' },
    { emoji: '😺', text: 'Радость' },
    { emoji: '😸', text: 'Счастье' },
    { emoji: '😻', text: 'Любовь и свобода' }
];

emotionSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    const index = Math.floor((value / 100) * (emotions.length - 1));
    
    emotionCharacter.textContent = emotions[index].emoji;
    emotionText.textContent = emotions[index].text;
    
    // Анимация
    emotionCharacter.style.animation = 'none';
    void emotionCharacter.offsetWidth;
    emotionCharacter.style.animation = 'bounce 0.5s';
});

// ==================== МИНИ-ИГРА "СОБЕРИ ДРУЗЕЙ" ====================
const draggable = document.getElementById('draggable');
const target = document.getElementById('target');
const gameField = document.getElementById('gameField');
const gameMessage = document.getElementById('gameMessage');
const resetBtn = document.getElementById('resetGame');

let isDragging = false;
let offsetX, offsetY;

draggable.addEventListener('mousedown', startDrag);
draggable.addEventListener('touchstart', startDrag);

function startDrag(e) {
    isDragging = true;
    const rect = draggable.getBoundingClientRect();
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    
    draggable.style.cursor = 'grabbing';
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    const fieldRect = gameField.getBoundingClientRect();
    let newX = clientX - fieldRect.left - offsetX;
    let newY = clientY - fieldRect.top - offsetY;
    
    // Ограничиваем движение пределами поля
    newX = Math.max(0, Math.min(newX, fieldRect.width - draggable.offsetWidth));
    newY = Math.max(0, Math.min(newY, fieldRect.height - draggable.offsetHeight));
    
    draggable.style.left = newX + 'px';
    draggable.style.top = newY + 'px';
}

function stopDrag() {
    isDragging = false;
    draggable.style.cursor = 'move';
    
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
    
    // Проверяем, достиг ли котёнок питбуля
    const draggableRect = draggable.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    
    if (draggableRect.left < targetRect.right &&
        draggableRect.right > targetRect.left &&
        draggableRect.top < targetRect.bottom &&
        draggableRect.bottom > targetRect.top) {
        gameMessage.textContent = '🎉 Друзья встретились! Теперь они вместе!';
        gameMessage.style.color = '#7ed321';
        draggable.style.display = 'none';
    }
}

resetBtn.addEventListener('click', () => {
    draggable.style.left = '50px';
    draggable.style.top = '50px';
    draggable.style.display = 'block';
    gameMessage.textContent = 'Перетащи котёнка к питбулю!';
    gameMessage.style.color = 'var(--orange)';
});

// ==================== АНИМАЦИИ ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);