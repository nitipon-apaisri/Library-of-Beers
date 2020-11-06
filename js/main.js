let allBeers = [];
let fetchingBeers = async () => {
   await fetch("https://api.punkapi.com/v2/beers/random")
      .then((res) => res.json())
      .then((beers) => {
         allBeers.push(beers[0]);
      });
};
let more = document.querySelector(".card > .card-footer > button");
let modal = document.querySelector(".modal");

let beerIngredients = async () => {
   for (let i = 0; i < allBeers[0]; i++) {
      console.log(i);
   }
};
beerIngredients();
more.addEventListener("click", () => {
   modal.classList.add("active");
   let nameInModal = document.querySelector(".modal-title");
   nameInModal.innerHTML = allBeers[0].name;
   let modalImg = document.querySelector(".modal > .modal-container > .modal-body > .modal-content > .card-img > img");
   modalImg.src = allBeers[0].image_url;
   let modaldescription = document.querySelector(".description");
   modaldescription.innerHTML = `<b>Description:</b> ${allBeers[0].description}`;
   let modalAlco = document.querySelector(".alco-volume");
   modalAlco.innerHTML = `<b>Volume:</b> ${allBeers[0].volume.value} ${allBeers[0].volume.unit}`;
   let tips = document.querySelector(".tips");
   tips.innerHTML = `<b>Tips:</b> ${allBeers[0].brewers_tips}`;
});

let closeButt = document.querySelector(".modal > .modal-container > .modal-header > .close");
closeButt.addEventListener("click", () => {
   modal.classList.remove("active");
});
let rand = document.querySelector(".random");
rand.addEventListener("click", async () => {
   allBeers = [];
   await fetchingBeers();
   let name = document.querySelector(".card > .card-header > .card-title > .name");
   let img = document.querySelector(".card > .card-img > img ");
   img.src = allBeers[0].image_url;
   name.innerHTML = allBeers[0].name;
   for (let beerIngredients of allBeers[0].ingredients.malt) {
      let ingredientsList = document.createElement("li");
      let ingredientsUserList = document.querySelector(".modal-content > ul");
      let ingredients = beerIngredients.name;
      ingredientsList.textContent = ingredients;
      ingredientsUserList.appendChild(ingredientsList);
   }
   for (let beerHops of allBeers[0].ingredients.hops) {
      let hopsList = document.createElement("li");
      let hopsUserList = document.querySelector(".modal-content > .hops");
      let hops = beerHops.name;
      hopsList.textContent = hops;
      hopsUserList.appendChild(hopsList);
   }

   for (let beerPairing of allBeers[0].food_pairing) {
      let foodList = document.createElement("li");
      let foodUserList = document.querySelector(".modal-content > .food-pairing");
      let food = beerPairing;
      foodList.textContent = food;
      foodUserList.appendChild(foodList);
   }

   console.log(allBeers[0].ingredients.malt);
   console.log(allBeers[0].ingredients.hops);
   console.log(allBeers[0].food_pairing);
});