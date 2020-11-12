//---------- Global varaialbes ----------
const randCard = document.querySelector(".cover-inside");
const cardBody = document.querySelectorAll(".card-body");
const name = document.querySelector(".card > .cover-inside > .card-header > .card-title > .name");
const img = document.querySelector(".card > .cover-inside > .card-img > img ");
const beerInfoName = document.querySelector(".beer-info > .card > .card-header > .card-title > h3");
const rFoodUserList = document.querySelector(" .beer-info > .card > .card-body > .food-pairing");
const rHopsUserList = document.querySelector(".beer-ingredients > .card > .card-body > .hops");
const rMaltUserList = document.querySelector(".beer-ingredients > .card > .card-body > .ingredients");
let randBeer = [];
//---------- Fetching beer by random ----------
const fetchingBeers = async () => {
   await fetch("https://api.punkapi.com/v2/beers/random")
      .then((res) => res.json())
      .then((beers) => {
         randBeer.push(beers[0]);
      });
};
const hideCardBody = () => {
   cardBody.forEach((hide) => {
      hide.classList.add("hide");
   });
};
const showCardBody = () => {
   cardBody.forEach((hide) => {
      hide.classList.remove("hide");
   });
};

//---------- Random a beer from fetching function ----------
const rand1 = document.querySelector(".random-1");
const rand2 = document.querySelector(".random-2");
rand1.addEventListener("click", async () => {
   randBeer = [];
   randBeerMalt = [];
   randCard.classList.add("hide");
   beerInfoName.classList.add("hide");
   fetchingBeers();
   showLoader();
   hideCardBody();
   setTimeout(() => {
      hideLoader();
      beerInfoName.classList.remove("hide");
      randCard.classList.remove("hide");
      const placeHolderImg = document.querySelector("article.landing > section > .card > .cover-inside > .card-img > .placeholde-img ");
      placeHolderImg.classList.add("hide");
      const showImg = document.querySelector("article.landing > section > .card > .cover-inside > .card-img > img");
      showImg.classList.remove("hide");
      if (randBeer[0].image_url == null) {
         showImg.classList.add("hide");
         placeHolderImg.classList.remove("hide");
      } else {
         img.src = randBeer[0].image_url;
      }
      name.innerHTML = randBeer[0].name;
      showCardBody();
      showBeerInfo();
      randomBeerInfo();
   }, 2000);
});
rand2.addEventListener("click", async () => {
   let foodPL = document.querySelectorAll(".food-pairing-l");
   foodPL.forEach((r) => {
      r.remove();
   });
   let hops = document.querySelectorAll(".hops-l");
   hops.forEach((r) => {
      r.remove();
   });
   let ingre = document.querySelectorAll(".ingre-l");
   ingre.forEach((r) => {
      r.remove();
   });
   randBeer = [];
   randBeerMalt = [];
   randCard.classList.add("hide");
   beerInfoName.classList.add("hide");
   fetchingBeers();
   showLoader();
   hideCardBody();
   setTimeout(() => {
      hideLoader();
      beerInfoName.classList.remove("hide");
      randCard.classList.remove("hide");
      const placeHolderImg = document.querySelector("article.landing > section > .card > .cover-inside > .card-img > .placeholde-img ");
      placeHolderImg.classList.add("hide");
      const showImg = document.querySelector("article.landing > section > .card > .cover-inside > .card-img > img");
      showImg.classList.remove("hide");
      if (randBeer[0].image_url == null) {
         showImg.classList.add("hide");
         placeHolderImg.classList.remove("hide");
      } else {
         img.src = randBeer[0].image_url;
      }
      name.innerHTML = randBeer[0].name;
      showCardBody();
      showBeerInfo();
      randomBeerInfo();
   }, 2000);
});
//---------- Show more data function ----------
const beerInfo = document.querySelector(".beer-info");
const beerIngredients = document.querySelector(".beer-ingredients");
const more = document.querySelector(".card > .cover-inside >.card-footer > button");
more.addEventListener("click", () => {
   hideBeerInfoLoader();
   rand1.classList.add("hide");
   rand2.classList.remove("hide");
   beerInfo.classList.remove("hide");
   beerIngredients.classList.remove("hide");
   showCardBody();
});
//---------- loop beer info ----------
const randomBeerInfo = () => {
   randBeer[0].ingredients.malt.forEach((beerMalt) => {
      const maltList = document.createElement("li");
      maltList.setAttribute("class", "ingre-l");
      const malt = beerMalt.name;
      const maltVolum = beerMalt.amount.value;
      maltList.textContent = `${maltVolum} kg - ${malt}`;
      rMaltUserList.appendChild(maltList);
   });
   randBeer[0].ingredients.hops.forEach((beerHops) => {
      const hopsList = document.createElement("li");
      hopsList.setAttribute("class", "hops-l");
      const hops = beerHops.name;
      const hopsVolum = beerHops.amount.value;
      hopsList.textContent = `${hopsVolum} g - ${hops}`;
      rHopsUserList.appendChild(hopsList);
   });
   randBeer[0].food_pairing.forEach((beerPairing) => {
      const foodList = document.createElement("li");
      foodList.setAttribute("class", "food-pairing-l");
      const food = beerPairing;
      foodList.textContent = food;
      rFoodUserList.appendChild(foodList);
   });
};
//---------- Display beer info ----------
const showBeerInfo = () => {
   const nameInModal = document.querySelector(".beer-info > .card > .card-header > .card-title > h3.name");
   nameInModal.innerHTML = randBeer[0].name;
   const modaldescription = document.querySelector(".beer-info > .card > .card-body > .description");
   modaldescription.innerHTML = `<b>Description:</b> ${randBeer[0].description}`;
   const modalAlco = document.querySelector(".beer-info > .card > .card-body > .alco-volume");
   modalAlco.innerHTML = `<b>Volume:</b> ${randBeer[0].volume.value} ${randBeer[0].volume.unit}`;
   const tips = document.querySelector(".beer-info > .card > .card-body > .tips");
   tips.innerHTML = `<b>Tips:</b> ${randBeer[0].brewers_tips}`;
   const ingredientTitle = document.querySelector(".ingredient-title");
   ingredientTitle.textContent = "Malt";
   const hopTitle = document.querySelector(".hop-title");
   hopTitle.textContent = "Hops";
   const foodPairingTitle = document.querySelector(".food-pairing-title");
   foodPairingTitle.textContent = "Food pairing";
};
