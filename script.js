// Quiz Questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctAnswer: 3
    },
    {
        question: "What year was JavaScript launched?",
        options: ["1996", "1995", "1994", "none of the above"],
        correctAnswer: 1
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals Motorboats Lamborginis"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of these is a JavaScript framework?",
        options: ["React", "Django", "Flask", "Laravel"],
        correctAnswer: 0
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: 1
    },
    {
        question: "Which symbol is used for single line comments in JavaScript?",
        options: ["//", "/*", "#", "--"],
        correctAnswer: 0
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["*", "-", "=", "x"],
        correctAnswer: 2
    }
];

// DOM Elements
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const questionCountElement = document.getElementById('question-count');
const resultsContainer = document.getElementById('results-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-btn');
const scoreMessageElement = document.getElementById('score-message');

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;
let quizCompleted = false;

// Initialize the quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOptionIndex = null;
    quizCompleted = false;
    
    resultsContainer.classList.add('hidden');
    document.querySelector('.quiz-body').classList.remove('hidden');
    document.querySelector('.quiz-footer').classList.remove('hidden');
    
    showQuestion();
}

// Display current question and options
function showQuestion() {
    resetState();
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    // Update question count
    questionCountElement.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    
    // Update progress bar
    const progressPercentage = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    // Create option buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    
    // Disable next button until an option is selected
    nextButton.disabled = true;
}

// Reset the question state
function resetState() {
    selectedOptionIndex = null;
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Handle option selection
function selectOption(index) {
    selectedOptionIndex = index;
    const options = document.querySelectorAll('.option-btn');
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Disable all options
    options.forEach(option => {
        option.disabled = true;
    });
    
    // Mark selected option
    if (index === currentQuestion.correctAnswer) {
        options[index].classList.add('correct');
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[currentQuestion.correctAnswer].classList.add('correct');
    }
    
    // Enable next button
    nextButton.disabled = false;
}

// Show the next question or results
function showNextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Display final results
function showResults() {
    quizCompleted = true;
    document.querySelector('.quiz-body').classList.add('hidden');
    document.querySelector('.quiz-footer').classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    // Update score display
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = quizQuestions.length;
    
    // Add score message
    const percentage = (score / quizQuestions.length) * 100;
    let message;
    
    if (percentage >= 80) {
        message = "Excellent work! 🎉";
    } else if (percentage >= 60) {
        message = "Good job! 👍";
    } else if (percentage >= 40) {
        message = "Not bad! 😊";
    } else {
        message = "Keep practicing! 💪";
    }
    
    scoreMessageElement.textContent = message;
    
    // Update progress bar to 100%
    progressBar.style.width = '100%';
}

// Event Listeners
nextButton.addEventListener('click', showNextQuestion);
restartButton.addEventListener('click', initQuiz);

// Start the quiz
initQuiz();
