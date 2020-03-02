import React from 'react';
import block from 'bem-cn';

import './NotFound.scss';

const b = block('not-found');

function NotFound() {
  return (
    <div className={b()}>
      <div className={b('container')}>
        <h1 className={b('title')}>404, Oops!</h1>
      </div>
    </div>
  );
}

export { NotFound };
