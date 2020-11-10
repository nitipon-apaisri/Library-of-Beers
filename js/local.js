beersArr = [];
let count = 0;
const rand1 = document.querySelector(".random");
const results = "https://api.punkapi.com/v2/beers/random";
const fetching = () => {
   fetch(results)
      .then((res) => res.json())
      .then((beers) => {
         beersArr.push(beers);
         localStorage.setItem("beer" + count, JSON.stringify(beersArr[count - 1]));
         console.log(beersArr);
      });
};

rand1.addEventListener("click", async () => {
   count++;
   fetching();
   console.log(count);
});
