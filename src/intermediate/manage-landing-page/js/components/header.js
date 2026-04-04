class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <img src="assets/logo.svg" alt="Manage logo" />

        <button class="nav-toggle" aria-label="Toggle navigation">
          ☰
        </button>

        <nav class="nav" aria-label="Primary navigation">
          <ul>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Product</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </nav>

        <button class="cta">Get Started</button>
      </header>
    `;

    const toggle = this.querySelector(".nav-toggle");
    const nav = this.querySelector(".nav");

    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
}

customElements.define("app-header", AppHeader);
