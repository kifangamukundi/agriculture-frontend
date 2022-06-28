import { createRoot } from 'react-dom/client';
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { fetchPosts } from './redux/postsSlice';

store.dispatch(fetchPosts());

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
