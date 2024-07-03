import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import styled from 'styled-components';

const Headline = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const MenuClick = (page) => {
    mixpanel.track('Menu Select', {
      'Menu Type': page
    });
    navigate(page);
  };

  return (
    <Wrap>
      <p>현재 시간: {formatTime(currentTime)}</p>
      <Button onClick={() => MenuClick('/main')}> 처음 </Button>
      <Button onClick={() => MenuClick('/word')}> 단어 </Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 9vh;
  background: #1d6f42;
  border: none;
  color: white;
  padding: 0.5em 1em;
  font-size: 1em;
`;

const Button = styled.button`
  border: 1px solid white;
  margin: 1vh;
`;

export default Headline;
