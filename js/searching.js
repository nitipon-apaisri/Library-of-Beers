// Searching //
//---------- Global varaialbes ----------
let count = 0;
let currentPageNr = 1;
let perPage = 8;
let firstPage = [];
let beersArr = [];
let clickTime = 1;
let allBeersName = [];
let allMaltName = [];
let allHopsName = [];
let maltName = [];
let hopsName = [];
let getTheMaltName = [];
let getTheHopsName = [];
const input = document.querySelector(".input-beer-name");
const validatioin = document.querySelector(".validation");
const submit = document.querySelector(".name-submit");
const mainList = document.querySelector("section.list");
const subList = document.querySelector(".sub-list");
const previousBtn = document.querySelector(".previous");
const nexBtn = document.querySelector(".next");
const currentPage = document.querySelector(".current-page");
const searchOption = document.querySelector(".search-option");
const dataNameBadge = document.querySelector(".searching-page >  .all-chips > .all-beers-name");
const dataMaltBadge = document.querySelector(".searching-page >  .all-chips > .all-malt-name");
const dataHopsBadge = document.querySelector(".searching-page >  .all-chips > .all-hops-name");
const modalNameL = document.querySelector(".name-list");
const modalMaltL = document.querySelector(".malt-list");
const modalHopsL = document.querySelector(".hops-list");
window.addEventListener("load", async () => {
   localStorage.clear();
   await fetchAllBeerInfo();
   getMaltName();
   getHopsName();
   showBadge();
   console.log(getTheMaltName);
});
//---------- Get all the beers, hops and malts name ----------
const getMaltName = () => {
   allMaltName.forEach((v) => {
      v.forEach((n) => {
         maltName.push(n.name);
      });
   });
   let uniq = [...new Set(maltName)];
   getTheMaltName.push(uniq);
};
const getHopsName = () => {
   allHopsName.forEach((v) => {
      v.forEach((n) => {
         hopsName.push(n.name);
      });
   });
   let uniq = [...new Set(hopsName)];
   getTheHopsName.push(uniq);
};
const fetchAllBeerInfo = async () => {
   await fetch("https://api.punkapi.com/v2/beers?page=1&per_page=80")
      .then((res) => res.json())
      .then((page1) => {
         page1.forEach((n) => {
            allBeersName.push(n.name);
            allMaltName.push(n.ingredients.malt);
            allHopsName.push(n.ingredients.hops);
         });
      });
   await fetch("https://api.punkapi.com/v2/beers?page=2&per_page=80")
      .then((res) => res.json())
      .then((page1) => {
         page1.forEach((n) => {
            allBeersName.push(n.name);
            allMaltName.push(n.ingredients.malt);
            allHopsName.push(n.ingredients.hops);
         });
      });
   await fetch("https://api.punkapi.com/v2/beers?page=3&per_page=80")
      .then((res) => res.json())
      .then((page1) => {
         page1.forEach((n) => {
            allBeersName.push(n.name);
            allMaltName.push(n.ingredients.malt);
            allHopsName.push(n.ingredients.hops);
         });
      });
   await fetch("https://api.punkapi.com/v2/beers?page=4&per_page=80")
      .then((res) => res.json())
      .then((page1) => {
         page1.forEach((n) => {
            allBeersName.push(n.name);
            allMaltName.push(n.ingredients.malt);
            allHopsName.push(n.ingredients.hops);
         });
      });
   await fetch("https://api.punkapi.com/v2/beers?page=5&per_page=80")
      .then((res) => res.json())
      .then((page1) => {
         page1.forEach((n) => {
            allBeersName.push(n.name);
            allMaltName.push(n.ingredients.malt);
            allHopsName.push(n.ingredients.hops);
         });
      });
};
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
const fetchHops = () => {
   const results = "https://api.punkapi.com/v2/beers?hops=" + input.value + "&per_page=80";
   fetch(results)
      .then((res) => res.json())
      .then((beers) => {
         beers.forEach((beer) => {
            beersArr.push(beer);
         });
      });
};
const fetchMalt = () => {
   const results = "https://api.punkapi.com/v2/beers?malt=" + input.value + "&per_page=80";
   fetch(results)
      .then((res) => res.json())
      .then((beers) => {
         beers.forEach((beer) => {
            beersArr.push(beer);
         });
      });
};
const prePare = () => {
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
//---------- Display input error ----------
let errDisplay = document.querySelector(".err");
submit.addEventListener("click", () => {
   if (input.value.length == 0) {
      showValidation();
      errDisplay.classList.add("active");
   } else {
      if (searchOption.value == "name") {
         fetchName();
         prePare();
         clearInput();
      } else if (searchOption.value == "hops") {
         fetchHops();
         prePare();
         clearInput();
      } else if (searchOption.value == "malt") {
         fetchMalt();
         prePare();
         clearInput();
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
const maltUserList = document.querySelector(".modal-content > ul");
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
   getLocalData[buttValue].ingredients.malt.forEach((beerMalt) => {
      const malt = beerMalt.name;
      const maltList = document.createElement("li");
      maltList.setAttribute("class", "malt-ls");
      const maltVolum = beerMalt.amount.value;
      maltList.textContent = `${maltVolum} kg - ${malt}`;
      maltUserList.appendChild(maltList);
   });
   getLocalData[buttValue].ingredients.hops.forEach((beerHops) => {
      const hops = beerHops.name;
      const hopsList = document.createElement("li");
      hopsList.setAttribute("class", "hops-ls");
      const hopsVolum = beerHops.amount.value;
      hopsList.textContent = `${hopsVolum} g - ${hops}`;
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
   beersArr[buttValue].ingredients.malt.forEach((beerMalt) => {
      const malt = beerMalt.name;
      const maltList = document.createElement("li");
      maltList.setAttribute("class", "malt-ls");
      const maltVolum = beerMalt.amount.value;
      maltList.textContent = `${maltVolum} kg - ${malt}`;
      maltUserList.appendChild(maltList);
   });
   beersArr[buttValue].ingredients.hops.forEach((beerHops) => {
      const hops = beerHops.name;
      const hopsList = document.createElement("li");
      hopsList.setAttribute("class", "hops-ls");
      const hopsVolum = beerHops.amount.value;
      hopsList.textContent = `${hopsVolum} g - ${hops}`;
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

// Random info //
//---------- Global varaialbes ---------- //
const randCard = document.querySelector(".cover-inside");
const cardBody = document.querySelectorAll(".card-body");
const name = document.querySelector(".card > .cover-inside > .card-header > .card-title > .name");
const img = document.querySelector(".card > .cover-inside > .card-img > img ");
const beerInfoName = document.querySelector(".beer-info > .card > .card-header > .card-title > h3");
const rFoodUserList = document.querySelector(" .beer-info > .card > .card-body > .food-pairing");
const rHopsUserList = document.querySelector(".beer-ingredients > .card > .card-body > .hops");
const rMaltUserList = document.querySelector(".beer-ingredients > .card > .card-body > .ingredients");
let randBeer = [];
//---------- Fetching beer by random ---------- //
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

//---------- Random a beer from fetching function ---------- //
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
   more.classList.remove("hide");
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
//---------- Show more data function ---------- //
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
//---------- loop beer info ---------- //
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
//---------- Display beer info ---------- //
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
// Some functions like animation, clear text input or show badge //
let hideLandimg = document.querySelector(".landing");
let showSearch = document.querySelector(".searching-page");
//---------- Hide/show Main pages ---------- //
const hideLanding = () => {
   hideLandimg.classList.add("hide");
};
const showSearching = () => {
   showSearch.classList.remove("hide");
};
const hideSearching = () => {
   showSearch.classList.add("hide");
};
const showLanding = () => {
   hideLandimg.classList.remove("hide");
};
//---------- Show beers data on main list ---------- //
const beersData = () => {
   const cardName0 = document.querySelector(".card-0 > .card > .card-header > .card-title > h5");
   cardName0.textContent = beersArr[0].name;
   const cardName1 = document.querySelector(".card-1 > .card > .card-header > .card-title > h5");
   cardName1.textContent = beersArr[1].name;
   const cardName2 = document.querySelector(".card-2 > .card > .card-header > .card-title > h5");
   cardName2.textContent = beersArr[2].name;
   const cardName3 = document.querySelector(".card-3 > .card > .card-header > .card-title > h5");
   cardName3.textContent = beersArr[3].name;
   const cardName4 = document.querySelector(".card-4 > .card > .card-header > .card-title > h5");
   cardName4.textContent = beersArr[4].name;
   const cardName5 = document.querySelector(".card-5 > .card > .card-header > .card-title > h5");
   cardName5.textContent = beersArr[5].name;
   const cardName6 = document.querySelector(".card-6 > .card > .card-header > .card-title > h5");
   cardName6.textContent = beersArr[6].name;
   const cardName7 = document.querySelector(".card-7 > .card > .card-header > .card-title > h5");
   cardName7.textContent = beersArr[7].name;
};
//---------- Show searching page when clicked Search on navbar ---------- //
const searchButt = document.querySelector(".search");
searchButt.addEventListener("click", () => {
   hideSearching();
   hideLanding();
   showLoaderSearch();
   setTimeout(() => {
      hideLoaderSearch();
      showSearching();
   }, 1500);
});
//---------- Show homepage when clicked Home on navbar ---------- //
const homeButt = document.querySelector(".home");
homeButt.addEventListener("click", () => {
   location.reload();
   hideLanding();
   hideSearching();
   showLoaderSearch();
   setTimeout(() => {
      hideLoaderSearch();
      showLanding();
   }, 1500);
});
//---------- Re content when searching new content ---------- //
const refreshContent = () => {
   const append = document.querySelector(".list");
   append.innerHTML = "";
   currentPageNr = 1;
   count = 0;
};
//---------- Hide/Show loader animation ---------- //
const loader = document.querySelector(".cover-loader > .loader");
const hideLoader = () => {
   loader.classList.add("hide");
};
const showLoader = () => {
   loader.classList.remove("hide");
};
const loaderSearch = document.querySelector(".loader-search");
const hideLoaderSearch = () => {
   loaderSearch.classList.add("hide");
};
const showLoaderSearch = () => {
   loaderSearch.classList.remove("hide");
};
const loaderList = document.querySelector(".loader-list");
const hideLoaderList = () => {
   loaderList.classList.add("hide");
};
const showLoaderList = () => {
   loaderList.classList.remove("hide");
};
const beerInfoLoader = document.querySelector(".cover-loader > .beer-info-loader");
const showBeerInfoLoader = () => {
   beerInfoLoader.classList.remove("hide");
};
const hideBeerInfoLoader = () => {
   beerInfoLoader.classList.add("hide");
};
const loaderAllName = document.querySelector(".name-list > .modal-container > .modal-body > .cover-loader > .loader-all-name");
const showLoaderAllName = () => {
   loaderAllName.classList.remove("hide");
};
const hideLoaderAllName = () => {
   loaderAllName.classList.add("hide");
};
const loaderAllMalt = document.querySelector(".malt-list > .modal-container > .modal-body > .cover-loader > .loader-all-malt");
const showLoaderAllMalt = () => {
   loaderAllMalt.classList.remove("hide");
};
const hideLoaderAllMalt = () => {
   loaderAllMalt.classList.add("hide");
};
const loaderAllHops = document.querySelector(".hops-list > .modal-container > .modal-body > .cover-loader > .loader-all-hops");
const showLoaderAllHops = () => {
   loaderAllHops.classList.remove("hide");
};
const hideLoaderAllHops = () => {
   loaderAllHops.classList.add("hide");
};
//---------- Show validation ---------- //
const showValidation = () => {
   validatioin.classList.remove("hide");
   validatioin.textContent = "Please fill the input";
};
let change = () => {
   input.classList.remove("hide");
   input.removeAttribute("disabled");
   submit.classList.remove("hide");
};
//---------- Hide/show Modal ---------- //
const modal = document.querySelector(".modal");
const modalErr = document.querySelector(".err");
const modalNameList = document.querySelector(".name-list");
const modalMaltList = document.querySelector(".malt-list");
const modalHopsList = document.querySelector(".hops-list");
const closeButtOutSide = document.querySelectorAll(".modal > .close");
const closeButtX = document.querySelectorAll(".modal > .modal-container > .modal-header > .close");
closeButtX.forEach((c) => {
   c.addEventListener("click", () => {
      modal.classList.remove("active");
      modalErr.classList.remove("active");
      modalNameList.classList.remove("active");
      modalMaltList.classList.remove("active");
      modalHopsList.classList.remove("active");
   });
});
closeButtOutSide.forEach((c) => {
   c.addEventListener("click", () => {
      modal.classList.remove("active");
      modalErr.classList.remove("active");
      modalNameList.classList.remove("active");
      modalMaltList.classList.remove("active");
      modalHopsList.classList.remove("active");
   });
});
//---------- Clear input ---------- //
const clearInput = () => {
   input.value = "";
};
//---------- Badge ---------- //
const showBadge = () => {
   if (allBeersName.length <= 0 && getTheMaltName.length <= 0 && getTheHopsName.length <= 0) {
      dataNameBadge.classList.add("hide");
      dataMaltBadge.classList.add("hide");
      dataHopsBadge.classList.add("hide");
   } else {
      dataNameBadge.addEventListener("click", () => {
         const nameUl = document.querySelector(".name-list > .modal-container > .modal-body > ul");
         const nameHeader = document.querySelector(".name-list > .modal-container > .modal-header > h5");
         modalNameL.classList.add("active");
         nameUl.classList.add("hide");
         nameHeader.textContent = `Beer: ${allBeersName.length} Names`;
         allBeersName.sort();
         allBeersName.forEach((l) => {
            const allBeersList = document.createElement("li");
            let name = l;
            allBeersList.textContent = name;
            showLoaderAllName();
            setTimeout(() => {
               nameUl.classList.remove("hide");
               hideLoaderAllName();
               nameUl.appendChild(allBeersList);
            }, 1500);
         });
      });
      dataMaltBadge.addEventListener("click", () => {
         const nameUl = document.querySelector(".malt-list > .modal-container > .modal-body > ul");
         const maltNr = document.querySelector(".malt-list > .modal-container > .modal-header > h5");
         modalMaltL.classList.add("active");
         nameUl.classList.add("hide");
         maltNr.textContent = `Malt: ${getTheMaltName[0].length} Types`;
         getTheMaltName[0].sort();
         getTheMaltName.forEach((l) => {
            l.forEach((s) => {
               const allMaltList = document.createElement("li");
               let name = s;
               allMaltList.textContent = name;
               showLoaderAllMalt();
               setTimeout(() => {
                  nameUl.classList.remove("hide");
                  hideLoaderAllMalt();
                  nameUl.appendChild(allMaltList);
               }, 1500);
            });
         });
      });
      dataHopsBadge.addEventListener("click", () => {
         const nameUl = document.querySelector(".hops-list > .modal-container > .modal-body > ul");
         const hopsNr = document.querySelector(".hops-list > .modal-container > .modal-header > h5");
         modalHopsL.classList.add("active");
         nameUl.classList.add("hide");
         hopsNr.textContent = `Hops: ${getTheHopsName[0].length} Types`;
         getTheHopsName[0].sort();
         getTheHopsName.forEach((l) => {
            l.forEach((s) => {
               const allHopsList = document.createElement("li");
               let name = s;
               allHopsList.textContent = name;
               showLoaderAllHops();
               setTimeout(() => {
                  nameUl.classList.remove("hide");
                  hideLoaderAllHops();
                  nameUl.appendChild(allHopsList);
               }, 1500);
            });
         });
      });
   }
};
