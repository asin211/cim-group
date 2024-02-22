import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";

import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext, useLayoutEffect } from "react";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import VideoList from "./pages/videoList/VideoList";
import NewVideo from "./pages/newVideo/NewVideo";
import Video from './pages/video/Video';
import BookingList from './pages/bookingList/BookingList';
import Register from './pages/register/Register';

import Staff_UI_Home from "./staff_ui_src/pages/home/Home";
import Staff_UI_Projects from './staff_ui_src/pages/projects/Projects';
import Staff_UI_Video from './staff_ui_src/pages/videos/Videos';
import Staff_UI_VideoList from './staff_ui_src/pages/videoList/VideoList';
import Staff_UI_Watch from "./staff_ui_src/pages/watch/Watch";
import Staff_UI_Book from './staff_ui_src/pages/book/Book';


function App() {
  const { user } = useContext(AuthContext);
  // const user = false
  console.log('user: ', user)

  const ScrollToTop = () => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useLayoutEffect(() => {
      window.scrollTo(0, 0);
      // window.scrollTo({top: 0, behavior: "smooth"})
    }, [pathname]);
  }
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Register Route */}
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

          {/* Staff UI Routes */}
          <Route exact path="/" element={user ? <Staff_UI_Home /> : <Login />} />
          <Route path="/projects" element={user ? <Staff_UI_Projects /> : <Navigate to="/" />} />
          <Route path="/videos" element={user ? <Staff_UI_Video /> : <Navigate to="/" />} />
          <Route path="/list" element={user ? <Staff_UI_VideoList /> : <Navigate to="/" />} />
          <Route path="/watch" element={user ? <Staff_UI_Watch /> : <Navigate to="/" />} />
          <Route path="/book" element={user ? <Staff_UI_Book /> : <Navigate to="/" />} />

          {/* Admin Routes */}
          <Route path="/admin" element={user?.is_admin ? <Home /> : <Navigate to="/" />} />

          <Route path="/admin/users" element={user?.is_admin ? <UserList /> : <Navigate to="/" />} />
          <Route path="/admin/user/:userId" element={user?.is_admin ? <User /> : <Navigate to="/" />} />
          <Route path="/admin/newUser" element={user?.is_admin ? <NewUser /> : <Navigate to="/" />} />

          <Route path="/admin/videos" element={user?.is_admin ? <VideoList /> : <Navigate to="/" />} />
          <Route path="/admin/video/:videoId" element={user?.is_admin ? <Video /> : <Navigate to="/" />} />
          <Route path="/admin/newVideo" element={user?.is_admin ? <NewVideo /> : <Navigate to="/" />} />

          <Route path="/admin/lists" element={user?.is_admin ? <ListList /> : <Navigate to="/" />} />
          <Route path="/admin/list/:listId" element={user?.is_admin ? <List /> : <Navigate to="/" />} />
          <Route path="/admin/newList" element={user?.is_admin ? <NewList /> : <Navigate to="/" />} />

          <Route path="/admin/bookings" element={user?.is_admin ? <BookingList /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;