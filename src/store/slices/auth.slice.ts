import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

interface IErrors {
  error: string;
  title: string;
}

export interface IUserData {
  email: string;
  password: string;
}

interface IUser {
  userName: string;
  uid: string;
}

interface IStateInitial {
  isAuth: boolean;
  user: IUser;
  isLoad: boolean;
  error: string;
}

const errCode: IErrors[] = [
  {
    error: "auth/email-already-in-use",
    title: "пользователь с таким email уже имется",
  },
  {
    error: "auth/user-not-found",
    title: "нет такого пользователя",
  },
  {
    error: "auth/wrong-password",
    title: "неправильный email или пароль",
  },
  {
    error: "auth/too-many-requests",
    title: "слишком много попыток, повторите позже",
  },
  {
    error: "auth/configuration-not-found",
    title: "ошибка конфигурации",
  },
];

const searchError = (err: string): string | undefined => {
  const findErr = errCode.find((v) => v.error.toLowerCase().trim() === err.toLowerCase().trim());

  if (!!findErr) {
    return findErr.title;
  }

  return undefined;
};

const getUserName = (email: string | null): string => (!!email ? email.split("@")[0] : "");

export const userSignIn = createAsyncThunk<
  IUser,
  IUserData,
  { dispatch: Dispatch; rejectValue: string; fullFilled: IUser }
>("auth/userSignIn", async function (user, { rejectWithValue, fulfillWithValue }) {
  if (!user.email || !user.password) {
    return rejectWithValue("ошибка: пустые поля");
  }

  const response = await setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, user.email, user.password);
    })
    .then((crendital) => {
      const userData: IUser = {
        userName: getUserName(crendital.user.email),
        uid: crendital.user.uid,
      };
      return fulfillWithValue(userData);
    })
    .catch((error) => {
      const parseError = searchError(error.code);

      if (!!parseError) {
        return rejectWithValue(parseError);
      }
      return rejectWithValue(error.code);
    });

  return response;
});

export const userSignUp = createAsyncThunk<
  IUser,
  IUserData,
  { dispatch: Dispatch; rejectValue: string; fullFilled: IUser }
>("auth/userSignUp", async function (user, { rejectWithValue, fulfillWithValue }) {
  if (!user.email || !user.password) {
    return rejectWithValue("ошибка: пустые поля");
  }

  const response = await setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return createUserWithEmailAndPassword(auth, user.email, user.password);
    })
    .then((crendital) => {
      const userData: IUser = {
        userName: getUserName(crendital.user.email),
        uid: crendital.user.uid,
      };
      return fulfillWithValue(userData);
    })
    .catch((error) => {
      const parseError = searchError(error.code);

      if (!!parseError) {
        return rejectWithValue(parseError);
      }
      return rejectWithValue(error.code);
    });

  return response;
});

export const userSignOut = createAsyncThunk<
  boolean,
  undefined,
  { dispatch: Dispatch; rejectValue: boolean; fullFilled: boolean }
>("auth/userSignOut", async function (user, { rejectWithValue, fulfillWithValue }) {
  const response = await signOut(auth)
    .then(() => {
      return fulfillWithValue(true);
    })
    .catch(() => {
      return rejectWithValue(false);
    });

  return response;
});

export const tryUser = createAsyncThunk<IUser, undefined, { dispatch: Dispatch; rejectValue: null; fullFilled: IUser }>(
  "auth/tryUser",
  async function (user, { rejectWithValue, fulfillWithValue }) {
    const searchUser = (): Promise<IUser> => {
      return new Promise((resolve, reject) => {
        const unsub = onAuthStateChanged(auth, (user) => {
          if (user) {
            unsub();
            const userData: IUser = {
              userName: getUserName(user.email),
              uid: user.uid,
            };
            resolve(fulfillWithValue(userData));
          } else {
            unsub();
            reject(rejectWithValue(null));
          }
        });
      });
    };

    const response = await searchUser();
    return response;
  }
);

const initialStateValue: IStateInitial = {
  isAuth: false,
  isLoad: false,
  error: "",
  user: {
    uid: "",
    userName: "",
  },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialStateValue,
  reducers: {
    resetResponseErr(state) {
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userSignIn.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isLoad = false;
        state.isAuth = true;
        state.user.uid = action.payload.uid;
        state.user.userName = action.payload.userName;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.user.uid = "";
        state.user.userName = "";
        state.isAuth = false;
        state.isLoad = false;
        state.error = action.payload as string;
      })
      .addCase(userSignUp.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.isLoad = false;
        state.isAuth = true;
        state.user.uid = action.payload.uid;
        state.user.userName = action.payload.userName;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.user.uid = "";
        state.user.userName = "";
        state.isAuth = false;
        state.isLoad = false;
        state.error = action.payload as string;
      })
      .addCase(userSignOut.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(userSignOut.fulfilled, (state) => {
        state.isAuth = false;
        state.isLoad = false;
        state.user.uid = "";
        state.user.userName = "";
      })
      .addCase(userSignOut.rejected, (state) => {
        state.isAuth = false;
        state.isLoad = false;
        state.user.uid = "";
        state.user.userName = "";
      })
      .addCase(tryUser.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(tryUser.fulfilled, (state, action) => {
        state.isLoad = false;
        state.isAuth = true;
        state.user.uid = action.payload.uid;
        state.user.userName = action.payload.userName;
      })
      .addCase(tryUser.rejected, (state) => {
        state.isAuth = false;
        state.isLoad = false;
        state.user.uid = "";
        state.user.userName = "";
      });
  },
});

export const { resetResponseErr } = AuthSlice.actions;
export default AuthSlice.reducer;
