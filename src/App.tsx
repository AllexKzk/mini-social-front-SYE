import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import { Provider } from 'react-redux';
import { store } from './storage/Store';
import Navbar from "./Components/Sidebar/Sidebar";
import Sidebar from "./Components/Sidebar/Sidebar";
import PostsLine from "./Pages/PostsLine";
import Friends from "./Pages/Friends";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theming/theming";

function App() {
  return (
    <>
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Router>
                <Routes>
                    <Route path='/' element={<Sidebar/>}>
                        <Route path="user/:userId" element={<Profile/>}/>
                        <Route path="friends" element={<Friends/>}/>
                        <Route path="postsline" element={<PostsLine/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
            </ThemeProvider>
        </Provider>
    </>
  );
}

export default App;
