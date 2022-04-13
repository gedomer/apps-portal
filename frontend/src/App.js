import { Routes, Route } from "react-router-dom";
import PrivateComponent from "./components/PrivateComponent";
import { ConvertPage, HomePage, LoginPage, NotFound } from "./pages";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/convert" element={<PrivateComponent Component={<ConvertPage/>} />} />
        <Route path="/" element={<PrivateComponent Component={<HomePage/>} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
