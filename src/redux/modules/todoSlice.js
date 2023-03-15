import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/todos";

const initialState = {
  todos: [],
  error: null,
  isLoading: false,
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.get("/todos");
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const __addTodos = createAsyncThunk(
  "addTodos",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await api.post("/todos", payload);
      return thunkAPI.fulfillWithValue(payload.todo);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteTodos = createAsyncThunk(
  "deleteTodos",
  async (payload, thunkAPI) => {
    try {
      await api.delete(`/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const __switchTodos = createAsyncThunk(
  "switchTodos",
  async (payload, thunkAPI) => {
    try {
      const switchTodos = { ...payload, isDone: !payload.isDone };
      await api.patch(`/todos/${payload.id}`, switchTodos);
      return thunkAPI.fulfillWithValue(switchTodos);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const __updateTodos = createAsyncThunk(
  "updateTodos",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      await api.patch(`/todos/${payload.id}`, payload.data);
      return thunkAPI.fulfillWithValue(updateTodos);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: {
    [__getTodos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__switchTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updateTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addTodos, deleteTodos, switchTodos, updateTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
