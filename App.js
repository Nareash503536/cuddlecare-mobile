import { Provider } from "react-redux";
import { AuthProvider } from "./Context/AuthContext";
import AppNav from "./navigation/AppNav";
import React from "react";
import { store } from "./store/store";
export default function App() {
  return (
    // <Provider store={store}>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    // </Provider>
  );
}
