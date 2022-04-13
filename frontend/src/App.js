import { Routes, Route } from "react-router-dom";
import PrivateComponent from "./components/PrivateComponent";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { ConvertPage, HomePage, LoginPage, NotFound } from "./pages";
import store from "./store";
import { fetchToken } from "./actions";


function App() {
  store.dispatch(fetchToken())

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateComponent Component={<HomePage/>} />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/convert" element={<PrivateComponent Component={<ConvertPage/>} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
