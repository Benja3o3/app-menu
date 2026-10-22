import React, { useState } from 'react';
import { ChefHat, Search, Plus, CalendarDays, Bookmark, Menu, X, Bell } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenCreateModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCreateModal,
  searchQuery,
  onSearchChange,
  activeTab,
  onSelectTab,
  favoritesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'recipes', label: 'Explorar Recetas', icon: ChefHat },
    { id: 'weekly', label: 'Plan Semanal', icon: CalendarDays },
    { id: 'favorites', label: 'Favoritas', icon: Bookmark, badge: favoritesCount > 0 ? favoritesCount : null },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onSelectTab('recipes')}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6366f1] via-indigo-500 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-[#f8fafc] font-sans">
                    Menu<span className="text-[#6366f1]">Craft</span>
                  </span>
                  <span className="font-pixel text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    RETRO v1.0
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Cocina inteligente & menús
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#1e293b]/70 p-1.5 rounded-2xl border border-slate-700/50">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#6366f1] text-white shadow-md shadow-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white text-indigo-700' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search bar & Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Input on Desktop */}
            <div className="relative hidden lg:block w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar receta o plato..."
                className="w-full pl-9 pr-12 py-2 bg-[#1e293b] border border-slate-700/70 rounded-xl text-sm text-[#f8fafc] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Quick Create Recipe Button */}
            <Button
              onClick={onOpenCreateModal}
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              className="hidden sm:inline-flex"
            >
              Nueva Receta
            </Button>

            {/* Notifications Icon */}
            <button 
              className="p-2.5 text-slate-400 hover:text-[#f8fafc] bg-[#1e293b]/70 hover:bg-[#1e293b] border border-slate-700/60 rounded-xl transition-all relative"
              title="Notificaciones"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
            </button>

            {/* User Profile Avatar with Pixel Tag */}
            <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Avatar"
                  className="w-10 h-10 rounded-xl object-cover border-2 border-indigo-500/40 p-[1px]"
                />
                <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white font-pixel text-[8px] px-1 py-0.2 rounded-sm border border-slate-900 shadow">
                  ★5
                </span>
              </div>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 md:hidden border border-slate-700/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/80 space-y-3 animate-fadeIn">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar receta..."
                className="w-full pl-9 pr-3 py-2 bg-[#1e293b] border border-slate-700 rounded-xl text-sm text-[#f8fafc] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#6366f1] text-white shadow-md'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== null && item.badge !== undefined && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/60 text-white font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <Button
              onClick={() => {
                onOpenCreateModal();
                setMobileMenuOpen(false);
              }}
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              className="w-full mt-2"
            >
              Nueva Receta
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
