import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import styled from 'styled-components';

const List = ({data}) => {
    console.log('들어오나?', data)
    const [listData, setListData] = useState(data)
    useEffect(() => {
        console.log('띠부타입', listData)
    }, []);

    const ListClick = (page) => {
        mixpanel.track('List Select', {
          'List Type': page
        });
        // navigate(page);
    };

    
    return (
        <div>
            { setListData ??
                setListData.map(index => {
                    <div key={index}>
                        <div> {setListData.brand} </div>
                        <div> {setListData.title} </div>
                        <div> {setListData.category} </div>
                    </div>

                })
            }
        </div>
    )
};

export default List;