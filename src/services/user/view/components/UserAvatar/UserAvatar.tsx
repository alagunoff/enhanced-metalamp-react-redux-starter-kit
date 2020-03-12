import React from 'react';
import block from 'bem-cn';

import './UserAvatar.scss';

type IStateProps = {
  avatarURL: string;
  size: 'small' | 'big';
};

type IProps = IStateProps;

const b = block('user-avatar');

function UserAvatar(props: IProps) {
  const { avatarURL, size } = props;

  return (
    <div className={b({ size })} style={{ backgroundImage: `url(${avatarURL})` }} />
  );
}

export { UserAvatar };
