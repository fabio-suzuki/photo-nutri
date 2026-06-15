"use client";

import { Coffee, UtensilsCrossed, Moon, Cookie } from "lucide-react";

type MealType = "breakfast" | "lunch" | "dinner" | "snack";

interface MealTypeSelectorProps {
  selected: MealType;
  onChange: (type: MealType) => void;
}

const mealTypes: { type: MealType; label: string; icon: typeof Coffee }[] = [
  { type: "breakfast", label: "Café", icon: Coffee },
  { type: "lunch", label: "Almoço", icon: UtensilsCrossed },
  { type: "dinner", label: "Jantar", icon: Moon },
  { type: "snack", label: "Lanche", icon: Cookie },
];

export function MealTypeSelector({ selected, onChange }: MealTypeSelectorProps) {
  return (
    <div className="flex gap-2">
      {mealTypes.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-medium transition-all ${
            selected === type
              ? "bg-green-100 text-green-700 border-2 border-green-300"
              : "bg-gray-50 text-gray-500 border-2 border-transparent hover:bg-gray-100"
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
