const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
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
      question: 'Who is the main character of `Umineko When they cry`?',
      answers: [
        { text: 'Ange', correct: false },
        { text: 'Beatrice', correct: false },
        { text: 'Rika', correct: false },
        { text: 'Battler', correct: true }
      ]
    },
    {
      question: 'What element does `O` represent on the periodic table?',
      answers: [
        { text: 'Oracle', correct: false },
        { text: 'Oxygen', correct: true },
        { text: 'Oxide', correct: false },
        { text: 'Ohio', correct: false }
      ]
    },
    {
      question: 'Who played `Chandler Bing` in FRIENDS?',
      answers: [
        { text: 'David Schiwmmer', correct: false },
        { text: 'Matt le Blance', correct: false },
        { text: 'Matthew Perry', correct: true },
        { text: 'Paul Rudd', correct: false }
      ]
    },
    {
      question: 'Which was Anime of the Year in 2023?',
      answers: [
        { text: 'Bleach: TYBW', correct: false },
        { text: 'Attack on Titan', correct: false },
        { text: 'Summertime Rendering', correct: false },
        { text: 'Cyberpunk Edgerunners', correct: true }
      ]
    },
    {
        question: 'Which planet has the most moons?',
        answers: [
          { text: 'Saturn', correct: true },
          { text: 'Jupiter', correct: false },
          { text: 'Earth', correct: false },
          { text: 'Uranus', correct: false }
        ]
    }
  ]