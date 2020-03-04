import React from 'react';
import block from 'bem-cn';

import './UserAvatar.scss';

interface IProps {
  avatarURL: string;
  size: 'small' | 'big';
}

const b = block('user-avatar');

function UserAvatar(props: IProps) {
  const { avatarURL, size } = props;
  
  return (
    <div className={b({ size })} style={{ backgroundImage: `url(${avatarURL})` }} />
  );
}

export { UserAvatar };
