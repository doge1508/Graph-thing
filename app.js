let can, con, eq_1, el_draw;
let origin = { x: undefined, y: undefined };
let scale = { x: 5, y: 5 }; //numbers are in pixels per unit
let tickSpacingMinor = { x: 1, y: 1 }; //numbers are in units
let tickSizeMinor = { x: 3, y: 3 }; //numbers are in pixels
let tickSpacingMajor = { x: 5, y: 5 }; //numbers are in units
let tickSizeMajor = { x: 5, y: 5 }; //numbers are in pixels

const AXIS_COLOR = "white";
const AXIS_WIDTH = 1;

window.onload = init;

function drawAll() {
  con.clearRect(0, 0, can.width, can.height);
  drawAxisX();
  drawAxisY();
  drawTicksX();
  drawTicksY();
  drawNumbersX();
  drawNumbersY();
}

function drawAxisX() {
  con.lineWidth = AXIS_WIDTH;
  con.strokeStyle = AXIS_COLOR;
  con.beginPath();
  con.moveTo(0, origin.y);
  con.lineTo(can.width, origin.y);
  con.stroke();
}

function drawAxisY() {
  con.lineWidth = AXIS_WIDTH;
  con.strokeStyle = AXIS_COLOR;
  con.beginPath();
  con.moveTo(origin.x, 0);
  con.lineTo(origin.x, can.height);
  con.stroke();
}

function drawNumbersX() {
  con.fillStyle = AXIS_COLOR;
  con.font = "10px Arial";
  con.textAlign = "center";
  con.textBaseline = "top";
  for (
    let x = tickSpacingMajor.x;
    origin.x + x * scale.x < can.width;
    x += tickSpacingMajor.x
  ) {
    con.fillText(x, origin.x + x * scale.x, origin.y + tickSizeMajor.x);
  }
  for (
    let x = -tickSpacingMajor.x;
    origin.x + x * scale.x > 0;
    x -= tickSpacingMajor.x
  ) {
    con.fillText(x, origin.x + x * scale.x, origin.y + tickSizeMajor.x);
  }
}

function drawNumbersY() {
  con.fillStyle = AXIS_COLOR;
  con.font = "10px Arial";
  con.textAlign = "end";
  con.textBaseline = "middle";
  for (
    let y = tickSpacingMajor.y;
    origin.y + y * scale.y < can.height;
    y += tickSpacingMajor.y
  ) {
    con.fillText(-y, origin.x - tickSizeMajor.y, origin.y + y * scale.y);
  }
  for (
    let y = -tickSpacingMajor.y;
    origin.y + y * scale.y > 0;
    y -= tickSpacingMajor.y
  ) {
    con.fillText(-y, origin.x - tickSizeMajor.y, origin.y + y * scale.y);
  }
}

function drawTicksX() {
  let pX = tickSpacingMinor.x * scale.x;
  con.lineWidth = AXIS_WIDTH;
  con.strokeStyle = AXIS_COLOR;
  con.beginPath();
  for (let x = origin.x + pX; x < can.width; x += pX) {
    con.moveTo(x, origin.y - tickSizeMinor.x);
    con.lineTo(x, origin.y + tickSizeMinor.x);
  }
  for (let x = origin.x - pX; x > 0; x -= pX) {
    con.moveTo(x, origin.y - tickSizeMinor.x);
    con.lineTo(x, origin.y + tickSizeMinor.x);
  }
  pX = tickSpacingMajor.x * scale.x;
  for (let x = origin.x + pX; x < can.width; x += pX) {
    con.moveTo(x, origin.y - tickSizeMajor.x);
    con.lineTo(x, origin.y + tickSizeMajor.x);
  }
  for (let x = origin.x - pX; x > 0; x -= pX) {
    con.moveTo(x, origin.y - tickSizeMajor.x);
    con.lineTo(x, origin.y + tickSizeMajor.x);
  }
  con.stroke();
}

