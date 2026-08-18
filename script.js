// ================= 1. DYNAMIC RETRO LOADING & PERCENTAGE ENGINE =================
window.addEventListener('DOMContentLoaded', () => {
    let currentProgress = 0;
    const progressText = document.getElementById('boot-percentage');
    const progressBarFill = document.getElementById('boot-progress-fill');
    const readyMessage = document.getElementById('boot-ready-text');
    
    // Interval ini mensimulasikan sistem membaca database dengan kelajuan acak (ala game 90an)
    const bootSequence = setInterval(() => {
        // Angka lompatan persentase acak (antara 2% sampai 6% setiap langkahnya)
        currentProgress += Math.floor(Math.random() * 5) + 2;
        
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(bootSequence); // Stop perulangan loading
            
            // Tampilkan tulisan "Please wait Revisi..." saat menyentuh angka 100%
            if (readyMessage) readyMessage.classList.remove('hidden');
            
            // Beri jeda dramatis 1 detik setelah 100% sebelum masuk area desktop utama
            setTimeout(() => {
                const bootScreen = document.getElementById('boot-screen');
                if (bootScreen) bootScreen.style.display = 'none';
                
                // Jendela krusial langsung terbuka otomatis demi impresi awal reviewer
                openWindow('win-about');
                openWindow('win-design');
                
                // Munculkan asisten interaktif 2.5 detik kemudian
                setTimeout(() => {
                    const mascotBox = document.getElementById('mascot-box');
                    if (mascotBox) mascotBox.classList.remove('hidden');
                }, 2500);
            }, 1000);
        }
        
        // Update visual teks angka dan kelebaran bar hijau di layar
        if (progressText) progressText.innerText = currentProgress + '%';
        if (progressBarFill) progressBarFill.style.width = currentProgress + '%';
    }, 75); // Berjalan mulus & interaktif (~2.5 - 3 detik total boot time)
});

// ================= 2. GLOBAL JENDELA WORKFRAME CONTROL =================
function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    
    win.classList.remove('hidden');
    focusWindow(win);
    syncTaskbar();

    // Mengaktifkan simulasi penghitung jika user membuka menu System Stats
    if (id === 'win-stats') {
        animatePerformanceStats();
    }
}

// SUDAH DIGABUNG: Menutup jendela, update taskbar, dan mematikan suara video sekaligus
function closeWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.classList.add('hidden');
        
        // Cari apakah ada video di dalam jendela yang ditutup, jika ada langsung matikan suaranya
        const videoInside = win.querySelector('video');
        if (videoInside) {
            videoInside.pause();
        }
        
        syncTaskbar();
    }
}

function focusWindow(activeWin) {
    document.querySelectorAll('.window').forEach(win => {
        win.style.zIndex = "10";
        win.classList.remove('window-active');
    });
    activeWin.style.zIndex = "99";
    activeWin.classList.add('window-active');
    syncTaskbar();
}

document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => focusWindow(win));
});

// ================= 3. SYSTEM RESOURCE NUMERIC ENGINE =================
function animatePerformanceStats() {
    // Pengaturan Bar Grafis Horizontal sesuai kualifikasi asli di CV
    const barOrg = document.getElementById('bar-org');
    const barWrite = document.getElementById('bar-write');
    const barTeach = document.getElementById('bar-teach');
    const barLead = document.getElementById('bar-lead');

    if (barOrg) barOrg.style.width = '85%';   
    if (barWrite) barWrite.style.width = '90%'; 
    if (barTeach) barTeach.style.width = '70%'; 
    if (barLead) barLead.style.width = '95%';  

    // Perhitungan Angka Dinamis (Numeric Counter Simulation)
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        let current = 0;
        const duration = 800; 
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        el.innerText = "0";
        const counterInterval = setInterval(() => {
            current += 1;
            el.innerText = current;
            if (current >= target) {
                clearInterval(counterInterval);
                el.innerText = target;
            }
        }, stepTime);
    });
}

// ================= 4. DYNAMIC TASKBAR SYNCHRONIZATION =================
const appNames = {
    'win-about': 'Profile.txt',
    'win-design': 'Design_Studio',
    'win-media': 'Media_Lab',
    'win-achievements': 'Achievements',
    'win-stats': 'System_Stats',
    'win-timeline': 'Timeline.log',
    'win-contact': 'Contact.exe',
    'win-developer': 'Informatics Prompt'
};

