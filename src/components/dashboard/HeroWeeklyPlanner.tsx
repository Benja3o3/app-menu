import React from 'react';
import { Flame, CheckCircle2, Clock, ArrowRight, Sparkles, Utensils } from 'lucide-react';
import { WeeklyMenu, Recipe } from '../../types';
import { PixelBadge } from '../ui/PixelBadge';
import { Button } from '../ui/Button';

interface HeroWeeklyPlannerProps {
  weeklyMenu: WeeklyMenu;
  onSelectRecipe: (recipe: Recipe) => void;
  onViewWeeklyTab: () => void;
}

export const HeroWeeklyPlanner: React.FC<HeroWeeklyPlannerProps> = ({
  weeklyMenu,
  onSelectRecipe,
  onViewWeeklyTab,
}) => {
  const todayPlan = weeklyMenu.days.find((d) => d.dayName.includes('Hoy')) || weeklyMenu.days[0];

  const meals = [
    { type: 'Desayuno', recipe: todayPlan.breakfast, completed: true, time: '08:30' },
    { type: 'Almuerzo', recipe: todayPlan.lunch, completed: true, time: '13:30' },
    { type: 'Cena', recipe: todayPlan.dinner, completed: false, time: '20:30' },
    { type: 'Snack', recipe: todayPlan.snack, completed: false, time: '17:00' },
  ];

  const totalCalories = meals.reduce((acc, curr) => acc + (curr.recipe?.calories || 0), 0);
  const completedCount = meals.filter(m => m.completed).length;
  const progressPercent = Math.round((completedCount / meals.length) * 100);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1e293b] via-[#1a2333] to-[#0f172a] border border-slate-700/70 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Top Banner Row */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <PixelBadge
              label="★ PLAN SEMANAL ACTIVO"
              variant="primary"
              pixelBorder
              icon={<Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
            />
            <span className="text-xs text-slate-400 font-mono">
              {weeklyMenu.weekRange}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
            {weeklyMenu.title}
          </h2>
          <p className="text-sm text-slate-300">
            Comidas planificadas para <strong className="text-white font-semibold">{todayPlan.dayName}</strong> ({todayPlan.date})
          </p>
        </div>

        {/* Nutritional & Progress Summary */}
        <div className="flex items-center gap-4 bg-[#090d16]/70 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
            <div className="p-2 bg-amber-500/15 rounded-xl text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Meta Diaria</p>
              <p className="text-base font-bold text-white font-mono">{totalCalories} <span className="text-xs font-normal text-slate-400">kcal</span></p>
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[130px]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Progreso</span>
              <span className="font-bold text-[#10b981] font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-[#10b981] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400">{completedCount} de {meals.length} platos listos</span>
          </div>
        </div>
      </div>

      {/* Meals Grid for Today */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {meals.map((item, idx) => {
          const recipe = item.recipe;
          if (!recipe) return null;

          return (
            <div
              key={idx}
              onClick={() => onSelectRecipe(recipe)}
              className="group relative bg-[#090d16]/60 hover:bg-[#1e293b]/90 border border-slate-700/60 hover:border-indigo-500/60 rounded-2xl p-4 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                  {item.type}
                </span>
                {item.completed ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#10b981] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Hecho
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                    <Clock className="w-3 h-3" /> {item.time}
                  </span>
                )}
              </div>

              {/* Recipe Mini Thumbnail & Info */}
              <div className="flex items-center gap-3">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-700 group-hover:border-indigo-400 transition-colors"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-[#f8fafc] truncate group-hover:text-indigo-300 transition-colors">
                    {recipe.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                    <span>•</span>
                    <span className="font-mono text-slate-300">{recipe.calories} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Action Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Utensils className="w-4 h-4 text-indigo-400" />
          <span>¿Quieres ajustar tus comidas para hoy o cambiar porciones?</span>
        </div>
        <Button
          onClick={onViewWeeklyTab}
          variant="outline"
          size="sm"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          className="border-slate-700 hover:border-indigo-500 text-slate-200"
        >
          Ver Plan Semanal Completo
        </Button>
      </div>
    </div>
  );
};
