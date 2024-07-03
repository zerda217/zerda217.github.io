import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import mixpanel from 'mixpanel-browser';

import english_easy from '../word/english_easy.json';

const WordMatchGame = () => {
    const [gridColumns, setGridColumns] = useState(2);
    const [words, setWords] = useState([]);
    console.log('import:', english_easy)
    console.log('단어:', words)

    useEffect(() => {
        fetch('../word/english_easy.json')
            .then(response => response.json())
            .then(data => setWords(data.words));
    }, []);

    const handleGridChange = (cols) => {
        setGridColumns(cols);
    };

    return (
        <Wrap>
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
                    <WordCard key={index}>
                        {word}
                    </WordCard>
                ))}
            </Board>
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
  background-color: ${(props) => (props.selected ? 'lightblue' : 'white')};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.selected ? 'lightblue' : 'lightgray')};
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
  padding: 20px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: lightgray;
  }
`;

export default WordMatchGame;
