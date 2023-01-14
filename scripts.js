var textToWrite = document.querySelector('#textToWrite');
var textBox = document.querySelector('#textBox');
var btnRestart = document.querySelector('#restart');
var timerCounter = document.querySelector('#timer');

var timerActivated = 0;
var timerValues = [0, 0, 0];
var timerInterval = "";
var quote = '';

// Add 0 to the left
function leadingZero(time) {
    time <= 9 ? time = "0" + time : time;
    return time;
}

function generateQuote() {
    fetch('https://type.fit/api/quotes')
        .then((response) => response.json())
        .then((data) => {
            let newData = Math.floor(Math.random() * data.length);
            textToWrite.innerHTML = data[newData].text;
        })
}

// Timer function if status condicional
function timer(status) {
    if (status === true) {
        timerActivated += 1;
        timerInterval = setInterval(() => {
            timerValues[2] += 1;
            if (timerValues[2] == 100) {
                timerValues[2] = 0;
                timerValues[1] += 1;
            } else if (timerValues[1] == 60) {
                timerValues[1] = 0;
                timerValues[0] += 1;
            }  
            timerCounter.innerHTML = `${leadingZero(timerValues[0])}:${leadingZero(timerValues[1])}:${leadingZero(timerValues[2])}`; 
        }, 10);
    } else if (status === false) {
        clearInterval(timerInterval);
    }
}

// Check if it was written and execute timer function
// passing CSS styles
textBox.oninput = () => {
    !timerActivated ? timer(true) : null;

    if(!textBox.value) {
        textBox.classList.remove("check--accept");
        textBox.classList.remove("check--wrong");
        textBox.classList.add("check--default");
    } else if (textBox.value == textToWrite.innerHTML) {
        timer(false);
        textBox.classList.remove("check--default");
        textBox.classList.remove("check--wrong");
        textBox.classList.add("check--accept");
    } else if (textBox.value != textToWrite.innerHTML) {
        textBox.classList.remove("check--default");
        textBox.classList.remove("check--accept");
        textBox.classList.add("check--wrong");
    }
}

// Restart button with resetting initial values and
// without reload the page
btnRestart.onclick = () => {
    timer(false);
    timerActivated = 0;
    timerValues = [0, 0, 0];
    textBox.value = '';
    timerCounter.innerHTML = `00:00:00`;
    
    textBox.classList.remove("check--accept");
    textBox.classList.remove("check--wrong");
    textBox.classList.add("check--default");

    generateQuote();
}