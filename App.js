import { Provider } from "react-redux";
import { AuthProvider } from "./Context/AuthContext";
import AppNav from "./navigation/AppNav";
import { store } from "./store/store";
import {Navigation} from "./navigation/navigation";
import {AuthStack} from "./navigation/AuthStack";
import {View,Text} from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      {/*<AuthProvider>*/}
      {/*  <AppNav />*/}
      {/*</AuthProvider>*/}
      {/*  <AuthStack />*/}
        <Navigation />
    </Provider>
  );
}
