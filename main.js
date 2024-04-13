let title = document.querySelector(".title");
let containerBox = document.querySelector(".container");
let Boxes = document.querySelectorAll(".container div");
const arrayOfBoxes = Array.from(Boxes);
let theLine = containerBox.firstElementChild;
let myBtn = document.querySelector(".my-btn");
let content = "x";
let wow = [];
arrayOfBoxes.forEach((ele) => {
  ele.onclick = () => {
    ele.innerHTML = content;
    wow.push(ele.innerHTML);
    console.log(wow);
    //toggle between X & O
    wow[wow.length - 1] === "x" ? (content = "o") : (content = "x");

    if (checker(0, 1, 2)) {
      managingLine("center-top");
    } else if (checker(3, 4, 5)) {
      managingLine("center-center");
    } else if (checker(6, 7, 8)) {
      managingLine("center-bottom");
    } else if (checker(0, 4, 8)) {
      managingLine("diagonal-right");
    } else if (checker(2, 4, 6)) {
      managingLine("diagonal-left");
    } else if (checker(0, 3, 6)) {
      managingLine("left");
    } else if (checker(1, 4, 7)) {
      managingLine("center");
    } else if (checker(2, 5, 8)) {
      managingLine("right");
    }

    ele.classList.add("none-event");
    let check = arrayOfBoxes.every((e) => e.classList.contains("none-event"));
    if (check || theLine.className !== "") {
      if (theLine.className === "") {
        title.innerText = "The Result Is A Draw";
        restartTheGame();
      } else {
        restartTheGame();
        title.innerText = `Congratulation ${
          content == "o" ? (content = "X") : (content = "O")
        } Win`;
      }
    } else {
      title.innerText = `${content} turn`;
    }

    //
  };
});

function delay(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

function restartTheGame() {
  myBtn.style.display = "block";
  delay(1).then(() => (myBtn.style.transform = "scale(1)"));
  myBtn.onclick = () => {
    myBtn.style.transform = "scale(0)";
    delay(400).then(() => (myBtn.style.display = "none"));
    arrayOfBoxes.forEach((ele) => {
      ele.className = "box";
      ele.innerText = "";
      containerBox.style.pointerEvents = "auto";
      theLine.style.display = "none";
      theLine.className = "";
      content = "x";
      wow = [];
      title.innerText = "Start Game With X";
    });
  };
}
function checker(i1, i2, i3) {
  return (
    (arrayOfBoxes[i1].innerHTML === "x" &&
      arrayOfBoxes[i2].innerHTML === "x" &&
      arrayOfBoxes[i3].innerHTML === "x") ||
    (arrayOfBoxes[i1].innerHTML === "o" &&
      arrayOfBoxes[i2].innerHTML === "o" &&
      arrayOfBoxes[i3].innerHTML === "o")
  );
}

function managingLine(direction) {
  theLine.style.display = "block";
  theLine.className = direction;
  containerBox.style.pointerEvents = "none";
}
