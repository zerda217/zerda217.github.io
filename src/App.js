import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

import Headline from './block/Headline';
import OAuthRedirect from './block/OAuthRedirect';
import Main from './page/Main';
import WordMatch from './page/WordMatch';
import WordMatchGame from './page/WordMatchGame';
import WordMatchClear from './page/WordMatchClear';
import NotFoundPage from './page/404';

const App = () => {
  const [level, setLevel] = useState(1);
  const [language, setLanguage] = useState('korean');
  const [difficulty, setDifficulty] = useState('medium');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [userName, setUserName] = useState('');
  
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
    <div>
      <header>
        <Headline />
      </header>
      <body>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/oauth" element={<OAuthRedirect />} />
            <Route path="/word" element={<WordMatch level={level} setLevel={setLevel} language={language} setLanguage={setLanguage} difficulty={difficulty} setDifficulty={setDifficulty} setTimeElapsed={setTimeElapsed} />} />
            <Route path="/word_game" element={<WordMatchGame level={level} language={language} difficulty={difficulty} timeElapsed={timeElapsed} setTimeElapsed={setTimeElapsed} />} />
            <Route path="/word_clear" element={<WordMatchClear level={level} language={language} difficulty={difficulty} timeElapsed={timeElapsed} userName={userName} setUserName={setUserName} />} />
            <Route path="/*" element={<Main />} />
          </Routes>
      </body>
    </div>
  );
};

// const Home = () => {
//   const navigate = useNavigate();

//   const handleKakaoLogin = () => {
//     window.Kakao.Auth.authorize({
//       redirectUri: 'https://zerda217.github.io/oauth',
//     });
//   };

//   const kakaoOnSuccess = async (data)=>{
//     navigate('/')
//     console.log(data)
//   }
//   const kakaoOnFailure = (error) => {
//       console.log(error);
//   };

//     return (
//       <div>
//         1
//       </div>
//     );
//   };
  
  
export default App;