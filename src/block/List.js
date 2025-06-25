import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import styled from 'styled-components';

const List = (file) => {
    console.log('선택한 띠부 카테고리:', file.data);
    const [data, setData] = useState([]);
    console.log('데이터: ', data);

    useEffect(() => {
        const fileName = `${file.data}.js`;

        import(`../asset/${fileName}`)
            .then((module) => {
                setData(module.default)
            })
            .catch((error) => {
                setData(null)
                console.error(`데이터 불러오기 실패`)
            })
    }, [file])

    const ListClick = (page) => {
        mixpanel.track('List Select', {
          'List Type': page
        });
        // navigate(page);
    };
    
    return (
        <div>
            {data ? 
                <Wrap>
                        {data.map((i) => (
                            <ListWrap
                                key={i.number}
                            >
                                <Div>{i.number}</Div> <Div>{i.kor_name}</Div>
                                <Div>{i.img_src}</Div>
                            </ListWrap>
                        ))}
                </Wrap>
                :
                <div>
                    업데이트 중...
                </div>
            }
        </div>
    )
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1vh;
  padding: 1vh;
`;

const ListWrap = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 1vh;
  padding: 0.5vh;
  border : 1px solid black;
`;

const Div = styled.div`
`

export default List;