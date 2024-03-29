import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeType } from '../../pages/Recipe/types/Recipe.types';

interface RecipeStateType {
  value: RecipeType[];
}

const initialState: RecipeStateType = {
  value: [],
};

const recipeSearchSlice = createSlice({
  name: 'recipeSearch',
  initialState,
  reducers: {
    setRecipe: (state, action: PayloadAction<RecipeType[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setRecipe } = recipeSearchSlice.actions;
export default recipeSearchSlice.reducer;
