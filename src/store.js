//store.js:
import { configureStore, createSlice } from "@reduxjs/toolkit"; 
// import { set } from "core-js/core/dict";
import { persistStore,persistReducer } from "redux-persist"; 
import storage from "redux-persist/lib/storage"; 
// import { set } from "core-js/core/dict"; 
 
// Define the initial state 
const initialState = { 
  sidebarShow: true, 
  theme: "light", 
  userName: "User", 
  role: "", 
  accessToken: "",
}; 
 
// Create a slice (combines actions & reducer) 
const appSlice = createSlice({ 
  name: "app", 
  initialState, 
  reducers: { 
    setSidebarShow: (state, action) => { 
      state.sidebarShow = action.payload; 
    }, 
    setTheme: (state, action) => { 
      state.theme = action.payload; 
    }, 
    setUserName: (state, action) => { 
      state.userName = action.payload; 
    }, 
    setRole:(state, action) => { 
      state.role = action.payload; 
    }, 
    setAccessToken:(state, action) => { 
      state.accessToken = action.payload; 
    },
    logout:(state) => {  
      storage.removeItem('persist:root'); 
      return initialState; 
    } 
  }, 
}); 
 
// Export actions 
export const { setSidebarShow, setTheme, setUserName, setRole, logout, setAccessToken } = appSlice.actions; 
 
const persistConfig = { 
  key: "root", 
  storage, 
} 
 
const persistedReducer = persistReducer(persistConfig,appSlice.reducer); 
 
// Create store using Redux Toolkit 
const store = configureStore({ 
  reducer: { 
    app: persistedReducer, 
  }, 
}); 
 
export const persistor = persistStore(store); 
 
export default store;