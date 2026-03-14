import { galleryTemplate } from "../Gallery/gallery.template.js";
import { state } from "../../core/state.js";

export function lightBoxTemplate() {
  return `

      <div class="c-lightbox-contents u-flex u-flex-center u-flex-gap-xl u-flex-col u-position-relative" >
          
         <button class="c-btn-lightBox btn-close u-position-absolute">
            <img src="./res/assets/icons/icon-close.svg" alt="close-btn" />
          </button>

          <button class="c-btn-lightBox btn-prev u-position-absolute">
            <img src="./res/assets/icons/icon-previous.svg" alt="previous icon" />
          </button>

          <button class="c-btn-lightBox btn-next u-position-absolute">
            <img src="./res/assets/icons/icon-next.svg" alt="forward icon" />
          </button>
       

          ${galleryTemplate(state.selectedProduct)}

     </div>


  `;
}
