//---------- Global varaialbes ----------
let count = 0;
let currentPageNr = 1;
let perPage = 8;
const input = document.querySelector(".input-beer-name");
const validatioin = document.querySelector(".validation");
const submit = document.querySelector(".name-submit");
const mainList = document.querySelector("section.list");
const subList = document.querySelector(".sub-list");
const previousBtn = document.querySelector(".previous");
const nexBtn = document.querySelector(".next");
const currentPage = document.querySelector(".current-page");
const searchOption = document.querySelector(".search-option");
let firstPage = [];
let newValue = 0;
let beersArr = [];
let clickTime = 1;
const modal = document.querySelector(".modal");
window.addEventListener("load", () => {
   localStorage.clear();
});
//---------- Searching feature ----------
const fetchName = () => {
   const results = "https://api.punkapi.com/v2/beers?beer_name=" + input.value + "&per_page=80";
   fetch(results)
      .then((res) => res.json())
      .then((beers) => {
         beers.forEach((beer) => {
            beersArr.push(beer);
         });
      });
};
const fetchMalt = () => {
   const results = "https://api.punkapi.com/v2/beers?hops=" + input.value + "&per_page=80";
   fetch(results)
      .then((res) => res.json())
      .then((beers) => {
         beers.forEach((beer) => {
            beersArr.push(beer);
         });
      });
};
const prePare = () => {
   hideValidation();
   refreshContent();
   clickTime = 0;
   beersArr = [];
   showLoaderList();
   mainList.classList.add("hide");
   subList.classList.add("hide");
   setTimeout(() => {
      if (beersArr.length > 8) {
         firstPage.unshift(beersArr[0], beersArr[1], beersArr[2], beersArr[3], beersArr[4], beersArr[5], beersArr[6], beersArr[7]);
         localStorage.setItem("page1", JSON.stringify(firstPage));
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
         previousBtn.classList.add("hide");
         showLoaderList();
         setTimeout(() => {
            hideLoaderList();
            mainList.classList.remove("hide");
            subList.classList.add("hide");
            subSeeMore();
         }, 1000);
         renderCard();
         setValue();
      }
   }, 500);
};
submit.addEventListener("click", () => {
   if (input.value.length == 0) {
      showValidation();
   } else {
      if (searchOption.value == "name") {
         fetchName();
         prePare();
         input.value = "";
      } else if (searchOption.value == "hops") {
         fetchMalt();
         prePare();
         input.value = "";
      }
   }
});
//---------- See more butt function ----------
const seeMore = () => {
   const seeMoreButt = document.querySelectorAll(".see-more");
   seeMoreButt.forEach((butt) => {
      butt.addEventListener("click", () => {
         let allMaltList = document.querySelectorAll(".modal >  .modal-container > .modal-body> .modal-content > .ingredents > .malt-ls");
         let hopsList = document.querySelectorAll(".modal >  .modal-container > .modal-body> .modal-content > .hops > .hops-ls");
         let foodList = document.querySelectorAll(".modal >  .modal-container > .modal-body> .modal-content > .food-pairing > .food-ls");
         allMaltList.forEach((r) => {
            r.remove();
         });
         hopsList.forEach((r) => {
            r.remove();
         });
         foodList.forEach((r) => {
            r.remove();
         });
         let buttValue = Number(butt.value);
         renderInfo(buttValue);
      });
   });
};
const subSeeMore = () => {
   const seeMoreButt = document.querySelectorAll(".sub-see-more");
   seeMoreButt.forEach((butt) => {
      butt.addEventListener("click", () => {
         let allMaltList = document.querySelectorAll(".modal >  .modal-container > .modal-body> .modal-content > .ingredents > .malt-ls");
         let hopsList = document.querySelectorAll(".modal >  .modal-container > .modal-body> .modal-content > .hops > .hops-ls");
         let foodList = document.querySelectorAll(".modal >  .modal-container > .modal-body> .modal-content > .food-pairing > .food-ls");
         allMaltList.forEach((r) => {
            r.remove();
         });
         hopsList.forEach((r) => {
            r.remove();
         });
         foodList.forEach((r) => {
            r.remove();
         });
         let buttValue = Number(butt.value);
         subRenderInfo(buttValue);
      });
   });
};
//---------- Renders info when clicked more butt ----------
const nameInModal = document.querySelector(".modal-title");
const modalImg = document.querySelector(".modal > .modal-container > .modal-body > .modal-content > .card-img > img");
const modaldescription = document.querySelector(".modal> .modal-container>.modal-body > .modal-content >.description");
const modalAlco = document.querySelector(".alco-volume");
const tips = document.querySelector(".modal> .modal-container>.modal-body > .modal-content >.tips");
const ingredientsUserList = document.querySelector(".modal-content > ul");
const hopsUserList = document.querySelector(".modal-content > .hops");
const foodUserList = document.querySelector(".modal-content > .food-pairing");
//---------- Get data from local storage ----------
const renderInfo = (buttValue) => {
   let getLocalData = JSON.parse(localStorage.getItem("page" + currentPageNr));
   modal.classList.add("active");
   nameInModal.innerHTML = getLocalData[buttValue].name;
   if (getLocalData[buttValue].image_url == null) {
      modalImg.classList.add("hide");
   } else {
      modalImg.classList.remove("hide");
      modalImg.src = getLocalData[buttValue].image_url;
   }
   modaldescription.innerHTML = `<b>Description:</b> ${getLocalData[buttValue].description}`;
   modalAlco.innerHTML = `<b>Volume:</b> ${getLocalData[buttValue].volume.value} ${getLocalData[buttValue].volume.unit}`;
   tips.innerHTML = `<b>Tips:</b> ${getLocalData[buttValue].brewers_tips}`;
   getLocalData[buttValue].ingredients.malt.forEach((beerIngredients) => {
      const ingredients = beerIngredients.name;
      const ingredientsList = document.createElement("li");
      ingredientsList.setAttribute("class", "malt-ls");
      ingredientsList.textContent = ingredients;
      ingredientsUserList.appendChild(ingredientsList);
   });
   getLocalData[buttValue].ingredients.hops.forEach((beerHops) => {
      const hops = beerHops.name;
      const hopsList = document.createElement("li");
      hopsList.setAttribute("class", "hops-ls");
      hopsList.textContent = hops;
      hopsUserList.appendChild(hopsList);
   });
   getLocalData[buttValue].food_pairing.forEach((beerPairing) => {
      const food = beerPairing;
      const foodList = document.createElement("li");
      foodList.setAttribute("class", "food-ls");
      foodList.textContent = food;
      foodUserList.appendChild(foodList);
   });
};
//---------- Get data from array ----------
const subRenderInfo = (buttValue) => {
   modal.classList.add("active");
   nameInModal.innerHTML = beersArr[buttValue].name;
   if (beersArr[buttValue].image_url == null) {
      modalImg.classList.add("hide");
   } else {
      modalImg.classList.remove("hide");
      modalImg.src = beersArr[buttValue].image_url;
   }
   modaldescription.innerHTML = `<b>Description:</b> ${beersArr[buttValue].description}`;
   modalAlco.innerHTML = `<b>Volume:</b> ${beersArr[buttValue].volume.value} ${beersArr[buttValue].volume.unit}`;
   tips.innerHTML = `<b>Tips:</b> ${beersArr[buttValue].brewers_tips}`;
   beersArr[buttValue].ingredients.malt.forEach((beerIngredients) => {
      const ingredients = beerIngredients.name;
      const ingredientsList = document.createElement("li");
      ingredientsList.setAttribute("class", "malt-ls");
      ingredientsList.textContent = ingredients;
      ingredientsUserList.appendChild(ingredientsList);
   });
   beersArr[buttValue].ingredients.hops.forEach((beerHops) => {
      const hops = beerHops.name;
      const hopsList = document.createElement("li");
      hopsList.setAttribute("class", "hops-ls");
      hopsList.textContent = hops;
      hopsUserList.appendChild(hopsList);
   });
   beersArr[buttValue].food_pairing.forEach((beerPairing) => {
      const food = beerPairing;
      const foodList = document.createElement("li");
      foodList.setAttribute("class", "food-ls");
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
      seeMore.setAttribute("class", "btn btn-primary sub-see-more");
      cardFooter.append(seeMore);
      card.append(cardFooter);
      row.append(coverCard);
   });
   const append = document.querySelector(".list");
   append.append(row);
};
//---------- Setting value for see more butt ----------
let setValue = () => {
   let allButt = document.querySelectorAll(".sub-see-more");
   if (beersArr.length < 8) {
      allButt.forEach((item, i) => {
         item.setAttribute("value", i);
      });
   }
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
let localPage = [];
const cardName0 = document.querySelector(".card-0 > .card > .card-header > .card-title > h5");
const cardName1 = document.querySelector(".card-1 > .card > .card-header > .card-title > h5");
const cardName2 = document.querySelector(".card-2 > .card > .card-header > .card-title > h5");
const cardName3 = document.querySelector(".card-3 > .card > .card-header > .card-title > h5");
const cardName5 = document.querySelector(".card-5 > .card > .card-header > .card-title > h5");
const cardName4 = document.querySelector(".card-4 > .card > .card-header > .card-title > h5");
const cardName6 = document.querySelector(".card-6 > .card > .card-header > .card-title > h5");
const cardName7 = document.querySelector(".card-7 > .card > .card-header > .card-title > h5");
nexBtn.addEventListener("click", () => {
   clickTime++;
   previousBtn.classList.remove("hide");
   count += 8;
   currentPageNr += 1;
   currentPage.textContent = `${currentPageNr} / ${Math.ceil(beersArr.length / perPage)}`;
   current0 = 0;
   current1 = 1;
   current2 = 2;
   current3 = 3;
   current4 = 4;
   current5 = 5;
   current6 = 6;
   current7 = 7;
   subList.classList.add("hide");
   showLoaderList();
   localPage.unshift(
      beersArr[current0 + count],
      beersArr[current1 + count],
      beersArr[current2 + count],
      beersArr[current3 + count],
      beersArr[current4 + count],
      beersArr[current5 + count],
      beersArr[current6 + count],
      beersArr[current7 + count]
   );
   localStorage.setItem("page" + currentPageNr, JSON.stringify(localPage));
   let getLocalData = JSON.parse(localStorage.getItem("page" + currentPageNr));
   setTimeout(() => {
      hideLoaderList();
      subList.classList.remove("hide");
      cardName0.textContent = getLocalData[current0].name;
      cardName1.textContent = getLocalData[current1].name;
      cardName2.textContent = getLocalData[current2].name;
      cardName3.textContent = getLocalData[current3].name;
      cardName4.textContent = getLocalData[current4].name;
      cardName5.textContent = getLocalData[current5].name;
      cardName6.textContent = getLocalData[current6].name;
      cardName7.textContent = getLocalData[current7].name;
   }, 1500);
   if (clickTime + 1 == Math.ceil(beersArr.length / perPage)) {
      nexBtn.classList.add("hide");
   }
});
//---------- Prevoius funciton ----------
previousBtn.addEventListener("click", () => {
   clickTime--;
   count -= 8;
   currentPageNr -= 1;
   currentPage.textContent = `${currentPageNr} / ${Math.ceil(beersArr.length / perPage)}`;
   current0 = 0;
   current1 = 1;
   current2 = 2;
   current3 = 3;
   current4 = 4;
   current5 = 5;
   current6 = 6;
   current7 = 7;
   subList.classList.add("hide");
   console.log(current0);
   showLoaderList();
   console.log(currentPageNr);
   let getLocalData = JSON.parse(localStorage.getItem("page" + currentPageNr));
   setTimeout(() => {
      hideLoaderList();
      subList.classList.remove("hide");
      cardName0.textContent = getLocalData[current0].name;
      cardName1.textContent = getLocalData[current1].name;
      cardName2.textContent = getLocalData[current2].name;
      cardName3.textContent = getLocalData[current3].name;
      cardName4.textContent = getLocalData[current4].name;
      cardName5.textContent = getLocalData[current5].name;
      cardName6.textContent = getLocalData[current6].name;
      cardName7.textContent = getLocalData[current7].name;
   }, 1500);
   if (clickTime == 0) {
      nexBtn.classList.remove("hide");
      previousBtn.classList.add("hide");
   }
});
