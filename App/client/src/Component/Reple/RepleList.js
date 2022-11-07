import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RepleContent from './RepleContent';

import { RepleListDiv, RepleContentDiv } from '../../Styled/RepleCSS.js';
export default function RepleList({ postInfo }) {
  const [repleList, setRepleList] = useState([]);
  useEffect(() => {
    axios
      .post('/api/reple/getRepleList', {
        postid: postInfo._id,
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          setRepleList([...res.data.repleList]);
        }
      });
  }, []);

  return (
    <RepleListDiv>
      {repleList.map((reple, idx) => {
        return <RepleContent reple={reple} key={idx} />;
      })}
    </RepleListDiv>
  );
}
