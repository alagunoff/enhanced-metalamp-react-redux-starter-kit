import React from 'react';
import block from 'bem-cn';

import './UserAvatar.scss';

interface IStateProps {
  avatarURL: string;
  size: 'small' | 'big';
}

type Props = IStateProps;

const b = block('user-avatar');

function UserAvatar(props: Props) {
  const { avatarURL, size } = props;

  return (
    <div className={b({ size })} style={{ backgroundImage: `url(${avatarURL})` }} />
  );
}

export { UserAvatar };
