

document.addEventListener("DOMContentLoaded", function() {

  const login = document.querySelector(".login")
  login.addEventListener("click", function(){
    window.location.href = "login.html"
  })
  let currentIndex = 0;
  const items = document.querySelectorAll(".carousel-item")
  const totalItems = items.length;
  const carousel = document.querySelector(".carousel");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev")


  function ToNext(){
    if (currentIndex < totalItems - 1){
      currentIndex++
    }
    else{
      currentIndex = 0;
    }
    ChangePosition();
  }

  function ToPrev(){
    if (currentIndex > 0){
      currentIndex--;
    }
    else{
      currentIndex = totalItems - 1;
    }
    ChangePosition();
  }

  function ChangePosition(){
    const pos = -currentIndex * 100;
    carousel.style.transform = `translateX(${pos}%)`
  }

  next.addEventListener("click", ToNext);
  prev.addEventListener("click", ToPrev);


setInterval(ToNext, 5000)


// Add content to the card from json file using html template and js


const prodcontent = document.querySelector(".cardContainer");
const template = document.querySelector(".cardTemplate");

const filePath = './api/products.json';  

// Fetch the JSON file
fetch(filePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Parse the JSON data
  })
  .then(data => {
    
    data.forEach(currentEle => {
      const {name, category, id, image, discount, description, brand, rating, price} = currentEle;

      const clone = document.importNode(template.content, true);
      
     
      clone.querySelector(".cardimg").src = image;
      clone.querySelector(".details").setAttribute("href", `product.html?id=${id}`)
      clone.querySelector(".cardDescription").textContent = (description.length > 60) ? description.slice(0, 60) + "..." : description;
      clone.querySelector(".productName").textContent = (name.length > 22) ? name.slice(0, 22) + "..." : name;
      clone.querySelector(".discount").textContent = discount + "% OFF"; 
      clone.querySelector(".actualPrice").textContent = "₹  " + price;
      clone.querySelector(".sellingPrice").textContent = "₹  " + Math.floor(price - (price * discount/100) )
      clone.querySelector(".rating").textContent = rating
      clone.querySelector(".cartbtn").setAttribute("data-id", `${id}`)
      
        prodcontent.append(clone);
 
    });

   
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  
  
});


