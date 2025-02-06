import React, { useState, useEffect } from 'react';
import mixpanel from 'mixpanel-browser';
import styled from 'styled-components';

const trans = () => {
    return (
        <Wrap>
            <Wrap>
                <div>
                    <h4>1</h4>
                    <TextBox></TextBox>
                </div>
                <div>
                    <h4>1 copy</h4>
                    <TextBox></TextBox>
                </div>
            </Wrap>

            <br/>

            <Wrap>
                <div>
                    <h4>2</h4>
                    <TextBox></TextBox>
                </div>
                <div>
                    <h4>2 copy</h4>
                    <TextBox></TextBox>
                </div>
            </Wrap>
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

const TextBox = styled.div`
    width: 35%;
    height: 20%
    border: 1px solid black;    
`


export default trans;
  