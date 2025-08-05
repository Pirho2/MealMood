window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const mood = params.get("nastroj");

  const moodText = document.getElementById("output");
  if (mood) {
    moodText.innerText = `Karolka, jesteś: ${mood}`;
  } else {
    moodText.innerText = "Karolka, nie wybrałaś nastroju! 😡";
  }
});
const apiKey = "073650b45eee4f3eb16211438167d118"; // ← wklej swój klucz

// 1. Odczyt nastroju z URL-a
const params = new URLSearchParams(window.location.search);
const mood = params.get("nastroj");


// 2. Wyciąganie pory roku
function getSeason(month) {
  if ([11, 0, 1].includes(month)) return "zimowy";
  if ([2, 3, 4].includes(month)) return "wiosenny";
  if ([5, 6, 7].includes(month)) return "letni";
  if ([8, 9, 10].includes(month)) return "jesienny";
}
const month = new Date().getMonth();
const season = getSeason(month);

// 3. Tworzenie zapytania do API
const moodMap = {
  smutny: "comfort food",
  szczęśliwy: "party",
  zły: "spicy",
  zakochany: "romantic",
};
const searchQuery = moodMap[mood] || "easy recipe";

// 4. Fetch do Spoonacular
const tagMap = {
  smutna: "comfort",
  szczęśliwa: "dessert",
  zła: "spicy",
  zmęczona: "quick",
};
const tag = tagMap[mood.toLowerCase()] || "main course";

fetch(`https://api.spoonacular.com/recipes/random?number=1&tags=${tag}&apiKey=${apiKey}`)
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("recipe-container");
    const recipe = data.recipes[0];

    container.innerHTML = `
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 400px; border-radius: 12px;">
      <p><a href="${recipe.sourceUrl}" target="_blank">Zobacz przepis</a></p>
    `;
  })
  .catch((err) => {
    console.error(err);
    document.getElementById("recipe-container").innerHTML =
      "<p>Błąd ładowania danych z API.</p>";
  });

