const start = document.getElementsByClassName("start")[0];
const _stop = document.getElementsByClassName("stop")[0];
const display = document.getElementsByClassName("display")[0];
const reset = document.getElementsByClassName("reset")[0];
const _delete = document.getElementsByClassName("delete")[0];
const pan = document.getElementsByClassName("pamadoro")[0];
const num = document.getElementsByClassName("panNum")[0];
const panDis = document.getElementsByClassName("panDis")[0];
const secDis = document.getElementsByClassName("secDis")[0];

const extra = document.getElementsByClassName("extra")[0];
const cMin = document.getElementsByClassName("min")[0];
const cSec = document.getElementsByClassName("sec")[0];
const eDisplay = document.getElementsByClassName("eDisplay")[0];

const sumit = document.getElementsByClassName("sumit")[0];

const rN = () => {
  sec = -1;
  min = 0;
  hour = 0;
};

let sec = 0,
  min = 0,
  hour = 0;

let intervalIt;

const timer = () => {
  intervalIt = setInterval(() => {
    sec++;
    if (sec == 60) {
      sec = 0;
      min++;
    }
    if (min == 60) {
      min = 0;
      hour++;
    }

    const zero = (time) => {
      return time < 10 ? "0" + time : time;
    };

    display.innerText = zero(min) + ":" + zero(sec);
  }, 1000);
};
let g = 0;

start.addEventListener("click", () => {
  clearInterval(intervalIt);
  timer();
});
_stop.addEventListener("click", () => {
  if (_stop.innerText.toLowerCase() === "resume") {
    _stop.innerText = "Stop";
    timer();
  } else {
    clearInterval(intervalIt);
    _stop.innerText = "Resume";
  }
});
reset.addEventListener("click", () => {
  if (_stop.innerText.toLowerCase() === "resume") {
    _stop.innerText = "Stop";
  }
  clearInterval(intervalIt);
  rN();
  timer();
});
_delete.addEventListener("click", () => {
  rN();
  clearInterval(intervalIt);
  display.innerText = "00" + ":" + "00";
  if (_stop.innerText.toLowerCase() === "resume") {
    _stop.innerText = "Stop";
  }
});

var panTimer;

const pTimer = (e) => {
  panTimer = setInterval(() => {
    e--;
    secDis.innerText = e + "s";
    if (e === 0) {
      clearInterval(panTimer);
    }
  }, 1000);
};
let minIntervalId;
const mTimer = (inputProm) => {
  minIntervalId = setInterval(() => {
    inputProm--;
    panDis.innerText = inputProm + "m";
    if (inputProm === 0) {
      clearInterval(minIntervalId);
    }
  }, 6000);
};

pan.addEventListener("click", () => {
  var inputProm = prompt("Please enter the duration in minutes");
  panDis.innerText = inputProm + "m";
  let inputD = inputProm * 60;
  secDis.innerText = inputD + "s";
  mTimer(inputProm);
  pTimer(inputD);
});

let countDownMin = 0;
let countDownSec = 0;
let countDownMinText = "00";
let countDownSecText = "00";
let both = "";

const updater = (e) => {
  both = countDownMinText + ":" + countDownSecText;
  eDisplay.innerText = both;
};

cMin.addEventListener("input", () => {
  countDownMin = cMin.value;
  if (countDownMin > 0 && countDownMin < 10) {
    countDownMinText = "0" + countDownMin;
  } else {
    countDownMinText = countDownMin;
  }
  if (countDownMin < 0 || countDownMin == 0) {
    cMin.value = "0";
    countDownMinText = "00";
  }
  updater();
});

cSec.addEventListener("input", () => {
  countDownSec = cSec.value;
  if (countDownSec > 0 && countDownSec < 10) {
    countDownSecText = "0" + countDownSec;
  } else {
    countDownSecText = countDownSec;
  }
  if (countDownSec < 0 || countDownSec == 0) {
    cSec.value = 0;
    countDownSecText = "00";
  }
  updater();
});
let testingInterval;
const testing = (min, sec) => {
  clearInterval(testingInterval);
  testingInterval = setInterval(() => {
    let play = min + ":" + sec;
    eDisplay.innerText = play;
    sec--;
    if (sec <= 0 && min > 0) {
      sec = 59;
      min--;
    }
    if (min <= 0 && sec <= 0) {
      clearInterval(testingInterval);
      eDisplay.innerText = "00:00";
    }
  }, 1000);
};

sumit.addEventListener("click", () => {
  testing(countDownMin, countDownSec);
});
