import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mixpanel from 'mixpanel-browser';

import { languages, difficulties } from '../asset/data';

const WordMatchGame = ({ level, language, difficulty, timeElapsed, setTimeElapsed }) => {
  const navigate = useNavigate();

  const [gridColumns, setGridColumns] = useState(2);
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);

  const languageDisplay = languages.find(lang => lang.value === language)?.display || language;
  const difficultyDisplay = difficulties.find(diff => diff.value === difficulty)?.display || difficulty;


  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/word/${language}_${difficulty}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        let wordList = [];
        if (difficulty === 'easy') {
          wordList = data.map(item => item.word);
          const wordCount = level * 5;
          const shuffledWords = shuffleArray(wordList.slice());
          const selectedWords = shuffledWords.slice(0, wordCount);
          setWords(shuffleArray([...selectedWords, ...selectedWords]));
        } else if (difficulty === 'medium') {
          const wordCount = level * 10;
          const shuffledData = shuffleArray(data.slice());
          const selectedData = shuffledData.slice(0, wordCount);
          const words = selectedData.map(item => item.word);
          const english = selectedData.map(item => item.english);
          setWords(shuffleArray([...words, ...english]));
        } else if (difficulty === 'hard') {
          if (Array.isArray(language) && language.length === 2) {
            const firstLangResponse = await fetch(`${process.env.PUBLIC_URL}/word/${language[0]}_${difficulty}.json`);
            const secondLangResponse = await fetch(`${process.env.PUBLIC_URL}/word/${language[1]}_${difficulty}.json`);

            if (!firstLangResponse.ok || !secondLangResponse.ok) {
              throw new Error('HTTP error! status: ' + firstLangResponse.status + ' ' + secondLangResponse.status);
            }

            const firstLangData = await firstLangResponse.json();
            const secondLangData = await secondLangResponse.json();

            const firstLangShuffled = shuffleArray(firstLangData.slice());
            const selectedFirstLang = firstLangShuffled.slice(0, level * 10);
            const englishList = selectedFirstLang.map(item => item.english);
            const selectedSecondLang = secondLangData.filter(item => englishList.includes(item.english));

            if (selectedSecondLang.length < level * 10) {
              throw new Error('Insufficient matching words for hard difficulty');
            }

            const firstLangWords = selectedFirstLang.map(item => item.word);
            const secondLangWords = selectedSecondLang.map(item => item.word);
            setWords(shuffleArray([...firstLangWords, ...secondLangWords]));
          } else {
            throw new Error('Invalid language configuration for hard difficulty');
          }
        }
      } catch (error) {
        console.error("Error fetching the word data:", error);
      }
    };

    fetchWords();
  }, [language, difficulty, level]);

  useEffect(() => {
    let countdownTimer;
    if (countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(countdownTimer);
      setGameStarted(true);
    }
    return () => clearInterval(countdownTimer);
  }, [countdown]);

  useEffect(() => {
    let gameTimer;
    if (gameStarted) {
      gameTimer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(gameTimer);
  }, [gameStarted]);

  useEffect(() => {
    if (words.length > 0 && matchedPairs.size * 2 === words.length) {
      mixpanel.track('Word Game Clear', {
        'Level': level,
        'language': language,
        'difficulty': difficulty,
        'time_elapsed': timeElapsed
      });
      alert("전부 맞췄습니다!");
      navigate('/word_clear');
    }
  }, [matchedPairs, words]);

  const handleGridChange = (cols) => {
    setGridColumns(cols);
  };

  const handleCardClick = (word, index) => {
    if (!gameStarted) return;
    if (selectedWords.length === 0) {
      setSelectedWords([{ word, index }]);
    } else if (selectedWords.length === 1) {
      const [firstSelected] = selectedWords;
      if (firstSelected.word === word && firstSelected.index !== index) {
        setMatchedPairs(new Set([...matchedPairs, word]));
        setSelectedWords([]);
      } else {
        setSelectedWords([{ word, index }]);
      }
    } else {
      setSelectedWords([{ word, index }]);
    }
  };

  return (
    <Wrap>
      <TitleContainer>
        <Circle>{level}단계</Circle>
        <Circle>{languageDisplay}</Circle>
        <Circle>난이도 {difficultyDisplay}</Circle>
      </TitleContainer>
      <TimeDisplay>
          {countdown > 0 ? `${countdown}` : `${timeElapsed}s`}
        </TimeDisplay>
      <ButtonContainer>
        {[2, 3, 4, 5].map((number) => (
          <GridButton
            key={number}
            onClick={() => handleGridChange(number)}
            selected={gridColumns === number}
          >
            {number}
          </GridButton>
        ))}
      </ButtonContainer>
      <Board columns={gridColumns}>
        {words.map((word, index) => (
          <WordCard
            key={index}
            onClick={() => handleCardClick(word, index)}
            matched={matchedPairs.has(word)}
            selected={selectedWords.some(selected => selected.index === index)}
          >
            {word}
          </WordCard>
        ))}
      </Board>
    </Wrap>
  );
};

// Utility function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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

const TimeDisplay = styled.div`
  margin-left: 20px;
  font-size: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const GridButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.selected ? '#E2F5EB' : 'white')};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.selected ? '#E2F5EB' : 'lightgray')};
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 10px;
  width: 80%;
  border: 1px solid #eee;
  padding: 20px;
`;

const WordCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  padding: 1.2VH;
  background-color: ${(props) => (props.matched ? 'lightgray' : 'white')};
  color: ${(props) => (props.selected ? 'red' : 'black')};
  text-decoration: ${(props) => (props.matched ? 'line-through' : 'none')};
  cursor: ${(props) => (props.matched ? 'default' : 'pointer')};
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${(props) => (props.matched ? 'lightgray' : 'lightgray')};
  }
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

export default WordMatchGame;
