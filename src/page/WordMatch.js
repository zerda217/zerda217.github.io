import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import styled from 'styled-components';

import { languages, difficulties } from '../asset/data';

const WordMatch = ({level, setLevel, language, setLanguage, difficulty, setDifficulty, setTimeElapsed }) => {
    const navigate = useNavigate();

    useEffect(() => {
        mixpanel.track('Word Game Select', {
            'Level': level,
            'language': language,
            'difficulty': difficulty
        })
    }, [level, language, difficulty])

    const handleLanguageClick = (lang) => {
        setLanguage(lang);
    };

    const handleDifficultyClick = (diff) => {
        setDifficulty(diff);
    };

    const handleLevelClick = (lvl) => {
        setLevel(lvl);
    };

    const handleStartClick = () => {
        const time = new Date().toISOString();
        mixpanel.track('Word Game Start', {
            'Level': level,
            'language': language,
            'difficulty': difficulty,
            'start_time': time
        });
        setTimeElapsed(0);
        navigate('/word_game')
    };

    return (
        <Wrap>
            <div>match</div>

            <SelectionWrapper>
                <SelectionGroup>
                    <SelectionTitle>언어</SelectionTitle>
                    {languages.map((lang) => (
                        <Circle
                            key={lang.value}
                            selected={language === lang.value}
                            onClick={() => handleLanguageClick(lang.value)}
                        >
                            {lang.display}
                        </Circle>
                    ))}
                </SelectionGroup>
                <SelectionGroup>
                    <SelectionTitle>난이도</SelectionTitle>
                    {difficulties.map((diff) => (
                        <Circle
                            key={diff.value}
                            selected={difficulty === diff.value}
                            onClick={() => handleDifficultyClick(diff.value)}
                        >
                            {diff.display}
                        </Circle>
                    ))}
                </SelectionGroup>
                <SelectionGroup>
                    <SelectionTitle>단계</SelectionTitle>
                    {[...Array(10).keys()].map((lvl) => (
                        <Circle
                            key={lvl + 1}
                            selected={level === lvl + 1}
                            onClick={() => handleLevelClick(lvl + 1)}
                        >
                            {lvl + 1}
                        </Circle>
                    ))}
                </SelectionGroup>

                <Circle
                    onClick={() => handleStartClick()}
                > 
                    시작 
                </Circle>
            </SelectionWrapper>

        </Wrap>
    );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SelectionGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const SelectionTitle = styled.div`
  margin-right: 10px;
  font-weight: bold;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1vh 1vh; /* 글자 길이에 따라 width가 변경되도록 padding 사용 */
  border-radius: 25px;
  border: ${(props) => (props.selected ? '1px solid #000' : '1px solid #eee')};
  margin: 1vh;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#E2F5EB' : 'white')};
  &:hover {
    background-color: ${(props) => (props.selected ? '#E2F5EB' : '#EEEEEE')};
  }
  transition: background-color 0.3s;
`;

export default WordMatch;
  