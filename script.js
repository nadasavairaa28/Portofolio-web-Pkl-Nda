/* ===================================================================
   IMPERIAL ROYAL PINK PRINCESS PORTFOLIO - ERROR-FREE BULLETPROOF SCRIPT
   Safely handles: DOM events, Audio, Canvas, 3D Tilt, Modals & Touch
   =================================================================== */

// 1. Ekpos fungsi ke Window Global (Mencegah ReferenceError di HTML onclick)
window.openRoyalShowcase = openRoyalShowcase;
window.closeRoyalShowcase = closeRoyalShowcase;
window.openCvModal = openCvModal;
window.closeCvModal = closeCvModal;
window.showRoyalToast = showRoyalToast;

// Inisialisasi aman saat DOM siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllRoyalFeatures);
} else {
    initAllRoyalFeatures();
}

function initAllRoyalFeatures() {
    try { initThemeSwitcher(); } catch (e) { console.warn('Theme switcher notice:', e); }
    try { initMagicSparkleEngine(); } catch (e) { console.warn('Sparkle engine notice:', e); }
    try { initMinimapAndScrollHUD(); } catch (e) { console.warn('HUD notice:', e); }
    try { init3DTiltEffects(); } catch (e) { console.warn('Tilt notice:', e); }
    try { initRoyalAudioSynth(); } catch (e) { console.warn('Audio notice:', e); }
    try { initProjectFilterRibbon(); } catch (e) { console.warn('Filter ribbon notice:', e); }
    try { initWaxSealWorkshop(); } catch (e) { console.warn('Wax seal notice:', e); }
    try { initDecreeModals(); } catch (e) { console.warn('Modal notice:', e); }
    try { initMobileNav(); } catch (e) { console.warn('Mobile nav notice:', e); }
    try { initDataAttributeInspectButtons(); } catch (e) { console.warn('Inspect buttons notice:', e); }
}

/* ===================================================================
   1. DYNAMIC ROYAL PINK THEME SWITCHER
   =================================================================== */
function initThemeSwitcher() {
    const themeBtn = document.getElementById('themeBtn');
    const themeMenu = document.getElementById('themeMenu');
    const themeOptions = document.querySelectorAll('.theme-option');

    if (!themeBtn || !themeMenu) return;

    let savedTheme = 'princess-blossom';
    try {
        savedTheme = localStorage.getItem('royal_pink_theme') || 'princess-blossom';
    } catch (e) {
        savedTheme = 'princess-blossom';
    }
    applyRoyalTheme(savedTheme);

    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (themeMenu && !themeMenu.contains(e.target) && e.target !== themeBtn) {
            themeMenu.classList.remove('open');
        }
    });

    themeOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const themeSet = opt.getAttribute('data-theme-set');
            if (themeSet) {
                applyRoyalTheme(themeSet);
                themeMenu.classList.remove('open');
                playMagicalWhooshSound();
                showRoyalToast("Gaun Pink Kerajaan Berganti", `Kini mengenakan palet putri: ${opt.innerText.trim()}`);
            }
        });
    });

    function applyRoyalTheme(themeName) {
        if (!themeName) return;
        document.documentElement.setAttribute('data-theme', themeName);
        try {
            localStorage.setItem('royal_pink_theme', themeName);
        } catch (e) {}

        themeOptions.forEach(opt => {
            if (opt.getAttribute('data-theme-set') === themeName) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }
}

/* ===================================================================
   2. MAGIC WAND PINK SPARKLE ENGINE (CANVAS - TOUCH & MOUSE)
   =================================================================== */
function initMagicSparkleEngine() {
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let width = canvas.width = window.innerWidth || 800;
    let height = canvas.height = window.innerHeight || 600;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth || 800;
        height = canvas.height = window.innerHeight || 600;
    });

    const sparkleColors = ['#ff758f', '#ffb3c6', '#ffe5ec', '#ffffff', '#ffd166', '#ff4d6d', '#ff85a1'];

    class RoyalSparkle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3.5 + 1.5;
            this.speedX = (Math.random() - 0.5) * 1.8;
            this.speedY = (Math.random() - 0.5) * 1.8 - 0.4;
            this.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
            this.alpha = 1;
            this.decay = Math.random() * 0.025 + 0.02;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 6;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= this.decay;
            this.rotation += this.rotationSpeed;
            if (this.size > 0.2) this.size -= 0.03;
        }

        draw() {
            if (!ctx) return;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(this.alpha, 0);

            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;

            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
                ctx.lineTo(
                    Math.cos((i * 90 * Math.PI) / 180) * this.size * 2,
                    Math.sin((i * 90 * Math.PI) / 180) * this.size * 2
                );
                ctx.lineTo(
                    Math.cos(((i * 90 + 45) * Math.PI) / 180) * (this.size * 0.6),
                    Math.sin(((i * 90 + 45) * Math.PI) / 180) * (this.size * 0.6)
                );
            }
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }
    }

    function addSparkles(x, y, count = 2) {
        if (particles.length > 40) return;
        for (let i = 0; i < count; i++) {
            particles.push(new RoyalSparkle(x, y));
        }
    }

    window.addEventListener('mousemove', (e) => {
        addSparkles(e.clientX, e.clientY, 2);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            addSparkles(e.touches[0].clientX, e.touches[0].clientY, 1);
        }
    }, { passive: true });

    function renderSparkles() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(renderSparkles);
    }
    renderSparkles();
}

