let input = document.querySelector(".input-beer-name");
let submit = document.querySelector(".name-submit");
let beersArr = [];
submit.addEventListener("click", async () => {
   refreshContent();
   beersArr = [];
   let results = "https://api.punkapi.com/v2/beers?beer_name=" + input.value + "&per_page=50";
   await fetch(results)
      .then((res) => res.json())
      .then((beers) => {
         for (let i of beers) {
            beersArr.push(i);
         }
      });
   renderList();
   seeMore();
   input.value = "";
   console.log(beersArr.length);
});

const refreshContent = () => {
   let append = document.querySelector(".list");
   append.innerHTML = "";
};

const renderInfo = () => {
   for (let i of beersArr) {
      modal.classList.add("active");
      let nameInModal = document.querySelector(".modal-title");
      nameInModal.innerHTML = i.name;
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
      continue;
   }
};

const seeMore = () => {
   let seeMoreButt = document.querySelectorAll(".see-more");
   for (let butt = 0; butt < seeMoreButt.length; butt++) {
      seeMoreButt[butt].addEventListener("click", async () => {
         renderInfo();
         console.log("hi");
      });
      continue;
   }
   // console.log(i);
};

const renderList = () => {
   let row = document.createElement("div");
   for (let i of beersArr) {
      row.setAttribute("class", "columns");
      let coverCard = document.createElement("div");
      coverCard.setAttribute("class", "cover-card column col-3");
      let card = document.createElement("div");
      card.setAttribute("class", "card");
      coverCard.append(card);
      let cardImg = document.createElement("div");
      cardImg.setAttribute("class", "card-img");
      card.append(cardImg);
      // let img = document.createElement("img");
      // img.src = i.image_url;
      // img.setAttribute("class", "img-responsive img");
      // cardImg.append(img);
      let cardHeader = document.createElement("div");
      cardHeader.setAttribute("class", "card-header");
      card.append(cardHeader);
      let cardTitle = document.createElement("div");
      cardTitle.setAttribute("class", "card-title");
      cardHeader.append(cardTitle);
      let title = document.createElement("h5");
      title.setAttribute("class", "name");
      title.textContent = i.name;
      cardTitle.append(title);
      let cardFooter = document.createElement("div");
      cardFooter.setAttribute("class", "card-footer");
      let seeMore = document.createElement("button");
      seeMore.textContent = "See more";
      seeMore.setAttribute("class", "btn btn-primary see-more");
      cardFooter.append(seeMore);
      card.append(cardFooter);
      row.append(coverCard);
   }
   let append = document.querySelector(".list");
   append.append(row);
};
