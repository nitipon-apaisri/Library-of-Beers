let allBeers = [];
let fetchingBeers = async () => {
   await fetch("https://api.punkapi.com/v2/beers/random")
      .then((res) => res.json())
      .then((beers) => {
         allBeers.push(beers[0]);
      });
};
let more = document.querySelector(".card > .card-footer > button");
let modal = document.querySelector(".modal");
more.addEventListener("click", () => {
   modal.classList.add("active");
});
let closeButt = document.querySelector(".modal > .modal-container > .modal-header > .close");
closeButt.addEventListener("click", () => {
   modal.classList.remove("active");
});
let rand = document.querySelector(".random");
rand.addEventListener("click", async () => {
   allBeers = [];
   await fetchingBeers();
   let name = document.querySelector(".card > .card-header > .card-title > .name");
   name.innerHTML = allBeers[0].name;
   console.log(allBeers[0].name);
});
