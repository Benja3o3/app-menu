import React from 'react';
import { ChefHat, Palette } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#090d16]/90 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <ChefHat className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Menu<span className="text-[#6366f1]">Craft</span>
              </p>
              <p className="text-xs text-slate-400">
                Sistema de Gestión Culinaria & Planificación Semanal
              </p>
            </div>
          </div>

          {/* Design System Palette Strip */}
          <div className="flex items-center gap-2 bg-[#1e293b]/60 px-4 py-2 rounded-2xl border border-slate-800">
            <Palette className="w-3.5 h-3.5 text-indigo-400 mr-1" />
            <span className="text-xs text-slate-400 mr-2">Tokens:</span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#6366f1] ring-1 ring-white/20" title="Primario #6366f1" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#090d16] ring-1 ring-white/20" title="Fondo Oscuro #090d16" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#1e293b] ring-1 ring-white/20" title="Superficie #1e293b" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#f8fafc] ring-1 ring-white/20" title="Texto Principal #f8fafc" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] ring-1 ring-white/20" title="Acento #10b981" />
          </div>

          {/* Signature */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Diseñado con pasión por</span>
            <span className="font-semibold text-indigo-400">Sofía Chen</span>
            <span className="font-pixel text-[8px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20">
              UI/UX
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
          <p>© 2026 MenuCraft. Construido con React, TypeScript y Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};
