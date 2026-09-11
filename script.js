/**
 * script.js - Animaciones Premium para DevDay.256
 * Diseñado para trabajar exclusivamente con el HTML y CSS existentes.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 1. EFECTO DE "SPOTLIGHT" (Resplandor que sigue al mouse)
    // Añade una atmósfera inmersiva de terminal sin interferir con los clics.
    // =========================================================================
    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(46, 160, 67, 0.08) 0%, transparent 45%);
        z-index: 0;
        transition: background 0.1s ease;
    `;
    document.body.appendChild(spotlight);

    document.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--x', `${e.clientX}px`);
        spotlight.style.setProperty('--y', `${e.clientY}px`);
    });

    // =========================================================================
    // 2. SCROLL REVEAL (Aparición escalonada al hacer scroll)
    // Anima los elementos principales del DOM usando Web Animations API.
    // =========================================================================
    const elementsToAnimate = document.querySelectorAll('.max-w-4xl > *');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(el);
    });

    // Animación simple para header y footer
    ['header', 'footer'].forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(-20px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        }
    });

    // =========================================================================
    // 3. EFECTO DE ESCRITURA EN LA TERMINAL (Typewriter secuencial)
    // Aprovecha la clase .animate-blink ya definida en tu style.css
    // =========================================================================
    const terminalLines = document.querySelectorAll('.bg-terminal-card .font-mono p');
    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-15px)';
        line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
            
            // Añade temporalmente el cursor parpadeante al final de la línea
            const originalHTML = line.innerHTML;
            line.innerHTML = originalHTML + '<span class="animate-blink text-terminal-green ml-1">_</span>';
            
            // Elimina el cursor cuando termina la "escritura"
            setTimeout(() => {
                line.innerHTML = originalHTML;
            }, 600);
        }, 800 + (index * 700)); // Retraso escalonado
    });

    // =========================================================================
    // 4. EFECTO 3D TILT EN LA TARJETA DE TERMINAL
    // Da una sensación premium e interactiva al pasar el mouse sobre la terminal.
    // =========================================================================
    const terminalCard = document.querySelector('.bg-terminal-card.border.border-terminal-border.rounded-xl');
    if (terminalCard) {
        terminalCard.addEventListener('mousemove', (e) => {
            const rect = terminalCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -4; // Máximo 4 grados
            const rotateY = ((x - centerX) / centerX) * 4;

            terminalCard.style.transition = 'transform 0.1s ease-out';
            terminalCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        terminalCard.addEventListener('mouseleave', () => {
            terminalCard.style.transition = 'transform 0.5s ease-out';
            terminalCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    }

    // =========================================================================
    // 5. FUNCIÓN CELEBRAR MEJORADA (Countdown, Confetti y Toast)
    // Sobrescribe la función original para una experiencia épica sin alerts.
    // =========================================================================
    window.celebrar = function() {
        const counter = document.getElementById('bugs-counter');
        const btn = document.querySelector('button[onclick="celebrar()"]');
        
        // Feedback visual en el botón usando tu clase .glow-green del CSS
        if (btn) {
            btn.classList.add('glow-green');
            const originalText = btn.innerText;
            btn.innerText = '⚙️ Compilando...';
            setTimeout(() => {
                btn.classList.remove('glow-green');
                btn.innerText = originalText;
            }, 2500);
        }

        // Animación de conteo regresivo de bugs
        let currentBugs = 404;
        const interval = setInterval(() => {
            currentBugs -= Math.ceil(currentBugs / 8);
            if (currentBugs <= 0) {
                currentBugs = 0;
                clearInterval(interval);
                counter.innerText = '0 (¡Milagro!)';
                counter.classList.add('text-terminal-green');
                
                // Efecto de "pop" en el texto
                counter.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                counter.style.transform = 'scale(1.2)';
                setTimeout(() => counter.style.transform = 'scale(1)', 300);
                
                // Disparar efectos de celebración
                launchConfetti();
                showToast('☕ ¡Felicidades! Se ha simulado la entrega de una taza de café caliente a tu escritorio.');
            } else {
                counter.innerText = currentBugs;
            }
        }, 40);
    };

    // =========================================================================
    // 6. INTERACCIÓN DEL BOTÓN "COMPARTIR"
    // =========================================================================
    const shareBtn = document.querySelector('a[href="#compartir"]');
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = shareBtn.innerText;
            shareBtn.innerText = '¡Enlace copiado al portapapeles!';
            shareBtn.classList.add('text-terminal-green', 'border-terminal-green');
            
            setTimeout(() => {
                shareBtn.innerText = originalText;
                shareBtn.classList.remove('text-terminal-green', 'border-terminal-green');
            }, 2000);
            
            document.querySelector('#compartir').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // =========================================================================
    // FUNCIONES AUXILIARES DE ANIMACIÓN
    // =========================================================================

    function launchConfetti() {
        const emojis = ['☕', '💻', '⌨️', '🐛', '🎉', '✨', '🚀', '💾'];
        for (let i = 0; i < 60; i++) {
            const el = document.createElement('div');
            el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.position = 'fixed';
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top = '-50px';
            el.style.fontSize = (Math.random() * 20 + 16) + 'px';
            el.style.pointerEvents = 'none';
            el.style.zIndex = '9999';
            el.style.transition = `top ${Math.random() * 2 + 2}s ease-in, transform ${Math.random() * 2 + 2}s linear, opacity 2s ease`;
            document.body.appendChild(el);

            requestAnimationFrame(() => {
                el.style.top = '110vh';
                el.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
                el.style.opacity = '0';
            });

            setTimeout(() => el.remove(), 4000);
        }
    }

    function showToast(message) {
        const toast = document.createElement('div');
        // Usa exclusivamente clases de Tailwind ya configuradas en tu HTML
        toast.className = 'fixed bottom-8 left-1/2 transform -translate-x-1/2 translate-y-10 opacity-0 bg-terminal-card border border-terminal-green text-terminal-green px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3 font-mono text-sm md:text-base';
        toast.style.boxShadow = '0 0 30px rgba(46, 160, 67, 0.3)';
        toast.innerHTML = `<span class="text-xl">☕</span><span>${message}</span>`;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, 0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, 20px)';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
});