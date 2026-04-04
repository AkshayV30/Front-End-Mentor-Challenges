const TESTIMONIALS = [
  {
    id: 1,
    name: "Anisha Li",
    image: "assets/avatars/avatar-anisha.png",
    review:
      "Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.",
  },
  {
    id: 2,
    name: "Ali Bravo",
    image: "assets/avatars/avatar-ali.png",
    review:
      "We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.",
  },
  {
    id: 3,
    name: "Richard Watts",
    image: "assets/avatars/avatar-richard.png",
    review:
      "Manage allows us to provide structure and process. It keeps us organized and focused. I can’t stop recommending them to everyone I talk to!",
  },
  {
    id: 4,
    name: "Shanai Gough",
    image: "assets/avatars/avatar-shanai.png",
    review:
      "Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive.",
  },
];

class AppTestimonials extends HTMLElement {
  current = 0;
  interval = null;

  connectedCallback() {
    this.innerHTML = `
      <section class="testimonials reveal">
        <h2>What they’ve said</h2>

        <div class="slider">
          <div class="slides">
            ${this.renderCards()}
          </div>
        </div>

        <div class="controls">
          <button class="prev" aria-label="Previous testimonial">←</button>
          <button class="next" aria-label="Next testimonial">→</button>
        </div>

        <button class="cta">Get Started</button>

        <div class="banner">
          <h2>Simplify how your team works today.</h2>
          <button>Get Started</button>
        </div>
      </section>
    `;

    this.slides = this.querySelector(".slides");

    // Controls
    this.querySelector(".next").addEventListener("click", () => this.move(1));
    this.querySelector(".prev").addEventListener("click", () => this.move(-1));

    // Auto slide
    this.startAutoSlide();

    // Pause on hover
    this.addEventListener("mouseenter", () => this.stopAutoSlide());
    this.addEventListener("mouseleave", () => this.startAutoSlide());
  }

  // 🔥 Render from data
  renderCards() {
    return TESTIMONIALS.map((item) => this.card(item)).join("");
  }

  //  Single card template
  card({ name, image, review }) {
    return `
      <div class="card" role="group" aria-label="Testimonial from ${name}">
        <img src="${image}" alt="${name}" loading="lazy" />
        <h4>${name}</h4>
        <p>${review}</p>
      </div>
    `;
  }

  //  Slider movement
  move(dir) {
    const total = TESTIMONIALS.length;

    this.current = (this.current + dir + total) % total;

    this.slides.style.transform = `translateX(-${this.current * 100}%)`;
  }

  //  Auto slide
  startAutoSlide() {
    this.stopAutoSlide(); // prevent duplicate intervals
    this.interval = setInterval(() => this.move(1), 4000);
  }

  stopAutoSlide() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // Cleanup (important for production)
  disconnectedCallback() {
    this.stopAutoSlide();
  }
}

customElements.define("app-testimonials", AppTestimonials);

/*
<section>
        <h2>What they’ve said</h2>
        <ul>
          <li>
            <img src="./images/avatar-anisha.png" alt="" />
            <h5>Anisha Li</h5>
            <p>
              “Manage has supercharged our team’s workflow. The ability to
              maintain visibility on larger milestones at all times keeps
              everyone motivated.”
            </p>
          </li>
          <li><img src="./images/avatar-ali.png" alt="" /></li>
          <h5>Ali Bravo</h5>
          <p>
            “We have been able to cancel so many other subscriptions since using
            Manage. There is no more cross-channel confusion and everyone is
            much more focused.”
          </p>
          <li>
            <img src="./images/avatar-richard.png" alt="" />
            <h5>Richard Watts</h5>
            <p>
              “Manage allows us to provide structure and process. It keeps us
              organized and focused. I can’t stop recommending them to everyone
              I talk to!”
            </p>
          </li>
          <li>
            <img src="./images/avatar-shanai.png" alt="" />
            <h5>Shanai Gough</h5>
            <p>
              “Their software allows us to track, manage and collaborate on our
              projects from anywhere. It keeps the whole team in-sync without
              being intrusive.”
            </p>
          </li>
        </ul>
        <button type="button">Get Started</button>
        <div class="banner">
          <h2>Simplify how your team works today.</h2>
          <button>Get Started</button>
        </div>
      </section>
*/
