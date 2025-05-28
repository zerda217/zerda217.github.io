import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import styled from 'styled-components';

const List = ({data}) => {
    console.log('띠부타입', data);
    const [listData, setListData] = useState([])
    useEffect((data) => {
        setListData(data);
    }, []);

    const ListClick = (page) => {
        mixpanel.track('List Select', {
          'List Type': page
        });
        // navigate(page);
    };

    
    return (
        <Wrap>
            {data 
                && <div>
                        {data.map((i) => (
                            <ListWrap
                                key={i.index}
                            >
                                {i.brand} {i.title} {i.category} {i.etc}
                            </ListWrap>
                        ))}
                    </div>
            }
        </Wrap>
    )
};

const Wrap = styled.div`
  border : 1px solid black;
  height: 50vh;
`;

const ListWrap = styled.div`
  border : 1px solid black;
  padding: 10px;
`;

export default List;