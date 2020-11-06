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
