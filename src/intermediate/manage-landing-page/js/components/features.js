class AppFeatures extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="features reveal">
        <h2>What’s different about Manage?</h2>

        <ul>
          ${this.item("01", "Track company-wide progress")}
          ${this.item("02", "Advanced reports")}
          ${this.item("03", "Everything in one place")}
        </ul>
      </section>
    `;
  }

  item(num, title) {
    return `
      <li>
        <span>${num}</span>
        <h3>${title}</h3>
        <p>Detailed explanation of the feature.</p>
      </li>
    `;
  }
}

customElements.define("app-features", AppFeatures);

/*
 <section class="section-2">
        <div>
          <h2>What’s different about Manage?</h2>
          <p>
            Manage provides all the functionality your team needs, without the
            complexity. Our software is tailor-made for modern digital product
            teams.
          </p>
        </div>
        <ul>
          <li>
            <h3>01</h3>
            <h4>Track company-wide progress</h4>
            <p>
              See how your day-to-day tasks fit into the wider vision. Go from
              tracking progress at the milestone level all the way done to the
              smallest of details. Never lose sight of the bigger picture again.
            </p>
          </li>
          <li>
            <h3>02</h3>
            <h4>Advanced built-in reports</h4>
            <p>
              Set internal delivery estimates and track progress toward company
              goals. Our customisable dashboard helps you build out the reports
              you need to keep key stakeholders informed.
            </p>
          </li>
          <li>
            <h3>03</h3>
            <h4>Everything you need in one place</h4>
            <p>
              Stop jumping from one service to another to communicate, store
              files, track tasks and share documents. Manage offers an
              all-in-one team productivity solution.
            </p>
          </li>
        </ul>
      </section>*/