function syncTaskbar() {
    const container = document.getElementById('taskbar-apps');
    if (!container) return;
    container.innerHTML = '';
    
    document.querySelectorAll('.window').forEach(win => {
        if (!win.classList.contains('hidden') && appNames[win.id]) {
            const tab = document.createElement('div');
            tab.className = 'taskbar-tab';
            
            if (win.style.zIndex === "99") {
                tab.className += ' active';
            }
            
            tab.innerText = appNames[win.id];
            tab.onclick = () => focusWindow(win);
            container.appendChild(tab);
        }
    });
}

// ================= 5. START CONTEXT RUNNER =================
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) startMenu.classList.toggle('hidden');
}

document.addEventListener('click', (e) => {
    const startMenu = document.getElementById('start-menu');
    const startBtn = document.getElementById('start-btn');
    if (startMenu && startBtn) {
        if (!startMenu.contains(e.target) && e.target !== startBtn && !startBtn.contains(e.target)) {
            startMenu.classList.add('hidden');
        }
    }
});

// ================= 6. CLOCK ENGINE =================
function runDigitalClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    clockEl.innerText = `${hours}:${minutes} ${ampm}`;
}
setInterval(runDigitalClock, 1000);
runDigitalClock();

// ================= 7. EASTER EGG SYSTEM (DEV PROMPT TRIGGER) =================
let clockClickTracker = 0;
const clockElement = document.getElementById('clock');
if (clockElement) {
    clockElement.style.cursor = 'pointer';
    clockElement.addEventListener('click', () => {
        clockClickTracker++;
        if (clockClickTracker === 5) {
            const devPopup = document.getElementById('dev-popup');
            if (devPopup) devPopup.classList.remove('hidden');
            clockClickTracker = 0; 
        }
    });
}

// ================= 8. SYSTEM SHUTDOWN SYSTEM OVERRIDE (BSOD) =================
function triggerBSOD() {
    const startMenu = document.getElementById('start-menu');
    const bsodScreen = document.getElementById('bsod-screen');
    if (startMenu) startMenu.classList.add('hidden');
    if (bsodScreen) bsodScreen.classList.remove('hidden');
}

const bsodElement = document.getElementById('bsod-screen');
if (bsodElement) {
    bsodElement.addEventListener('click', () => {
        bsodElement.classList.add('hidden');
        openWindow('win-about');
        openWindow('win-design');
    });
}

// ================= 9. ADVANCED DRAG & DROP CONTROL ENGINE =================
document.querySelectorAll('.window').forEach(initiateDraggableFeature);

function initiateDraggableFeature(windowEl) {
    const titleBar = windowEl.querySelector('.title-bar');
    if (!titleBar) return;
    
    let isMoving = false;
    let pointerX, pointerY, initialLeft, initialTop;

    titleBar.addEventListener('mousedown', (e) => {
        if (window.innerWidth <= 768) return; 
        if (e.target.tagName === 'BUTTON') return;

        isMoving = true;
        pointerX = e.clientX;
        pointerY = e.clientY;
        initialLeft = windowEl.offsetLeft;
        initialTop = windowEl.offsetTop;
        
        focusWindow(windowEl);
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMoving) return;
        const currentDistanceX = e.clientX - pointerX;
        const currentDistanceY = e.clientY - pointerY;
        
        windowEl.style.left = `${initialLeft + currentDistanceX}px`;
        windowEl.style.top = `${initialTop + currentDistanceY}px`;
    });

    document.addEventListener('mouseup', () => {
        isMoving = false;
    });
}

// ================= 10. WINDOWS MEDIA PLAYER PLAYLIST ENGINE =================
const videoPlayer = document.getElementById('main-video-player');
const videoFilename = document.getElementById('video-filename');
const playlistItems = document.querySelectorAll('.playlist-item');
const videoProgressBar = document.getElementById('video-progress');

// Menambahkan fungsi klik untuk setiap item list video
if (playlistItems.length > 0) {
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetVideo = this.getAttribute('data-src');
            const targetTitle = this.getAttribute('data-title');

            if (videoPlayer) {
                videoPlayer.src = targetVideo;
                videoPlayer.load();
                videoPlayer.play().catch(error => {
                    console.log("Pemutaran otomatis tertahan: ", error);
                });
            }

            if (videoFilename) {
                videoFilename.innerText = `File: ${targetTitle}`;
            }
        });
    });
}

// Membuat custom progress bar biru bergerak otomatis
if (videoPlayer && videoProgressBar) {
    videoPlayer.addEventListener('timeupdate', function() {
        if (videoPlayer.duration) {
            const percentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
            videoProgressBar.style.width = percentage + '%';
        }
    });
}