import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mixpanel from 'mixpanel-browser';

import { languages, difficulties } from '../asset/data';

const WordMatchClear = ({ level, language, difficulty, timeElapsed, userName, setUserName }) => {
    const navigate = useNavigate();

    const languageDisplay = languages.find(lang => lang.value === language)?.display || language;
    const difficultyDisplay = difficulties.find(diff => diff.value === difficulty)?.display || difficulty;

    const handleMixpanelSubmit = () => {
        mixpanel.track('WordGameLanking', {
            'Level': level,
            'Language': language,
            'Difficulty': difficulty,
            'User Name': userName,
            'Time Elapsed': timeElapsed
        });
        alert("랭킹은 매주 월요일에 갱신됩니다!");
    };

    const handleTwitterShare = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            ` ${level}단계  ${languageDisplay}를 난이도 ${difficultyDisplay} 로 ${timeElapsed} 초만에 맞췄습니다! https://zerda217.github.io 깃헙으로 홈페이지 만들기 참 어렵습니다. 새로고침이 안 됩니다. 시무룩.`
        )}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <Wrap>
            <TitleContainer>
                <Circle>{level} 단계</Circle>
                <Circle>{languageDisplay}</Circle>
                <Circle>난이도 {difficulty}</Circle>
            </TitleContainer>
            <Wrap>
                <Input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="이름 입력"
                />
                <Button onClick={handleMixpanelSubmit}>랭킹 등록하기</Button>
                <Button onClick={handleTwitterShare}>트위터에 공유하기</Button>
                <Button onClick={() => navigate('/word')}>재 도전하기</Button>
            </Wrap>
        </Wrap>
    )
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1VH;
  border-radius: 25px;
  margin: 5px;
  background-color: #E2F5EB;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #1D6F42;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #155b32;
  }
`;

export default WordMatchClear;
