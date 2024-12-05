const questions = [
    {
        question: "Qual é o maior animal do mundo?",
        answers: [
            { text: "Tubarão", correct: false },
            { text: "Baleia azul", correct: true },
            { text: "Elefante", correct: false },
            { text: "Girafa", correct: false },
        ]
    },
    {
        question: "Qual é o animal terrestre mais rápido?",
        answers: [
            { text: "Guepardo", correct: true },
            { text: "Cavalo", correct: false },
            { text: "Leão", correct: false },
            { text: "Canguru", correct: false },
        ]
    },
    {
        question: "Qual é o animal terrestre mais alto?",
        answers: [
            { text: "Girafa", correct: true },
            { text: "Elefante", correct: false },
            { text: "Cavalo", correct: false },
            { text: "Leão", correct: false },
        ]
    },
    {
        question: "Qual é a maior ave do mundo?",
        answers: [
            { text: "Avestruz", correct: true },
            { text: "Águia", correct: false },
            { text: "Pinguim", correct: false },
            { text: "Pardal", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`;
    nextButton.innerHTML = "Jogar novamente";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        showNextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();
