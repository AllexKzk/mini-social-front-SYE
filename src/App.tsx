import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import { Provider } from 'react-redux';
import { store } from './storage/Store';

function App() {
  return (
    <>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/user">
                        <Route path=":userId" element={<Profile/>}/>
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </>
  );
}

export default App;
