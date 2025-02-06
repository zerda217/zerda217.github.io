import React, { useState, useRef } from 'react';
import styled from 'styled-components';


const Index = () => {

    const [inputText1, setInputText1] = useState("");
    const [outputText1, setOutputText1] = useState("");
    const [inputText2, setInputText2] = useState("");
    const [outputText2, setOutputText2] = useState("");
    const [copyStatus1, setCopyStatus1] = useState("        ");
    const outputRef1 = useRef(null);
    const outputRef2 = useRef(null);

    const transformText1 = (text) => {
        const rows = text.split("\n");
        if (rows.length < 2) return "적어도 두 줄 이상의 데이터를 입력하세요."

        const header = rows[0];
        const dataRows = rows.slice(1);

        const transformedRows = dataRows.map((row) => {
            const cols = row.split(/\s+/);
            // if (cols.length < 8) return "r각 행에 8개 컬럼이 있어야 합니다."
            
            return `SELECT '${cols[0]}' AS LOCAL_TIMESTAMP,
            '${cols[1]}' AS TIMESTAMP,
            SAFE_CAST(NULL AS STRING) AS CLIENT_ID,
            '${cols[2]}' AS SST_ID,
            SAFE_CAST(NULL AS STRING) AS SESSION_ID,
            '${cols[3]}' AS SST_SESSION_ID,
            '${cols[4]}' AS EVENT_NAME,
            '${cols[5]}' AS PAGE_LOCATION UNION ALL`
        })

        return [...transformedRows].join("\n");
    }

    const onChange1 = (e) => {
        setInputText1(e.target.value)
        setCopyStatus1("")
    }

    const handleKeyDown1 = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const transformed1 = transformText1(inputText1);
            setOutputText1(transformed1)
            setInputText1("");

        setTimeout(() => {
            if(outputRef1.current) {
                navigator.clipboard.writeText(transformed1);
                setCopyStatus1("복사성공");
            }
        }, 100);
        }
    }

    const handleCopy1 = () => {
        if (outputRef1.current) {
            navigator.clipboard.writeText(outputText1);
            setCopyStatus1("복사성공");
        }
    }

    return (
        <Wrap>
            <p>해당 사이트는 Mix Panel을 이용하여 데이터를 수집하고 있습니다.</p>
            <TextBoxWrap>
                <div>
                    <h4>1</h4>
                    <textarea
                        // style={{ width: "50%"}}
                        value={inputText1} 
                        onChange={(e) => onChange1(e)}
                        onKeyDown={handleKeyDown1}
                    />
                </div>
                <div>
                    <h4>1 copy</h4>
                    <textarea 
                        ref={outputRef1}
                        value={outputText1}
                        readOnly
                    />
                    <button 
                        onClick={handleCopy1}
                    > 복사 </button>
                    <div>{copyStatus1}</div>
                </div>
            </TextBoxWrap>

            <br/>

            <TextBoxWrap>
                <div>
                    <h4>2</h4>
                    <textarea></textarea>
                </div>
                <div>
                    <h4>2 copy</h4>
                    <textarea></textarea>
                </div>
            </TextBoxWrap>
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

const TextBoxWrap = styled.div`
    dispaly:grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
    border: 1px solid black;
    witdh: 80%;
`


export default Index;