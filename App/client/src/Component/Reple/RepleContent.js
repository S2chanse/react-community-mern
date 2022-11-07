import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import moment from 'moment';
import 'moment/locale/ko';
import { RepleContentDiv, RepleUploadDiv } from '../../Styled/RepleCSS.js';

export default function RepleContent({ reple }) {
  const [flag, setFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [chReple, setChReple] = useState(reple.reple);
  const ref = useRef();
  const user = useSelector((state) => state.user);
  useOnClickOutside(ref, () => setFlag(false));

  const RepleUpdateHandler = (e) => {
    e.preventDefault();
    let body = {
      uid: user.uid,
      reple: chReple,
      postId: reple.postId,
      _id: reple._id,
    };
    axios.post('/api/reple/edit', body).then((res) => {
      if (res.data.success) {
        alert('댓글 수정에 성공했습니다.');
      } else {
        alert('댓글 수정에 실패했습니다.');
      }
      window.location.reload();
    });
  };
  const RepleDeleteHandler = (e) => {
    e.preventDefault();
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      axios.post('/api/reple/delete', reple).then((res) => {
        if (res.data.success) {
          alert('댓글이 삭제됐습니다.');
          window.location.reload();
        }
      });
    }
  };

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  }

  const setTimeWhat = (a, b) => {
    return a === b
      ? moment(a).format('YYYY-MM-DD hh:mm') + '(New)'
      : moment(b).format('YYYY-MM-DD hh:mm') + '(수정됨)';
  };
  return (
    <RepleContentDiv>
      <div className='author'>
        <div className='userInfo'>
          <Avatar
            size='30'
            round={true}
            src={reple.author.photoURL}
            style={{ border: '1px solid #c6c6c6' }}
          />
          <p>{reple.author.displayName}</p>
        </div>
        {reple.author.uid === user.uid && (
          <div className='modalControl'>
            <span onClick={() => setFlag(true)}>···</span>
            {flag && (
              <div className='modalDiv' ref={ref}>
                <p
                  onClick={() => {
                    setEditFlag(true);
                    setFlag(false);
                  }}
                >
                  수정
                </p>
                <p className='delete' onClick={(e) => RepleDeleteHandler(e)}>
                  삭제
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {editFlag ? (
        <div>
          <form>
            <textarea
              id='content'
              type='text'
              value={chReple}
              onChange={(event) => setChReple(event.currentTarget.value)}
            />
            <Button onClick={(e) => RepleUpdateHandler(e)}>전송</Button>
            <Button
              style={{ backgroundColor: 'red', border: '1px solid red' }}
              onClick={(e) => {
                e.preventDefault();
                setEditFlag(false);
              }}
            >
              취소
            </Button>
          </form>
        </div>
      ) : (
        <p>{reple.reple}</p>
      )}
    </RepleContentDiv>
  );
}
