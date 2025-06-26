import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import mixpanel from 'mixpanel-browser';
import styled from 'styled-components';

const Headline = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // Google Login - JWT 토큰을 디코딩하거나 사용자 정보를 처리
  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    setIsLogin(true); // 로그인 상태로 변경
  };

  const handleLoginFailure = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    googleLogout(); // Google 로그아웃 처리
    setIsLogin(false); // 로그인 상태 해제
    console.log("Logged out");
  };

  const MenuClick = (page) => {
    mixpanel.track('Menu Select', {
      'Menu Type': page
    });
    navigate(page);
  };

  return (
    <Wrap>
      <div></div>
      <div>
        <Button onClick={() => MenuClick('/main')}> 처음 </Button>
        <Button onClick={() => MenuClick('/word')}> 단어 </Button>
        <Button onClick={() => MenuClick('/ddibu')}> 교환 </Button>
      </div>
      
      <div>
        {isLogin ? (
          <>
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                size="small"
              />
            </div>
          </GoogleOAuthProvider>
        )}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 7vh;
  background: #1d6f42;
  border: none;
  color: white;
  padding: 0.5em 1em;
  font-size: 1em;
`;

const Button = styled.button`
  background-color: transparent;  
  border: 1px solid white;
  margin: 1vh;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* 필요에 따라 hover 효과 설정 */
  }
`;

export default Headline;
