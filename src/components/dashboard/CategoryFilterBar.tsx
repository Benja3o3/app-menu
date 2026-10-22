import React from 'react';
import { MealCategory, ViewMode } from '../../types';
import { LayoutGrid, List, Heart, ArrowUpDown, X } from 'lucide-react';

interface CategoryFilterBarProps {
  selectedCategory: MealCategory;
  onSelectCategory: (category: MealCategory) => void;
  onlyFavorites: boolean;
  onToggleFavorites: () => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  sortBy: 'recent' | 'rating' | 'time' | 'calories';
  onChangeSortBy: (sort: 'recent' | 'rating' | 'time' | 'calories') => void;
  totalFiltered: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  onlyFavorites,
  onToggleFavorites,
  viewMode,
  onChangeViewMode,
  sortBy,
  onChangeSortBy,
  totalFiltered,
}) => {
  const categories: { id: MealCategory; label: string; icon: string }[] = [
    { id: 'todos', label: 'Todas', icon: '✨' },
    { id: 'desayuno', label: 'Desayunos', icon: '🥞' },
    { id: 'almuerzo', label: 'Almuerzos', icon: '🥗' },
    { id: 'cena', label: 'Cenas', icon: '🍲' },
    { id: 'snack', label: 'Snacks', icon: '🥑' },
    { id: 'postre', label: 'Postres', icon: '🍰' },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Categories Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap select-none ${
                  isSelected
                    ? 'bg-[#6366f1] text-white shadow-md shadow-indigo-500/30'
                    : 'bg-[#1e293b] text-slate-300 hover:text-white hover:bg-slate-700/70 border border-slate-700/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* View mode & quick actions */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Favorites filter toggle */}
          <button
            onClick={onToggleFavorites}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
              onlyFavorites
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                : 'bg-[#1e293b] text-slate-400 hover:text-white border-slate-700/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="hidden sm:inline">Favoritas</span>
          </button>

          {/* Sort selector */}
          <div className="relative flex items-center bg-[#1e293b] border border-slate-700/60 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <select
              value={sortBy}
              onChange={(e) => onChangeSortBy(e.target.value as 'recent' | 'rating' | 'time' | 'calories')}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="recent" className="bg-[#1e293b] text-white">Más Recientes</option>
              <option value="rating" className="bg-[#1e293b] text-white">Mejor Valoradas</option>
              <option value="time" className="bg-[#1e293b] text-white">Menor Tiempo</option>
              <option value="calories" className="bg-[#1e293b] text-white">Menos Calorías</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-[#1e293b] border border-slate-700/60 rounded-xl p-1">
            <button
              onClick={() => onChangeViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Vista en Cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChangeViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Vista en Lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Result counter & active filter badges */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <p>
          Mostrando <span className="font-semibold text-white font-mono">{totalFiltered}</span> recetas encontradas
        </p>

        {(selectedCategory !== 'todos' || onlyFavorites) && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Filtros activos:</span>
            {selectedCategory !== 'todos' && (
              <span className="inline-flex items-center gap-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-md text-[11px]">
                {selectedCategory}
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-white" 
                  onClick={() => onSelectCategory('todos')} 
                />
              </span>
            )}
            {onlyFavorites && (
              <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-md text-[11px]">
                Favoritas
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-white" 
                  onClick={onToggleFavorites} 
                />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
