"use strict";

const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 9 * 24);

// const targetDate = new Date(year, month, day, hour, min, sec).getTime();
// const targetDate = new Date(2023, 7, 0, 0, 0, 0).getTime();

// const targetDate = new Date("2023-07-07T01:20:01").getTime();

console.log(targetDate);

function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector(".segment-display");
  const segmentDisplayTop = segmentDisplay.querySelector(
    ".segment-display__top"
  );
  const segmentDisplayBottom = segmentDisplay.querySelector(
    ".segment-display__bottom"
  );

  const segmentOverlay = segmentDisplay.querySelector(".segment-overlay");
  const segmentOverlayTop = segmentOverlay.querySelector(
    ".segment-overlay__top"
  );
  const segmentOverlayBottom = segmentOverlay.querySelector(
    ".segment-overlay__bottom"
  );

  return {
    //it will return object
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(displayElement, overlayElement, value) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements = getTimeSegmentElements(segmentElement);

  if (
    parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue
  ) {
    return;
  }

  segmentElements.segmentOverlay.classList.add("flip");

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove("flip");
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    this.removeEventListener("animationend", finishAnimation);
  }

  segmentElements.segmentOverlay.addEventListener(
    "animationend",
    finishAnimation
  );
}

// time

function updateTimeSection(sectionID, timeValue) {
  const firstNumber = Math.floor(timeValue / 10) || 0;
  const secondNumber = timeValue % 10 || 0;

  const sectionElement = document.getElementById(sectionID);
  const timeSegments = sectionElement.querySelectorAll(".time-segment");

  // updateTimeSegment(timeSegments[0], firstNumber);

  updateTimeSegment(timeSegments[0], timeValue);
  // console.log(timeValue);

  // console.log(timeSegments[0]);
  // console.log(firstNumber, secondNumber);
  // updateTimeSegment(timeSegments[1], secondNumber);
}

function getTimeRemaining(targetDateTime) {
  // const nowTime = Date.now();

  const nowTime = new Date().getTime();
  // console.log(nowTime); ///////

  const complete = nowTime >= targetDateTime;

  if (complete) {
    return {
      complete: true,
      days: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  }

  // Calculate days, hours, minutes, and seconds
  // const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
  // const hours = Math.floor(secondsRemaining / 60 / 60);
  // const minutes = Math.floor(secondsRemaining / 60) - hours * 60;
  // const seconds = secondsRemaining % 60;

  const secondsRemaining = Math.floor(targetDate - nowTime);

  const days = Math.floor(secondsRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (secondsRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (secondsRemaining % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((secondsRemaining % (1000 * 60)) / 1000);

  return {
    complete: false,
    days,
    seconds,
    minutes,
    hours,
  };
}

function updateAllSegments() {
  const timeRemainingBits = getTimeRemaining(new Date(targetDate).getTime());
  // console.log(timeRemainingBits);

  updateTimeSection("seconds", timeRemainingBits.seconds);
  updateTimeSection("minutes", timeRemainingBits.minutes);
  updateTimeSection("hours", timeRemainingBits.hours);

  updateTimeSection("days", timeRemainingBits.days);
  return timeRemainingBits.complete;
}

//to update each sec
const countdownTimer = setInterval(() => {
  const isComplete = updateAllSegments();

  if (isComplete) {
    clearInterval(countdownTimer);
  }
}, 1000);

updateAllSegments();
