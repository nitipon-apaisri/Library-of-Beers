let hideLandimg = document.querySelector(".landing");
let showSearch = document.querySelector(".searching-page");
//---------- Hide/show Main pages ----------
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
//---------- Show beers data on main list ----------
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
//---------- Show searching page when clicked Search on navbar ----------
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
//---------- Show homepage when clicked Home on navbar ----------
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
//---------- Re content when searching new content ----------
const refreshContent = () => {
   const append = document.querySelector(".list");
   append.innerHTML = "";
   currentPageNr = 1;
   count = 0;
};
//---------- Hide/Show loader animation ----------
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
//---------- Show validation ----------
const showValidation = () => {
   validatioin.classList.remove("hide");
   validatioin.textContent = "Please fill the input";
};
let change = () => {
   input.classList.remove("hide");
   input.removeAttribute("disabled");
   submit.classList.remove("hide");
};
//---------- Hide/show Modal ----------
const modal = document.querySelector(".modal");
const modalErr = document.querySelector(".err");
const closeButtOutSide = document.querySelectorAll(".modal > .close");
const closeButtX = document.querySelectorAll(".modal > .modal-container > .modal-header > .close");
closeButtX.forEach((c) => {
   c.addEventListener("click", () => {
      modal.classList.remove("active");
      modalErr.classList.remove("active");
   });
});
closeButtOutSide.forEach((c) => {
   c.addEventListener("click", () => {
      modal.classList.remove("active");
      modalErr.classList.remove("active");
   });
});
//---------- Clear input ----------
const clearInput = () => {
   input.value = "";
};
