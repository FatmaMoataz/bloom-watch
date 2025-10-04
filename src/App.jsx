import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import React, { Suspense } from "react";
import Loader from "./components/Loader/Loader";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Explore = React.lazy(() => import("./pages/Explore/Explore"));
const LetsPlay = React.lazy(() => import("./pages/LetsPlay/LetsPlay"));
const PlantChatbot = React.lazy(() => import("./pages/PlantChatbot/PlantChatbot"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div><Loader/></div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />     
            <Route path="home" element={<Home />} />      
            <Route path="explore" element={<Explore />} />
            <Route path="lets-play" element={<LetsPlay />} />
            <Route path="plantchatbot" element={<PlantChatbot />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
