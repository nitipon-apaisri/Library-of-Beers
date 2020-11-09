//---------- Global varaialbes ----------
let count = 0;
let currentPageNr = 1;
let perPage = 8;
const input = document.querySelector(".input-beer-name");
const submit = document.querySelector(".name-submit");
const mainList = document.querySelector("section.list");
const subList = document.querySelector(".sub-list");
const previousBtn = document.querySelector(".previous");
const nexBtn = document.querySelector(".next");
const currentPage = document.querySelector(".current-page");
let newValue = 0;
let beersArr = [];
//---------- Searching feature ----------
submit.addEventListener("click", async () => {
   refreshContent();
   beersArr = [];
   const results = "https://api.punkapi.com/v2/beers?beer_name=" + input.value + "&per_page=80";
   await fetch(results)
      .then((res) => res.json())
      .then((beers) => {
         beers.forEach((beer) => {
            beersArr.push(beer);
         });
      });
   showLoaderList();
   mainList.classList.add("hide");
   subList.classList.add("hide");
   setTimeout(() => {
      if (beersArr.length > 8) {
         showLoaderList();
         setTimeout(() => {
            hideLoaderList();
            subList.classList.remove("hide");
            nexBtn.classList.remove("hide");
            currentPage.classList.remove("hide");
            seeMore();
            currentPage.textContent = `${currentPageNr} / ${Math.ceil(beersArr.length / perPage)}`;
            beersData();
         }, 1000);
      } else {
         currentPage.classList.add("hide");
         nexBtn.classList.add("hide");
         showLoaderList();
         setTimeout(() => {
            hideLoaderList();
            mainList.classList.remove("hide");
            subList.classList.add("hide");
            seeMore();
         }, 1000);
         renderCard();
         setValue();
      }
   }, 500);
   input.value = "";
   console.log(beersArr.length);
});
//---------- See more butt function ----------
const seeMore = () => {
   const seeMoreButt = document.querySelectorAll(".see-more");
   seeMoreButt.forEach((butt) => {
      butt.addEventListener("click", () => {
         let buttValue = Number(butt.value);
         buttValue += count;
         renderInfo(buttValue);
      });
   });
};
//---------- Renders info when clicked more butt ----------
const renderInfo = (buttValue) => {
   modal.classList.add("active");
   const nameInModal = document.querySelector(".modal-title");
   nameInModal.innerHTML = beersArr[buttValue].name;
   const modalImg = document.querySelector(".modal > .modal-container > .modal-body > .modal-content > .card-img > img");
   modalImg.src = beersArr[buttValue].image_url;
   const modaldescription = document.querySelector(".description");
   modaldescription.innerHTML = `<b>Description:</b> ${beersArr[buttValue].description}`;
   const modalAlco = document.querySelector(".alco-volume");
   modalAlco.innerHTML = `<b>Volume:</b> ${beersArr[buttValue].volume.value} ${beersArr[buttValue].volume.unit}`;
   const tips = document.querySelector(".tips");
   tips.innerHTML = `<b>Tips:</b> ${beersArr[buttValue].brewers_tips}`;
   beersArr[buttValue].ingredients.malt.forEach((beerIngredients) => {
      const ingredientsList = document.createElement("li");
      const ingredientsUserList = document.querySelector(".modal-content > ul");
      const ingredients = beerIngredients.name;
      ingredientsList.textContent = ingredients;
      ingredientsUserList.appendChild(ingredientsList);
   });
   beersArr[buttValue].ingredients.hops.forEach((beerHops) => {
      const hopsList = document.createElement("li");
      const hopsUserList = document.querySelector(".modal-content > .hops");
      const hops = beerHops.name;
      hopsList.textContent = hops;
      hopsUserList.appendChild(hopsList);
   });
   beersArr[buttValue].food_pairing.forEach((beerPairing) => {
      const foodList = document.createElement("li");
      const foodUserList = document.querySelector(".modal-content > .food-pairing");
      const food = beerPairing;
      foodList.textContent = food;
      foodUserList.appendChild(foodList);
   });
};
//---------- Renders card's element when result is less than 8 ----------
const renderCard = () => {
   const row = document.createElement("div");
   beersArr.forEach((elements) => {
      row.setAttribute("class", "columns");
      const coverCard = document.createElement("div");
      coverCard.setAttribute("class", "cover-card column col-3");
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      coverCard.append(card);
      const cardHeader = document.createElement("div");
      cardHeader.setAttribute("class", "card-header");
      card.append(cardHeader);
      const cardTitle = document.createElement("div");
      cardTitle.setAttribute("class", "card-title");
      cardHeader.append(cardTitle);
      const title = document.createElement("h5");
      title.setAttribute("class", "name");
      title.textContent = elements.name;
      cardTitle.append(title);
      const cardFooter = document.createElement("div");
      cardFooter.setAttribute("class", "card-footer");
      const seeMore = document.createElement("button");
      seeMore.textContent = "See more";
      seeMore.setAttribute("class", "btn btn-primary see-more");
      cardFooter.append(seeMore);
      card.append(cardFooter);
      row.append(coverCard);
   });
   const append = document.querySelector(".list");
   append.append(row);
};
//---------- Setting value for see more butt ----------
let setValue = () => {
   let allButt = document.querySelectorAll(".see-more");
   allButt.forEach((item, i) => {
      item.setAttribute("value", i);
   });
};
//---------- Next fucntion ----------
let current0 = 0;
let current1 = 1;
let current2 = 2;
let current3 = 3;
let current4 = 4;
let current5 = 5;
let current6 = 6;
let current7 = 7;
nexBtn.addEventListener("click", () => {
   previousBtn.classList.remove("hide");
   count += 8;
   currentPageNr += 1;
   currentPage.textContent = `${currentPageNr} / ${Math.ceil(beersArr.length / perPage)}`;
   current0 = 0 + count;
   current1 = 1 + count;
   current2 = 2 + count;
   current3 = 3 + count;
   current4 = 4 + count;
   current5 = 5 + count;
   current6 = 6 + count;
   current7 = 7 + count;
   subList.classList.add("hide");
   showLoaderList();
   setTimeout(() => {
      hideLoaderList();
      subList.classList.remove("hide");
      const cardName0 = document.querySelector(".card-0 > .card > .card-header > .card-title > h5");
      cardName0.textContent = beersArr[current0].name;
      const cardName1 = document.querySelector(".card-1 > .card > .card-header > .card-title > h5");
      cardName1.textContent = beersArr[current1].name;
      const cardName2 = document.querySelector(".card-2 > .card > .card-header > .card-title > h5");
      cardName2.textContent = beersArr[current2].name;
      const cardName3 = document.querySelector(".card-3 > .card > .card-header > .card-title > h5");
      cardName3.textContent = beersArr[current3].name;
      const cardName4 = document.querySelector(".card-4 > .card > .card-header > .card-title > h5");
      cardName4.textContent = beersArr[current4].name;
      const cardName5 = document.querySelector(".card-5 > .card > .card-header > .card-title > h5");
      cardName5.textContent = beersArr[current5].name;
      const cardName6 = document.querySelector(".card-6 > .card > .card-header > .card-title > h5");
      cardName6.textContent = beersArr[current6].name;
      const cardName7 = document.querySelector(".card-7 > .card > .card-header > .card-title > h5");
      cardName7.textContent = beersArr[current7].name;
   }, 1500);
   if (count === beersArr.length - 8) {
      nexBtn.classList.add("hide");
   }
   console.log(count);
   console.log(`"newValue:" ${count}`);
});
//---------- Prevoius funciton ----------
previousBtn.addEventListener("click", () => {
   count -= 8;
   currentPageNr -= 1;
   currentPage.textContent = `${currentPageNr} / ${Math.ceil(beersArr.length / perPage)}`;
   current0 -= 8;
   current1 -= 8;
   current2 -= 8;
   current3 -= 8;
   current4 -= 8;
   current5 -= 8;
   current6 -= 8;
   current7 -= 8;

   subList.classList.add("hide");
   showLoaderList();
   setTimeout(() => {
      hideLoaderList();
      subList.classList.remove("hide");
      const cardName0 = document.querySelector(".card-0 > .card > .card-header > .card-title > h5");
      cardName0.textContent = beersArr[current0].name;
      const cardName1 = document.querySelector(".card-1 > .card > .card-header > .card-title > h5");
      cardName1.textContent = beersArr[current1].name;
      const cardName2 = document.querySelector(".card-2 > .card > .card-header > .card-title > h5");
      cardName2.textContent = beersArr[current2].name;
      const cardName3 = document.querySelector(".card-3 > .card > .card-header > .card-title > h5");
      cardName3.textContent = beersArr[current3].name;
      const cardName4 = document.querySelector(".card-4 > .card > .card-header > .card-title > h5");
      cardName4.textContent = beersArr[current4].name;
      const cardName5 = document.querySelector(".card-5 > .card > .card-header > .card-title > h5");
      cardName5.textContent = beersArr[current5].name;
      const cardName6 = document.querySelector(".card-6 > .card > .card-header > .card-title > h5");
      cardName6.textContent = beersArr[current6].name;
      const cardName7 = document.querySelector(".card-7 > .card > .card-header > .card-title > h5");
      cardName7.textContent = beersArr[current7].name;
   }, 1500);
   if (count === 0) {
      previousBtn.classList.add("hide");
   }
   console.log(count);
   console.log(`"newValue:" ${count}`);
});
