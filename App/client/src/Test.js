import React, { useState } from 'react';

export default function Test() {
  const [contents, setContents] = useState('');
  const [contentList, setContentList] = useState([]);
  /*
  1.첫번째 인자 : 변수의 이름
  2.두번째 인자 : 인자의 상태 변화 
  3.초기값
  state의 값이 바껴도, 화면을 재 호출할 필요가 없다.

  state의 값을 바꿀 때는 항상 setState를 사용한다.
  */

  const onSubmit = () => {
    console.log(contents);
    let arr = [...contentList];
    arr.push(contents);
    setContentList([...arr]);
    console.log(arr);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <input
        type='text'
        value={contents}
        onChange={(event) => setContents(event.currentTarget.value)}
      />
      {contentList.map((content, idx) => {
        return (
          <div
            key={idx}
            style={{
              width: '100%',
              marginLeft: '1rem',
            }}
          >
            <h2>{content}</h2>
          </div>
        );
      })}
      <button style={{ marginTop: '1rem' }} onClick={() => onSubmit()}>
        제출
      </button>
    </div>
  );
}
