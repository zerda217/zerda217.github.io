import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      window.Kakao.Auth.setAccessToken(code);
      navigate('/main');
    }
  }, [navigate]);

  return <div> Loding... </div>;
};

export default OAuthRedirect;
