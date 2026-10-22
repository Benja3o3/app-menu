import React from 'react';
import { Recipe, ViewMode } from '../../types';
import { Clock, Flame, Users, Heart, Star, Plus } from 'lucide-react';
import { PixelBadge } from '../ui/PixelBadge';
import { Button } from '../ui/Button';

interface RecipeCardProps {
  recipe: Recipe;
  viewMode?: ViewMode;
  onSelect: (recipe: Recipe) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onAddToMenu?: (recipe: Recipe, e: React.MouseEvent) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  viewMode = 'grid',
  onSelect,
  onToggleFavorite,
  onAddToMenu,
}) => {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const categoryColorMap = {
    desayuno: 'amber',
    almuerzo: 'primary',
    cena: 'purple',
    snack: 'cyan',
    postre: 'warning',
    todos: 'primary',
  } as const;

  const badgeVariant = categoryColorMap[recipe.category] || 'primary';

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onSelect(recipe)}
        className="group bg-[#1e293b] hover:bg-[#24334a] border border-slate-700/60 hover:border-indigo-500/50 rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-center gap-4 hover:shadow-xl hover:shadow-black/30"
      >
        {/* Thumbnail */}
        <div className="relative w-full sm:w-44 h-32 flex-shrink-0 overflow-hidden rounded-xl">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button
            onClick={(e) => onToggleFavorite(recipe.id, e)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-sm transition-all"
          >
            <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <PixelBadge
              label={recipe.category.toUpperCase()}
              variant={badgeVariant}
              size="sm"
            />
            <span className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {recipe.rating}
            </span>
            <span className="text-xs text-slate-400">• {recipe.difficulty}</span>
          </div>

          <h3 className="text-lg font-bold text-[#f8fafc] group-hover:text-indigo-300 transition-colors truncate">
            {recipe.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1">
            {recipe.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {totalTime} min
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {recipe.calories} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              {recipe.servings} porc.
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0 flex-shrink-0">
          <Button
            onClick={() => onSelect(recipe)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Ver Receta
          </Button>
          {onAddToMenu && (
            <Button
              onClick={(e) => onAddToMenu(recipe, e)}
              variant="secondary"
              size="sm"
              icon={<Plus className="w-3.5 h-3.5" />}
              className="w-full text-xs"
            >
              Planificar
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Grid Card View (Default)
  return (
    <div
      onClick={() => onSelect(recipe)}
      className="group relative bg-[#1e293b] hover:bg-[#222f44] border border-slate-700/60 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5"
    >
      {/* Card Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-black/40" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <PixelBadge
            label={recipe.category.toUpperCase()}
            variant={badgeVariant}
            pixelBorder
            size="sm"
          />
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(recipe.id, e)}
          className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md text-white transition-all transform active:scale-90"
          title={recipe.isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              recipe.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-300 hover:text-white'
            }`}
          />
        </button>

        {/* Rating Floating Tag */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#090d16]/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-slate-700/70 text-xs text-amber-400 font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{recipe.rating}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#f8fafc] group-hover:text-indigo-300 transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {recipe.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="pt-3 border-t border-slate-700/50">
          <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-300 mb-3">
            <div className="bg-[#090d16]/50 py-1.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] text-slate-400 font-medium">Tiempo</span>
              <span className="font-bold text-white font-mono">{totalTime}m</span>
            </div>
            <div className="bg-[#090d16]/50 py-1.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] text-slate-400 font-medium">Calorías</span>
              <span className="font-bold text-amber-400 font-mono">{recipe.calories}</span>
            </div>
            <div className="bg-[#090d16]/50 py-1.5 rounded-xl border border-slate-800">
              <span className="block text-[10px] text-slate-400 font-medium">Dificultad</span>
              <span className="font-bold text-emerald-400 font-mono text-[11px] truncate px-0.5">{recipe.difficulty}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => onSelect(recipe)}
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] transition-all"
            >
              Ver Receta
            </Button>
            {onAddToMenu && (
              <button
                onClick={(e) => onAddToMenu(recipe, e)}
                title="Añadir al menú semanal"
                className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-400 border border-slate-700 hover:border-indigo-500/40 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
