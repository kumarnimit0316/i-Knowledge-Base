import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import ArticleState from './conetxt/articles/articleState';
import AuthState from './conetxt/auths/authState';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import AlertState from './conetxt/alert/alertState';
import Alert from './components/Alert';
import OwnArticle from './components/OwnArticle';
import AddArticle from './components/AddArticle';
import FullArticle from './components/FullArticle';

function App() {
  return (
    <>
      <AuthState>
        <ArticleState>
          <Router>
            <AlertState>
              <Navbar />
              <Alert />
              <div className="container">
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <Home />
                    }
                  />
                  <Route
                    exact
                    path="/about"
                    element={
                      <About />
                    }
                  />
                  <Route
                    exact
                    path="/ownArticle"
                    element={
                      <OwnArticle />
                    }
                  />
                  <Route
                    exact
                    path="/addArticle"
                    element={
                      <AddArticle />
                    }
                  />
                  <Route
                    exact
                    path="/signup"
                    element={
                      <SignUp />
                    }
                  />
                  <Route
                    exact
                    path="/login"
                    element={
                      <LogIn />
                    }
                  />
                  <Route
                    exact
                    path="/readMore"
                    element={
                      <FullArticle />
                    }
                  />
                </Routes>
              </div>
            </AlertState>
          </Router>
        </ArticleState>
      </AuthState>
    </>
  );
}

export default App;
