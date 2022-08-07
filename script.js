const startGameBtn = document.querySelector('.start-btn')
const nextBtn = document.querySelector('.next-btn')
const questionContainer = document.querySelector('.quesion-container')
const quesionElement = document.querySelector('.question')
const answersContainer = document.querySelector('.answers-container')

let shuffledQuestions
let currentQuestion

startGameBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
    currentQuestion++
    setNextQuestion()
})

function startGame() {
    startGameBtn.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestion = 0
    questionContainer.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestion])
}

function showQuestion(question) {
    quesionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer-btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }   
        button.addEventListener('click', selectAnswer)
        answersContainer.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while(answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild)
    }
}

function selectAnswer(e) {
    const selectedAnswer = e.target
    const correct = selectedAnswer.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answersContainer.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestion + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startGameBtn.innerText = "Restart"
        startGameBtn.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
      question: 'What is 2 + 2?',
      answers: [
        { text: '4', correct: true },
        { text: '22', correct: false },
        { text: 'Why me?', correct: false },
        { text: '1024', correct: false }
      ]
    },
    {
      question: 'Who is the best YouTuber?',
      answers: [
        { text: 'Web Dev Simplified', correct: true },
        { text: 'Traversy Media', correct: true },
        { text: 'Dev Ed', correct: true },
        { text: 'Fun Fun Function', correct: true }
      ]
    },
    {
      question: 'Is web development fun?',
      answers: [
        { text: 'Kinda', correct: false },
        { text: 'YES!!!', correct: true },
        { text: 'Um no', correct: false },
        { text: 'IDK', correct: false }
      ]
    },
    {
      question: 'What is 4 * 2?',
      answers: [
        { text: '6', correct: false },
        { text: '8', correct: true },
        { text: '2', correct: false },
        { text: 'klapaucius', correct: false },
      ]
    }
  ]