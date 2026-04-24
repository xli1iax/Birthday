// ДАТА ДНЯ РОЖДЕНИЯ: 26 апреля 2026 года
const BIRTHDAY_DATE = new Date(2026, 3, 26, 0, 0, 0);

// Поздравления прямо в коде (вместо JSON файла)
const MESSAGES = [
    { text: "С 20-летием, Алина! Ты невероятный человек, пусть каждый день дарит улыбку ❤️ Ты заслуживаешь всего самого лучшего!", author: "Аня" },
    { text: "Поздравляю с 20! Желаю счастья, любви и чтобы самые смелые мечты сбывались ✨ Ты лучшая подруга!", author: "Макс" },
    { text: "20 лет — это только начало! Пусть этот год принесёт много радости, ярких моментов и вдохновения. Обнимаю крепко!", author: "Катя" },
    { text: "Алина, ты — солнце! Свети ярко, живи вкусно и никогда не сдавайся 💪💖 С днём рождения!", author: "Дима" },
    { text: "С 20-летием! Оставайся такой же искренней и классной. Словакия тебя любит и ждёт новых приключений 😉", author: "София" },
    { text: "Желаю тебе океан счастья, горы достижений и море улыбок! Ты прекрасна, Алина! 🎂✨", author: "Настя" },
    { text: "Пусть 20-летие станет началом самых ярких приключений в твоей жизни! Обнимаю ❤️", author: "Оля" }
];

function updateTimer() {
    const now = new Date().getTime();
    const target = BIRTHDAY_DATE.getTime();
    const distance = target - now;

    if (distance <= 0) {
        const timerDiv = document.getElementById('timer');
        if (timerDiv) {
            timerDiv.innerHTML = '<div class="timer-block" style="grid-column: span 4;"><span>🎉🎂</span><span class="timer-label">С 20-ЛЕТИЕМ, АЛИНА!</span></div>';
        }
        showVideoModal();
        clearInterval(timerInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');

    if (daysElem) daysElem.innerHTML = String(days).padStart(2, '0');
    if (hoursElem) hoursElem.innerHTML = String(hours).padStart(2, '0');
    if (minutesElem) minutesElem.innerHTML = String(minutes).padStart(2, '0');
    if (secondsElem) secondsElem.innerHTML = String(seconds).padStart(2, '0');
}

let timerInterval;

function startTimer() {
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function showVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('birthdayVideo');
    if (modal) {
        modal.style.display = 'flex';
        if (video) {
            video.play().catch(e => console.log("Нажмите play для просмотра видео"));
        }
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('birthdayVideo');
    if (video) video.pause();
    if (modal) modal.style.display = 'none';
}

// Загрузка поздравлений из встроенного массива
function loadMessages() {
    const messagesGrid = document.getElementById('messagesGrid');
    if (!messagesGrid) {
        console.error('Элемент messagesGrid не найден');
        return;
    }

    if (!MESSAGES || MESSAGES.length === 0) {
        messagesGrid.innerHTML = '<div class="message-card"><p>✨ Поздравления скоро появятся! ✨</p><span>- Друзья</span></div>';
        return;
    }

    messagesGrid.innerHTML = '';
    MESSAGES.forEach(msg => {
        if (msg.text && msg.author) {
            const card = document.createElement('div');
            card.className = 'message-card';
            card.innerHTML = `
                <p>“${escapeHtml(msg.text)}”</p>
                <span>— ${escapeHtml(msg.author)}</span>
            `;
            messagesGrid.appendChild(card);
        }
    });

    console.log('Поздравления успешно загружены! Количество:', MESSAGES.length);
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function initGalleryDragScroll() {
    const galleries = document.querySelectorAll('.gallery-horizontal');
    galleries.forEach(gallery => {
        let isDown = false;
        let startX;
        let scrollLeft;

        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });
        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 1.5;
            gallery.scrollLeft = scrollLeft - walk;
        });
        gallery.style.cursor = 'grab';
    });
}

function initScrollHint() {
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', () => {
            const storySection = document.getElementById('story');
            if (storySection) {
                storySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена, запускаем...');
    startTimer();
    loadMessages();
    initGalleryDragScroll();
    initScrollHint();

    const closeBtn = document.querySelector('.close-video');
    if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);

    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeVideoModal();
        });
    }
});