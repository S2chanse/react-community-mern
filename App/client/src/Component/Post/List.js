import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';
import { ListDiv, ListItem } from '../../Styled/ListCSS.js';

export default function List({ contentList }) {
  const user = useSelector((state) => state.user);

  const setTimeWhat = (a, b) => {
    return a === b
      ? moment(a).format('YYYY-MM-DD hh:mm') + '(New)'
      : moment(b).format('YYYY-MM-DD hh:mm') + '(수정됨)';
  };
  return (
    <ListDiv>
      {contentList.map((content, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/post/${content.postNum}`}>
              <p className='title'>{content.title}</p>
              <div className='author'>
                <div>
                  <Avatar
                    size='40'
                    round={true}
                    src={content.author.photoURL}
                    style={{ border: '1px solid #c6c6c6' }}
                  />
                  <p>{content.author.displayName}</p>
                </div>
                <p className='time'>
                  {setTimeWhat(content.createdAt, content.updatedAt)}
                </p>
              </div>

              <p>{content.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}
