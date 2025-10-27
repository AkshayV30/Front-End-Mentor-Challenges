# Frontend Mentor - Intro section with dropdown navigation solution

This is a solution to the [Intro section with dropdown navigation challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/intro-section-with-dropdown-navigation-ryaPetHE5). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Intro section with dropdown navigation solution](#frontend-mentor---intro-section-with-dropdown-navigation-solution)
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

- View the relevant dropdown menus on desktop and mobile when interacting with the navigation links
- View the optimal layout for the content depending on their device's screen size
- See hover states for all interactive elements on the page

### Screenshot

![Desktop-view-1](./screenshot/Screenshot_desktop-1.jpeg)
![Desktop-view-2](./screenshot/Screenshot_desktop-2.jpeg)
![Mobile-view-1](./screenshot/Screenshot_mobile-1.jpeg)
![Mobile-view-2](./screenshot/Screenshot_mobile-1.jpeg)
A

### Links

- Solution URL: [Solution URL](https://github.com/AkshayV30/Front-End-Mentor-Challenges/tree/master/intro-section-with-dropdown-navigation-main)
- Live Site URL: [Live site URL](https://akshayv30.github.io/Front-End-Mentor-Challenges/intro-section-with-dropdown-navigation-main/index.html)

## My process

### Built with

- Semantic HTML5 markup
- SCSS custom properties
- CSS Grid
- Desktop-first workflow

### What I learned

DropDown code snippets, see below:

```html
<div class="hamburger-button">
  <input type="checkbox" class="nav-checkbox" id="nav-toggle" />

  <label for="nav-toggle" class="nav-button">
    <span class="nav-icon"> &nbsp;</span>
  </label>

  <div class="nav-background"></div>
</div>
```

```scss
.hamburger-button {
  position: fixed;
  right: 4rem;
  z-index: 4;

  #nav-toggle {
  }
  .nav-checkbox {
    display: none;
  }
  .nav-checkbox:checked ~ .nav-background {
    transform: scale(2);
    display: block;
    // opacity: 0.8;
  }
  .nav-checkbox:checked + .nav-button .nav-icon {
    background: transparent;
  }
  .nav-checkbox:checked + .nav-button .nav-icon::before {
    transform: rotate(45deg);
    top: 0;
  }
  .nav-checkbox:checked + .nav-button .nav-icon::after {
    top: 0;
    transform: rotate(-45deg);
  }
  .nav-button {
    height: 6rem;
    aspect-ratio: 1;
    // border-radius: 50%;
    text-align: center;
    cursor: pointer;
    z-index: 10;

    .nav-icon {
      position: relative;
      margin-top: 3.25rem;

      &,
      &::before,
      &::after {
        width: 3rem;
        height: 0.2rem;

        background: #000000;
        display: inline-block;
      }

      &::before,
      &::after {
        content: " ";

        position: absolute;
        left: 0;
        // bottom: 0;
        transition: all 0.2s;
      }

      &::before {
        top: -1rem;
      }
      &::after {
        top: 1rem;
      }
    }

    &:hover .nav-icon::before {
      top: -1rem;
    }

    &:hover .nav-icon::after {
      top: 1rem;
    }
  }
  .nav-background {
    display: none;
    z-index: -20;
    height: 100%;
    //  width: 8rem;
    padding: 12rem;
    //  aspect-ratio: 1 / 2.5;

    border-radius: 0.2rem;

    position: fixed;
    top: 36rem;
    right: 0rem;
    //  transform: translateX(-4rem);

    //

    background: #fff;
    box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.2);

    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1); //animation
  }
}
```

### Continued development

It can be further optimized for better responsiveness of the website

### Useful resources

---

## Author

- Frontend Mentor - [@AkshayV30](https://www.frontendmentor.io/profile/AkshayV30)

## Acknowledgments
