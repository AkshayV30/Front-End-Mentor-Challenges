# Frontend Mentor - Fylo data storage component solution

This is a solution to the [Fylo data storage component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/fylo-data-storage-component-1dZPRbV5n). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Fylo data storage component solution](#frontend-mentor---fylo-data-storage-component-solution)
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

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size

### Screenshot

![Desktop View](./screenshot/desktop__.jpeg)
![Mobile View](./screenshot/mobile__.jpeg)

### Links

- Solution URL: [Solution Link](https://github.com/AkshayV30/Front-End-Mentor-Challenges/tree/master/fylo-data-storage-component-master)
- Live Site URL: [Live Site](https://akshayv30.github.io/Front-End-Mentor-Challenges/fylo-data-storage-component-master/index.html)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Desktop-first workflow

### What I learned

```css
.container-callout {
  animation: progress 0.75s ease-in-out forwards;
  opacity: 0;
}
@keyframes progress {
  0% {
    width: 0;
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

/* ----------------- */
.callout::before {
  content: " ";

  border-left: 20px solid transparent;
  border-top: 20px solid #fff;

  position: relative;
  bottom: -50px;
  right: -102px;
}
```

### Continued development

---

### Useful resources

## Author

- Website - [AkshayMinz](https://github.com/AkshayV30)
- Frontend Mentor - [@AkshayV30](https://www.frontendmentor.io/profile/AkshayV30)
