import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  // Auth State
  isAuthenticated: false,
  userName: "User",
  role: "",
  accessToken: "",
  
  // UI State
  sidebarShow: true,
  theme: "light",
  notificationCount: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Auth Actions
    setCredentials: (state, action) => {
      const { userName, role, token } = action.payload;
      state.userName = userName;
      state.role = role;
      state.accessToken = token;
      state.isAuthenticated = true;
    },
    
    // Individual setters (if needed)
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    
    // UI Actions
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    
    // Logout Action
    logout: (state) => {
      storage.removeItem('persist:root');
      localStorage.removeItem('access-token'); // Clean up any auth tokens
      return initialState;
    }
  },
});

// Export actions
export const {
  setCredentials,
  setUserName,
  setRole,
  setAccessToken,
  setSidebarShow,
  setTheme,
  setNotificationCount,
  logout,
} = appSlice.actions;

// Selectors for easy state access
export const selectAuth = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
  role: state.app.role,
  userName: state.app.userName,
  accessToken: state.app.accessToken,
});

export const selectIsAdmin = (state) => state.app.role === 'admin';
export const selectIsEmployee = (state) => state.app.role === 'employee';
export const selectNotificationCount = (state) => state.app.notificationCount;

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['isAuthenticated', 'userName', 'role', 'accessToken', 'theme'], // only persist necessary items
};

const persistedReducer = persistReducer(persistConfig, appSlice.reducer);

// Create store with middleware configuration
const store = configureStore({
  reducer: {
    app: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;