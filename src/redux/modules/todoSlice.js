import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
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
    try {
      await api.post("/todos", payload);
      return thunkAPI.fulfillWithValue(payload);
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
      await api.patch(`/todos/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __updateTodos = createAsyncThunk(
  "updateTodos",
  async (payload, thunkAPI) => {
    try {
      const value = { ...payload.data };
      await api.patch(`/todos/${payload.id}`, payload.data);
      return thunkAPI.fulfillWithValue(value);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(__getTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });
    builder.addCase(__getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(__deleteTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__deleteTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(__deleteTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(__addTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__addTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = [...state.todos, action.payload];
    });
    builder.addCase(__addTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(__switchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__switchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((todo) => ({
        ...todo,
        isDone: todo.id === action.payload.id ? !todo.isDone : todo.isDone,
      }));
    });
    builder.addCase(__switchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(__updateTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(__updateTodos.fulfilled, (state, action) => {
      state.todos.forEach((todo, index) => {
        if (todo.id === action.payload.id) {
          state.todos.splice(index, 1, action.payload);
        }
      });
    });
    builder.addCase(__updateTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default todoSlice.reducer;
