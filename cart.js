export default function Cart(){
  
// Fetch the JSON file
fetch('./api/products.json')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();  // Parse the JSON data
})
.then(data => {
  
  let cartIcon = document.querySelector(".cart-btn");
  let closeBtn = document.querySelector(".close");
  let body = document.querySelector("body");
  let cart = [];

  //Add event listeners for open and close cart window    
  
  cartIcon.addEventListener("click", () => {
    body.classList.toggle("activeTabCart")
  })
  
  closeBtn.addEventListener("click", () => {
    body.classList.toggle("activeTabCart")
  })
  
  //   Add products to Cart and save in local storage

  function CartFunction(){
    const setProductInCart = (idProduct,quantity,position) => {
      if (quantity > 0){
        if(position < 0){
          cart.push({
            product_id: idProduct,
            quantity: quantity || 1
          });
        }else{
          cart[position].quantity = quantity;
        }
      }else{
        cart.splice(position, 1)
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      refreshCartContent();
    }
    
    const refreshCartContent = () => {
      let cartItems = document.querySelector(".cart-items")
      let template = document.querySelector(".cartTemplate")
      let listHTML = document.querySelector(".cart-items");
      let totalHTML = document.querySelector(".cart-span");
      let totalQuantity = 0;
      listHTML.innerHTML = null;
      
      cart.forEach(item => {
        totalQuantity += item.quantity;
        let position = data.findIndex((value) => value.id == item.product_id);
        
        if (position >= 0) {
          let info = data[position];
     
          let clone = document.importNode(template.content, true);
     
          clone.querySelector(".cartimg").src = info.image;
          clone.querySelector(".cart-item-name").textContent = info.name;
          clone.querySelector(".totalPrice").textContent = "₹  " + Math.floor(info.price - (info.price * info.discount / 100)) * item.quantity;
          clone.querySelector(".quantity-number").textContent = item.quantity;
          clone.querySelector(".minus").setAttribute("data-id", info.id);
          clone.querySelector(".plus").setAttribute("data-id", info.id);
     
          cartItems.append(clone);
        } else {
          console.log('Product not found in data:', item.product_id);
        }
     });
     
      
      totalHTML.innerHTML = totalQuantity
      
    }
    
    
    document.addEventListener("click", (event) => {
      let buttonClick = event.target;
      let idProduct = buttonClick.dataset.id;
      console.log(idProduct)
      let position = cart.findIndex((value) => value.product_id == idProduct);
      console.log(position)
      console.log(data[position])
      let quantity = position < 0 ? 0 : cart[position].quantity;
      console.log(quantity)
    
      if (buttonClick.classList.contains('cartbtn')|| buttonClick.classList.contains("plus")){
        quantity++;
        setProductInCart(idProduct, quantity, position);
      }
      else if (buttonClick.classList.contains("minus")){
        quantity--;
        setProductInCart(idProduct, quantity, position)
      }
    })
  
  
    const loadCartData = () => {
      if (localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"))
      }
      else{
        cart = [];
      }
      cart = cart.filter(item => item.product_id);
      refreshCartContent()
  
    }
  
  loadCartData();
  console.log(cart)
  }
  
   CartFunction()
})
.catch(error => {
console.error('There was a problem with the fetch operation:', error);
});
}

export const CartFunction = Cart();


