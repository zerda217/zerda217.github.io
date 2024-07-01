import React, { useState, useEffect } from 'react';

const Headline = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    console.log('현재 시간: ', currentTime);

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div>
            <h1>현재 시간: {formatTime(currentTime)}</h1> {/* currentTime을 문자열로 포맷하여 출력 */}
        </div>
    );
}

export default Headline;