function drawTicksY() {
  let pY = tickSpacingMinor.y * scale.y;
  con.lineWidth = AXIS_WIDTH;
  con.strokeStyle = AXIS_COLOR;
  con.beginPath();
  for (let y = origin.y + pY; y < can.height; y += pY) {
    con.moveTo(origin.x - tickSizeMinor.y, y);
    con.lineTo(origin.x + tickSizeMinor.y, y);
  }
  for (let y = origin.y - pY; y > 0; y -= pY) {
    con.moveTo(origin.x - tickSizeMinor.y, y);
    con.lineTo(origin.x + tickSizeMinor.y, y);
  }
  pY = tickSpacingMajor.y * scale.y;
  for (let y = origin.y + pY; y < can.height; y += pY) {
    con.moveTo(origin.x - tickSizeMajor.y, y);
    con.lineTo(origin.x + tickSizeMajor.y, y);
  }
  for (let y = origin.y - pY; y > 0; y -= pY) {
    con.moveTo(origin.x - tickSizeMajor.y, y);
    con.lineTo(origin.x + tickSizeMajor.y, y);
  }
  con.stroke();
}

function drawEquation(abc) {
  //TODO: draw the graph
}

function getABC(text) {
  let abc = { a: undefined, b: undefined, c: undefined };
  let tokens = [];
  let i = 0;
  let isMakingNumber = false;
  let hasDecimal = false;
  let number = "";
  while (i < text.length) {
    let c = text[i];
    if (
      c === "0" ||
      c === "1" ||
      c === "2" ||
      c === "3" ||
      c === "4" ||
      c === "5" ||
      c === "6" ||
      c === "7" ||
      c === "8" ||
      c === "9"
    ) {
      if (isMakingNumber) {
        number += c;
      } else {
        isMakingNumber = true;
        hasDecimal = false;
        number = c;
      }
    } else {
      if (c === ".") {
        if (isMakingNumber) {
          if (hasDecimal) {
            return undefined;
          }
          hasDecimal = true;
          number += c;
        } else {
          isMakingNumber = true;
          hasDecimal = true;
          number = c;
        }
      } else {
        if (isMakingNumber) {
          tokens.push({ type: "number", value: number });
          isMakingNumber = false;
          hasDecimal = false;
          number = "";
        }
        if (c === "+" || c === "-" || c === "=" || c === "x" || c === "y") {
          tokens.push({ type: c });
        } else if (c !== " ") {
          return undefined;
        }
      }
    }
    i++;
  }
  if (isMakingNumber) {
    tokens.push({ type: "number", value: number });
  }
  if (tokens.length < 3) {
    return undefined;
  }
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === "-") {
      if (i === tokens.length - 1) {
        return undefined;
      }
      if (tokens[i + 1].type === "=") {
        return undefined;
      }
      if (tokens[i + 1].type === "-") {
        tokens[i] = { type: "+" };
        for (let j = i + 1; j < tokens.length - 1; j++) {
          tokens[j] = tokens[j + 1];
        }
        tokens.pop();
      } else if (tokens[i + 1].type === "+") {
        for (let j = i + 1; j < tokens.length - 1; j++) {
          tokens[j] = tokens[j + 1];
        }
        tokens.pop();
      }
    } else if (tokens[i].type === "+") {
      if (i === tokens.length - 1) {
        return undefined;
      }
      if (tokens[i + 1].type === "=") {
        return undefined;
      }
      if (tokens[i + 1].type === "-") {
        tokens[i] = { type: "-" };
        for (let j = i + 1; j < tokens.length - 1; j++) {
          tokens[j] = tokens[j + 1];
        }
        tokens.pop();
      } else if (tokens[i + 1].type === "+") {
        for (let j = i + 1; j < tokens.length - 1; j++) {
          tokens[j] = tokens[j + 1];
        }
        tokens.pop();
      }
    } else if (
      tokens[i].type === "number" ||
      tokens[i].type === "x" ||
      tokens[i].type === "y"
    ) {
      console.log(tokens);
      if (i + 1 < tokens.length && tokens[i + 1].type === "number") {
        return undefined;
      }
    }
  }

  let eqIndex = -1;
  let xIndexes = [];
  let yIndexes = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === "=") {
      if (eqIndex !== -1) {
        return undefined;
      }
      eqIndex = i;
    } else if (tokens[i].type === "x") {
      xIndexes.push(i);
    } else if (tokens[i].type === "y") {
      yIndexes.push(i);
    }
  }
  if (eqIndex === -1 || eqIndex === 0 || eqIndex === tokens.length - 1) {
    return undefined;
  }
  if (xIndexes.length === 0 && yIndexes.length === 0) {
    return undefined;
  }
  let sumOfX = 0;
  let sumOfY = 0;
  for (let i = 0; i < xIndexes.length; i++) {
    if (i === 0) {
      sumOfX += 1;
    } else if (tokens[i - 1].type === "+") {
      if (i < eqIndex) {
        sumOfX += 1;
      } else {
        sumOfX -= 1;
      }
    } else if (tokens[i - 1].type === "-") {
      if (i < eqIndex) {
        sumOfX -= 1;
      } else {
        sumOfX += 1;
      }
    } else if (tokens[i - 1].type === "number") {
      if (
        i - 1 === 0 ||
        (i - 2 > -1 &&
          (tokens[i - 2].type === "+" || tokens[i - 2].type === "="))
      ) {
        if (i < eqIndex) {
          sumOfX += Number(tokens[i - 1].value);
        } else {
          sumOfX -= Number(tokens[i - 1].value);
        }
      } else if (
        i - 2 > -1 &&
        (tokens[i - 2] === "-" || tokens[i - 2].type === "=")
      ) {
        if (i < eqIndex) {
          sumOfX -= Number(tokens[i - 1].value);
        } else {
          sumOfX += Number(tokens[i - 1].value);
        }
      }
    }
  }
  for (let i = 0; i < yIndexes.length; i++) {
    if (i === 0) {
      sumOfY += 1;
    } else if (tokens[i - 1].type === "+") {
      if (i < eqIndex) {
        sumOfY += 1;
      } else {
        sumOfY -= 1;
      }
    } else if (tokens[i - 1].type === "-") {
      if (i < eqIndex) {
        sumOfY -= 1;
      } else {
        sumOfY += 1;
      }
    } else if (tokens[i - 1].type === "number") {
      if (
        i - 1 === 0 ||
        (i - 2 > -1 &&
          (tokens[i - 2].type === "+" || tokens[i - 2].type === "="))
      ) {
        if (i < eqIndex) {
          sumOfY += Number(tokens[i - 1].value);
        } else {
          sumOfY -= Number(tokens[i - 1].value);
        }
      } else if (
        i - 2 > -1 &&
        (tokens[i - 2] === "-" || tokens[i - 2].type === "=")
      ) {
        if (i < eqIndex) {
          sumOfY -= Number(tokens[i - 1].value);
        } else {
          sumOfY += Number(tokens[i - 1].value);
        }
      }
    }
  }
  let sumOfConstants = 0;
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === "number") {
      if (i === tokens.length - 1) {
        sumOfConstants -= Number(tokens[i].value);
      } else if (tokens[i + 1].type !== "x" && tokens[i + 1].type !== "y") {
        if (i < eqIndex) {
          sumOfConstants += Number(tokens[i].value);
        } else {
          sumOfConstants -= Number(tokens[i].value);
        }
      }
    }
  }
  return { a: sumOfX, b: sumOfY, c: sumOfConstants };
}

function handleEl_draw() {
  let abc = getABC(eq_1.value);
  //drawEquation(abc);
  console.log(abc);
}

function init() {
  can = document.getElementById("can");
  con = can.getContext("2d");
  eq_1 = document.getElementById("eq_1");
  el_draw = document.getElementById("el_draw");
  el_draw.addEventListener("click", handleEl_draw);
  window.onresize = resize;
  resize();
}

function resize() {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  origin.x = can.width / 2;
  origin.y = can.height / 2;
  drawAll();
}

//TODO: draw numbers onto axis on major tick marks
//Give thought into drawing graph
