let shop = document.getElementById("shop");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .filter((x) => !x.id.toString().includes("2"))
    .map((x) => {
      let { id, name, desc, img, price } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
    <img width="220" hight='220' src=${img} alt="" onclick="openImageModal('${img}', '${name}')">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price} </h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

generateShop();

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/**
 * ! To calculate total amount of selected Items
 */

// let calculation = () => {
//   let cartIcon = document.getElementById("cartAmount");

//   cartIcon.innerHTML = basket
//     .map((x) => x.item)
//     .reduce((x, y) => x + y, 0);
// };

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");

  let totalItems = basket
    .map((x) => x.item)
    .reduce((x, y) => x + y, 0);

  cartIcon.innerHTML = totalItems;

  if (totalItems === 0) {
    cartIcon.style.display = "none";
  } else {
    cartIcon.style.display = "block";
  }
};

// let calculation = () => {
//   let cartIcon = document.getElementById("cartAmount");
//   cartIcon.innerHTML = basket
//     .map((x) => x.item)
//     .reduce((x, y) => x + y, 0);
// };

// let updateCartIcon = () => {
//   let cartIcon = document.getElementById("cartAmount");
//   if (cartIcon.innerHTML == 0) {
//     cartIcon.style.opacity = 0;
//   } else updateCartIcon();
// };

// Make sure to call updateCartIcon() at the appropriate place in your code
// updateCartIcon();

calculation();

// const page = document.querySelectorAll(".pages");

// page.forEach((pg) => {
//   pg.addEventListener("click", (e) => {
//     let target = e.target.id;
//     if (target == "p1") {
//     }
//     console.log(target);
//   });
// });

// document
//   .querySelector(".taggle-div")
//   .addEventListener("click", () => {
//     document.body.classList.toggle("dark");
//     const sun = document.querySelector(".sun");
//     const moon = document.querySelector(".moon");
//     sun.classList.toggle("active");
//     moon.classList.toggle("active");
//   });
// const clickEvent =
//   'document.querySelector(".taggle-div").addEventListener("click", () => { document.body.classList.toggle("dark"); const sun = document.querySelector(".sun"); const moon = document.querySelector(".moon"); sun.classList.toggle("active"); moon.classList.toggle("active"); });';

// localStorage.setItem("clickEvent", clickEvent);

// function handleTaggleClick() {
//   const clickEvent = localStorage.getItem("clickEvent");
//   const clickFunction = new Function(clickEvent);
//   clickFunction();
// }

// document
//   .querySelector(".taggle-div")
//   .addEventListener("click", handleTaggleClick);
// document
//   .querySelector(".taggle-div")
//   .addEventListener("click", () => {
//     document.body.classList.toggle("dark");
//     const sun = document.querySelector(".sun");
//     const moon = document.querySelector(".moon");
//     sun.classList.toggle("active");
//     moon.classList.toggle("active");

//     // Save theme state to localStorage
//     if (document.body.classList.contains("dark")) {
//       localStorage.setItem("theme", "dark");
//     } else {
//       localStorage.setItem("theme", "light");
//     }
//   });

// // Load saved theme state from localStorage on page load
// document.addEventListener("DOMContentLoaded", () => {
//   const savedTheme = localStorage.getItem("theme");
//   if (savedTheme === "dark") {
//     document.body.classList.add("dark");
//     const sun = document.querySelector(".sun");
//     const moon = document.querySelector(".moon");
//     sun.classList.add("active");
//     moon.classList.add("active");
//   }
// });

// const sun = document.querySelector(".sun");
// const moon = document.querySelector(".moon");

// const taggle = document
//   .querySelector(".taggle-div")
//   .addEventListener("click", () => {
//     document.body.classList.toggle("dark");
//     if (document.body.classList == "dark") {
//       sun.style.display = "none";
//       moon.style.display = "block";
//     } else {
//       sun.style.display = "block";
//       moon.style.display = "none";
//     }
//   });

const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

const toggle = document.querySelector(".taggle-div");
toggle.addEventListener("click", () => {
  const isDarkTheme = document.body.classList.toggle("dark");
  const theme = isDarkTheme ? "dark" : "light";

  if (theme === "dark") {
    sun.style.display = "none";
    moon.style.display = "block";
  } else {
    sun.style.display = "block";
    moon.style.display = "none";
  }

  // Save theme state to localStorage
  localStorage.setItem("theme", theme);
});

// Load saved theme state from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    sun.style.display = "none";
    moon.style.display = "block";
  } else {
    document.body.classList.remove("dark");
    sun.style.display = "block";
    moon.style.display = "none";
  }
});

function openImageModal(imgSrc, imgCaption) {
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const caption = document.getElementById("caption");

  imageModal.style.display = "block";
  modalImage.src = imgSrc;
  caption.innerHTML = imgCaption;

  const closeModal = document.getElementsByClassName("close")[0];
  closeModal.onclick = () => {
    imageModal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === imageModal) {
      imageModal.style.display = "none";
    }
  };
}
