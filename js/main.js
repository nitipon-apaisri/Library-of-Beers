let allBeers = [];
let fetchingBeers = async () => {
   await fetch("https://api.punkapi.com/v2/beers/random")
      .then((res) => res.json())
      .then((beers) => {
         allBeers.push(beers[0]);
      });
};
let rand = document.querySelector(".random");
rand.addEventListener("click", async () => {
   allBeers = [];
   await fetchingBeers();
   let name = document.querySelector(".card > .card-header > .card-title > h3");
   name.innerHTML = allBeers[0].name;
   console.log(allBeers[0].name);
});
