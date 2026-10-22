import React, { useState } from 'react';
import { Recipe } from '../../types';
import { X, Heart, Star, CheckCircle2, BookmarkPlus, Sparkles, ChefHat } from 'lucide-react';
import { PixelBadge } from '../ui/PixelBadge';
import { Button } from '../ui/Button';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onAddToMenu?: (recipe: Recipe) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onToggleFavorite,
  onAddToMenu,
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  if (!recipe) return null;

  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#1e293b] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/40 to-black/60" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-slate-700/60 transition-all hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <PixelBadge
              label={recipe.category.toUpperCase()}
              variant="primary"
              pixelBorder
            />
            <span className="flex items-center gap-1 bg-[#090d16]/80 text-amber-400 font-bold text-xs px-2.5 py-1 rounded-xl border border-slate-700 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {recipe.rating}
            </span>
          </div>

          {/* Hero Title & Subtext */}
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] drop-shadow-md">
              {recipe.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Modal Key Metrics Strip */}
        <div className="bg-[#090d16]/70 border-y border-slate-800 px-6 py-3 grid grid-cols-4 gap-2 text-center">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Prep</span>
            <span className="text-sm font-bold text-white font-mono">{recipe.prepTimeMinutes} min</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Cocción</span>
            <span className="text-sm font-bold text-white font-mono">{recipe.cookTimeMinutes} min</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Porciones</span>
            <span className="text-sm font-bold text-white font-mono">{recipe.servings} pers.</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Energía</span>
            <span className="text-sm font-bold text-amber-400 font-mono">{recipe.calories} kcal</span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Etiquetas:</span>
            {recipe.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ingredients Column */}
            <div className="space-y-3 bg-[#090d16]/50 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-indigo-400" />
                  Ingredientes ({recipe.ingredients.length})
                </h4>
                <span className="text-[10px] text-slate-400">Marca lo que tengas</span>
              </div>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing) => {
                  const isChecked = !!checkedIngredients[ing.id];
                  return (
                    <li
                      key={ing.id}
                      onClick={() => toggleIngredient(ing.id)}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-emerald-500/10 text-slate-400 line-through'
                          : 'bg-slate-800/60 hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-slate-600 bg-slate-900'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span>{ing.name}</span>
                      </div>
                      <span className="font-mono text-slate-400 font-semibold">
                        {ing.amount} {ing.unit || ''}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Preparation Steps Column */}
            <div className="space-y-3 bg-[#090d16]/50 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Instrucciones Paso a Paso
                </h4>
                <span className="font-mono text-[10px] text-slate-400">{recipe.instructions.length} Pasos</span>
              </div>
              <ol className="space-y-2.5">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-xs text-slate-300 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-400 font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-500/40">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 sm:p-6 bg-[#1a2333] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Button
            onClick={() => onToggleFavorite(recipe.id)}
            variant="secondary"
            size="md"
            icon={
              <Heart
                className={`w-4 h-4 ${recipe.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
              />
            }
          >
            {recipe.isFavorite ? 'En Favoritas' : 'Guardar en Favoritas'}
          </Button>

          <div className="flex items-center gap-3">
            <Button
              onClick={onClose}
              variant="ghost"
              size="md"
            >
              Cerrar
            </Button>
            {onAddToMenu && (
              <Button
                onClick={() => {
                  onAddToMenu(recipe);
                  onClose();
                }}
                variant="primary"
                size="md"
                icon={<BookmarkPlus className="w-4 h-4" />}
              >
                Añadir al Menú Semanal
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
