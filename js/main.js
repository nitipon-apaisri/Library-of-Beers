let randBeer = [];
let fetchingBeers = async () => {
   await fetch("https://api.punkapi.com/v2/beers/random")
      .then((res) => res.json())
      .then((beers) => {
         randBeer.push(beers[0]);
      });
};
let more = document.querySelector(".card > .card-footer > button");
let modal = document.querySelector(".modal");

let beerIngredients = async () => {
   for (let i = 0; i < randBeer[0]; i++) {
      console.log(i);
   }
};
beerIngredients();
let rand = document.querySelector(".random");
rand.addEventListener("click", async () => {
   randBeer = [];
   await fetchingBeers();
   randomBeerInfo();
   console.log(randBeer[0].ingredients.malt);
   console.log(randBeer[0].ingredients.hops);
   console.log(randBeer[0].food_pairing);
});
more.addEventListener("click", () => {
   modal.classList.add("active");
   let nameInModal = document.querySelector(".modal-title");
   nameInModal.innerHTML = randBeer[0].name;
   let modalImg = document.querySelector(".modal > .modal-container > .modal-body > .modal-content > .card-img > img");
   modalImg.src = randBeer[0].image_url;
   let modaldescription = document.querySelector(".description");
   modaldescription.innerHTML = `<b>Description:</b> ${randBeer[0].description}`;
   let modalAlco = document.querySelector(".alco-volume");
   modalAlco.innerHTML = `<b>Volume:</b> ${randBeer[0].volume.value} ${randBeer[0].volume.unit}`;
   let tips = document.querySelector(".tips");
   tips.innerHTML = `<b>Tips:</b> ${randBeer[0].brewers_tips}`;
});

let closeButt = document.querySelector(".modal > .modal-container > .modal-header > .close");
closeButt.addEventListener("click", () => {
   modal.classList.remove("active");
});
const randomBeerInfo = () => {
   let name = document.querySelector(".card > .card-header > .card-title > .name");
   let img = document.querySelector(".card > .card-img > img ");
   img.src = randBeer[0].image_url;
   name.innerHTML = randBeer[0].name;
   for (let beerIngredients of randBeer[0].ingredients.malt) {
      let ingredientsList = document.createElement("li");
      let ingredientsUserList = document.querySelector(".modal-content > ul");
      let ingredients = beerIngredients.name;
      ingredientsList.textContent = ingredients;
      ingredientsUserList.appendChild(ingredientsList);
   }
   for (let beerHops of randBeer[0].ingredients.hops) {
      let hopsList = document.createElement("li");
      let hopsUserList = document.querySelector(".modal-content > .hops");
      let hops = beerHops.name;
      hopsList.textContent = hops;
      hopsUserList.appendChild(hopsList);
   }

   for (let beerPairing of randBeer[0].food_pairing) {
      let foodList = document.createElement("li");
      let foodUserList = document.querySelector(".modal-content > .food-pairing");
      let food = beerPairing;
      foodList.textContent = food;
      foodUserList.appendChild(foodList);
   }
};
