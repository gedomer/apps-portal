import { Routes, Route } from "react-router-dom";

import './App.css';

function Home() {
  return (
    <>
      <main>
        test
      </main>
      <nav>
      </nav>
    </>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/about" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
