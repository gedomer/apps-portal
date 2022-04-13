import { Routes, Route } from "react-router-dom";
import PrivateComponent from "./components/PrivateComponent";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { ConvertPage, HomePage, LoginPage, NotFound } from "./pages";
import store from "./store";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/convert" element={<PrivateComponent Component={<ConvertPage/>} />} />
          <Route exact path="/" element={<PrivateComponent Component={<HomePage/>} />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
