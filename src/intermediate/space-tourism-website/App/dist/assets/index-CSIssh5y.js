(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){e.innerHTML=`
      <div class="c-home">
        <div class="c-home__content">
          <h2 class="c-home__subtitle"> So, you want to travel to   </h2>

          <h1 class="c-home__title"> space  </h1>

          <p class="c-home__description">
            Let’s face it: if you want to go to space, you might as well go to outer space
            and not just hover at the edge of it. Sit back, relax, and we’ll give you a truly
            out-of-this-world experience!
          </p>
        </div>

     
       <button class="c-btn c-btn--explore u-hover-pulse js-explore-btn">
            Explore
       </button>
   

      </div>
    `,e.querySelector(`.js-explore-btn`).addEventListener(`click`,()=>u(`destination`))}var t={data:{},currentPage:`home`};function n(e){let n=t.data.crews;if(!n?.length){e.innerHTML=`<p class="u-error">Crew data unavailable.</p>`;return}e.innerHTML=`
    <section class="l-section l-container c-crew u-fade-in">

      <h2 class="c-crew__title">
        <span class="c-crew__index">02</span>
        Meet Your Crew
      </h2>

      <div class="c-crew__layout">

        <div class="c-crew__text-col">
          <div class="c-crew__text js-crew-text"></div>

          <div class="c-crew__nav js-crew-nav">
            ${n.map((e,t)=>`
              <button
                class="c-crew__dot ${t===0?`is-active`:``}"
                data-index="${t}">
              </button>
            `).join(``)}
          </div>
        </div>

        <picture class="c-crew__image-frame">
          <img class="c-crew__image js-crew-image" />
        </picture>

      </div>
    </section>
  `;let r=e.querySelector(`.js-crew-text`),i=e.querySelector(`.js-crew-image`),a=e.querySelector(`.js-crew-nav`);function o(e){r.classList.add(`is-hidden`),i.classList.add(`is-hidden`),requestAnimationFrame(()=>{r.innerHTML=`
        <h3 class="c-crew__role">${e.role}</h3>
        <h1 class="c-crew__name">${e.name}</h1>
        <p class="c-crew__bio">${e.bio}</p>
      `,i.src=e.images.png,i.alt=e.name,r.classList.remove(`is-hidden`),i.classList.remove(`is-hidden`)})}o(n[0]),a.addEventListener(`click`,e=>{let t=e.target.closest(`.c-crew__dot`);t&&(a.querySelectorAll(`.c-crew__dot`).forEach(e=>e.classList.remove(`is-active`)),t.classList.add(`is-active`),o(n[t.dataset.index]))})}var r=e=>{let n=t.data.destinations;if(console.log(`destinations`,n),!n?.length){e.innerHTML=`<p class="u-error">Destination data unavailable.</p>`;return}e.innerHTML=`
    <section class="l-section l-container c-destination u-fade-in">

      <h1 class="c-destination__title">
        <span class="c-destination__index">01</span>
        Pick your destination
      </h1>

      <div class="c-destination__layout">

        <div class="c-destination__media">
          <img class="c-destination__image js-destination-image" />
        </div>

        <div class="c-destination__body">

          <div class="c-destination__tabs js-tabs">
            ${n.map((e,t)=>`
              <button
                class="c-tab ${t===0?`is-active`:``}"
                data-index="${t}">
                ${e.name}
              </button>
            `).join(``)}
          </div>

          <h2 class="c-destination__name js-name"></h2>
          <p class="c-destination__description js-desc"></p>

          <div class="c-destination__meta">
            <div class="c-destination__stat">
              <h5 class="c-destination__label">Avg. Distance</h5>
              <p class="c-destination__value js-distance"></p>
            </div>

            <div class="c-destination__stat">
              <h5 class="c-destination__label">Est. Travel Time</h5>
              <p class="c-destination__value js-travel"></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;let r=e.querySelector(`.js-tabs`),i=e.querySelector(`.js-destination-image`),a=e.querySelector(`.js-name`),o=e.querySelector(`.js-desc`),s=e.querySelector(`.js-distance`),c=e.querySelector(`.js-travel`);function l(e){i.classList.add(`is-hidden`),o.classList.add(`is-hidden`),requestAnimationFrame(()=>{i.src=e.images.png,i.alt=e.name,a.textContent=e.name,o.textContent=e.description,s.textContent=e.distance,c.textContent=e.travel,i.classList.remove(`is-hidden`),o.classList.remove(`is-hidden`)})}l(n[0]),r.addEventListener(`click`,e=>{let t=e.target.closest(`.c-tab`);t&&(r.querySelectorAll(`.c-tab`).forEach(e=>e.classList.remove(`is-active`)),t.classList.add(`is-active`),l(n[t.dataset.index]))})};function i(e){let n=t.data.technologies;if(console.log(`technologies`,n),!n?.length){e.innerHTML=`<p class="u-error">Technology data unavailable.</p>`;return}e.innerHTML=`
    <section class="l-section l-container c-technology u-fade-in">

      <h2 class="c-technology__title">
        <span class="c-technology__index">03</span>
        Space Launch Technology
      </h2>

      <div class="c-technology__layout">

        <div class="c-technology__nav js-tech-nav">
          ${n.map((e,t)=>`
            <button
              class="c-technology__btn js-tech-btn ${t===0?`is-active`:``}"
              data-index="${t}">
              ${t+1}
            </button>
          `).join(``)}
        </div>


          <div class="c-technology__content">
            <h3 class="c-technology__subtitle">
              The Terminology...
            </h3>

            <h1 class="c-technology__name js-tech-name"></h1>
            <p class="c-technology__description js-tech-desc"></p>
          </div>
          
          <picture class="c-technology__image-frame">
            <img class="c-technology__image js-tech-image" />
          </picture>

      

      </div>
    </section>
  `;let r=e.querySelector(`.js-tech-nav`),i=e.querySelector(`.js-tech-image`),a=e.querySelector(`.js-tech-name`),o=e.querySelector(`.js-tech-desc`);function s(e){i.classList.add(`is-hidden`),a.classList.add(`is-hidden`),o.classList.add(`is-hidden`),requestAnimationFrame(()=>{i.src=e.images.portrait,i.alt=e.name,a.textContent=e.name,o.textContent=e.description,i.classList.remove(`is-hidden`),a.classList.remove(`is-hidden`),o.classList.remove(`is-hidden`)})}s(n[0]),r.addEventListener(`click`,e=>{let t=e.target.closest(`.js-tech-btn`);t&&(r.querySelectorAll(`.js-tech-btn`).forEach(e=>e.classList.remove(`is-active`)),t.classList.add(`is-active`),s(n[t.dataset.index]))})}var a={crews:[{name:`Douglas Hurley`,images:{png:`images/crews/douglas-hurley.png`,webp:`images/crews/douglas-hurley.webp`},role:`Commander`,bio:`Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.`},{name:`Mark Shuttleworth`,images:{png:`images/crews/mark-shuttleworth.png`,webp:`images/crews/mark-shuttleworth.webp`},role:`Mission Specialist`,bio:`Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.`},{name:`Victor Glover`,images:{png:`images/crews/victor-glover.png`,webp:`images/crews/victor-glover.webp`},role:`Pilot`,bio:`Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.`},{name:`Anousheh Ansari`,images:{png:`images/crews/anousheh-ansari.png`,webp:`images/crews/anousheh-ansari.webp`},role:`Flight Engineer`,bio:`Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.`}],destinations:[{name:`Moon`,images:{png:`images/destinations/moon.png`,webp:`images/destinations/moon.webp`},description:`See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.`,distance:`384,400 km`,travel:`3 days`},{name:`Mars`,images:{png:`images/destinations/mars.png`,webp:`images/destinations/mars.webp`},description:`Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!`,distance:`225 mil. km`,travel:`9 months`},{name:`Europa`,images:{png:`images/destinations/europa.png`,webp:`images/destinations/europa.webp`},description:`The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.`,distance:`628 mil. km`,travel:`3 years`},{name:`Titan`,images:{png:`images/destinations/titan.png`,webp:`images/destinations/titan.webp`},description:`The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.`,distance:`1.6 bil. km`,travel:`7 years`}],technologies:[{name:`Launch vehicle`,images:{portrait:`images/technologys/launch-vehicle-portrait.jpg`,landscape:`images/technologys/launch-vehicle-landscape.jpg`},description:`A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!`},{name:`Spaceport`,images:{portrait:`images/technologys/spaceport-portrait.jpg`,landscape:`images/technologys/spaceport-landscape.jpg`},description:`A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.`},{name:`Space capsule`,images:{portrait:`images/technologys/space-capsule-portrait.jpg`,landscape:`images/technologys/space-capsule-landscape.jpg`},description:`A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.`}]},o={home:{render:e},crew:{render:n,data:{inlineData:a.crews,key:`crews`,storeKey:`crews`}},destination:{render:r,data:{inlineData:a.destinations,key:`destinations`,storeKey:`destinations`}},technology:{render:i,data:{inlineData:a.technologies,key:`technologies`,storeKey:`technologies`}}};function s(e){let t=document.body;[...t.classList].filter(e=>e.startsWith(`page-`)).forEach(e=>t.classList.remove(e)),t.classList.add(`page-${e}`)}var c=document.getElementById(`app`);async function l(e){if(!e.data)return;let{path:n,key:r,storeKey:i,inlineData:a}=e.data;t.data[i]?.length||(c.innerHTML=`<div class="u-loading"></div>`,t.data[i]=a)}async function u(e){let n=o[e];n&&(c.innerHTML=``,t.currentPage=e,m(e),s(e),await l(n),n.render(c))}var d=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='48'%20height='48'%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3ccircle%20cx='24'%20cy='24'%20r='24'%20fill='%23FFF'/%3e%3cpath%20fill='%230B0D17'%20d='M24%200c0%2016-8%2024-24%2024%2015.718.114%2023.718%208.114%2024%2024%200-16%208-24%2024-24-16%200-24-8-24-24z'/%3e%3c/g%3e%3c/svg%3e`,f=[{page:`home`,label:`Home`},{page:`destination`,label:`Destination`},{page:`crew`,label:`Crew`},{page:`technology`,label:`Technology`}];function p(){let e=document.querySelector(`.c-header`);e.innerHTML=`
    <img class="c-logo" src="${d}"  />

    <nav class="c-nav">
      <ol class="c-nav__list">
      ${f.map((e,t)=>`
          <li 
            data-page="${e.page}" 
            class="c-nav__item js-nav ${t===0?`is-active`:``}">
            
            <span class="c-nav__index">
              ${String(t).padStart(2,`0`)}
            </span>

            <span class="c-nav__nav-heading">
              ${e.label}
            </span>

          </li>
        `).join(``)}
      </ol>
    </nav>
  `,e.addEventListener(`click`,e=>{let t=e.target.closest(`.js-nav`);t&&u(t.dataset.page)})}function m(e){document.querySelector(`.c-header`).querySelectorAll(`.js-nav`).forEach(t=>{t.classList.toggle(`is-active`,t.dataset.page===e)})}function h(){let e=document.querySelector(`.c-footer`);e.innerHTML=`
    
      <div class="c-attribution">
        Challenge by
        <a href="https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3" target="_blank"
          >Frontend Mentor</a
        >. Coded by
        <a href="https://www.frontendmentor.io/profile/AkshayV30">AkshayV30</a>.
      </div>
    
  `}window.addEventListener(`DOMContentLoaded`,g),window.addEventListener(`popstate`,y),document.addEventListener(`click`,v);async function g(){try{p(),h(),await u(_())}catch(e){console.error(`App initialization failed:`,e)}}function _(){return location.hash.replace(`#`,``)||`home`}function v(e){let t=e.target.closest(`[data-route]`);if(!t)return;e.preventDefault();let n=t.dataset.route;history.pushState({page:n},``,`#${n}`),u(n)}function y(e){u(e.state?.page||_())}