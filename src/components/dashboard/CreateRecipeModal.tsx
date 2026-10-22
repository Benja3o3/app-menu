import React, { useState } from 'react';
import { Recipe, MealCategory, DifficultyLevel } from '../../types';
import { X, Plus, Trash2, Sparkles, ChefHat, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface CreateRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'isFavorite' | 'rating'>) => void;
}

export const CreateRecipeModal: React.FC<CreateRecipeModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MealCategory>('almuerzo');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(20);
  const [servings, setServings] = useState(2);
  const [calories, setCalories] = useState(450);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Fácil');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80');
  const [tagsInput, setTagsInput] = useState('Rápido, Saludable');
  
  const [ingredients, setIngredients] = useState<{ name: string; amount: string; unit: string }[]>([
    { name: '', amount: '', unit: '' }
  ]);
  const [instructions, setInstructions] = useState<string[]>(['']);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, idx) => idx !== index));
  };

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, idx) => idx !== index));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const validIngredients = ingredients
      .filter(i => i.name.trim())
      .map((i, idx) => ({
        id: `ing-${Date.now()}-${idx}`,
        name: i.name.trim(),
        amount: i.amount.trim(),
        unit: i.unit.trim(),
      }));
    const validInstructions = instructions.filter(i => i.trim());

    onCreate({
      title: title.trim(),
      description: description.trim() || 'Receta artesanal casera.',
      category,
      prepTimeMinutes: Number(prepTime),
      cookTimeMinutes: Number(cookTime),
      servings: Number(servings),
      calories: Number(calories),
      difficulty,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
      tags: parsedTags.length > 0 ? parsedTags : ['Casero'],
      ingredients: validIngredients.length > 0 ? validIngredients : [{ id: 'ing-1', name: 'Ingrediente base', amount: '1', unit: 'porción' }],
      instructions: validInstructions.length > 0 ? validInstructions : ['Preparar con amor y servir.'],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#1e293b] border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#f8fafc]">Registrar Nueva Receta</h3>
              <p className="text-xs text-slate-400">Agrega un nuevo plato a tu biblioteca culinaria</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Título de la Receta *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Tazón de Pollo Glaseado con Quinoa"
              className="w-full px-4 py-2.5 bg-[#090d16] border border-slate-700/80 rounded-xl text-sm text-[#f8fafc] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Breve Descripción
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe los sabores, textura y por qué te encanta este plato..."
              className="w-full px-4 py-2.5 bg-[#090d16] border border-slate-700/80 rounded-xl text-sm text-[#f8fafc] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MealCategory)}
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="desayuno">🥞 Desayuno</option>
                <option value="almuerzo">🥗 Almuerzo</option>
                <option value="cena">🍲 Cena</option>
                <option value="snack">🥑 Snack</option>
                <option value="postre">🍰 Postre</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Dificultad</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Fácil">Fácil</option>
                <option value="Medio">Medio</option>
                <option value="Difícil">Difícil</option>
                <option value="Chef Pro">Chef Pro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Prep (min)</label>
              <input
                type="number"
                min="0"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cocción (min)</label>
              <input
                type="number"
                min="0"
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Porciones</label>
              <input
                type="number"
                min="1"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Calorías (kcal)</label>
              <input
                type="number"
                min="0"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              URL de Imagen (Unsplash u otro)
            </label>
            <div className="relative">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-9 pr-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white"
              />
              <ImageIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Etiquetas (separadas por coma)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Rápido, Alto en Proteína, Sin Gluten..."
              className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white"
            />
          </div>

          {/* Dynamic Ingredients */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Ingredientes Principales
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Añadir ingrediente
              </button>
            </div>
            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ingrediente (ej. Salmón fresco)"
                    value={ing.name}
                    onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-lg text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Cant. (ej. 200)"
                    value={ing.amount}
                    onChange={(e) => handleIngredientChange(idx, 'amount', e.target.value)}
                    className="w-24 px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-lg text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Unidad (ej. g)"
                    value={ing.unit}
                    onChange={(e) => handleIngredientChange(idx, 'unit', e.target.value)}
                    className="w-20 px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-lg text-xs text-white"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Instructions */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Pasos de Preparación
              </label>
              <button
                type="button"
                onClick={handleAddInstruction}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Añadir paso
              </button>
            </div>
            <div className="space-y-2">
              {instructions.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 w-5">{idx + 1}.</span>
                  <input
                    type="text"
                    placeholder={`Paso ${idx + 1} de la receta...`}
                    value={step}
                    onChange={(e) => handleInstructionChange(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#090d16] border border-slate-700 rounded-lg text-xs text-white"
                  />
                  {instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-700/60">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              size="md"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Guardar Receta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
