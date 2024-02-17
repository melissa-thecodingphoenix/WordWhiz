let words = [
    { word: "freedom", hint: "A fundamental right" },
    { word: "equality", hint: "Fairness and impartiality" },
    { word: "justice", hint: "Fair treatment and judgment" },
    { word: "leadership", hint: "Guidance or direction" },
    { word: "empowerment", hint: "Authority or influence" },
    { word: "entrepreneur", hint: "Business creator" },
    { word: "success", hint: "Achievement of a goal" },
    { word: "inspiration", hint: "Stimulation of the mind" },
    { word: "perseverance", hint: "Continued effort in spite of difficulties" },
    { word: "opportunity", hint: "Favorable circumstance" },
    { word: "achievement", hint: "Accomplishment or attainment" },
    { word: "motivation", hint: "Drive to do or achieve something" },
    { word: "ambition", hint: "Desire or goal" },
    { word: "self-esteem", hint: "Self-respect or self-worth" },
    { word: "determination", hint: "Firmness of purpose" },
    { word: "community", hint: "Group of people with shared interests" },
    { word: "legacy", hint: "Something handed down from the past" },
    { word: "education", hint: "The process of receiving or giving systematic instruction" },
    { word: "innovation", hint: "Introduction of something new" },
    { word: "resilience", hint: "Ability to recover from or adjust easily to misfortune or change" }
];

let chosenWord = "";
let hint = "";
let guessedLetters = [];
let incorrectGuesses = 0;

function chooseWord() {
    let index = Math.floor(Math.random() * words.length);
    chosenWord = words[index].word;
    hint = words[index].hint;
    document.getElementById("hint").textContent = "Hint: " + hint;
}

function displayWord() {
    let wordDisplay = "";
    for (let char of chosenWord) {
        if (guessedLetters.includes(char)) {
            wordDisplay += char + " ";
        } else {
            wordDisplay += "_ ";
        }
    }
    document.getElementById("word-display").textContent = wordDisplay;
}

function checkGuess(guess) {
    if (guessedLetters.includes(guess)) {
        return;
    }
    
    if (chosenWord.includes(guess)) {
        guessedLetters.push(guess);
        displayWord();
        if (chosenWord.split("").every(letter => guessedLetters.includes(letter))) {
            alert("Congratulations! You've guessed the word: " + chosenWord);
            resetGame();
        }
    } else {
        incorrectGuesses++;
        updateHangman();
        document.getElementById("incorrect-guesses").textContent = incorrectGuesses;
        if (incorrectGuesses === 6) {
            alert("Game Over! The word was: " + chosenWord);
            resetGame();
        }
    }
}

function resetGame() {
    guessedLetters = [];
    incorrectGuesses = 0;
    document.getElementById("incorrect-guesses").textContent = incorrectGuesses;
    chooseWord();
    displayWord();
    document.getElementById("hangman-img").src = "hangman0.png";
}

function guess() {
    let guessInput = document.getElementById("guess-input").value.toLowerCase();
    if (guessInput.length === 1) {
        checkGuess(guessInput);
    } else if (guessInput === chosenWord) {
        alert("Congratulations! You've guessed the word: " + chosenWord);
        resetGame();
    } else {
        alert("Incorrect guess!");
        incorrectGuesses++;
        updateHangman();
        document.getElementById("incorrect-guesses").textContent = incorrectGuesses;
        if (incorrectGuesses === 6) {
            alert("Game Over! The word was: " + chosenWord);
            resetGame();
        }
    }
    document.getElementById("guess-input").value = "";
}

function updateHangman() {
    let hangmanImg = document.getElementById("hangman-img");
    let hangmanIndex = incorrectGuesses;
    hangmanImg.src = "hangman" + hangmanIndex + ".svg";
}

chooseWord();
displayWord();