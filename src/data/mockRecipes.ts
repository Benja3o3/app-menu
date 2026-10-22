import { Recipe, WeeklyMenu } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Bowl de Salmón Teriyaki & Palta',
    description: 'Salmón glaseado con salsa teriyaki artesanal sobre cama de arroz jazmín, edamames, palta fresca y sésamo tostado.',
    category: 'almuerzo',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    servings: 2,
    difficulty: 'Fácil',
    calories: 520,
    isFavorite: true,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    tags: ['Proteína Alta', 'Omega 3', 'Rápido', 'Gluten Free'],
    ingredients: [
      { id: 'ing-1', name: 'Filete de salmón fresco', amount: '350', unit: 'g' },
      { id: 'ing-2', name: 'Arroz jazmín', amount: '1', unit: 'taza' },
      { id: 'ing-3', name: 'Palta madura', amount: '1', unit: 'unidad' },
      { id: 'ing-4', name: 'Edamames desgranados', amount: '1/2', unit: 'taza' },
      { id: 'ing-5', name: 'Salsa Teriyaki & Semillas de sésamo', amount: '3', unit: 'cucharadas' }
    ],
    instructions: [
      'Cocinar el arroz jazmín al vapor hasta que quede esponjoso.',
      'Sellar el salmón en sartén caliente 3 min por lado y glasear con salsa teriyaki.',
      'Armar el bowl con base de arroz, láminas de palta, edamames y el salmón encima.',
      'Espolvorear sésamo tostado y servir de inmediato.'
    ],
    createdAt: '2026-10-20'
  },
  {
    id: 'rec-2',
    title: 'Pancakes de Avena & Frutos del Bosque',
    description: 'Pancakes esponjosos libres de azúcar refinada, con harina de avena, plátano, arándanos frescos y miel de maple pura.',
    category: 'desayuno',
    prepTimeMinutes: 10,
    cookTimeMinutes: 10,
    servings: 2,
    difficulty: 'Fácil',
    calories: 340,
    isFavorite: true,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
    tags: ['Desayuno Fit', 'Sin Azúcar', 'Fibra'],
    ingredients: [
      { id: 'ing-6', name: 'Harina de avena integral', amount: '1.5', unit: 'taza' },
      { id: 'ing-7', name: 'Plátano maduro', amount: '1', unit: 'unidad' },
      { id: 'ing-8', name: 'Huevos de campo', amount: '2', unit: 'unidades' },
      { id: 'ing-9', name: 'Leche vegetal de almendras', amount: '1/2', unit: 'taza' },
      { id: 'ing-10', name: 'Mix de berries frescos y miel', amount: 'al gusto' }
    ],
    instructions: [
      'Licuar avena, plátano, huevos y leche vegetal hasta obtener una mezcla suave.',
      'Verter porciones en una sartén antiadherente precalentada a fuego medio.',
      'Cocinar 2 minutos hasta que aparezcan burbujas, voltear y dorar 1 minuto más.',
      'Decorar con berries frescos y un hilo de miel pura de maple.'
    ],
    createdAt: '2026-10-18'
  },
  {
    id: 'rec-3',
    title: 'Risotto de Champiñones Trufados & Parmesano',
    description: 'Clásico risotto cremoso al dente con variedad de setas silvestres, toque sutil de aceite de trufa y queso Parmigiano Reggiano.',
    category: 'cena',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    servings: 4,
    difficulty: 'Medio',
    calories: 580,
    isFavorite: false,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    tags: ['Gourmet', 'Vegetariano', 'Cena Especial'],
    ingredients: [
      { id: 'ing-11', name: 'Arroz Carnaroli o Arborio', amount: '300', unit: 'g' },
      { id: 'ing-12', name: 'Mix de champiñones y portobellos', amount: '250', unit: 'g' },
      { id: 'ing-13', name: 'Caldo vegetal caliente', amount: '1', unit: 'litro' },
      { id: 'ing-14', name: 'Vino blanco seco', amount: '1/2', unit: 'taza' },
      { id: 'ing-15', name: 'Queso Parmigiano rallado', amount: '60', unit: 'g' }
    ],
    instructions: [
      'Saltear las setas en mantequilla con ajo hasta dorar y reservar una parte.',
      'Nacarar el arroz con cebolla finamente picada, desglasar con vino blanco.',
      'Agregar caldo caliente cucharón a cucharón removiendo constantemente 18 minutos.',
      'Mantecar con parmesano frío, mantequilla y unas gotas de aceite de trufa.'
    ],
    createdAt: '2026-10-15'
  },
  {
    id: 'rec-4',
    title: 'Smoothie Bowl Tropical de Mango & Chía',
    description: 'Refrescante batido espeso de mango, maracuyá y leche de coco coronado con semillas de chía, kiwi y coco rallado.',
    category: 'snack',
    prepTimeMinutes: 8,
    cookTimeMinutes: 0,
    servings: 1,
    difficulty: 'Fácil',
    calories: 220,
    isFavorite: false,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegano', 'Superfood', 'Refrescante', 'Rápido'],
    ingredients: [
      { id: 'ing-16', name: 'Mango congelado en cubos', amount: '1.5', unit: 'taza' },
      { id: 'ing-17', name: 'Pulpa de maracuyá', amount: '2', unit: 'cucharadas' },
      { id: 'ing-18', name: 'Bebida de coco sin azúcar', amount: '1/3', unit: 'taza' },
      { id: 'ing-19', name: 'Semillas de chía y coco tostado', amount: '1', unit: 'cucharada' }
    ],
    instructions: [
      'Procesar el mango congelado con maracuyá y bebida de coco a alta potencia.',
      'Servir en un cuenco hondo con textura de helado suave.',
      'Decorar con líneas de coco rallado, láminas de kiwi fresco y semillas de chía.'
    ],
    createdAt: '2026-10-12'
  },
  {
    id: 'rec-5',
    title: 'Tacos de Asada con Guacamole Rústico',
    description: 'Finas tiras de carne marinada al cilantro y lima, servidas en tortillas de maíz calientes con guacamole artesanal.',
    category: 'almuerzo',
    prepTimeMinutes: 20,
    cookTimeMinutes: 10,
    servings: 3,
    difficulty: 'Medio',
    calories: 610,
    isFavorite: true,
    rating: 4.95,
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
    tags: ['Mexicano', 'Alto en Proteína', 'Tradicional'],
    ingredients: [
      { id: 'ing-20', name: 'Carne de res (Arrachera/Entraña)', amount: '450', unit: 'g' },
      { id: 'ing-21', name: 'Tortillas de maíz nixtamalizadas', amount: '8', unit: 'unidades' },
      { id: 'ing-22', name: 'Paltas maduras para guacamole', amount: '2', unit: 'unidades' },
      { id: 'ing-23', name: 'Cilantro fresco y limas verdes', amount: 'al gusto' }
    ],
    instructions: [
      'Marinar la carne con jugo de lima, comino, ajo y cilantro durante 20 min.',
      'Asar a fuego vivo en plancha muy caliente 2 min por lado.',
      'Picar en cubos pequeños y armar los tacos sobre tortillas tibias con guacamole.'
    ],
    createdAt: '2026-10-08'
  },
  {
    id: 'rec-6',
    title: 'Crema Tibia de Zapallo & Jengibre Crocante',
    description: 'Sopa aterciopelada de zapallo camote asado al horno, leche de coco, toque de jengibre fresco y pepitas de calabaza crocantes.',
    category: 'cena',
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    servings: 3,
    difficulty: 'Fácil',
    calories: 280,
    isFavorite: false,
    rating: 4.75,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    tags: ['Calentito', 'Bajo en Calorías', 'Antioxidante'],
    ingredients: [
      { id: 'ing-24', name: 'Zapallo camote en trozos', amount: '600', unit: 'g' },
      { id: 'ing-25', name: 'Jengibre fresco rallado', amount: '1', unit: 'cucharadita' },
      { id: 'ing-26', name: 'Leche de coco cremosa', amount: '200', unit: 'ml' },
      { id: 'ing-27', name: 'Semillas de zapallo tostadas', amount: '2', unit: 'cucharadas' }
    ],
    instructions: [
      'Hornear los trozos de zapallo con aceite de oliva y sal hasta dorar.',
      'Licuar con caldo vegetal tibio, leche de coco y jengibre hasta lograr textura sedosa.',
      'Ajustar sal y servir caliente con semillas crocantes encima.'
    ],
    createdAt: '2026-10-02'
  }
];

