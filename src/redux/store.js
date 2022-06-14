import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
import categoryReducer from "./categoryRedux";
import produceReducer from "./produceRedux";
import progressReducer from "./progressRedux";
import collectionCenterReducer from "./collectionCenterRedux";
import collectionLocationReducer from "./collectionLocationRedux";
import countyReducer from "./countyRedux";
import countyPlaceReducer from "./countyPlaceRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  produce: produceReducer,
  progress: progressReducer,
  collectionCenter: collectionCenterReducer,
  collectionLocation: collectionLocationReducer,
  county: countyReducer,
  countyPlace: countyPlaceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
