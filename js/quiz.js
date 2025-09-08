const quizQuestions = [
    {
        question: "Qual tag HTML é usada para criar um link?",
        options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;url&gt;"],
        correct: 1
    },
    {
        question: "Qual propriedade CSS é usada para mudar a cor do texto?",
        options: ["text-color", "font-color", "color", "text-style"],
        correct: 2
    },
    {
        question: "Como se declara uma variável em JavaScript moderno?",
        options: ["var x = 5;", "let x = 5;", "const x = 5;", "both let and const"],
        correct: 3
    },
    {
        question: "Qual seletor CSS seleciona elementos com uma classe específica?",
        options: ["#", ".", "*", "@"],
        correct: 1
    },
    {
        question: "O que significa HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Qual é a função do DOM em JavaScript?",
        options: [
            "Definir estilos CSS",
            "Criar animações",
            "Manipular elementos HTML",
            "Gerenciar banco de dados"
        ],
        correct: 2
    },
    {
        question: "O que é responsividade em design web?",
        options: [
            "Velocidade do site",
            "Adaptação a diferentes tamanhos de tela",
            "Animações suaves",
            "Interatividade com usuário"
        ],
        correct: 1
    },
    {
        question: "Qual é a melhor prática para organização de arquivos CSS?",
        options: [
            "Todos os estilos em um arquivo",
            "Um arquivo por componente",
            "Estilos inline",
            "Misturar com HTML"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function initQuiz() {
    const container = document.getElementById('quiz-container');
    showQuestion(currentQuestion);
}

function showQuestion(index) {
    const question = quizQuestions[index];
    const container = document.getElementById('quiz-container');
    
    const questionHtml = `
        <div class="question-card">
            <h2>Questão ${index + 1} de ${quizQuestions.length}</h2>
            <div class="question-content">
                <p class="question">${question.question}</p>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <button onclick="checkAnswer(${i})" class="option-button">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${((index + 1) / quizQuestions.length) * 100}%"></div>
            </div>
        </div>
    `;
    
    container.innerHTML = questionHtml;
}

function checkAnswer(answer) {
    const question = quizQuestions[currentQuestion];
    const buttons = document.querySelectorAll('.option-button');
    
    buttons.forEach(button => button.disabled = true);
    
    if (answer === question.correct) {
        score++;
        buttons[answer].classList.add('correct');
    } else {
        buttons[answer].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            showQuestion(currentQuestion);
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const container = document.getElementById('quiz-container');
    const percentage = (score / quizQuestions.length) * 100;
    
    container.innerHTML = `
        <div class="results-card">
            <h2>Resultados</h2>
            <p>Você acertou ${score} de ${quizQuestions.length} questões!</p>
            <div class="score-percentage">
                <div class="score-bar" style="width: ${percentage}%"></div>
            </div>
            <p class="score-message">${getScoreMessage(percentage)}</p>
            <button onclick="resetQuiz()" class="reset-button">Tentar Novamente</button>
        </div>
    `;
}

function getScoreMessage(percentage) {
    if (percentage === 100) return "Perfeito! Você é um expert!";
    if (percentage >= 80) return "Excelente! Você domina o assunto!";
    if (percentage >= 60) return "Bom trabalho! Continue estudando!";
    if (percentage >= 40) return "Continue praticando para melhorar!";
    return "Não desanime! Revise o conteúdo e tente novamente!";
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion(0);
}

document.addEventListener('DOMContentLoaded', initQuiz);
