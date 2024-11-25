import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./components/redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  {/* PersistGate delays rendering until rehydration is complete */}
  <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>,
document.getElementById("root")
);
