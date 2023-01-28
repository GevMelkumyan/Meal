const search = document.querySelector("input");
const form = document.querySelector("form");
let res = document.querySelector(".result");
let meal = document.querySelector(".meal");
let meal1 = document.querySelector(".meal1");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let val = search.value;
  search.value = "";
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`;
  if (val.trim(" ")) {
    fetch(url)
      .then((res) => res.json())
      .then((newRes) => {
        console.log(newRes);
        res.innerHTML = "";
        meal.innerHTML = "";
        if (newRes.meals == null) {
          res.innerHTML = `<p>Invalid Value</p>`;
        } else {
          newRes?.meals.map((e) => {
            const div2 = document.createElement("div");
            div2.className = "div2";
            div2.innerHTML += `
              <p class="anun">${e.strMeal}</p>
              <img class="nkar" src="${e.strMealThumb}" />
            `;

            res.append(div2);
            div2.addEventListener("click", () => {
              res.innerHTML = "";
              let ul = document.createElement("ul");
              for (let i = 1; i <= 20; i++) {
                const ingrid = e[`strIngredient${i}`];
                if (!ingrid) break;
                ul.innerHTML += `<li>${ingrid}</li>`;
              }
              meal.innerHTML = `
              <div class="divbig">
                <img class="foodimg" src="${e.strMealThumb}" />
                <h3 class="vernagir">${e.strMeal}</h3>
                </div>
                `;
              meal.append(ul);
              meal.innerHTML += `<p>${e.strInstructions}</p>`;
            });
          });
        }
      });
  }
});
