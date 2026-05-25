import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const API = 'https://www.themealdb.com/api/json/v1/1';
const fallbackIds = ['52772','52874','52977','53013','52959','52806','52814','52785','52995','53065','52906','52855','52944','52844','52795','53050','52819','53060','52854','52982','52835','52811','53026','52928','52852','52815'];

function mapMeal(m) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = m[`strIngredient${i}`]?.trim();
    const measure = m[`strMeasure${i}`]?.trim();
    if (name) ingredients.push({ name, measure: measure || '', checked: false });
  }
  const cleanInstructions = (m.strInstructions || '')
    .replace(/\r/g, '')
    .split(/\n|\.\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 12)
    .map(s => s.endsWith('.') ? s : s + '.');
  return {
    id: m.idMeal,
    title: m.strMeal,
    category: m.strCategory || 'Recette',
    area: m.strArea || 'Cuisine du monde',
    image: m.strMealThumb,
    video: m.strYoutube,
    tags: [m.strCategory, m.strArea, ...(m.strTags ? m.strTags.split(',') : [])].filter(Boolean),
    ingredients,
    steps: cleanInstructions.length ? cleanInstructions : ['Préparer tous les ingrédients.', 'Suivre les étapes de cuisson indiquées.', 'Servir chaud et ajuster l’assaisonnement.'],
    source: m.strSource || 'TheMealDB'
  };
}

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('API unavailable');
  return r.json();
}

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/api/categories', async (_, res) => {
  try {
    const data = await fetchJson(`${API}/categories.php`);
    res.json(data.categories || []);
  } catch { res.json([]); }
});

app.get('/api/search', async (req, res) => {
  const q = (req.query.q || '').trim();
  const category = (req.query.category || '').trim();
  try {
    let meals = [];
    if (q) {
      const data = await fetchJson(`${API}/search.php?s=${encodeURIComponent(q)}`);
      meals = data.meals || [];
    } else if (category && category !== 'Toutes') {
      const list = await fetchJson(`${API}/filter.php?c=${encodeURIComponent(category)}`);
      const ids = (list.meals || []).slice(0, 24).map(m => m.idMeal);
      const details = await Promise.all(ids.map(id => fetchJson(`${API}/lookup.php?i=${id}`).catch(()=>({meals:[]}))));
      meals = details.flatMap(d => d.meals || []);
    } else {
      const details = await Promise.all(fallbackIds.map(id => fetchJson(`${API}/lookup.php?i=${id}`).catch(()=>({meals:[]}))));
      meals = details.flatMap(d => d.meals || []);
    }
    res.json(meals.map(mapMeal));
  } catch (e) {
    res.status(500).json({ error: 'Impossible de récupérer les recettes' });
  }
});

app.get('/api/recipe/:id', async (req, res) => {
  try {
    const data = await fetchJson(`${API}/lookup.php?i=${req.params.id}`);
    const meal = data.meals?.[0];
    if (!meal) return res.status(404).json({ error: 'Recette introuvable' });
    res.json(mapMeal(meal));
  } catch { res.status(500).json({ error: 'Impossible de récupérer la recette' }); }
});

app.listen(4000, '0.0.0.0', () => console.log('API recettes prête : http://localhost:4000'));
