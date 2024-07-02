import React, { useState, useEffect } from 'react';
import mixpanel from 'mixpanel-browser';
import styled from 'styled-components';

const WordMatch = ({setMenu}) => {
    const [level, setLevel] = useState(1);
    const [language, setLanguage] = useState('english');
    const [difficulty, setDifficulty] = useState('easy');

    useEffect(() => {
        mixpanel.track('Word Game Select', {
            'Level': level,
            'language': language,
            'difficulty': difficulty
        })
    }, [level, language, difficulty])

    console.log('현재 상태:', level, language, difficulty);

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
        const time = new Date();
        mixpanel.track('Word Game Start', {
            'Level': level,
            'language': language,
            'difficulty': difficulty,
            'start_time': time
        });
        setMenu('word_game');
    };

    const languages = [
        { display: '영어', value: 'english' },
        { display: '한국어', value: 'korean' },
        { display: '스페인어', value: 'spanish' },
        { display: '중국어', value: 'chinese' },
        { display: '일본어', value: 'japanese' }
    ];

    const difficulties = [
        { display: '쉬움', value: 'easy' },
        { display: '보통', value: 'medium' },
        { display: '어려움', value: 'hard' }
    ];

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
  padding: 10px 20px; /* 글자 길이에 따라 width가 변경되도록 padding 사용 */
  border-radius: 25px;
  border: ${(props) => (props.selected ? '1px solid #000' : '1px solid #eee')};
  margin: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#D4C1DD' : 'white')};
  &:hover {
    background-color: ${(props) => (props.selected ? '#D4C1DD' : '#EEEEEE')};
  }
  transition: background-color 0.3s;
`;

export default WordMatch;
