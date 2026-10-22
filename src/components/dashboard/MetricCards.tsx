import React from 'react';
import { BookOpen, CalendarCheck, Heart, Timer } from 'lucide-react';

interface MetricCardsProps {
  totalRecipes: number;
  favoritesCount: number;
  averageTime: number;
  activeMenusCount: number;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  totalRecipes,
  favoritesCount,
  averageTime,
  activeMenusCount,
}) => {
  const metrics = [
    {
      id: 'recipes',
      label: 'Recetas en Colección',
      value: totalRecipes,
      unit: 'recetas',
      icon: BookOpen,
      iconBg: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30',
      badgeText: '+2 nuevas',
      badgeColor: 'text-[#10b981] bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'menus',
      label: 'Planes Activos',
      value: activeMenusCount,
      unit: 'plan semanal',
      icon: CalendarCheck,
      iconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
      badgeText: 'Semana 43',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      id: 'favorites',
      label: 'Platos Favoritos',
      value: favoritesCount,
      unit: 'guardados',
      icon: Heart,
      iconBg: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
      badgeText: 'Top Calificados',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      id: 'time',
      label: 'Tiempo Promedio',
      value: `${averageTime}`,
      unit: 'minutos',
      icon: Timer,
      iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
      badgeText: 'Cocina Ágil',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="bg-[#1e293b] border border-slate-700/60 hover:border-slate-600 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-lg shadow-black/20"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${item.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                {item.badgeText}
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold text-[#f8fafc] font-mono">
                  {item.value}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {item.unit}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium truncate">
                {item.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
