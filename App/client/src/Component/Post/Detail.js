import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';

import { PostDiv, Post, BtnDiv } from '../../Styled/PostDetailCSS.js';

export default function Detail({ postInfo }) {
  let params = useParams();
  const naviagte = useNavigate();
  const user = useSelector((state) => state.user);
  /** 삭제 fnc **/
  const deleteRow = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const res = await axios.post('/api/post/delete', params);
        if (res.data.success) {
          alert('삭제가 완료됐습니다.');
          naviagte('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const setTimeWhat = (a, b) => {
    return a === b
      ? moment(a).format('YYYY-MM-DD hh:mm') + '(New)'
      : moment(b).format('YYYY-MM-DD hh:mm') + '(수정됨)';
  };
  return (
    <PostDiv>
      <Post>
        <h1>{postInfo.title}</h1>
        <div className='author'>
          <Avatar
            size='40'
            round={true}
            src={postInfo.author.photoURL}
            style={{ border: '1px solid #c6c6c6' }}
          />
          <p>{postInfo.author.displayName}</p>
          <p className='time'>
            {setTimeWhat(postInfo.createdAt, postInfo.updatedAt)}
          </p>
        </div>
        {postInfo.image ? (
          <img
            src={postInfo.image}
            alt=''
            style={{ width: '100%', height: 'auto' }}
          />
        ) : null}
        <p>{postInfo.content}</p>
      </Post>
      {user.uid === postInfo.author.uid && (
        <BtnDiv>
          <Link to={`/edit/${postInfo.postNum}`}>
            <button className='edit'>수정</button>
          </Link>

          <button className='delete' onClick={() => deleteRow()}>
            삭제
          </button>
        </BtnDiv>
      )}
    </PostDiv>
  );
}
