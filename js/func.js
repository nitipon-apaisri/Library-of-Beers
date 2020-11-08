const hideLanding = () => {
   let hideLandimg = document.querySelector(".landing");
   hideLandimg.classList.add("hide");
   let showSearch = document.querySelector(".searching-page");
   showSearch.classList.remove("hide");
};

const showLanding = () => {
   let hideLandimg = document.querySelector(".landing");
   hideLandimg.classList.remove("hide");
   let showSearch = document.querySelector(".searching-page");
   showSearch.classList.add("hide");
};

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

const refreshContent = () => {
   const append = document.querySelector(".list");
   append.innerHTML = "";
   currentPageNr = 1;
   count = 0;
};
