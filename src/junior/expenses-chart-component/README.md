# Expenses Chart Component

Frontend Mentor Challenge

![Design preview for the Expenses chart component](./design/preview.jpg)

## Overview

This project is a solution to the **Frontend Mentor – Expenses chart component** challenge.
The goal was to build a responsive bar chart component that dynamically renders data from a local JSON file while matching the provided design as closely as possible.

The chart visualizes spending over the last 7 days, highlights the highest spending day, and displays tooltips on hover.

---

## 🚀 Features

- Dynamic bar chart generated from a local `data.json` file
- Bars scale proportionally based on spending values
- Highest spending day is highlighted using a distinct color
- Hover tooltips display exact spending amounts
- Smooth hover interactions with no layout shift
- Fully responsive layout for mobile and desktop
- Clean, DRY, and maintainable CSS
- Beginner-friendly ES6 JavaScript structure

---

## 🛠 Built With

- **HTML5** – Semantic markup
- **CSS3** – Flexbox, CSS variables, transitions
- **Vanilla JavaScript (ES6)** – Fetch API, DOM manipulation
- **JSON** – Local data source

No external frameworks or libraries were used.

---

## 📊 How It Works

1. Chart data is fetched from a local `data.json` file using the Fetch API.
2. The maximum spending value is calculated to scale bar heights proportionally.
3. Each bar is created dynamically using JavaScript.
4. The bar with the highest value receives a special CSS class for highlighting.
5. Tooltips appear on hover without causing layout shifts.
6. The total monthly spending is calculated directly from the dataset.

---

## ✅ User Requirements Covered

- View spending for each day of the week
- Hover over bars to see exact amounts
- Highlight the highest spending day
- Responsive layout for different screen sizes
- Visible hover states for interactive elements
- Dynamic rendering from JSON data

---

## 📱 Responsive Design

The layout adapts seamlessly across screen sizes:

- Mobile-first approach
- Flexible container widths
- Scalable typography and chart elements

---

## 🧪 What I Learned

- Structuring JavaScript for dynamic UI rendering
- Avoiding layout shifts caused by hover interactions
- Using CSS variables for maintainable theming
- Separating logic, presentation, and data cleanly
- Writing DRY and scalable CSS

---

## 🔧 Possible Improvements

- Animate bars on initial load
- Add keyboard accessibility for tooltips
- Implement dark mode
- Improve ARIA support for screen readers

---

## 📦 Deployment

You can deploy this project using any static hosting provider:

- GitHub Pages
- Netlify
- Vercel

---

## 👤 Author

- Frontend Mentor Profile – [AkshayV30](https://www.frontendmentor.io/profile/AkshayV30)

---

## 🙏 Acknowledgements

Challenge provided by [Frontend Mentor](https://www.frontendmentor.io).
Designed to help developers practice real-world front-end skills.

---

**Happy coding!**
