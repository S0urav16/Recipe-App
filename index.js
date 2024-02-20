const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector("#search-Btn");
const recipecontainer = document.querySelector(".recipe-container");

const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeClosedBtn = document.querySelector(".recipe-closed-btn");

const fetchRecipe = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>"
    try{
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();
  recipecontainer.innerHTML = ""
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
         <img src="${meal.strMealThumb}">
         <h3> ${meal.strMeal} </h3>
         <p> <span>${meal.strArea}</span> Dish</P>
         <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    const button = document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button)


   button.addEventListener('click' , () => {
    openRecipePopup(meal);
   })

    recipecontainer.appendChild(recipeDiv)
  });
  }
  catch(error){
       recipecontainer.innerHTML = "<h2>Error in fetching Recipes...</h2>";
   }
};


const fetchIngredient = (meal) => {
       let ingredientsList = "";
       for(let i =1; i<=20; i++){
           const ingredient = meal[`strIngredient${i}`];
           if(ingredient){
              const measure = meal[`strMeasure${i}`];
              ingredientsList += `<li> ${measure} ${ingredient}</li>`

           }
           else {
            break;
           }
        
       }
       return ingredientsList;
}

const openRecipePopup = (meal) => {
      recipeDetailsContent.innerHTML = `
          <h2 class="recipeName">${meal.strMeal}</h2>
          <h3>Ingredents:</h3>
          <ul class="ingredientList">${fetchIngredient(meal)}</ul>
        <div class="recipeInstruction">
           <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
                
      `;
      recipeDetailsContent.parentElement.style.display = "block";
}



recipeClosedBtn.addEventListener("click", ()=>
  {
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if(!searchInput){
    recipecontainer.innerHTML = `<h2>Type the recipe in the search box..</h2>`
    return;
  }
  fetchRecipe(searchInput);
});
