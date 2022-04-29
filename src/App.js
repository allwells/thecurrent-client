import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./components/AboutUs/About";
import AffiXx from "./components/Affix/AffiXx";
import Blog from "./components/Blog/Blog";
import Category from "./components/Category/Category";
import CreatePost from "./components/CreatePost/CreatePost";
import Dashboard from "./components/Dashboard/Dashboard";
import EditPost from "./components/EditPost/EditPost";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/404NotFound/NotFound";
import React from "react";
import Search from "./components/Search/Search";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create" element={<CreatePost />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
          <Route exact path="/news/:id" element={<Blog />} />
          <Route exact path="/search/:query" element={<Search />} />
          <Route exact path="/category/:query" element={<Category />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <AffiXx />
    </div>
  );
}

export default App;
