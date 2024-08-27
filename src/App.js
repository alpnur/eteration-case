import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./pages/List";
import Detail from "./pages/Detail";
import Navbar from "./layout/Navbar";
import Cart from "./layout/Cart";

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto">
        <div className="w-full lg:w-3/4 p-4">
          <Router>
            <Routes>
              <Route path="/" element={<List />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Routes>
          </Router>
        </div>
        <div className="w-full lg:w-1/4 p-4">
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default App;