/* ===================================================================
   3. MINIMAP & PINK REALM PROGRESS HUD
   =================================================================== */
function initMinimapAndScrollHUD() {
    const header = document.getElementById('royalHeader');
    const chambers = document.querySelectorAll('.chamber-section');
    const navLinks = document.querySelectorAll('.realm-link');
    const activeLabel = document.getElementById('activeChamberName');
    const minimapProgress = document.getElementById('minimapProgress');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
        const progressPct = Math.min((scrollY / maxScroll) * 100, 100);

        if (minimapProgress) {
            minimapProgress.style.width = `${Math.max(progressPct, 15)}%`;
        }

        if (header) {
            if (scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        let activeTitle = 'The Pink Throne Room';
        let currentId = 'throne-room';

        chambers.forEach(chamber => {
            const chamberTop = chamber.offsetTop - 180;
            const chamberHeight = chamber.clientHeight;
            if (scrollY >= chamberTop && scrollY < chamberTop + chamberHeight) {
                activeTitle = chamber.getAttribute('data-title') || 'The Pink Throne Room';
                currentId = chamber.getAttribute('id') || 'throne-room';
            }
        });

        if (activeLabel) {
            activeLabel.textContent = activeTitle;
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/* ===================================================================
   4. 3D TILT & HOLOGRAPHIC FOIL INTERACTION
   =================================================================== */
function init3DTiltEffects() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 1024) return;

    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

            const glare = el.querySelector('.foil-glare');
            if (glare) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 182, 193, 0.3) 0%, transparent 60%)`;
            }
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });
}

/* ===================================================================
   5. ROYAL AUDIO SYNTHESIZER (Web Audio API)
   =================================================================== */
let audioCtx = null;

function getAudioContext() {
    try {
        if (!audioCtx) {
            const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
            if (AudioCtxClass) {
                audioCtx = new AudioCtxClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    } catch (e) {
        return null;
    }
}

function initRoyalAudioSynth() {
    const chimeBtn = document.getElementById('chimeBtn');
    if (chimeBtn) {
        chimeBtn.addEventListener('click', () => {
            playRoyalChimeChord();
            showRoyalToast("Lonceng Putri", "Melodi lonceng istana merah muda berkumandang!");
        });
    }
}

function playChimeSingle(freq, duration = 0.4) {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

function playRoyalChimeChord() {
    const freqs = [698.46, 880.00, 1046.50, 1318.51, 1567.98];
    freqs.forEach((f, idx) => {
        setTimeout(() => playChimeSingle(f, 0.7), idx * 120);
    });
}

function playMagicalWhooshSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.25);

        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
}

function playWaxStampThud() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(130, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
}

/* ===================================================================
   6. PROJECT FILTER RIBBON
   =================================================================== */
function initProjectFilterRibbon() {
    const filterButtons = document.querySelectorAll('.ribbon-btn');
    const projectCards = document.querySelectorAll('.foil-project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter') || 'all';

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ===================================================================
   7. PINK WAX SEAL WORKSHOP & FORM STAMPING
   =================================================================== */
let selectedWaxColor = 'rose';
const waxColorThemes = {
    rose: ['#ff758f', '#ffb3c6', '#ffe5ec', '#ffd166'],
    gold: ['#ffd166', '#fff0be', '#f3d078', '#ffffff'],
    magenta: ['#ff2a6d', '#ff758f', '#c9184a', '#ffffff'],
    pastel: ['#ffb3c6', '#ffc2d1', '#ffe5ec', '#ff85a1']
};

function initWaxSealWorkshop() {
    const swatches = document.querySelectorAll('.wax-swatch-btn');
    const form = document.getElementById('audiencesForm');
    const submitBtn = document.getElementById('stampSubmitBtn');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            selectedWaxColor = swatch.getAttribute('data-wax') || 'rose';
            playChimeSingle(650, 0.15);
        });
    });

    if (form && submitBtn) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nobleNameInput = document.getElementById('nobleName');
            const nobleName = nobleNameInput ? nobleNameInput.value : 'Bangsawan';

            submitBtn.style.transform = 'scale(0.95)';
            submitBtn.style.opacity = '0.85';
            playWaxStampThud();

            setTimeout(() => {
                submitBtn.style.transform = 'none';
                submitBtn.style.opacity = '1';

                try {
                    if (typeof confetti === 'function') {
                        confetti({
                            particleCount: window.innerWidth < 768 ? 60 : 100,
                            spread: 75,
                            origin: { y: 0.65 },
                            colors: waxColorThemes[selectedWaxColor] || waxColorThemes.rose
                        });
                    }
                } catch (err) {}

                playRoyalChimeChord();

                showRoyalToast(
                    "🌸 Meterai Lilin Pink Dipatri!",
                    `Salam manis Yang Mulia ${nobleName}, surat Anda telah dimeteraikan dengan lilin ${selectedWaxColor.toUpperCase()} dan dibawa terbang merpati istana!`
                );

                form.reset();
            }, 450);
        });
    }
}

/* ===================================================================
   8. MODALS: PROJECT SHOWCASE & CV DECREE
   =================================================================== */
function initDecreeModals() {
    const cvModalBtn = document.getElementById('cvModalBtn');
    if (cvModalBtn) {
        cvModalBtn.addEventListener('click', () => openCvModal());
    }
}

function openRoyalShowcase(title, description, tags, imgUrl, liveUrl) {
    const modal = document.getElementById('showcaseModal');
    const modalTitle = document.getElementById('showcaseTitle');
    const modalDesc = document.getElementById('showcaseDesc');
    const modalImg = document.getElementById('showcaseImg');
    const modalTags = document.getElementById('showcaseTags');
    const modalLink = document.getElementById('showcaseLink');

    if (!modal) return;

    if (modalTitle) modalTitle.textContent = title || 'Mahakarya Kerajaan';
    if (modalDesc) modalDesc.textContent = description || '';
    if (modalImg && imgUrl) modalImg.src = imgUrl;
    if (modalLink) modalLink.href = liveUrl || '#';

    if (modalTags) {
        modalTags.innerHTML = '';
        const tagList = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',') : []);
        tagList.forEach(t => {
            const span = document.createElement('span');
            span.textContent = t.trim();
            modalTags.appendChild(span);
        });
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    playMagicalWhooshSound();
}

function closeRoyalShowcase() {
    const modal = document.getElementById('showcaseModal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

function openCvModal() {
    const cvModal = document.getElementById('cvModal');
    if (cvModal) {
        cvModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        playMagicalWhooshSound();
    }
}

function closeCvModal() {
    const cvModal = document.getElementById('cvModal');
    if (cvModal) {
        cvModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('click', (e) => {
    const showcase = document.getElementById('showcaseModal');
    const cv = document.getElementById('cvModal');

    if (e.target === showcase) closeRoyalShowcase();
    if (e.target === cv) closeCvModal();
});

/* ===================================================================
   9. MOBILE NAVIGATION DRAWER
   =================================================================== */
function initMobileNav() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('royalNav');
    const navLinks = document.querySelectorAll('.realm-link');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            if (nav.classList.contains('open')) {
                if (icon) icon.className = 'fa-solid fa-xmark';
                document.body.style.overflow = 'hidden';
            } else {
                if (icon) icon.className = 'fa-solid fa-bars-staggered';
                document.body.style.overflow = 'auto';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                document.body.style.overflow = 'auto';
                const icon = menuBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars-staggered';
            });
        });
    }
}

/* ===================================================================
   10. DATA-ATTRIBUTE BUTTON BINDING (SAFETY FALLBACK)
   =================================================================== */
function initDataAttributeInspectButtons() {
    const inspectButtons = document.querySelectorAll('.inspect-btn');
    inspectButtons.forEach(btn => {
        if (!btn.getAttribute('onclick')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.foil-project-card');
                if (!card) return;
                const title = card.querySelector('.card-name')?.textContent || 'Project';
                const desc = card.querySelector('.card-desc')?.textContent || '';
                const img = card.querySelector('.card-media img')?.src || '';
                const tagEls = card.querySelectorAll('.card-tags span');
                const tags = Array.from(tagEls).map(el => el.textContent);
                openRoyalShowcase(title, desc, tags, img, 'https://example.com');
            });
        }
    });
}

/* ===================================================================
   11. ROYAL TOAST SYSTEM
   =================================================================== */
function showRoyalToast(heading, message) {
    const toast = document.getElementById('royalToast');
    const toastHeading = document.getElementById('toastHeading');
    const toastParagraph = document.getElementById('toastParagraph');

    if (!toast) return;

    if (toastHeading) toastHeading.textContent = heading || 'Titah Istana';
    if (toastParagraph) toastParagraph.textContent = message || '';

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

