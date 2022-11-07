import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { RepleUploadDiv } from '../../Styled/RepleCSS.js';
export default function RepleUpload({ postInfo }) {
  const user = useSelector((state) => state.user);
  const [reple, setReple] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (!reple) {
      alert('댓글을 써주세요');
      return;
    }
    let body = {
      postid: postInfo._id,
      uid: user.uid,
      reple: reple,
    };

    axios.post('/api/reple/submit', body).then((res) => {
      if (res.data.success) {
        alert('댓글을 저장했습니다.');
        setReple('');
        window.location.reload();
      }
    });
  };
  return (
    <RepleUploadDiv>
      <form>
        <input
          type='text'
          value={reple}
          onChange={(e) => {
            setReple(e.currentTarget.value);
          }}
        />
        <button
          onClick={(e) => {
            submitHandler(e);
          }}
        >
          등록
        </button>
      </form>
    </RepleUploadDiv>
  );
}
