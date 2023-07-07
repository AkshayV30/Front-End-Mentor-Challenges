# Frontend Mentor - Launch countdown timer solution

This is a solution to the [Launch countdown timer challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/launch-countdown-timer-N0XkGfyz-). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Launch countdown timer solution](#frontend-mentor---launch-countdown-timer-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See hover states for all interactive elements on the page
- See a live countdown timer that ticks down every second (start the count at 14 days)
- **Bonus**: When a number changes, make the card flip from the middle

### Screenshot

![Desktop-iew](screenshot/desktop.jpeg)
![Mobile-View](screenshot/mobile.jpeg)

### Links

- Solution URL: [Solution URL](https://github.com/AkshayV30/Front-End-Mentor-Challenges/tree/master/launch-countdown-timer-main)
- Live Site URL: [live site URL ](https://akshayv30.github.io/Front-End-Mentor-Challenges/launch-countdown-timer-main/index.html)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Desktop-first workflow

### What I learned

```scss
.segment-display__top::before,
.segment-display__top::after,
.segment-display__bottom::before,
.segment-display__bottom::after {
  position: absolute;
  content: " ";
  height: var(--notch-height);
  aspect-ratio: 1;
  background-color: var(--neutral-4);
}

.segment-display__top::before {
  bottom: 0%;
  left: 0%;

  border-radius: 0 100% 0 0;
}
```

```js
// a lot
```

### Continued development

---

### Useful resources

## Author

- Frontend Mentor - [@AkshayV30](https://www.frontendmentor.io/profile/AkshayV30)

## Acknowledgments
