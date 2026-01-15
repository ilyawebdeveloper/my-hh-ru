import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Vacancy } from "../../components/vakansies/Vacancy";
import type { Area } from "../../types/area";

interface Data {
  alternate_url: string;
  arguments: string | null;
  clusters: null;
  fixes: null;
  found: number;
  items: Vacancy[];
  page: number;
  pages: number;
  per_page: number;
  suggests: null;
}

export interface CounterState {
  value: number;
  vacanciesList: Data;
  tags: string[];
  selectedCities: Area[] | null;
  searchText: string;
  status: "idle" | "pending" | "succeeded" | "failed" | "loading";
  error: unknown;
  cart: [];
  vigatablesListCount: { [index: string]: number };
}

export const fetchVacancies = createAsyncThunk(
  "json/products.json",
  async () => {
    try {
      const response = await fetch(
        `https://api.hh.ru/vacancies?text=Фронтенд&per_page=10&page=1&search_field=name&search_field=company_name&
        } `
      );
      return response.json();
    } catch (error) {
      // @ts-expect-error @ts-expect-error
      return error.response.data;
    }
  }
);

const tags = ["JavaScript", "React", "Redux", "ReduxToolkit", "Nextjs"];

const initialState: CounterState = {
  value: 0,
  vacanciesList: [],
  selectedCities: null,
  tags: tags,
  searchText: "Фронтенд",
  status: "idle",
  error: null,
  cart: [],
  vigatablesListCount: {},
};

export const vacansiesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    changeSelectedCities: (state, newCity) => {
      state.selectedCities = newCity.payload;
    },
    changeTags: (state, newTags) => {
      state.tags = newTags.payload;
    },
    changeSearchText: (state, searchText) => {
      state.searchText = searchText.payload;
    },
    changeVacancies: (state, newData) => {
      state.vacanciesList = newData.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vacanciesList = action.payload;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  changeVacancies,
  changeSearchText,
  changeTags,
  changeSelectedCities,
} = vacansiesSlice.actions;

export default vacansiesSlice.reducer;
