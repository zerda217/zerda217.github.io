import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    // 카카오 SDK 초기화
    window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
    console.log(window.Kakao.isInitialized()); // true
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth" element={<OAuthRedirect />} />
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

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleKakaoLogin}>Login with Kakao</button>
    </div>
  );
};

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // 카카오 API를 호출하여 토큰을 받아옵니다.
      window.Kakao.Auth.setAccessToken(code);
      navigate('/');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default App;
