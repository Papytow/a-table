import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, ShoppingCart, Heart, User, ArrowLeft, Clock3, Euro, Star, Flame, BookOpen, Home, Printer, Download, Trash2, ShieldAlert, Filter } from 'lucide-react';
import { recipes } from './recipes';
import './style.css';

const categories = ['Toutes','Cuisine française','Rapide','Familial','Petit budget','Végétarien','Healthy','Dessert','Poisson','Cuisine du monde'];
const allergenOptions = ['gluten','lactose','œufs','poisson','soja','fruits à coque','crustacés'];

function App(){
  const [page,setPage]=useState('home');
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('Toutes');
  const [maxTime,setMaxTime]=useState(120);
  const [excluded,setExcluded]=useState([]);
  const [selected,setSelected]=useState(null);
  const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('atable_cart')||'[]'));
  const [favorites,setFavorites]=useState(()=>JSON.parse(localStorage.getItem('atable_favs')||'[]'));
  const [step,setStep]=useState(0);

  React.useEffect(()=>localStorage.setItem('atable_cart',JSON.stringify(cart)),[cart]);
  React.useEffect(()=>localStorage.setItem('atable_favs',JSON.stringify(favorites)),[favorites]);

  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return recipes.filter(r=>{
      const matchText=!q || [r.title,r.category,...r.tags,...r.ingredients.map(i=>i.name)].join(' ').toLowerCase().includes(q);
      const matchCat=category==='Toutes'||r.category===category;
      const matchTime=r.time<=maxTime;
      const matchAllergens=excluded.every(a=>!r.allergens.includes(a));
      return matchText&&matchCat&&matchTime&&matchAllergens;
    });
  },[query,category,maxTime,excluded]);

  const topRecipes=useMemo(()=>recipes.slice().sort((a,b)=>b.rating-a.rating).slice(0,5),[]);

  function openRecipe(recipe){setSelected(recipe);setStep(0);setPage('recipe');window.scrollTo(0,0)}
  function addToCart(recipe){setCart(c=>c.some(x=>x.id===recipe.id)?c:[...c,recipe])}
  function toggleFav(recipe){setFavorites(f=>f.some(x=>x.id===recipe.id)?f.filter(x=>x.id!==recipe.id):[...f,recipe])}
  function isFav(recipe){return favorites.some(x=>x.id===recipe.id)}
  function toggleAllergen(a){setExcluded(e=>e.includes(a)?e.filter(x=>x!==a):[...e,a])}
  function goCatalog(){setPage('catalog');window.scrollTo(0,0)}

  return <div className="app">
    <Header cart={cart} setPage={setPage}/>
    {page==='home'&&<HomePage query={query} setQuery={setQuery} goCatalog={goCatalog} topRecipes={topRecipes} openRecipe={openRecipe} addToCart={addToCart} toggleFav={toggleFav} isFav={isFav}/>} 
    {page==='catalog'&&<Catalog query={query} setQuery={setQuery} category={category} setCategory={setCategory} maxTime={maxTime} setMaxTime={setMaxTime} excluded={excluded} toggleAllergen={toggleAllergen} recipes={filtered} openRecipe={openRecipe} addToCart={addToCart} toggleFav={toggleFav} isFav={isFav}/>} 
    {page==='recipe'&&selected&&<RecipeDetail recipe={selected} step={step} setStep={setStep} goBack={()=>setPage('catalog')} addToCart={addToCart} toggleFav={toggleFav} isFav={isFav}/>} 
    {page==='cart'&&<Cart cart={cart} setCart={setCart} goBack={()=>setPage('home')}/>} 
    <BottomNav setPage={setPage} cart={cart}/>
  </div>
}

function Header({cart,setPage}){return <header className="header">
  <button className="brand" onClick={()=>setPage('home')}><span>🍽️</span><b>À Table</b></button>
  <div className="headerActions"><button className="ghost"><User size={18}/>Connexion</button><button className="primaryGhost"><User size={18}/>Nouveau utilisateur</button><button className="cartBtn" onClick={()=>setPage('cart')}><ShoppingCart size={18}/>{cart.length}</button></div>
</header>}

function HomePage({query,setQuery,goCatalog,topRecipes,openRecipe,addToCart,toggleFav,isFav}){return <>
  <section className="hero">
    <div className="heroCopy"><div className="pill">Recettes simples, rapides et familiales</div><h1>Qu’est-ce qu’on mange aujourd’hui ?</h1><p>Trouve une idée repas, consulte une recette claire étape par étape et prépare automatiquement ta liste de courses.</p>
      <div className="bigSearch"><Search size={22}/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&goCatalog()} placeholder="Rechercher un plat, un ingrédient, une envie..."/><button onClick={goCatalog}>Rechercher</button></div>
      <div className="chips">{['poulet','pâtes','dessert','végétarien','petit budget'].map(x=><button key={x} onClick={()=>{setQuery(x);goCatalog()}}>{x}</button>)}</div>
    </div>
    <div className="heroPhoto"><img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80" alt="Table avec plats"/></div>
  </section>
  <section className="section"><div className="sectionHead"><h2><Flame/>Les 5 recettes les mieux notées</h2><button onClick={goCatalog}>Voir tout le catalogue</button></div><div className="grid">{topRecipes.map(r=><RecipeCard key={r.id} recipe={r} openRecipe={openRecipe} addToCart={addToCart} toggleFav={toggleFav} isFav={isFav}/>)}</div></section>
</>}

