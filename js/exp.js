let input = document.querySelector(".input-beer-name");
let submit = document.querySelector(".name-submit");
let beersArr = [];
submit.addEventListener("click", async () => {
   let results = "https://api.punkapi.com/v2/beers?beer_name=" + input.value + "&per_page=50";
   await fetch(results)
      .then((res) => res.json())
      .then((beers) => {
         for (let i of beers) {
            beersArr.push(i);
         }
      });
   renderList();
   input.value = "";
   console.log(beersArr.length);
   beersArr = [];
});
const renderList = () => {
   let row = document.createElement("div");
   for (let i = 0; i < beersArr.length; i++) {
      row.setAttribute("class", "columns");
      let coverCard = document.createElement("div");
      coverCard.setAttribute("class", "cover-card column col-3");
      let card = document.createElement("div");
      card.setAttribute("class", "card");
      coverCard.append(card);
      let cardImg = document.createElement("div");
      cardImg.setAttribute("class", "card-img");
      card.append(cardImg);
      let img = document.createElement("img");
      img.setAttribute("class", "img-responsive img");
      cardImg.append(img);
      let cardHeader = document.createElement("div");
      cardHeader.setAttribute("class", "card-header");
      card.append(cardHeader);
      let cardTitle = document.createElement("div");
      cardTitle.setAttribute("class", "card-title");
      cardHeader.append(cardTitle);
      let title = document.createElement("h5");
      title.setAttribute("class", "name");
      title.textContent = beersArr[i].name;
      cardTitle.append(title);
      row.append(coverCard);
   }
   let append = document.querySelector(".list");
   append.append(row);
};
