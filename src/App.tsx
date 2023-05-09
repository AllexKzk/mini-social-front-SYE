import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import { Provider } from 'react-redux';
import { store } from './storage/Store';
import Navbar from "./Components/Sidebar/Sidebar";
import Sidebar from "./Components/Sidebar/Sidebar";
import PostsLine from "./Pages/PostsLine";
import Friends from "./Pages/Friends";

function App() {
  return (
    <>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path='/' element={<Sidebar/>}>
                        <Route path="user">
                            <Route path=":userId" element={<Profile/>}/>
                        </Route>
                        <Route path="friends" element={<Friends/>}/>
                        <Route path="postsline" element={<PostsLine/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
        </Provider>
    </>
  );
}

export default App;
