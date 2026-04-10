function login(){
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user === "kanishka" && pass === "03052014"){
        window.location.href = "countdown.html";
    } else {
        document.getElementById("error").innerText = "Wrong login";
    }
}

// Countdown Logic
let count = 5;

if(document.getElementById("count")){
    let counter = setInterval(() => {
        count--;
        document.getElementById("count").innerText = count;

        if(count == 0){
            clearInterval(counter);
            window.location.href = "main.html";
        }
    }, 1000);
}


// Quiz Logic
let questions = [
    {
        question: "What is your bro's favorite dish?",
        options: ["Dosa", "Biryani", "Patha", "Poori"],
        answer: "Dosa"
    },
    {
        question: "What is your next travel plan?",
        options: ["Thiruvanamalai", "Madurai", "Chennai", "Stay home"],
        answer: "Stay home"
    },
    {
        question: "On which day were you born?",
        options: ["Sunday", "Monday", "Wednesday", "Saturday"],
        answer: "Saturday"
    },
    {
        question: "What is your feeling around your siblings?",
        options: ["Anger", "Sad", "Happy", "Sweet"],
        answer: "Anger"
    },
    {
        question: "What is your next buy thing?",
        options: ["Car", "Smart TV", "Large bed", "Single sofa"],
        answer: "Smart TV"
    },
    {
        question: "Who do you like most?",
        options: ["Mom", "Bro", "Dad", "Friends"],
        answer: "Dad"
    }
];

let current = 0;
let score = 0;
let answered = false;

function loadQuestion(){
    if(!document.getElementById("question")) return;
    
    answered = false;
    let q = questions[current];
    document.getElementById("question").innerText = q.question;
    
    let optionsHTML = "";
    
    q.options.forEach((option, index) => {
        optionsHTML += `<button id="opt-${index}" class="option-btn" onclick="checkAnswer('${option}', 'opt-${index}')">${option}</button>`;
    });
    
    document.getElementById("options").innerHTML = optionsHTML;
}

function checkAnswer(answer, optionId){
    if(answered) return; // Prevent multiple clicks
    answered = true;
    
    let isCorrect = (answer === questions[current].answer);
    
    let btn = document.getElementById(optionId);
    if(isCorrect){
        score++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        
        // Highlight correct option
        let q = questions[current];
        let options = document.getElementsByClassName('option-btn');
        for(let i=0; i<options.length; i++){
            if(options[i].innerText === q.answer){
                options[i].classList.add('correct');
            }
        }
    }
}

function nextQuestion(){
    if(!answered && document.getElementById("question")) {
        // Optional: Force them to answer!
        // return; 
    }

    current++;
    
    if(current < questions.length){
        loadQuestion();
    }
    else{
        const quizBox = document.getElementById("quiz-box");
        quizBox.innerHTML = `
            <div class="glass-panel" style="text-align:center;">
                <h2 class="gradient-text">Quiz Completed! 🎉</h2>
                <p class="subtitle">You did great!</p>
            </div>
        `;
        document.getElementById("score").innerText = "Final Score: " + score + "/" + questions.length;
        document.getElementById("score").classList.add('pulse-glow');
    }
}

function showGiftImages(){
    const images = document.getElementById('gift-images');
    const btn = document.getElementById('gift-btn');
    if(!images || !btn) return;

    images.classList.remove('hidden');
    btn.disabled = true;
    btn.innerText = 'Enjoy your gift! 🎉';
    btn.classList.remove('pulse-glow');
    btn.style.opacity = '0.8';
    btn.style.cursor = 'default';

    images.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Swipe support for quiz section
let touchStartX = 0;
const swipeThreshold = 60; // required swipe distance in px

function setupQuizSwipe(){
    const quizBox = document.getElementById('quiz-box');
    if(!quizBox) return;

    quizBox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    quizBox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const dx = touchEndX - touchStartX;

        if (dx < -swipeThreshold) {
            // swipe left: next question
            nextQuestion();
        } else if (dx > swipeThreshold) {
            // swipe right: previous question (if not first)
            if (current > 0 && !document.getElementById('score').classList.contains('pulse-glow')) {
                current--;
                loadQuestion();
            }
        }
    }, { passive: true });

    // Optional desktop drag support
    let pointerStartX = 0;
    quizBox.addEventListener('pointerdown', (e) => {
        pointerStartX = e.clientX;
    });
    quizBox.addEventListener('pointerup', (e) => {
        const dx = e.clientX - pointerStartX;
        if (dx < -swipeThreshold) nextQuestion();
        else if (dx > swipeThreshold && current > 0 && !document.getElementById('score').classList.contains('pulse-glow')) {
            current--;
            loadQuestion();
        }
    });
}

// Initialize
if(document.getElementById("question")){
    loadQuestion();
    setupQuizSwipe();
}

// Typing effect logic
function applyTypingEffect(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    // Spread operator correctly handles emoji characters
    const chars = [...el.innerText.trim()];
    el.innerHTML = "";
    
    for (let char of chars) {
        let span = document.createElement("span");
        if (char === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.innerText = char;
        }
        span.style.opacity = "0";
        el.appendChild(span);
    }
    
    let cursor = document.createElement("span");
    cursor.innerText = "|";
    cursor.classList.add("cursor");
    el.appendChild(cursor);

    let spans = el.querySelectorAll("span:not(.cursor)");
    
    function startTypingCycle() {
        let i = 0;
        // Reset all characters to invisible
        spans.forEach(span => span.style.opacity = "0");
        
        function typeWriter() {
            if (i < spans.length) {
                spans[i].style.opacity = "1";
                i++;
                // Slight random delay for realism
                let delay = Math.random() * 50 + 80; 
                setTimeout(typeWriter, delay);
            } else {
                // Pause for 3 seconds, then restart the cycle
                setTimeout(startTypingCycle, 3000); 
            }
        }
        setTimeout(typeWriter, 400); // Start typing phase
    }
    
    startTypingCycle(); // Kick off the loop
}

document.addEventListener("DOMContentLoaded", () => {
    applyTypingEffect("login-heading");
    applyTypingEffect("logo-heading");
});
