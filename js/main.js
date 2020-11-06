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
   let hidePlaceHolderImg = document.querySelector("article.landing > section > .card > .card-img > .placeholde-img ");
   hidePlaceHolderImg.classList.add("hide");
   let showImg = document.querySelector("article.landing > section > .card > .card-img > img");
   showImg.classList.remove("hide");
   randomBeerInfo(0);
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
const randomBeerInfo = (value) => {
   let name = document.querySelector(".card > .card-header > .card-title > .name");
   let img = document.querySelector(".card > .card-img > img ");
   img.src = randBeer[value].image_url;
   name.innerHTML = randBeer[value].name;
   for (let beerIngredients of randBeer[value].ingredients.malt) {
      let ingredientsList = document.createElement("li");
      let ingredientsUserList = document.querySelector(".modal-content > ul");
      let ingredients = beerIngredients.name;
      ingredientsList.textContent = ingredients;
      ingredientsUserList.appendChild(ingredientsList);
   }
   for (let beerHops of randBeer[value].ingredients.hops) {
      let hopsList = document.createElement("li");
      let hopsUserList = document.querySelector(".modal-content > .hops");
      let hops = beerHops.name;
      hopsList.textContent = hops;
      hopsUserList.appendChild(hopsList);
   }

   for (let beerPairing of randBeer[value].food_pairing) {
      let foodList = document.createElement("li");
      let foodUserList = document.querySelector(".modal-content > .food-pairing");
      let food = beerPairing;
      foodList.textContent = food;
      foodUserList.appendChild(foodList);
   }
};

let allBeers = [];
fetch("https://api.punkapi.com/v2/beers")
   .then((res) => res.json())
   .then((beers) => {
      for (let i of beers) {
         allBeers.push(i);
      }
      console.log(allBeers);
   });
let inputBeerName = document.querySelector(".searching-page > section > .empty > .empty-action > .input-beer-name");
let submit = document.querySelector(".name-submit");
submit.addEventListener("click", () => {
   let more1 = document.querySelector(".list > .card > .card-footer > button");
   for (let i of allBeers) {
      let v = i.name.includes(inputBeerName.value);
      if (v == true) {
         let resultList = document.querySelector(".list");
         resultList.classList.remove("hide");
         let name = document.querySelector(".searching-page > section.list >  .card > .card-header > .card-title > .name");
         let img = document.querySelector(".searching-page > section.list >.card > .card-img > img ");
         img.src = i.image_url;
         name.innerHTML = i.name;
         more1.addEventListener("click", () => {
            console.log("hi");
            modal.classList.add("active");
            let nameInModal = document.querySelector(".modal-title");
            nameInModal.innerHTML = i.name;
            let modalImg = document.querySelector(".modal > .modal-container > .modal-body > .modal-content > .card-img > img");
            modalImg.src = i.image_url;
            let modaldescription = document.querySelector(".description");
            modaldescription.innerHTML = `<b>Description:</b> ${i.description}`;
            let modalAlco = document.querySelector(".alco-volume");
            modalAlco.innerHTML = `<b>Volume:</b> ${i.volume.value} ${i.volume.unit}`;
            let tips = document.querySelector(".tips");
            tips.innerHTML = `<b>Tips:</b> ${i.brewers_tips}`;
            for (let beerIngredients of i.ingredients.malt) {
               let ingredientsList = document.createElement("li");
               let ingredientsUserList = document.querySelector(".modal-content > ul");
               let ingredients = beerIngredients.name;
               ingredientsList.textContent = ingredients;
               ingredientsUserList.appendChild(ingredientsList);
            }
            for (let beerHops of i.ingredients.hops) {
               let hopsList = document.createElement("li");
               let hopsUserList = document.querySelector(".modal-content > .hops");
               let hops = beerHops.name;
               hopsList.textContent = hops;
               hopsUserList.appendChild(hopsList);
            }

            for (let beerPairing of i.food_pairing) {
               let foodList = document.createElement("li");
               let foodUserList = document.querySelector(".modal-content > .food-pairing");
               let food = beerPairing;
               foodList.textContent = food;
               foodUserList.appendChild(foodList);
            }
         });
         break;
      }
   }
   inputBeerName.value = "";
});

let searchButt = document.querySelector(".search");
searchButt.addEventListener("click", () => {
   let hideLandimg = document.querySelector(".landing");
   hideLandimg.classList.add("hide");
   let showSearch = document.querySelector(".searching-page");
   showSearch.classList.remove("hide");
});

let homeButt = document.querySelector(".home");
homeButt.addEventListener("click", () => {
   let hideLandimg = document.querySelector(".landing");
   hideLandimg.classList.remove("hide");
   let showSearch = document.querySelector(".searching-page");
   showSearch.classList.add("hide");
});
