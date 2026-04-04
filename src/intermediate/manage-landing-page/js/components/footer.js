class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        
       <div>
              <img src="assets/logo.svg" alt="Manage logo" />
        
              <ul class="col-0">
                <li><img src="assets/icons/icon-facebook.svg" alt="" /></li>
                <li><img src="assets/icons/icon-instagram.svg" alt="" /></li>
                <li><img src="assets/icons/icon-pinterest.svg" alt="" /></li>
                <li><img src="assets/icons/icon-twitter.svg" alt="" /></li>
                <li><img src="assets/icons/icon-youtube.svg" alt="" /></li>
                </ul>
            
                <ul class="col-1">
                <li>Home</li>
                <li>Pricing</li>
                <li>Products</li>
                  <li>About Us</li>
                </ul>

                <ul class="col-2">
                <li>Careers</li>
                <li>Community</li>
                <li>Privacy Policy</li>
                </ul>
                    
               <form class="col-3">
                <label for="email" class="visually-hidden">Email</label>
                <input id="email" type="email" placeholder="Updates in your inbox…" required />
                <button type="submit">Go</button>
               </form>
          
        
    
              <p>Copyright 2020. All Rights Reserved</p>
      </div>
    
      <div class="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
          >Frontend Mentor</a
        >. Coded by <a href="#">Your Name Here</a>.
      </div>
      
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);

/*
<footer>
      <div>
        <img id="logo-white" src="./images/logo.svg" alt="" srcset="" />
        <ul class="col-0">
          <li><img src="./images/icon-facebook.svg" alt="" /></li>
          <li><img src="./images/icon-instagram.svg" alt="" /></li>
          <li><img src="./images/icon-pinterest.svg" alt="" /></li>
          <li><img src="./images/icon-twitter.svg" alt="" /></li>
          <li><img src="./images/icon-youtube.svg" alt="" /></li>
        </ul>

        <ul class="col-1">
          <li>Home</li>
          <li>Pricing</li>
          <li>Products</li>
          <li>About Us</li>
        </ul>

        <ul class="col-2">
          <li>Careers</li>
          <li>Community</li>
          <li>Privacy Policy</li>
        </ul>

        <div class="col-3">
          <div>
            <input
              type="search"
              name="update"
              id="update"
              placeholder=" Updates in your inbox…"
            />

            <button>Go</button>
          </div>
          <cite>Copyright 2020. All Rights Reserved</cite>
        </div>
      </div>
      <div class="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
          >Frontend Mentor</a
        >. Coded by <a href="#">Your Name Here</a>.
      </div>
    </footer>
*/
