import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import connectionReducer from "./connectionSlice";
// Yeh persist config bana rahe hain
const persistConfig = {
  key: "root", // storage key
  storage,
};

// User reducer ko persist kar rahe hain
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const appStore = configureStore({
  reducer: {
    user: persistedUserReducer, // Persisted
    feed: feedReducer,
    connections: connectionReducer,
  },
});

// Yeh persistStore banata hai
export const persistor = persistStore(appStore);

export default appStore;
