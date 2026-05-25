Copie recipesData.js dans frontend/src/data/recipesData.js

Dans main.jsx, ajoute :
import { recipesData } from "./data/recipesData";

Puis remplace loadFrenchRecipes par :
const loadFrenchRecipes = async () => {
  setRecipes(recipesData);
};

Puis adapte searchRecipes :
const searchRecipes = async () => {
  const query = search.trim().toLowerCase();
  if (!query) {
    setRecipes(recipesData);
    setPage("catalog");
    return;
  }
  const results = recipesData.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(query) ||
    recipe.strCategory.toLowerCase().includes(query) ||
    recipe.strArea.toLowerCase().includes(query) ||
    recipe.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
    recipe.ingredients?.some((ing) => ing.name.toLowerCase().includes(query))
  );
  setRecipes(results);
  setPage("catalog");
};

Important : cette base est générée pour un prototype. Pour une application commerciale, il faudra valider et enrichir éditorialement les recettes.
