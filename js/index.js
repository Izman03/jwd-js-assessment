window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    startQuizTimer();
  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia?',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
  ];

  let timer; // Timer variable

  // Function to start the quiz timer
  const startQuizTimer = () => {
    const countDownTime = 60; // Countdown time in seconds
    let timeRemaining = countDownTime;
    updateTimerDisplay(timeRemaining);

    timer = setInterval(() => {
      timeRemaining--;
      updateTimerDisplay(timeRemaining);

      if (timeRemaining <= 0) {
        endQuiz();
      }
    }, 1000);
  };

  // Function to update the timer display
  const updateTimerDisplay = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timerDisplay = document.querySelector('#time');
    timerDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
  };

  // Function to pad zero to single-digit numbers
  const padZero = (num) => {
    return num < 10 ? '0' + num : num;
  };

  // Function to end the quiz and display the score
  const endQuiz = () => {
    clearInterval(timer); // Stop the timer
    calculateScore(); // Calculate the score
    showScore(); // Display the score
  };

  // Function to calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.forEach((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let r = `radio_${index}_${i}`;
        let radioElement = document.querySelector('#' + r);

        if (quizItem.a === i && radioElement.checked) {
          score++; // Increment the score if the correct answer is selected
        }
      }
    });

    return score;
  };

  // Function to display the score
  const showScore = () => {
    const score = calculateScore();
    const scoreDisplay = document.querySelector('#score');
    scoreDisplay.textContent = `Your score: ${score} out of ${quizArray.length}`;
    highlightCorrectAnswers();
  };

  // Function to highlight the correct answers
  const highlightCorrectAnswers = () => {
    quizArray.forEach((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        let liElement = document.querySelector('#' + li);
        let radioElement = document.querySelector('#' + r);

        if (quizItem.a === i) {
          liElement.style.backgroundColor = 'lightgreen'; // Highlight the correct answer
        }

        radioElement.disabled = true; // Disable the radio buttons
      }
    });
  };

  // Function to display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.forEach((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Function to reset the quiz
  const resetQuiz = () => {
    clearInterval(timer); // Stop the timer
    document.querySelector('#quizBlock').style.display = 'none';
    document.querySelector('#start').style.display = 'block';
    document.querySelector('#score').textContent = '';
    displayQuiz(); // Re-display the quiz questions
  };

  // Event listener for the submit button
  const submitBtn = document.querySelector('#btnSubmit');
  submitBtn.addEventListener('click', () => {
    endQuiz();
  });

  // Event listener for the reset button
  const resetBtn = document.querySelector('#btnReset');
  resetBtn.addEventListener('click', () => {
    resetQuiz();
  });

  // Call the displayQuiz function
  displayQuiz();
});
