import { NativeBaseProvider } from "native-base";
import { AuthProvider } from "./Context/AuthContext";
import AppNav from "./navigation/AppNav";
import React from "react";
 
export default function App() {
  return (
    <AuthProvider>
        <AppNav/>
    </AuthProvider>
  );
}