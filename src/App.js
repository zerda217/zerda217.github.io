import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

import Headline from './block/Headline';
import OAuthRedirect from './block/OAuthRedirect';
import Main from './page/Main';
import WordMatch from './page/WordMatch';
import WordMatchGame from './page/WordMatchGame';
import NotFoundPage from './page/404';

const App = () => {
  useEffect(() => {
    mixpanel.init(process.env.REACT_APP_MIXPANNEL_TOKEN, {debug: true, track_pageview: true, persistence: 'localStorage'});
  }, []);

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
        <Route path="/word" element={<WordMatch />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  const [menu, setMenu] = useState('main');
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
          <Headline setMenu={setMenu} />
        </header>
        <body>
          { menu == 'main' ? <Main /> : 
            menu == 'word' ? <WordMatch setMenu={setMenu} /> :
            menu == 'word_game' ? <WordMatchGame /> : <NotFoundPage /> }
        </body>
      </div>
    );
  };
  
  
export default App;