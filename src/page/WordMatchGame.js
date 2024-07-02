import React, { useState } from 'react';
import styled from 'styled-components';

const WordMatchGame = () => {
    const [gridColumns, setGridColumns] = useState(2);

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
                <Word>얍</Word>
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
  background-color: ${(props) => (props.selected ? '#D4C1DD' : '#FFFFFF')};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.selected ? '#D4C1DD' : '#EEEEEE')};
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 10px;
  width: 80%;
  border: 1px solid #EEEEEE;
  padding: 20px;
`;

const Word = styled.div`
  border: 1px solid #EEEEEE;
  width: 100%;
`;

export default WordMatchGame;
