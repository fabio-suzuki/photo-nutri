"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { UserGoals } from "@/types/nutrition";

interface GoalsModalProps {
  goals: UserGoals;
  onSave: (goals: UserGoals) => void;
  onClose: () => void;
}

export function GoalsModal({ goals, onSave, onClose }: GoalsModalProps) {
  const [form, setForm] = useState<UserGoals>(goals);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Metas Diárias
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calorias (kcal)
            </label>
            <input
              type="number"
              value={form.dailyCalories}
              onChange={(e) =>
                setForm({ ...form, dailyCalories: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proteína (g)
            </label>
            <input
              type="number"
              value={form.protein}
              onChange={(e) =>
                setForm({ ...form, protein: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carboidratos (g)
            </label>
            <input
              type="number"
              value={form.carbs}
              onChange={(e) =>
                setForm({ ...form, carbs: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gordura (g)
            </label>
            <input
              type="number"
              value={form.fat}
              onChange={(e) =>
                setForm({ ...form, fat: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fibra (g)
            </label>
            <input
              type="number"
              value={form.fiber}
              onChange={(e) =>
                setForm({ ...form, fiber: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Salvar Metas
          </button>
        </form>
      </div>
    </div>
  );
}
