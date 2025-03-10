import React, { useState, useRef } from 'react';
import styled from 'styled-components';


const Index = () => {

    return (
        <Wrap>
            <p>해당 사이트는 Mix Panel을 이용하여 데이터를 수집하고 있습니다.</p>
        </Wrap>
    )
};

const Wrap = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export default Index;