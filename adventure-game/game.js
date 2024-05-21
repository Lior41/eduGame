document.getElementById('start-btn').addEventListener('click', startGame);

let score = 0;
let consoleMessages = [];

(function () {
    const oldLog = console.log;
    console.log = function (message) {
        consoleMessages.push(message);
        oldLog.apply(console, arguments);
    };
})();

function playSuccessSound() {
    document.getElementById('success-sound').play();
}

function playErrorSound() {
    document.getElementById('error-sound').play();
}

function showSuccessAnimation() {
    const container = document.getElementById('game-container');
    container.classList.add('success');
    setTimeout(() => container.classList.remove('success'), 500);
}

function showErrorAnimation() {
    const container = document.getElementById('game-container');
    container.classList.add('error');
    setTimeout(() => container.classList.remove('error'), 500);
}

function updateScore(points) {
    score += points;
    document.getElementById('score').innerText = `Score: ${score}`;
}

function addBadge(badgeText) {
    const badge = document.createElement('span');
    badge.innerText = badgeText;
    badge.classList.add('badge');
    document.getElementById('badges').appendChild(badge);
}

function levelSuccess(message, points, badgeText) {
    playSuccessSound();
    showSuccessAnimation();
    updateScore(points);
    addBadge(badgeText);
    document.getElementById('level-description').innerText = message;
    document.getElementById('next-level-btn').style.display = 'block';
}

function levelError(message) {
    playErrorSound();
    showErrorAnimation();
    document.getElementById('level-description').innerText = message;
}

function startGame() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('story').innerText = "Level 1: Learning Variables";
    document.getElementById('level-description').innerText = "You need to declare a variable named 'provisions' and set it to 10. Open your console (F12) and type: let provisions = 10;";
    document.getElementById('game-interface').style.display = 'block';
    checkLevel1();
}

function checkLevel1() {
    let interval = setInterval(() => {
        if (typeof provisions !== 'undefined' && provisions === 10) {
            clearInterval(interval);
            levelSuccess("Well done! You have declared a variable.", 10, "Level 1 Complete");
            document.getElementById('next-level-btn').addEventListener('click', startLevel2);
        }
    }, 1000);
}

function startLevel2() {
    document.getElementById('next-level-btn').style.display = 'none';
    document.getElementById('level-description').innerText = "Level 2: Using Conditions. Type: if (provisions > 5) { console.log('You take the long route.'); } else { console.log('You take the short route.'); }";
    checkLevel2();
}

function checkLevel2() {
    let interval = setInterval(() => {
        try {
            if ((provisions > 5 && consoleMessages.includes('You take the long route.')) ||
                (provisions <= 5 && consoleMessages.includes('You take the short route.'))) {
                clearInterval(interval);
                levelSuccess("Great job! You have used a condition.", 10, "Level 2 Complete");
                document.getElementById('next-level-btn').addEventListener('click', startLevel3);
            }
        } catch (e) {
            levelError("Try again!");
        }
    }, 1000);
}

function startLevel3() {
    document.getElementById('next-level-btn').style.display = 'none';
    document.getElementById('level-description').innerText = "Level 3: Using Loops. Create an array of items and use a loop to print each item to the console. Example: let items = ['sword', 'shield', 'potion']; for (let i = 0; i < items.length; i++) { console.log(items[i]); }";
    checkLevel3();
}

function checkLevel3() {
    let interval = setInterval(() => {
        try {
            if (items && items.length > 0 && consoleMessages.length >= items.length && consoleMessages.every(msg => items.includes(msg))) {
                clearInterval(interval);
                levelSuccess("Well done! You have used a loop.", 10, "Level 3 Complete");
                document.getElementById('next-level-btn').addEventListener('click', startLevel4);
            }
        } catch (e) {
            levelError("Try again!");
        }
    }, 1000);
}

function startLevel4() {
    document.getElementById('next-level-btn').style.display = 'none';
    document.getElementById('level-description').innerText = "Level 4: Functions. Write a function named 'heal' that takes one parameter 'amount' and logs 'Healed for {amount}' to the console. Example: function heal(amount) { console.log('Healed for ' + amount); }";
    checkLevel4();
}

function checkLevel4() {
    let interval = setInterval(() => {
        try {
            if (typeof heal === 'function' && consoleMessages.includes('Healed for 10')) {
                clearInterval(interval);
                levelSuccess("Great job! You have written a function.", 10, "Level 4 Complete");
                document.getElementById('next-level-btn').addEventListener('click', startLevel5);
            }
        } catch (e) {
            levelError("Try again!");
        }
    }, 1000);
}

function startLevel5() {
    document.getElementById('next-level-btn').style.display = 'none';
    document.getElementById('level-description').innerText = "Level 5: DOM Manipulation. Create a new <div> element with the text 'Hello, world!' and append it to the body. Example: let div = document.createElement('div'); div.innerText = 'Hello, world!'; document.body.appendChild(div);";
    checkLevel5();
}

function checkLevel5() {
    let interval = setInterval(() => {
        try {
            let divs = document.querySelectorAll('div');
            if (divs && Array.from(divs).some(div => div.innerText === 'Hello, world!')) {
                clearInterval(interval);
                levelSuccess("Fantastic! You have manipulated the DOM.", 10, "Level 5 Complete");
                document.getElementById('next-level-btn').style.display = 'none';
                showFeedbackForm();
            }
        } catch (e) {
            levelError("Try again!");
        }
    }, 1000);
}

function showFeedbackForm() {
    document.getElementById('feedback-form').style.display = 'block';
}

function submitFeedback() {
    const feedback = document.getElementById('feedback').value;
    console.log('Feedback:', feedback);
    // Envoyer le feedback au serveur ou l'enregistrer localement
    alert('Thank you for your feedback!');
}
