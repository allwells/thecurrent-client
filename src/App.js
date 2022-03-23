import { BrowserRouter, Route, Routes } from "react-router-dom";

import AffiXx from "./components/Affix/AffiXx";
import Blog from "./components/Blog/Blog";
import CreatePost from "./components/CreatePost/CreatePost";
import EditPost from "./components/EditPost/EditPost";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/404NotFound/NotFound";
import Profile from "./components/Profile/Profile";
import React from "react";
import Search from "./components/Search/Search";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/new" element={<CreatePost />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
          <Route exact path="/blog/:id" element={<Blog />} />
          <Route exact path="/search/:query" element={<Search />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <AffiXx />
    </div>
  );
}

export default App;
