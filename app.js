const newArr = [];
let clicked = 0;
let isOver = false;
let correctOjb = [];
const resultScreen = document.querySelector(".result-screen");
const gameContainer = document.querySelector(".game-screen");
const tryAgainBtn = document.querySelector("#try-again");
let score = 0;
const scoreSpan = document.querySelector(".score");
//get request
const getCountry = async () => {
  const res = await axios.get("https://restcountries.com/v3.1/all");
  const data = res.data;
  clicked = 0;
  filling(data);
  newArr.push(data);
};
//generate container
function fillPage(data) {
  const newArr = shuffleArr(randomQuestionArr);
  gameContainer.innerHTML = "";
  const container = document.createElement("div");
  const questions = [
    "Which country does this flag belong to?",
    `${data[randomNumber[1]].capital} is the capital of:`,
  ];
  let imgSrc = `${data[1].flags.svg}`;
  const correctAnswer = data[1].name.common;
  const header = document.createElement("header");
  const section = document.createElement("section");
  const h3 = document.createElement("h3");
  container.classList.add("container");
  h3.innerHTML = `${questions[newArr[0]]}`;

  const img = document.createElement("img");
  img.setAttribute("src", imgSrc);

  const varA = document.createElement("button");
  varA.innerHTML = `<span class='variant'>A</span>${
    data[randomNumber[1]].name.common
  }`;

  const varB = document.createElement("button");
  varB.innerHTML = `<span class='variant'>B</span>${
    data[randomNumber[0]].name.common
  }`;

  const varC = document.createElement("button");
  varC.innerHTML = `<span class='variant'>C</span>${
    data[randomNumber[2]].name.common
  }`;

  const varD = document.createElement("button");
  varD.innerHTML = `<span class='variant'>D</span>${
    data[randomNumber[3]].name.common
  }`;

  const varE = document.createElement("button");
  varE.innerHTML = `<span class='variant'>E</span>${
    data[randomNumber[4]].name.common
  }`;

  if (h3.innerText.includes("capital")) {
    img.src = " ";
    h3.style.marginTop = "50px";
  }

  varA.classList.add("hovering");
  varB.classList.add("hovering");
  varC.classList.add("hovering");
  varD.classList.add("hovering");
  varE.classList.add("hovering");

  header.appendChild(img);
  header.appendChild(h3);
  section.appendChild(varA);
  section.appendChild(varB);
  section.appendChild(varC);
  section.appendChild(varD);
  section.appendChild(varE);
  container.appendChild(header);
  container.appendChild(section);
  gameContainer.appendChild(container);
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      clicked += 1;
      const value = e.target.innerText.substring(1);
      if (isOver && clicked > 1) {
        button.setAttribute("id", "rest");
      } else if (value.includes(correctAnswer)) {
        score = score + 1;
        console.log(score);
        button.classList.add("winner");
        isOver = true;
        setTimeout(getCountry, 3000);
      } else if (!value.includes(correctAnswer)) {
        button.classList.add("loser");
        for (let item of buttons) {
          if (item.innerText.substring(1).includes(correctAnswer)) {
            item.classList.add("winner");
          }
        }
        isOver = true;
        container.style.display = "none";
        resultScreen.style.display = "flex";
        scoreSpan.innerHTML = score;
      }
      if (isOver)
        buttons.forEach((button) => button.classList.remove("hovering"));
    });
  });
}

//generate random countries
let fiveCountry = [];
const filling = async (data) => {
  fiveCountry = [];
  let randArr = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 250)
  );
  for (let i = 0; i < randArr.length; i++) {
    fiveCountry.push(data[randArr[i]]);
  }
  fillPage(fiveCountry);
};
window.addEventListener("load", getCountry);
//generate random number
let randomNumber = [];
for (let i = 0; i < 30; i++) {
  let number = Math.floor(Math.random() * 5);
  let genNumber = randomNumber.indexOf(number);
  if (genNumber === -1) {
    randomNumber.push(number);
  }
}
//rand numbers for questions
let randomQuestionArr = [];
for (let i = 0; i < 5; i++) {
  let num = Math.floor(Math.random() * 2);
  let genNum = randomQuestionArr.indexOf(num);
  if (genNum === -1) {
    randomQuestionArr.push(num);
  }
}
//get new question on each question
function shuffleArr(arr) {
  let newArr = [];
  for (let nums of arr) {
    const randNum = Math.floor(Math.random() * arr.length);
    newArr.splice(randNum, 0, nums);
  }
  return newArr;
}

tryAgainBtn.addEventListener("click", () => {
  score = 0;
  getCountry();
  resultScreen.style.display = "none";
});
