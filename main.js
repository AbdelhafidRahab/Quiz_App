let count = document.querySelector(".count span");
let bullets = document.querySelector(".bullets .spans");
let answers = document.querySelector(".answers");
let submitButton = document.querySelector(".submit-button");
let timecountmin = document.querySelector(".countdown .minute");
let timecountsec = document.querySelector(".countdown .second");
let startButton = document.querySelector(".start");
let current_question = 0;
function getSuestions() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let object_questions = JSON.parse(this.responseText);

            let questions_numbers = object_questions.length;

            count.innerHTML = questions_numbers;

            createBullets(questions_numbers);
            questionData(object_questions[current_question]);
            
            let listAnswers = document.querySelectorAll(".answers .answer input");
                    submitButton.onclick = function() {
                        listAnswers.forEach(ele => {
                            if (ele.checked === true) {
                                
                                if (ele.dataset.theAnswer == object_questions[current_question].right_answer) {
                                        ele.parentElement.style.backgroundColor = "#57B560";
                                        ele.parentElement.childNodes.forEach(element => {
                                            element.style.color = "#FFFFFF";
                                            if (element.type == "radio") {
                                                element.style.appearance = "none";
                                                element.style.border = "3px solid #FFFFFF";
                                                element.style.borderRadius = "50%";
                                                element.style.backgroundColor = "#57B560";
                                                element.style.width = "13px";
                                                element.style.height = "13px";
                                            }
                                        });
                                        bullets.children[(current_question)].classList.toggle("on"); 
                                        popup();
                                }else {
                                    ele.parentElement.style.backgroundColor = "#f54545";
                                    ele.parentElement.childNodes.forEach(element => {
                                        element.style.color = "#FFFFFF";
                                        if (element.type == "radio") {
                                            element.style.appearance = "none";
                                            element.style.border = "3px solid #FFFFFF";
                                            element.style.borderRadius = "50%";
                                            element.style.backgroundColor = "#f54545";
                                            element.style.width = "13px";
                                            element.style.height = "13px";
                                        }
                                    });
                                    bullets.children[(current_question)].classList.toggle("off"); 
                                    popup();
                                }
                            }
                        });
                        if (count.innerHTML > 0) {
                            count.innerHTML--;
                        }
                    }

            startButton.onclick = function() {
                document.querySelector(".popup-overlay").remove();
                startButton.remove();
                let timeinterval = setInterval(() => {
                    if (timecountsec.innerHTML > 0) {
                        timecountsec.innerHTML--;
                    }else {
                        if (timecountmin.innerHTML > 0) {
                            timecountmin.innerHTML--;
                            timecountsec.innerHTML = 59;
                        }else {
                            if (timecountsec.innerHTML > 0) {
                                timecountsec.innerHTML = 59;
                            }
                        }
                        
                    }
                }, 1000);
                
                let intervalSystem = setInterval(() => {
                    if (timecountsec.innerHTML == 0) {
                        clearInterval(intervalSystem);
                        clearInterval(timeinterval);
                        popup();
                        popup();
                        current_question--;
                        let scorep = document.querySelectorAll(".on").length;
                        let score = document.createElement("div");
                        score.classList.toggle("score");
                        score.innerHTML = "your score :"+scorep;
                        let thebody = document.querySelector(".app-container").parentElement;
                        thebody.prepend(score);
                    }
                    document.querySelector(".popup-overlay").remove();
                    current_question++;
                    questionData(object_questions[current_question]);
                    let listAnswers = document.querySelectorAll(".answers .answer input");
                    submitButton.onclick = function() {
                        listAnswers.forEach(ele => {
                            if (ele.checked === true) {
                                
                                if (ele.dataset.theAnswer == object_questions[current_question].right_answer) {
                                        ele.parentElement.style.backgroundColor = "#57B560";
                                        ele.parentElement.childNodes.forEach(element => {
                                            element.style.color = "#FFFFFF";
                                            if (element.type == "radio") {
                                                element.style.appearance = "none";
                                                element.style.border = "3px solid #FFFFFF";
                                                element.style.borderRadius = "50%";
                                                element.style.backgroundColor = "#57B560";
                                                element.style.width = "13px";
                                                element.style.height = "13px";
                                            }
                                        });
                                        bullets.children[(current_question)].classList.toggle("on"); 
                                        popup();
                                        if (current_question == 9) {
                                            clearInterval(intervalSystem);
                                            clearInterval(timeinterval);
                                            let scorep = document.querySelectorAll(".on").length;
                                            let score = document.createElement("div");
                                            score.classList.toggle("score");
                                            score.innerHTML = "your score :"+scorep;
                                            let thebody = document.querySelector(".app-container").parentElement;
                                            thebody.prepend(score);
                                        }

                                }else {
                                    ele.parentElement.style.backgroundColor = "#f54545";
                                    ele.parentElement.childNodes.forEach(element => {
                                        element.style.color = "#FFFFFF";
                                        if (element.type == "radio") {
                                            element.style.appearance = "none";
                                            element.style.border = "3px solid #FFFFFF";
                                            element.style.borderRadius = "50%";
                                            element.style.backgroundColor = "#f54545";
                                            element.style.width = "13px";
                                            element.style.height = "13px";
                                        }
                                    });
                                    bullets.children[(current_question)].classList.toggle("off"); 
                                    popup();
                                    if (current_question == 9) {
                                        clearInterval(intervalSystem);
                                        clearInterval(timeinterval);
                                        let scorep = document.querySelectorAll(".on").length;
                                        let score = document.createElement("div");
                                        score.classList.toggle("score");
                                        score.innerHTML = "your score : "+scorep;
                                        let thebody = document.querySelector(".app-container").parentElement;
                                        thebody.prepend(score);
                                    }
                                }
                            }
                        });
                        if (count.innerHTML > 0) {
                            count.innerHTML--;
                        }
                    }
                    
                }, 5000);
            }
                    
        }      
    }
        myRequest.open("GET","object_questions.json",true);
        myRequest.send();
}


function createBullets(n) {
    for (let i = 0; i < n; i++) {
        let bulletespan = document.createElement("span");
        bullets.appendChild(bulletespan);
    }
}

function questionData(question) {
    document.querySelector(".quiz h2").remove();
    document.querySelectorAll(".answers .answer").forEach(ele => {
        ele.remove();
    });
    let quiz = document.querySelector(".quiz");
    let h2 = document.createElement("h2");
    let text = document.createTextNode(question.title);
    h2.append(text);
    quiz.append(h2);
    let i =1;
    for(key in question) {
        if (key !== "title" && key !== "right_answer") {

            let answer = document.createElement("div");
            answer.classList.toggle("answer");

            let input = document.createElement("input");
            input.type = "radio";
            if (i == 1) {
                input.checked = "checked";
            }
            input.id = `answer_${i}`;
            i++;
            input.name = "questions";
            input.dataset.theAnswer =  question[key];

            answer.appendChild(input);

            let label = document.createElement("label");
            label.setAttribute("for",input.id);
            label.innerHTML = question[key];

            answer.appendChild(label);

            answers.appendChild(answer);
        }
    }
}
function popup() {
    let pop = document.createElement("div");
    pop.classList.toggle("popup-overlay");
    let container = document.querySelector(".app-container");
    container.prepend(pop);
}
getSuestions();



