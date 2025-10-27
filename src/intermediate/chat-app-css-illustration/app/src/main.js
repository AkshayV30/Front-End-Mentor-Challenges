// import './style.css';
// import javascriptLogo from './javascript.svg';
// import viteLogo from '/vite.svg';

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;
import './css/style.css';
import './css/chat.css';
import './css/mobileChatHeader.css';
import './css/description.css';

async function loadComponent(path) {
  const res = await fetch(path);
  return await res.text();
}

async function initApp() {
  const app = document.getElementById('app');

  const header = await loadComponent('/src/components/header.html');
  const chat = await loadComponent('/src/components/chat.html');
  const desc = await loadComponent('/src/components/description.html');

  app.innerHTML = `
   <div class="container-mobile">
    ${header}
    ${chat}
   </div>
    ${desc}
  `;
}

initApp();
