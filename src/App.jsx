import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import LetsPlay from "./pages/LetsPlay/LetsPlay";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />     
          <Route path="home" element={<Home />} />      
          <Route path="explore" element={<Explore />} />
          <Route path="lets-play" element={<LetsPlay />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
