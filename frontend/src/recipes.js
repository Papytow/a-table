export const recipes = [
  {
    id: 1,
    title: "Poulet basquaise",
    category: "Cuisine française",
    difficulty: "Facile",
    servings: 4,
    prepTime: 20,
    cookTime: 40,
    totalTime: 60,
    budget: 14,
    rating: 4.8,
    allergens: [],
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      { name: "Cuisses de poulet", quantity: "4" },
      { name: "Poivrons rouges", quantity: "2" },
      { name: "Poivron vert", quantity: "1" },
      { name: "Tomates concassées", quantity: "400 g" },
      { name: "Oignon", quantity: "1" },
      { name: "Ail", quantity: "2 gousses" },
      { name: "Huile d’olive", quantity: "2 c. à soupe" },
      { name: "Thym", quantity: "1 branche" },
      { name: "Sel et poivre", quantity: "selon goût" }
    ],
    steps: [
      "Émincer l’oignon, l’ail et couper les poivrons en lamelles.",
      "Faire dorer les cuisses de poulet dans une cocotte avec l’huile d’olive.",
      "Retirer le poulet puis faire revenir l’oignon, l’ail et les poivrons pendant 8 minutes.",
      "Ajouter les tomates concassées, le thym, le sel et le poivre.",
      "Remettre le poulet dans la cocotte, couvrir et laisser mijoter 35 à 40 minutes.",
      "Servir chaud avec du riz ou des pommes de terre vapeur."
    ]
  },
  {
    id: 2,
    title: "Blanquette de poulet",
    category: "Familial",
    difficulty: "Facile",
    servings: 4,
    prepTime: 20,
    cookTime: 45,
    totalTime: 65,
    budget: 13,
    rating: 4.7,
    allergens: ["lactose", "gluten"],
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      { name: "Blancs de poulet", quantity: "600 g" },
      { name: "Carottes", quantity: "3" },
      { name: "Champignons de Paris", quantity: "250 g" },
      { name: "Oignon", quantity: "1" },
      { name: "Bouillon de volaille", quantity: "600 ml" },
      { name: "Crème fraîche", quantity: "20 cl" },
      { name: "Farine", quantity: "1 c. à soupe" },
      { name: "Beurre", quantity: "20 g" },
      { name: "Riz", quantity: "250 g" }
    ],
    steps: [
      "Couper le poulet en morceaux réguliers.",
      "Éplucher les carottes et les couper en rondelles.",
      "Faire fondre le beurre dans une cocotte et faire revenir l’oignon émincé.",
      "Ajouter le poulet et le faire légèrement colorer.",
      "Saupoudrer de farine, mélanger puis ajouter le bouillon.",
      "Ajouter les carottes et les champignons puis laisser mijoter 40 minutes.",
      "Ajouter la crème fraîche en fin de cuisson et servir avec le riz."
    ]
  },
  {
    id: 3,
    title: "Quiche lorraine",
    category: "Cuisine française",
    difficulty: "Très facile",
    servings: 4,
    prepTime: 15,
    cookTime: 35,
    totalTime: 50,
    budget: 9,
    rating: 4.6,
    allergens: ["gluten", "œufs", "lactose"],
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      { name: "Pâte brisée", quantity: "1" },
      { name: "Lardons", quantity: "200 g" },
      { name: "Œufs", quantity: "3" },
      { name: "Crème fraîche", quantity: "25 cl" },
      { name: "Lait", quantity: "10 cl" },
      { name: "Fromage râpé", quantity: "80 g" },
      { name: "Muscade", quantity: "1 pincée" },
      { name: "Poivre", quantity: "selon goût" }
    ],
    steps: [
      "Préchauffer le four à 180°C.",
      "Étaler la pâte brisée dans un moule et piquer le fond avec une fourchette.",
      "Faire revenir les lardons quelques minutes à la poêle.",
      "Battre les œufs avec la crème, le lait, la muscade et le poivre.",
      "Répartir les lardons sur la pâte puis verser l’appareil.",
      "Ajouter le fromage râpé et cuire 35 minutes au four.",
      "Servir tiède avec une salade verte."
    ]
  },
  {
    id: 4,
    title: "Gratin dauphinois",
    category: "Cuisine française",
    difficulty: "Facile",
    servings: 4,
    prepTime: 20,
    cookTime: 60,
    totalTime: 80,
    budget: 7,
    rating: 4.8,
    allergens: ["lactose"],
    image: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      { name: "Pommes de terre", quantity: "1 kg" },
      { name: "Crème liquide", quantity: "30 cl" },
      { name: "Lait", quantity: "25 cl" },
      { name: "Ail", quantity: "1 gousse" },
      { name: "Beurre", quantity: "20 g" },
      { name: "Muscade", quantity: "1 pincée" },
      { name: "Sel et poivre", quantity: "selon goût" }
    ],
    steps: [
      "Préchauffer le four à 170°C.",
      "Éplucher les pommes de terre et les couper en fines rondelles.",
      "Frotter un plat à gratin avec l’ail puis le beurrer.",
      "Disposer les pommes de terre en couches régulières.",
      "Mélanger le lait, la crème, le sel, le poivre et la muscade.",
      "Verser le mélange sur les pommes de terre.",
      "Cuire environ 1 heure jusqu’à ce que le gratin soit fondant et doré."
    ]
  },
  {
    id: 5,
    title: "Ratatouille maison",
    category: "Végétarien",
    difficulty: "Facile",
    servings: 4,
    prepTime: 25,
    cookTime: 45,
    totalTime: 70,
    budget: 8,
    rating: 4.7,
    allergens: [],
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      { name: "Courgettes", quantity: "2" },
      { name: "Aubergine", quantity: "1" },
      { name: "Poivrons", quantity: "2" },
      { name: "Tomates", quantity: "4" },
      { name: "Oignon", quantity: "1" },
      { name: "Ail", quantity: "2 gousses" },
      { name: "Huile d’olive", quantity: "3 c. à soupe" },
      { name: "Herbes de Provence", quantity: "1 c. à café" }
    ],
    steps: [
      "Laver et couper tous les légumes en morceaux réguliers.",
      "Faire revenir l’oignon et l’ail dans une cocotte avec l’huile d’olive.",
      "Ajouter les poivrons puis cuire 5 minutes.",
      "Ajouter l’aubergine et les courgettes, puis mélanger.",
      "Ajouter les tomates et les herbes de Provence.",
      "Couvrir et laisser mijoter 40 à 45 minutes.",
      "Rectifier l’assaisonnement avant de servir."
    ]
  },
  {
    id: 6,
    title: "Pâtes carbonara rapides",
    category: "Rapide",
    difficulty: "Très facile",
    servings: 2,
    prepTime: 10,
    cookTime: 12,
    totalTime: 22,
    budget: 6,
    rating: 4.5,
    allergens: ["gluten", "œufs", "lactose"],
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      { name: "Spaghetti", quantity: "220 g" },
      { name: "Lardons", quantity: "120 g" },
      { name: "Œufs", quantity: "2" },
      { name: "Parmesan", quantity: "50 g" },
      { name: "Poivre", quantity: "selon goût" },
      { name: "Sel", quantity: "selon goût" }
    ],
    steps: [
      "Cuire les spaghetti dans une grande casserole d’eau salée.",
      "Faire revenir les lardons à la poêle sans ajouter de matière grasse.",
      "Battre les œufs avec le parmesan et beaucoup de poivre.",
      "Égoutter les pâtes en gardant un peu d’eau de cuisson.",
      "Mélanger les pâtes chaudes avec les lardons hors du feu.",
      "Ajouter le mélange œufs-parmesan et détendre avec un peu d’eau de cuisson.",
      "Servir immédiatement."
    ]
  }
];