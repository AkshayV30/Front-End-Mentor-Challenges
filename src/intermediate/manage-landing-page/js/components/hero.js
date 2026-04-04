class AppHero extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero reveal">
        <div>
          <h1>Bring everyone together to build better products.</h1>
          <p>
            Manage makes it simple for teams to plan tasks while keeping goals in view.
          </p>
          <button>Get Started</button>
        </div>

        <img src="assets/illustration-intro.svg" alt="Dashboard illustration" loading="lazy"/>
      </section>
    `;
  }
}

customElements.define("app-hero", AppHero);
