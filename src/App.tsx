import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import { Provider } from 'react-redux';
import { store } from './storage/Store';
import Layout from './Components/Layout/Layout';

function App() {
  const [messageFromServer, setMessage] = useState<String>('');

  useEffect(() => {
    fetch("https://rich-teal-leopard-gown.cyclic.app/api/")
      .then(data => data.json())
      .then(json => {
        setMessage(json.message.message)
      })
  }, []);

  return (
    <>
        <Provider store={store}>
            <Layout/>
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
