import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Headline from './block/Headline';
import OAuthRedirect from './block/OAuthRedirect';
import Main from './page/Main';
import NotFoundPage from './page/404';

const App = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_REST_KEY);
      console.log(window.Kakao.isInitialized()); // true
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth" element={<OAuthRedirect />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'https://zerda217.github.io/oauth',
    });
  };

  const kakaoOnSuccess = async (data)=>{
    navigate('/')
    console.log(data)
  }
  const kakaoOnFailure = (error) => {
      console.log(error);
  };

    return (
      <div>
        <header>
          <Headline />
        </header>
        <body>
          <Main />
        </body>
      </div>
    );
  };
  
  
export default App;