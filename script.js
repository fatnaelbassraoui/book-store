const cardTemplate = document.querySelector("[data-template]")
const cardContainer = document.querySelector("[cards-container]")

let myUrl = `https://striveschool-api.herokuapp.com/books`;

let dataCards = []
console.log(dataCards);

fetch(myUrl).then(res => {
  return res.json()
})
  .then(data => {

    dataCards = data.slice(0, 12).map(info => {
      const card = cardTemplate.content.cloneNode(true)
      let img = card.querySelector("[card-img]")
      const title = card.querySelector("[card-title]")
      const category = card.querySelector("[card-category]")
      const price = card.querySelector("[card-price]")
      // const button = card.querySelector("[card-button]")
      img.src = info.img
      title.textContent = info.title
      category.textContent = `Category :  ${info.category}`
      price.textContent = `Price :  ${info.price}`
      cardContainer.append(card)
      return { title: info.title, price: info.price, category: info.category, img: info.img, element: card }
    })

  })



fetch(myUrl).then(res => {
  return res.json()
})
  .then(data => {

    let btn = document.getElementsByClassName("btnCart")
    btn = Array.from(btn);
    btn.forEach((element, i) => {
      element.addEventListener("click", () => {
        addProdToCart(data[i])

      })

    });

  });

let total = 0;


function addProdToCart(elem) {
  /* console.log(elem);*/

  let cartPrice = elem.price
  let cartImg = elem.img


  let elemCart = document.getElementById("cart");
  products = `<div id='containerCart' class='d-flex flex-row  justify-content-between'>
    <img id='img'src='${cartImg}'style='width:35px; height:28px; ' class='rounded-1 >
     <p id='price'   font-weight:bold; font-style:italic; '>€ ${cartPrice}</p>
     <hr>
     </div>`;
  elemCart.innerHTML += products;


  total += +cartPrice;


  let totalCart = document.getElementById("priceTot");
  totPrice = `<p id='cartTotal' style=' font-weight:bold;'>Total sum</p>
    <p id='cartTotale' style=' font-weight:bold;'>€ ${total}</p>`;

  totalCart.innerHTML = totPrice;

}

const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", e => {

  const value = e.target.value


  dataCards.forEach(dataCard => {
    console.log(dataCard);

    const isVisible =
      dataCard.title.toLowerCase().includes(value) ||
      dataCard.category.toLowerCase().includes(value) ||
      dataCard.toLowerCase().price.includes(value)

    dataCard.element.classList.toggle("hide", !isVisible)
    /*Element.classList è una proprietà di sola lettura che restituisce una raccolta DOMTokenList attiva degli attributi di classe dell'elemento. Questo può quindi essere utilizzato per manipolare l'elenco delle classi.*/
  })

})