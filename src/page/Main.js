import React, { useState, useRef } from 'react';
import styled from 'styled-components';


const Index = () => {

    const [inputText1, setInputText1] = useState("");
    const [outputText1, setOutputText1] = useState("");
    const [inputText2, setInputText2] = useState("");
    const [outputText2, setOutputText2] = useState("");
    const [copyStatus1, setCopyStatus1] = useState("        ");
    const [copyStatus2, setCopyStatus2] = useState("        ");
    const outputRef1 = useRef(null);
    const outputRef2 = useRef(null);

    /* 첫번째 쿼리 복사 */
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

    /* 두번째 쿼리 복사 */
    const transformText2 = (text) => {
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

    const onChange2 = (e) => {
        setInputText2(e.target.value)
        setCopyStatus2("")
    }

    const handleKeyDown2 = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const transformed2 = transformText2(inputText2);
            setOutputText2(transformed2)
            setInputText2("");

        setTimeout(() => {
            if(outputRef2.current) {
                navigator.clipboard.writeText(transformed2);
                setCopyStatus2("복사성공");
            }
        }, 100);
        }
    }

    const handleCopy2 = () => {
        if (outputRef1.current) {
            navigator.clipboard.writeText(outputText1);
            setCopyStatus1("복사성공");
        }
    }

    return (
        <div>
            <p>해당 사이트는 Mix Panel을 이용하여 데이터를 수집하고 있습니다.</p>
            <Wrap>
                <Div>
                    <h4>1</h4>
                    <textarea
                        style={{ width: "90%", height: "90%", padding: "1%"}}
                        value={inputText1} 
                        onChange={(e) => onChange1(e)}
                        onKeyDown={handleKeyDown1}
                    />
                </Div>
                <Div> → </Div>
                <Div>
                    <h4>1 copy</h4>
                    <textarea 
                        style={{ width: "90%", height: "90%", padding: "1%"}}
                        ref={outputRef1}
                        value={outputText1}
                        readOnly
                    />
                </Div>
                <Div>
                    <button 
                        style={{background: "white", width: "100%"}}
                        onClick={handleCopy1}
                    > 복사 </button>
                    <Div>{copyStatus1}</Div>
                </Div>
            </Wrap>

            <br/>

            <Wrap>
                <Div>
                    <h4>2</h4>
                    <textarea
                        style={{ width: "90%", height: "90%", padding: "1%"}}
                        value={inputText2} 
                        onChange={(e) => onChange2(e)}
                        onKeyDown={handleKeyDown2}
                    />
                </Div>
                <Div> → </Div>
                <Div>
                    <h4>2 copy</h4>
                    <textarea
                        style={{ width: "90%", height: "90%", padding: "1%"}}
                        ref={outputRef2}
                        value={outputText2}
                        readOnly
                    />
                </Div>
                <Div>
                    <button 
                        style={{background: "white", width: "100%"}}
                        onClick={handleCopy2}
                    > 복사 </button>
                    <Div>{copyStatus2}</Div>
                </Div>
            </Wrap>
        </div>
    )
};

const Wrap = styled.div`
    display:grid;
    grid-template-columns: 1fr 0.2fr 1fr 0.2fr;
    padding: 20px;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
`;

const Div = styled.div`
    padding: 0.5%;
`


export default Index;