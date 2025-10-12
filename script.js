document.addEventListener('DOMContentLoaded', function() {

    // --- LOCKED: YOUR WORKING LETTER GLITCH BACKGROUND EFFECT ---
    const initLetterGlitchBackground = () => {
        const canvas = document.getElementById('letter-glitch-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let letters = [];
        let grid = { columns: 0, rows: 0 };
        let lastGlitchTime = Date.now();
        let animationFrameId;

        const config = {
            glitchColors: ['#2b4539', '#61dca3', '#61b3dc'],
            glitchSpeed: 50,
            characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
            fontSize: 14,
            charWidth: 10,
            charHeight: 18,
        };

        const getRandomChar = () => config.characters[Math.floor(Math.random() * config.characters.length)];
        const getRandomColor = () => config.glitchColors[Math.floor(Math.random() * config.glitchColors.length)];

        const calculateGrid = (width, height) => {
            const columns = Math.ceil(width / config.charWidth);
            const rows = Math.ceil(height / config.charHeight);
            return { columns, rows };
        };

        const initializeLetters = (columns, rows) => {
            grid = { columns, rows };
            const totalLetters = columns * rows;
            letters = Array.from({ length: totalLetters }, () => ({
                char: getRandomChar(),
                color: getRandomColor(),
            }));
        };

        const drawLetters = () => {
            if (!ctx || letters.length === 0) return;
            const { width, height } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);
            ctx.font = `${config.fontSize}px monospace`;
            ctx.textBaseline = 'top';

            letters.forEach((letter, index) => {
                const x = (index % grid.columns) * config.charWidth;
                const y = Math.floor(index / grid.columns) * config.charHeight;
                ctx.fillStyle = letter.color;
                ctx.fillText(letter.char, x, y);
            });
        };
        
        const updateLetters = () => {
             if (!letters || letters.length === 0) return;
             const updateCount = Math.max(1, Math.floor(letters.length * 0.01)); 
             for (let i = 0; i < updateCount; i++) {
                 const index = Math.floor(Math.random() * letters.length);
                 if (letters[index]) {
                     letters[index].char = getRandomChar();
                     letters[index].color = getRandomColor();
                 }
             }
        };

        const animate = () => {
            const now = Date.now();
            if (now - lastGlitchTime >= config.glitchSpeed) {
                updateLetters();
                drawLetters();
                lastGlitchTime = now;
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const resizeCanvas = () => {
            cancelAnimationFrame(animationFrameId);
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const { columns, rows } = calculateGrid(rect.width, rect.height);
            initializeLetters(columns, rows);
            animate();
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
    };

    initLetterGlitchBackground();


    // --- SMOOTH SCROLL FOR ALL NAV LINKS ---
    document.querySelectorAll('nav a, .mobile-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const mobileNav = document.querySelector('.mobile-nav');
            const hamburger = document.querySelector('.hamburger-menu');
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                hamburger.classList.remove('active');
            }
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // --- HERO: SMOOTH SLIDE-UP ANIMATION FOR NAME ---
    const heroTitle = document.querySelector('.split-text');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = ''; 
        
        text.split('').forEach(char => {
            const wrapper = document.createElement('span');
            wrapper.className = 'char-wrapper';
            
            const inner = document.createElement('span');
            inner.className = 'char';
            inner.textContent = char;

            if (char === ' ') {
                wrapper.style.width = '1rem';
            }
            
            wrapper.appendChild(inner);
            heroTitle.appendChild(wrapper);
        });

        heroTitle.style.visibility = 'visible';

        gsap.to(".split-text .char", {
            y: 0, 
            opacity: 1, 
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.05, 
        });
    }


    // --- HERO: CHARACTER SCRAMBLE ANIMATION FOR SUBTITLE ---
    const shuffleTextElement = document.querySelector('.shuffle-text');
    if (shuffleTextElement) {
        const originalText = shuffleTextElement.textContent;
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        
        shuffleTextElement.innerHTML = ''; 
        
        originalText.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            shuffleTextElement.appendChild(span);
        });

        const spans = shuffleTextElement.querySelectorAll('span');
        
        spans.forEach((span, index) => {
            const originalChar = span.textContent;
            
            if (originalChar === ' ') {
                return;
            }

            let scrambleInterval;
            
            setTimeout(() => {
                let counter = 0;
                scrambleInterval = setInterval(() => {
                    span.textContent = chars[Math.floor(Math.random() * chars.length)];
                    counter++;
                    if (counter > 5) { 
                        clearInterval(scrambleInterval);
                        span.textContent = originalChar;
                    }
                }, 50);
            }, 1000 + (index * 75)); 
        });
    }


    // --- HERO: CIRCULAR TEXT ANIMATION ---
    const circularTextContent = document.getElementById('circular-text-content');
    if (circularTextContent) {
        circularTextContent.textContent = "- CYBER WORLD - CYBER WORLD ";
    }
    
    
    // --- MAGNETIC BUTTON EFFECT ---
    document.querySelectorAll('.magnet-button-wrapper').forEach(wrapper => {
        const button = wrapper.querySelector('.magnet-button');
        const magnetStrength = 25;
        const padding = 75;

        wrapper.addEventListener('mousemove', e => {
            const rect = wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distX = Math.abs(centerX - e.clientX);
            const distY = Math.abs(centerY - e.clientY);

            if (distX < rect.width / 2 + padding && distY < rect.height / 2 + padding) {
                const offsetX = (e.clientX - centerX) / (magnetStrength / 10);
                const offsetY = (e.clientY - centerY) / (magnetStrength / 10);
                gsap.to(button, {
                    x: offsetX,
                    y: offsetY,
                    duration: 0.3,
                    ease: 'power3.out'
                });
            } else {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        });

        wrapper.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // --- HERO: CONTACT BUTTON SCROLL ---
    const heroContactButton = document.querySelector('#hero .magnet-button');
    const contactSection = document.querySelector('#contact');

    if (heroContactButton && contactSection) {
        heroContactButton.addEventListener('click', function(e) {
            e.preventDefault();
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }


    // --- ABOUT: TYPING TEXT EFFECT ---
    const typingTextElement = document.querySelector('.typing-text');
    if (typingTextElement) {
        const text = typingTextElement.textContent;
        typingTextElement.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                typingTextElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 75);
            } else {
                const cursor = document.createElement('span');
                cursor.className = 'typing-text-cursor';
                cursor.textContent = '|';
                typingTextElement.appendChild(cursor);
            }
        };

        ScrollTrigger.create({
            trigger: typingTextElement,
            start: "top 80%",
            onEnter: () => typeWriter(),
            once: true
        });
    }

    // --- ABOUT: PROXIMITY FONT WEIGHT EFFECT (UPDATED FOR WORD WRAP) ---
    const proximityText = document.querySelector('.proximity-text');
    if (proximityText) {
        const originalText = proximityText.textContent;
        proximityText.textContent = ''; 
        let allLetterSpans = []; 

        const words = originalText.trim().split(/\s+/);

        words.forEach((word, index) => {
            const wordWrapper = document.createElement('span');
            wordWrapper.className = 'word-wrapper';

            const letterSpans = word.split('').map(char => {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = char;
                wordWrapper.appendChild(span);
                return span;
            });

            allLetterSpans = allLetterSpans.concat(letterSpans);
            proximityText.appendChild(wordWrapper);

            if (index < words.length - 1) {
                proximityText.appendChild(document.createTextNode(' '));
            }
        });

        const radius = 150;
        const proximityContainer = document.querySelector('.proximity-container');

        const updateFontWeight = e => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            allLetterSpans.forEach(span => {
                const rect = span.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt(Math.pow(centerX - mouseX, 2) + Math.pow(centerY - mouseY, 2));

                if (distance < radius) {
                    const weight = 400 + (1 - distance / radius) * 600;
                    span.style.fontVariationSettings = `'wght' ${weight}`;
                } else {
                    span.style.fontVariationSettings = `'wght' 400`;
                }
            });
        };
        
        proximityContainer.addEventListener('mousemove', updateFontWeight);
        proximityContainer.addEventListener('mouseleave', () => {
             allLetterSpans.forEach(span => {
                span.style.fontVariationSettings = `'wght' 400`;
            });
        });
    }

    // --- ABOUT: FOCUS BOX ANIMATION ---
    const focusTextContainer = document.querySelector('.focus-box-container');
    if (focusTextContainer && window.gsap) {
        const focusTextElement = focusTextContainer.querySelector('.focus-text');
        const focusBox = focusTextContainer.querySelector('.focus-box');
        
        const words = focusTextElement.textContent.trim().split(' ');
        focusTextElement.textContent = '';
        
        const wordSpans = words.map(word => {
            const span = document.createElement('span');
            span.textContent = word;
            focusTextElement.appendChild(span);
            return span;
        });

        if (wordSpans.length > 1) {
            focusTextElement.insertBefore(document.createTextNode(' '), wordSpans[1]);
        }

        function moveFocus(targetSpan, blurSpan) {
            const targetRect = targetSpan.getBoundingClientRect();
            const containerRect = focusTextContainer.getBoundingClientRect();
            
            gsap.to(focusBox, {
                width: targetRect.width,
                left: targetRect.left - containerRect.left,
                duration: 0.4,
                ease: 'power3.inOut'
            });

            gsap.to(targetSpan, { 
                filter: 'blur(0px)', 
                duration: 0.4, 
                ease: 'power3.inOut' 
            });
            gsap.to(blurSpan, { 
                filter: 'blur(5px)', 
                duration: 0.4, 
                ease: 'power3.inOut' 
            });
        }
        
        setTimeout(() => {
            gsap.set(wordSpans[1], { filter: 'blur(5px)' });
            moveFocus(wordSpans[0], wordSpans[1]);

            gsap.timeline({
                repeat: -1, 
                repeatDelay: 1.5 
            })
            .call(moveFocus, [wordSpans[1], wordSpans[0]], '+=1.5')
            .call(moveFocus, [wordSpans[0], wordSpans[1]], '+=1.5');
        }, 100);
    }
    
    // --- FORMSPREE SUBMISSION HANDLING ---
    const contactForm = document.querySelector('#contact form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const submitButton = form.querySelector('.magnet-button');
            const originalButtonText = submitButton.textContent;

            submitButton.textContent = 'Sending...';

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    submitButton.textContent = 'Thank You!';
                    form.reset();
                } else {
                    response.json().then(data => {
                        submitButton.textContent = 'Error!';
                        console.error('Form submission error:', data);
                    })
                }
            }).catch(error => {
                submitButton.textContent = 'Error!';
                console.error('Network error:', error);
            }).finally(() => {
                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                }, 3000);
            });
        });
    }

    // --- MOBILE MENU LOGIC ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if(hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
});