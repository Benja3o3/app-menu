import React from 'react';
import { WeeklyMenu, Recipe } from '../../types';
import { Plus } from 'lucide-react';
import { PixelBadge } from '../ui/PixelBadge';
import { Button } from '../ui/Button';

interface WeeklyMenuSectionProps {
  weeklyMenu: WeeklyMenu;
  onSelectRecipe: (recipe: Recipe) => void;
  onBackToRecipes: () => void;
}

export const WeeklyMenuSection: React.FC<WeeklyMenuSectionProps> = ({
  weeklyMenu,
  onSelectRecipe,
  onBackToRecipes,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#1e293b] border border-slate-700/70 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PixelBadge
              label="CALENDARIO SEMANAL"
              variant="primary"
              pixelBorder
            />
            <span className="text-xs text-slate-400 font-mono">{weeklyMenu.weekRange}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {weeklyMenu.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organiza tus comidas diarias, balance nutricional y listas de compra
          </p>
        </div>

        <Button
          onClick={onBackToRecipes}
          variant="outline"
          size="md"
        >
          Volver al Catálogo
        </Button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {weeklyMenu.days.map((day, idx) => {
          const isToday = day.dayName.includes('Hoy');
          const meals = [
            { label: '🥞 Desayuno', recipe: day.breakfast },
            { label: '🥗 Almuerzo', recipe: day.lunch },
            { label: '🍲 Cena', recipe: day.dinner },
            { label: '🥑 Snack', recipe: day.snack },
          ];

          return (
            <div
              key={idx}
              className={`bg-[#1e293b] rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between ${
                isToday
                  ? 'border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div>
                {/* Day Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-3">
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${isToday ? 'text-indigo-400' : 'text-white'}`}>
                      {day.dayName}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{day.date}</span>
                  </div>
                  {isToday && (
                    <span className="font-pixel text-[8px] bg-[#10b981]/20 text-[#10b981] px-1.5 py-0.5 rounded border border-emerald-500/30">
                      HOY
                    </span>
                  )}
                </div>

                {/* Day Meal Slots */}
                <div className="space-y-2.5">
                  {meals.map((meal, mIdx) => {
                    const r = meal.recipe;
                    return (
                      <div
                        key={mIdx}
                        onClick={() => r && onSelectRecipe(r)}
                        className={`p-2.5 rounded-xl border text-xs transition-all ${
                          r
                            ? 'bg-[#090d16]/60 border-slate-800 hover:border-indigo-500/60 cursor-pointer hover:bg-slate-800/80'
                            : 'bg-slate-800/20 border-dashed border-slate-800 text-slate-500 flex items-center justify-center py-3'
                        }`}
                      >
                        <span className="block text-[10px] text-slate-400 font-medium mb-1">
                          {meal.label}
                        </span>
                        {r ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={r.imageUrl}
                              alt={r.title}
                              className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-white truncate text-xs">
                                {r.title}
                              </p>
                              <span className="font-mono text-[10px] text-amber-400">
                                {r.calories} kcal
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] italic flex items-center gap-1">
                            <Plus className="w-3 h-3" /> Asignar receta
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
