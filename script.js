//quotes generation api
const quoteApiUrl =
    "https://api.quotable.io/random?minLength=100&maxLength=100";
const sampleText = document.getElementById("sample");
const userInput = document.getElementById("type-input");
let quote = "";
let mistakes = 0;
let time = 60;
let timer = 0;

//display random quote
const renderQuote = async () => {
    //fetch contents from url
    const response = await fetch(quoteApiUrl);
    //store response
    let data = await response.json();
    quote = data.content;
    //array of chars in quote
    let arr = quote.split("").map(value => {
        //wrap chars in span
        return "<span class='quote-chars'>" + value + "</span>";
    })
    sampleText.innerHTML += arr.join("");

};
//compare text and input contents

userInput.addEventListener("input", () => {
    //compare text and input contents
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);

    let userInputChars = userInput.value.split("");
    quoteChars.forEach((char, index) => {
        if (char.innerText === userInputChars[index]) {
            char.classList.add("success");
        }
        //if user has not entered anything 
        else if (userInputChars[index] == null) {

            if (char.classList.contains("success")) {
                char.classList.remove("success");
            }
            else {
                char.classList.remove("fail");
            }

        }
        else {
            if (!char.classList.contains("fail")) {

                mistakes += 1;
                char.classList.add("fail");
            }
            document.getElementById("mistake").innerText = mistakes;
        }

        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });

        if (check) {

            displayResult();

        }

    });
});
//update timer
function updateTimer() {
    if (time == 0) {
        displayResult();
    }
    else {
        document.getElementById("timer").innerText = --time + "s";
    }
};
//set timr
const timeReduced = () => {
    time = 60
    timer = setInterval(updateTimer, 1000);
};
//end test 

const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval();
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true
    let timetaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
        document.getElementById("speed").innerText =
            (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
        document.getElementById("accuracy").innerText =
            Math.round((userInput.value.length - mistakes) /
                userInput.value.length) * 100 + "%";

    }
};

const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduced();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};
window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderQuote();
};

