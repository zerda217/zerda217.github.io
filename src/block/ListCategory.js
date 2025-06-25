import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import styled from 'styled-components';
import List from './List';

const ListCategory = ({data}) => {
    console.log('띠부타입', data);
    const [selectListIndex, setSelectListIndex] = useState(0);
    const [isSelectList, setIsSelectList] = useState(false);
    const [isSelectListType, setIsSelectListType] = useState('');

    const ListClick = (page) => {
        mixpanel.track('List Select', {
          'List Type': page
        });
        // navigate(page);
    };

    const SelectState = (i) => {
        setIsSelectList(true);
        setIsSelectListType('ddibu_'+i.brand+'_'+i.title+'_'+i.category+i.etc);
        setSelectListIndex(i.index);
    }
    
    return (
        <Wrap>
            <ListWrap>
            {data 
                && <div>
                        {data.map((i) => (
                            <ListWrap
                                key={i.index}
                                onClick = {() => SelectState(i)}
                            >
                                {i.display}
                            </ListWrap>
                        ))}
                    </div>
            }
            </ListWrap>

            {
                isSelectList == true & selectListIndex != 0 &&
                    <List data={isSelectListType} />
            }
        </Wrap>
    )
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 1vh;
  padding: 1vh;
`;

const ListWrap = styled.div`
  padding: 10px;
`;

export default ListCategory;