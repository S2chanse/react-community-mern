import React, { useEffect, useState } from 'react';
import RepleList from './RepleList';
import RepleUpload from './RepleUpload';

import { RepleAreaDiv } from '../../Styled/RepleCSS.js';
export default function RepleArea({ postInfo }) {
  return (
    <RepleAreaDiv>
      <RepleUpload postInfo={postInfo} />
      <RepleList postInfo={postInfo} />
    </RepleAreaDiv>
  );
}