export const ACTIVE_WEEKLY_MENU: WeeklyMenu = {
  id: 'menu-semana-43',
  title: 'Menú Balance & Energía',
  weekRange: '20 - 26 de Octubre',
  isActive: true,
  days: [
    {
      dayName: 'Lunes',
      date: '20 Oct',
      breakfast: INITIAL_RECIPES[1],
      lunch: INITIAL_RECIPES[0],
      dinner: INITIAL_RECIPES[5],
      snack: INITIAL_RECIPES[3]
    },
    {
      dayName: 'Martes',
      date: '21 Oct',
      breakfast: INITIAL_RECIPES[1],
      lunch: INITIAL_RECIPES[4],
      dinner: INITIAL_RECIPES[2],
      snack: INITIAL_RECIPES[3]
    },
    {
      dayName: 'Miércoles (Hoy)',
      date: '22 Oct',
      breakfast: INITIAL_RECIPES[1],
      lunch: INITIAL_RECIPES[0],
      dinner: INITIAL_RECIPES[2],
      snack: INITIAL_RECIPES[3]
    },
    {
      dayName: 'Jueves',
      date: '23 Oct',
      breakfast: INITIAL_RECIPES[1],
      lunch: INITIAL_RECIPES[4],
      dinner: INITIAL_RECIPES[5]
    },
    {
      dayName: 'Viernes',
      date: '24 Oct',
      breakfast: INITIAL_RECIPES[1],
      lunch: INITIAL_RECIPES[0],
      dinner: INITIAL_RECIPES[2]
    }
  ]
};
