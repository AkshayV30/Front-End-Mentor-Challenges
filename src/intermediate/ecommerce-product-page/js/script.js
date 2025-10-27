document.addEventListener("DOMContentLoaded", function () {
  //   alert("hello");

  const iconCartMain = document.getElementById("icon-cart-main");

  const btnAdd = document.getElementById("icon-plus");
  const btnSub = document.getElementById("icon-minus");
  const countText = document.getElementById("count");
  const btnCart = document.querySelector(".btn-cart");

  const popUps = document.querySelector(".popUp-cart");
  const notificationBadge = document.getElementById("notification-badge");

  let clickCount = 0;

  btnAdd.addEventListener("click", () => {
    if (clickCount < 10) {
      clickCount++;
      countText.textContent = clickCount;
      console.log(`Number of clicks: ${clickCount}`);
    } else {
      playAlert();
    }
  });

  btnSub.addEventListener("click", () => {
    if (clickCount > 0) {
      clickCount--;
      countText.textContent = clickCount;
      console.log(`Number of clicks: ${clickCount}`);
    } else {
      playAlert();
    }
  });

  btnCart.addEventListener("click", () => {
    notificationBadge.textContent = clickCount;
    console.log("click-cart");
  });

  iconCartMain.onclick = () => {
    //  console.log("click-icon-cart");
    popUps.classList.toggle("cart-visibility");
  };

  function playAlert() {
    // Play the audio alert
    alertSound.play();
    //  alert("excced");
  }
});
