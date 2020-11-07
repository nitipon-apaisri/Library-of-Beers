const input = document.querySelector(".input-beer-name");
const submit = document.querySelector(".name-submit");
let beersArr = [];
submit.addEventListener("click", async () => {
   refreshContent();
   beersArr = [];
   const results = "https://api.punkapi.com/v2/beers?beer_name=" + input.value + "&per_page=50";
   await fetch(results)
      .then((res) => res.json())
      .then((beer) => {
         beer.forEach((beers) => {
            beersArr.push(beers);
         });
      });
   renderList();
   seeMore();
   input.value = "";
   console.log(beersArr.length);
});

const refreshContent = () => {
   const append = document.querySelector(".list");
   append.innerHTML = "";
};

const renderInfo = () => {
   beersArr.forEach((info) => {
      modal.classList.add("active");
      const nameInModal = document.querySelector(".modal-title");
      nameInModal.innerHTML = info.name;
      const modalImg = document.querySelector(".modal > .modal-container > .modal-body > .modal-content > .card-img > img");
      modalImg.src = info.image_url;
      const modaldescription = document.querySelector(".description");
      modaldescription.innerHTML = `<b>Description:</b> ${info.description}`;
      const modalAlco = document.querySelector(".alco-volume");
      modalAlco.innerHTML = `<b>Volume:</b> ${info.volume.value} ${info.volume.unit}`;
      const tips = document.querySelector(".tips");
      tips.innerHTML = `<b>Tips:</b> ${info.brewers_tips}`;
      info.ingredients.malt.forEach((beerIngredients) => {
         const ingredientsList = document.createElement("li");
         const ingredientsUserList = document.querySelector(".modal-content > ul");
         const ingredients = beerIngredients.name;
         ingredientsList.textContent = ingredients;
         ingredientsUserList.appendChild(ingredientsList);
      });
      info.ingredients.hops.forEach((beerHops) => {
         const hopsList = document.createElement("li");
         const hopsUserList = document.querySelector(".modal-content > .hops");
         const hops = beerHops.name;
         hopsList.textContent = hops;
         hopsUserList.appendChild(hopsList);
      });
      info.food_pairing.forEach((beerPairing) => {
         const foodList = document.createElement("li");
         const foodUserList = document.querySelector(".modal-content > .food-pairing");
         const food = beerPairing;
         foodList.textContent = food;
         foodUserList.appendChild(foodList);
      });
   });
};

const seeMore = () => {
   const seeMoreButt = document.querySelectorAll(".see-more");
   seeMoreButt.forEach((butt) => {
      butt.addEventListener("click", async () => {
         renderInfo();
         console.log("hi");
      });
   });
};

const renderList = () => {
   const row = document.createElement("div");
   beersArr.forEach((elements) => {
      row.setAttribute("class", "columns");
      const coverCard = document.createElement("div");
      coverCard.setAttribute("class", "cover-card column col-3");
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      coverCard.append(card);
      const cardImg = document.createElement("div");
      cardImg.setAttribute("class", "card-img");
      card.append(cardImg);
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
