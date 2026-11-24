function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice (choices){
    let choiceArray = choices.split(",").map(choice => choice.trim());
    let length = choiceArray.length;
    let index = randomNum(0, (length - 1));
    return choiceArray[index];
}

const randomNumInput = document.getElementById("randomNumInput");
randomNumInput.addEventListener("submit", function(event){
    event.preventDefault();
    let min = Number(document.getElementById("minValue").value);
    let max = Number(document.getElementById("maxValue").value);
    if (!min || !max){
         document.getElementById("randomNumDisplay").textContent = "Please enter two values.";
         return;
    }
    let result = randomNum(min, max);
    document.getElementById("randomNumDisplay").textContent = "";
    document.getElementById("randomNumResult").textContent = "Result: " + result;
    min = "";
    max = "";
})

const randomChoiceInput = document.getElementById("randomChoiceInput");
randomChoiceInput.addEventListener("submit", function(event){
    event.preventDefault();
    let choices = document.getElementById("options").value;
    if (!choices){
        document.getElementById("randomChoiceDisplay").textContent = "Please enter some choices. ";
        return;
    }
    let choice = randomChoice(choices);
    document.getElementById("randomChoiceDisplay").textContent = "";
    document.getElementById("randomChoiceResult").textContent = "Result: " + choice;
})