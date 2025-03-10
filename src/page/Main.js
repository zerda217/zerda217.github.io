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
    display:grid;
    grid-template-columns: 1fr 0.2fr 1fr 0.2fr;
    padding: 20px;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    justify-content: center;
    align-items: center;
`;

export default Index;