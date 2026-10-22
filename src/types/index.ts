export type MealCategory = 'todos' | 'desayuno' | 'almuerzo' | 'cena' | 'snack' | 'postre';

export type DifficultyLevel = 'Fácil' | 'Medio' | 'Difícil' | 'Chef Pro';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: MealCategory;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: DifficultyLevel;
  calories: number;
  isFavorite: boolean;
  rating: number; // 1-5
  imageUrl: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
  createdAt: string;
}

export interface DayPlan {
  dayName: string; // Lunes, Martes, etc.
  date: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snack?: Recipe;
}

export interface WeeklyMenu {
  id: string;
  title: string;
  weekRange: string;
  isActive: boolean;
  days: DayPlan[];
}

export type ViewMode = 'grid' | 'list';

export interface FilterState {
  searchQuery: string;
  category: MealCategory;
  maxTime?: number;
  difficulty?: DifficultyLevel | 'todas';
  onlyFavorites: boolean;
  sortBy: 'recent' | 'rating' | 'time' | 'calories';
}
