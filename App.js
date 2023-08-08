import { Provider } from "react-redux";
import { AuthProvider } from "./Context/AuthContext";
import AppNav from "./navigation/AppNav";
import { store } from "./store/store";
import {Navigation} from "./navigation/navigation";
export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </Provider>
  );
}