function Catalog(props){return <main className="page"><div className="pageTitle"><h1>Catalogue de recettes</h1><p>{props.recipes.length} recette(s) trouvée(s). Utilise les filtres pour trouver un plat adapté à ton temps, tes goûts et tes allergies.</p></div>
  <div className="filters"><div className="search"><Search size={20}/><input value={props.query} onChange={e=>props.setQuery(e.target.value)} placeholder="Rechercher : poulet, riz, chocolat..."/></div><select value={props.category} onChange={e=>props.setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><label className="range"><span>Temps max : {props.maxTime} min</span><input type="range" min="15" max="120" value={props.maxTime} onChange={e=>props.setMaxTime(Number(e.target.value))}/></label></div>
  <div className="allergens"><b><ShieldAlert size={18}/> Allergènes à éviter :</b>{allergenOptions.map(a=><button key={a} className={props.excluded.includes(a)?'active':''} onClick={()=>props.toggleAllergen(a)}>{a}</button>)}</div>
  {props.recipes.length===0?<div className="empty">Aucune recette ne correspond à ta recherche.</div>:<div className="grid">{props.recipes.map(r=><RecipeCard key={r.id} recipe={r} {...props}/>)}</div>}
</main>}

function RecipeCard({recipe,openRecipe,addToCart,toggleFav,isFav}){return <article className="card"><div className="imageWrap" onClick={()=>openRecipe(recipe)}><img src={recipe.image} alt={recipe.title}/><span className="badge">{recipe.category}</span></div><div className="cardBody"><div className="cardTop"><span className="rating"><Star size={15}/>{recipe.rating}</span><button className={isFav(recipe)?'heart active':'heart'} onClick={()=>toggleFav(recipe)}><Heart size={18}/></button></div><h3 onClick={()=>openRecipe(recipe)}>{recipe.title}</h3><div className="meta"><span><Clock3 size={15}/>{recipe.time} min</span><span><Euro size={15}/>{recipe.budget.toFixed(2)} €</span></div><div className="allergenLine">{recipe.allergens.length?`Allergènes : ${recipe.allergens.join(', ')}`:'Sans allergène majeur'}</div><div className="buttons"><button className="dark" onClick={()=>addToCart(recipe)}>Ajouter panier</button><button className="light" onClick={()=>openRecipe(recipe)}>Voir recette</button></div></div></article>}

function RecipeDetail({recipe,step,setStep,goBack,addToCart,toggleFav,isFav}){const current=recipe.steps[step]||'';return <main className="detail"><button className="back" onClick={goBack}><ArrowLeft size={18}/>Retour</button><section className="detailHero"><img src={recipe.image} alt={recipe.title}/><div><div className="pill">{recipe.category} • {recipe.difficulty}</div><h1>{recipe.title}</h1><div className="stats"><span>⏱️ {recipe.time} min</span><span>👥 {recipe.servings} pers.</span><span>⭐ {recipe.rating}</span><span>💶 {recipe.budget.toFixed(2)} €</span></div><div className="buttons detailButtons"><button className="dark" onClick={()=>addToCart(recipe)}>Ajouter au panier</button><button className={isFav(recipe)?'heart big active':'heart big'} onClick={()=>toggleFav(recipe)}><Heart/></button></div></div></section><section className="detailGrid"><div className="box"><h2>Ingrédients</h2><ul>{recipe.ingredients.map(i=><li key={i.name}><span>{i.name}</span><b>{i.quantity}</b></li>)}</ul><div className="warn"><ShieldAlert size={18}/>{recipe.allergens.length?`Allergènes : ${recipe.allergens.join(', ')}`:'Aucun allergène majeur identifié'}</div></div><div className="box"><h2>Préparation étape par étape</h2><div className="step"><b>Étape {step+1} / {recipe.steps.length}</b><p>{current}</p><div className="stepActions"><button disabled={step===0} onClick={()=>setStep(step-1)}>Précédent</button><button disabled={step===recipe.steps.length-1} onClick={()=>setStep(step+1)}>Suivant</button></div></div></div></section></main>}

function Cart({cart,setCart,goBack}){const lines=cart.flatMap(r=>[r.title,...r.ingredients.map(i=>` - ${i.quantity} ${i.name}`),'']);function download(){const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='liste-de-courses-a-table.txt';a.click();URL.revokeObjectURL(url)}return <main className="page"><button className="back" onClick={goBack}><ArrowLeft size={18}/>Retour</button><div className="pageTitle"><h1>Panier & liste de courses</h1><p>Ajoute des recettes puis exporte la liste de courses.</p></div>{cart.length===0?<div className="empty">Ton panier est vide.</div>:<><div className="cartList">{cart.map(r=><div className="cartItem" key={r.id}><img src={r.image}/><div><b>{r.title}</b><p>{r.ingredients.length} ingrédient(s)</p></div><button onClick={()=>setCart(cart.filter(x=>x.id!==r.id))}><Trash2 size={18}/>Supprimer</button></div>)}</div><div className="export"><button className="dark" onClick={download}><Download size={18}/>Exporter TXT</button><button className="light" onClick={()=>window.print()}><Printer size={18}/>Imprimer</button></div></>}</main>}

function BottomNav({setPage,cart}){return <nav className="bottom"><button onClick={()=>setPage('home')}><Home/>Accueil</button><button onClick={()=>setPage('catalog')}><BookOpen/>Recettes</button><button onClick={()=>setPage('cart')}><ShoppingCart/>Panier {cart.length}</button></nav>}

createRoot(document.getElementById('root')).render(<App/>);
