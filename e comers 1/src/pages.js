const page = document.querySelectorAll(".pages");

page.forEach((pg) => {
  pg.addEventListener("click", (e) => {
    let target = e.target.id;
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (target == "p1") {
      scrollToTop();
      let generateShop = () => {
        return (shop.innerHTML = shopItemsData
          .filter((x) => !x.id.toString().includes("2")) // Add this line to filter out the items with number 2 in their ids
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
    } else if (target == "p2") {
      scrollToTop();
      return (shop.innerHTML = shopItemsData
        .filter((x) => !x.id.toString().includes("1")) // Add this line to filter out the items with number 2 in their ids
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
    }
  });
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
