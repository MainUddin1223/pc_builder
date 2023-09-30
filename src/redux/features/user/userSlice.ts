import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const rootUrl: string = 'http://localhost:8080/api/v1'

interface IUserInfo  {
    email: string;
    name: string;
    image: string;
}

interface IUserData {
        data: IUserInfo;
        token: string;
}

interface IUserState {
  userData: {
    data: IUserData |null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: IUserState = {
  userData: {
      data:null
    },
    isLoading: false,
    isError: false,
    error: null
};

export const getUserData = createAsyncThunk(
  "users/data",
  async (email: string) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const data = await fetch(`${rootUrl}/auth`, option);
    return data;
  }
);


const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      // .addCase(getUserData.fulfilled, (state, action) => {
      //   state.userData = action.payload;
      //   state.isLoading = false;
      // })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      });
  }
});

export const { setUserData, setLoading } = userSlice.actions;
export default userSlice.reducer;

