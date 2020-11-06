async function landingfunction() {
   const landingresponse = await fetch("https://api.punkapi.com/v2/beers/random");
   const landinginfo = await landingresponse.json();
   const landingname = document.querySelector(".card > h3");
   landingname.innerHTML = landinginfo[0].name;
}
landingfunction();

let beers = [];

async function request() {
   let response = await fetch("https://api.punkapi.com/v2/beers/random");
   let info = await response.json();
   beers.push(info[0]);
}
request();
let rand = document.querySelector(".random");
rand.addEventListener("click", async () => {
   beers = [];
   await request();
   console.log(beers);
   let name = document.querySelector(".card > h3");

   name.innerHTML = beers[0].name;
});