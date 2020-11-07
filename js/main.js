let randBeer = [];

const fetchingBeers = async () => {
   await fetch("https://api.punkapi.com/v2/beers/random")
      .then((res) => res.json())
      .then((beers) => {
         randBeer.push(beers[0]);
      });
};

const modal = document.querySelector(".modal");

const rand = document.querySelector(".random");
rand.addEventListener("click", async () => {
   randBeer = [];
   await fetchingBeers();
   const hidePlaceHolderImg = document.querySelector("article.landing > section > .card > .card-img > .placeholde-img ");
   hidePlaceHolderImg.classList.add("hide");
   const showImg = document.querySelector("article.landing > section > .card > .card-img > img");
   showImg.classList.remove("hide");
   randomBeerInfo(0);
});

const more = document.querySelector(".card > .card-footer > button");
more.addEventListener("click", () => {
   modal.classList.add("active");
   const nameInModal = document.querySelector(".modal-title");
   nameInModal.innerHTML = randBeer[0].name;
   const modalImg = document.querySelector(".modal > .modal-container > .modal-body > .modal-content > .card-img > img");
   modalImg.src = randBeer[0].image_url;
   const modaldescription = document.querySelector(".description");
   modaldescription.innerHTML = `<b>Description:</b> ${randBeer[0].description}`;
   const modalAlco = document.querySelector(".alco-volume");
   modalAlco.innerHTML = `<b>Volume:</b> ${randBeer[0].volume.value} ${randBeer[0].volume.unit}`;
   const tips = document.querySelector(".tips");
   tips.innerHTML = `<b>Tips:</b> ${randBeer[0].brewers_tips}`;
});

const closeButt = document.querySelector(".modal > .modal-container > .modal-header > .close");
closeButt.addEventListener("click", () => {
   modal.classList.remove("active");
});

const randomBeerInfo = (value) => {
   const name = document.querySelector(".card > .card-header > .card-title > .name");
   const img = document.querySelector(".card > .card-img > img ");
   img.src = randBeer[value].image_url;
   name.innerHTML = randBeer[value].name;
   for (const beerIngredients of randBeer[value].ingredients.malt) {
      const ingredientsList = document.createElement("li");
      const ingredientsUserList = document.querySelector(".modal-content > ul");
      const ingredients = beerIngredients.name;
      ingredientsList.textContent = ingredients;
      ingredientsUserList.appendChild(ingredientsList);
   }
   for (const beerHops of randBeer[value].ingredients.hops) {
      const hopsList = document.createElement("li");
      const hopsUserList = document.querySelector(".modal-content > .hops");
      const hops = beerHops.name;
      hopsList.textContent = hops;
      hopsUserList.appendChild(hopsList);
   }

   for (const beerPairing of randBeer[value].food_pairing) {
      const foodList = document.createElement("li");
      const foodUserList = document.querySelector(".modal-content > .food-pairing");
      const food = beerPairing;
      foodList.textContent = food;
      foodUserList.appendChild(foodList);
   }
};

const searchButt = document.querySelector(".search");
searchButt.addEventListener("click", () => {
   hideLanding();
});
const homeButt = document.querySelector(".home");
homeButt.addEventListener("click", () => {
   showLanding();
});
