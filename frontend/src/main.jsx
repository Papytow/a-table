import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Clock3,
  Star,
  Flame,
  ArrowLeft,
  Plus,
  Minus,
  Home,
  BookOpen,
  Printer,
  Download,
} from "lucide-react";

import "./style.css";
import { recipes } from "./recipes";

function App() {
  const [page, setPage] = useState("home");
  const [allRecipes] = useState(recipes);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites") || "[]"));
  const [stepIndex, setStepIndex] = useState(0);
  const [servings, setServings] = useState(4);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchRecipes = () => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFilteredRecipes(allRecipes);
      setPage("catalog");
      return;
    }

    const results = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.category.toLowerCase().includes(query) ||
      recipe.difficulty.toLowerCase().includes(query) ||
      recipe.ingredients.some((item) => item.name.toLowerCase().includes(query))
    );

    setFilteredRecipes(results);
    setPage("catalog");
  };

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setStepIndex(0);
    setServings(recipe.servings || 4);
    setPage("recipe");
    window.scrollTo(0, 0);
  };

  const addRecipeToCart = (recipe) => {
    if (!cart.find((item) => item.id === recipe.id)) {
      setCart([...cart, recipe]);
    }
  };

  const toggleFavorite = (recipe) => {
    const exists = favorites.find((item) => item.id === recipe.id);

    if (exists) {
      setFavorites(favorites.filter((item) => item.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = (recipe) => favorites.some((item) => item.id === recipe.id);

  const topRecipes = [...allRecipes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="app">
      <Header cart={cart} setPage={setPage} />

      {page === "home" && (
        <HomePage
          search={search}
          setSearch={setSearch}
          searchRecipes={searchRecipes}
          topRecipes={topRecipes}
          openRecipe={openRecipe}
          addRecipeToCart={addRecipeToCart}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          setPage={setPage}
        />
      )}

      {page === "catalog" && (
        <CatalogPage
          search={search}
          setSearch={setSearch}
          searchRecipes={searchRecipes}
          recipes={filteredRecipes}
          openRecipe={openRecipe}
          addRecipeToCart={addRecipeToCart}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}

      {page === "recipe" && selectedRecipe && (
        <RecipePage
          recipe={selectedRecipe}
          stepIndex={stepIndex}
          setStepIndex={setStepIndex}
          servings={servings}
          setServings={setServings}
          addRecipeToCart={addRecipeToCart}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          goBack={() => setPage("catalog")}
        />
      )}

      {page === "cart" && (
        <CartPage cart={cart} setCart={setCart} goBack={() => setPage("home")} />
      )}

      <BottomNav setPage={setPage} cart={cart} />
    </div>
  );
}

function Header({ cart, setPage }) {
  return (
    <header className="header">
      <button className="logoButton" onClick={() => setPage("home")}>
        <span className="logoIcon">🍽️</span>
        <span>À Table</span>
      </button>

      <div className="actions">
        <button className="login">
          <User size={18} />
          Connexion
        </button>

        <button className="login">
          <User size={18} />
          Nouveau utilisateur
        </button>

        <button className="cartButton" onClick={() => setPage("cart")}>
          <ShoppingCart size={18} />
          {cart.length}
        </button>
      </div>
    </header>
  );
}

function HomePage({
  search,
  setSearch,
  searchRecipes,
  topRecipes,
  openRecipe,
  addRecipeToCart,
  toggleFavorite,
  isFavorite,
  setPage,
}) {
  return (
    <>
      <section className="hero">
        <div className="heroText">
          <div className="badge">Application recettes premium</div>

          <h1>Trouve une idée repas en quelques secondes</h1>

          <p>
            Recherche une recette, adapte les quantités selon le nombre de personnes,
            ajoute les ingrédients au panier et cuisine étape par étape.
          </p>

          <div className="searchBar large">
            <input
              type="text"
              placeholder="Rechercher : poulet, pâtes, gratin, dessert..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchRecipes()}
            />

            <button onClick={searchRecipes}>
              <Search size={22} />
            </button>
          </div>
        </div>

        <img
          className="heroImage"
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
          alt="Plat coloré"
        />
      </section>

      <section className="topSection">
        <div className="sectionTitle">
          <h2>
            <Flame size={24} />
            Top recettes
          </h2>

          <button onClick={() => setPage("catalog")}>Voir le catalogue</button>
        </div>

        <div className="recipesGrid">
          {topRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              openRecipe={openRecipe}
              addRecipeToCart={addRecipeToCart}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function CatalogPage({
  search,
  setSearch,
  searchRecipes,
  recipes,
  openRecipe,
  addRecipeToCart,
  toggleFavorite,
  isFavorite,
}) {
  return (
    <section className="page">
      <div className="pageHeader">
        <h1>Catalogue de recettes</h1>
        <p>Recherche par plat, ingrédient, catégorie ou difficulté.</p>
      </div>

      <div className="catalogSearch">
        <div className="searchBar">
          <input
            placeholder="Rechercher une recette..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchRecipes()}
          />

          <button onClick={searchRecipes}>
            <Search size={20} />
          </button>
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="emptyState">Aucune recette trouvée.</div>
      ) : (
        <div className="recipesGrid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              openRecipe={openRecipe}
              addRecipeToCart={addRecipeToCart}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function RecipeCard({
  recipe,
  openRecipe,
  addRecipeToCart,
  toggleFavorite,
  isFavorite,
}) {
  return (
    <article className="recipeCard">
      <img src={recipe.image} alt={recipe.title} onClick={() => openRecipe(recipe)} />

      <div className="recipeContent">
        <div className="topCard">
          <span className="rating">
            <Star size={14} />
            {recipe.rating}
          </span>

          <button
            className={`favorite ${isFavorite(recipe) ? "active" : ""}`}
            onClick={() => toggleFavorite(recipe)}
          >
            <Heart size={18} />
          </button>
        </div>

        <h3 onClick={() => openRecipe(recipe)}>{recipe.title}</h3>

        <div className="infos">
          <span>
            <Clock3 size={14} />
            {recipe.totalTime} min
          </span>
          <span>{recipe.difficulty}</span>
          <span>{recipe.budget} €</span>
        </div>

        <div className="cardActions">
          <button className="addButton" onClick={() => addRecipeToCart(recipe)}>
            Panier
          </button>

          <button className="secondaryButton small" onClick={() => openRecipe(recipe)}>
            Voir recette
          </button>
        </div>
      </div>
    </article>
  );
}

function RecipePage({
  recipe,
  stepIndex,
  setStepIndex,
  servings,
  setServings,
  addRecipeToCart,
  toggleFavorite,
  isFavorite,
  goBack,
}) {
  const ratio = servings / recipe.servings;

  return (
    <section className="recipeDetail">
      <button className="backButton" onClick={goBack}>
        <ArrowLeft size={18} />
        Retour
      </button>

      <div className="detailHero">
        <img src={recipe.image} alt={recipe.title} />

        <div>
          <div className="badge">{recipe.category}</div>

          <h1>{recipe.title}</h1>

          <div className="detailStats">
            <span>⏱️ {recipe.totalTime} min</span>
            <span>🔥 Cuisson {recipe.cookTime} min</span>
            <span>⭐ {recipe.rating}</span>
            <span>💶 {recipe.budget} €</span>
          </div>

          <div className="servingsBox">
            <span>Nombre de personnes</span>

            <div className="servingsControls">
              <button onClick={() => setServings(Math.max(1, servings - 1))}>-</button>
              <strong>{servings}</strong>
              <button onClick={() => setServings(servings + 1)}>+</button>
            </div>
          </div>

          <div className="detailActions">
            <button className="addButton" onClick={() => addRecipeToCart(recipe)}>
              Ajouter au panier
            </button>

            <button
              className={`favorite big ${isFavorite(recipe) ? "active" : ""}`}
              onClick={() => toggleFavorite(recipe)}
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="detailGrid">
        <div className="detailBox">
          <h2>Ingrédients</h2>

          <ul className="ingredientsList">
            {recipe.ingredients.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <strong>{adjustQuantity(item.quantity, ratio)}</strong>
              </li>
            ))}
          </ul>

          {recipe.allergens.length > 0 && (
            <div className="allergensBox">
              <h3>Allergènes</h3>
              <p>{recipe.allergens.join(", ")}</p>
            </div>
          )}
        </div>

        <div className="detailBox">
          <h2>Préparation étape par étape</h2>

          <div className="stepBox">
            <div className="stepCounter">
              Étape {stepIndex + 1} / {recipe.steps.length}
            </div>

            <p>{recipe.steps[stepIndex]}</p>

            <div className="stepActions">
              <button
                disabled={stepIndex === 0}
                onClick={() => setStepIndex(stepIndex - 1)}
              >
                <Minus size={16} />
                Précédent
              </button>

              <button
                disabled={stepIndex === recipe.steps.length - 1}
                onClick={() => setStepIndex(stepIndex + 1)}
              >
                Suivant
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CartPage({ cart, setCart, goBack }) {
  const exportTxt = () => {
    const content = cart
      .map((recipe) => {
        const ingredients = recipe.ingredients
          .map((item) => `- ${item.quantity} ${item.name}`)
          .join("\n");

        return `${recipe.title}\n${ingredients}`;
      })
      .join("\n\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "liste-de-courses.txt";
    a.click();
  };

  return (
    <section className="page">
      <button className="backButton" onClick={goBack}>
        <ArrowLeft size={18} />
        Retour
      </button>

      <div className="pageHeader">
        <h1>Mon panier</h1>
        <p>Retrouve les recettes ajoutées et exporte ta liste de courses.</p>
      </div>

      {cart.length === 0 ? (
        <div className="emptyState">Ton panier est vide.</div>
      ) : (
        <>
          <div className="cartList">
            {cart.map((recipe) => (
              <div className="cartItem" key={recipe.id}>
                <img src={recipe.image} alt={recipe.title} />

                <span>{recipe.title}</span>

                <button onClick={() => setCart(cart.filter((item) => item.id !== recipe.id))}>
                  Supprimer
                </button>
              </div>
            ))}
          </div>

          <div className="cartActions">
            <button className="addButton" onClick={exportTxt}>
              <Download size={18} />
              Exporter
            </button>

            <button className="secondaryButton" onClick={() => window.print()}>
              <Printer size={18} />
              Imprimer
            </button>
          </div>
        </>
      )}
    </section>
  );
}

function BottomNav({ setPage, cart }) {
  return (
    <nav className="bottomNav">
      <button onClick={() => setPage("home")}>
        <Home size={20} />
        Accueil
      </button>

      <button onClick={() => setPage("catalog")}>
        <BookOpen size={20} />
        Recettes
      </button>

      <button onClick={() => setPage("cart")}>
        <ShoppingCart size={20} />
        Panier {cart.length}
      </button>
    </nav>
  );
}

function adjustQuantity(quantity, ratio) {
  const match = quantity.match(/^([\d.,]+)\s*(.*)$/);

  if (!match) {
    return quantity;
  }

  const number = parseFloat(match[1].replace(",", "."));

  if (isNaN(number)) {
    return quantity;
  }

  const unit = match[2];
  const adjusted = Math.round(number * ratio * 10) / 10;

  return `${adjusted} ${unit}`.trim();
}

createRoot(document.getElementById("root")).render(<App />);