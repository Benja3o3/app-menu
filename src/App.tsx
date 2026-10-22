import React, { useState, useMemo } from 'react';
import { Recipe, MealCategory, ViewMode, WeeklyMenu } from './types';
import { INITIAL_RECIPES, ACTIVE_WEEKLY_MENU } from './data/mockRecipes';
import { Navbar } from './components/layout/Navbar';
import { HeroWeeklyPlanner } from './components/dashboard/HeroWeeklyPlanner';
import { MetricCards } from './components/dashboard/MetricCards';
import { CategoryFilterBar } from './components/dashboard/CategoryFilterBar';
import { RecipeCard } from './components/dashboard/RecipeCard';
import { RecipeDetailModal } from './components/dashboard/RecipeDetailModal';
import { CreateRecipeModal } from './components/dashboard/CreateRecipeModal';
import { WeeklyMenuSection } from './components/dashboard/WeeklyMenuSection';
import { Footer } from './components/layout/Footer';
import { UtensilsCrossed, Plus } from 'lucide-react';
import { Button } from './components/ui/Button';

export const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu>(ACTIVE_WEEKLY_MENU);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>('todos');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'time' | 'calories'>('recent');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState('recipes');

  // Modals state
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updatedFav = !r.isFavorite;
          showToast(updatedFav ? `¡"${r.title}" guardada en Favoritas!` : `Eliminada de Favoritas`);
          return { ...r, isFavorite: updatedFav };
        }
        return r;
      })
    );
    if (selectedRecipe && selectedRecipe.id === id) {
      setSelectedRecipe((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  // Create Recipe
  const handleCreateRecipe = (newRecipeData: Omit<Recipe, 'id' | 'createdAt' | 'isFavorite' | 'rating'>) => {
    const newRecipe: Recipe = {
      ...newRecipeData,
      id: `rec-${Date.now()}`,
      isFavorite: false,
      rating: 5.0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRecipes((prev) => [newRecipe, ...prev]);
    showToast(`✨ ¡Receta "${newRecipe.title}" agregada con éxito!`);
  };

  // Add to Weekly Menu
  const handleAddToWeeklyMenu = (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setWeeklyMenu((prev) => {
      const updatedDays = prev.days.map((day) => {
        if (day.dayName.includes('Hoy')) {
          return { ...day, dinner: recipe };
        }
        return day;
      });
      return { ...prev, days: updatedDays };
    });

    showToast(`🍽️ "${recipe.title}" asignada a la cena de hoy`);
  };

  // Metrics computation
  const favoritesCount = recipes.filter((r) => r.isFavorite).length;
  const averageTime = useMemo(() => {
    if (recipes.length === 0) return 0;
    const total = recipes.reduce((acc, curr) => acc + (curr.prepTimeMinutes + curr.cookTimeMinutes), 0);
    return Math.round(total / recipes.length);
  }, [recipes]);

  // Tab switching logic
  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'favorites') {
      setOnlyFavorites(true);
    } else if (tab === 'recipes') {
      setOnlyFavorites(false);
    }
  };

  // Filtered & Sorted Recipes
  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.tags.some((t) => t.toLowerCase().includes(query)) ||
          r.ingredients.some((i) => i.name.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'todos') {
      result = result.filter((r) => r.category === selectedCategory);
    }

    // Favorites filter
    if (onlyFavorites || activeTab === 'favorites') {
      result = result.filter((r) => r.isFavorite);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'time') {
        const timeA = a.prepTimeMinutes + a.cookTimeMinutes;
        const timeB = b.prepTimeMinutes + b.cookTimeMinutes;
        return timeA - timeB;
      }
      if (sortBy === 'calories') {
        return a.calories - b.calories;
      }
      return 0;
    });

    return result;
  }, [recipes, searchQuery, selectedCategory, onlyFavorites, activeTab, sortBy]);

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f8fafc] subtle-grid-bg flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e293b] border border-indigo-500/80 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideUp">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        favoritesCount={favoritesCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'weekly' ? (
          <WeeklyMenuSection
            weeklyMenu={weeklyMenu}
            onSelectRecipe={setSelectedRecipe}
            onBackToRecipes={() => setActiveTab('recipes')}
          />
        ) : (
          <>
            {/* Hero Weekly Planner Banner */}
            <HeroWeeklyPlanner
              weeklyMenu={weeklyMenu}
              onSelectRecipe={setSelectedRecipe}
              onViewWeeklyTab={() => setActiveTab('weekly')}
            />

            {/* Quick Metrics KPI Bar */}
            <MetricCards
              totalRecipes={recipes.length}
              favoritesCount={favoritesCount}
              averageTime={averageTime}
              activeMenusCount={1}
            />

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>
                    {activeTab === 'favorites' ? 'Tus Recetas Favoritas' : 'Catálogo de Recetas'}
                  </span>
                  <span className="font-pixel text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    EXPLORAR
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Encuentra platos balanceados, filtra por categoría y planifica tu semana
                </p>
              </div>

              <Button
                onClick={() => setIsCreateModalOpen(true)}
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                className="self-start sm:self-auto"
              >
                + Crear Receta
              </Button>
            </div>

            {/* Category Filter Bar */}
            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onlyFavorites={onlyFavorites}
              onToggleFavorites={() => setOnlyFavorites(!onlyFavorites)}
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
              sortBy={sortBy}
              onChangeSortBy={setSortBy}
              totalFiltered={filteredRecipes.length}
            />

            {/* Recipes Grid / List or Empty State */}
            {filteredRecipes.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    viewMode={viewMode}
                    onSelect={setSelectedRecipe}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToMenu={handleAddToWeeklyMenu}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 px-4 bg-[#1e293b]/50 border border-slate-800 rounded-3xl my-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <UtensilsCrossed className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  No encontramos recetas con estos filtros
                </h4>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                  Intenta buscar con otros términos, restablecer los filtros de categoría o registra tu primera receta casera.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('todos');
                      setOnlyFavorites(false);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Limpiar Filtros
                  </Button>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    variant="primary"
                    size="sm"
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Crear Receta Ahora
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onToggleFavorite={handleToggleFavorite}
        onAddToMenu={handleAddToWeeklyMenu}
      />

      {/* Create Recipe Modal */}
      <CreateRecipeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateRecipe}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
