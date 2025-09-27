
export interface FoodItem {
  name: string;
  weight: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface AnalysisResult {
  totalCalories: number;
  items: FoodItem[];
}
