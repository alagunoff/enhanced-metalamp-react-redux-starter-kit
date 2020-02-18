import React from 'react';
import block from 'bem-cn';

import * as features from 'features';
import { withAsyncFeatures } from 'core';

import './LoginLayout.scss';

interface IFeatureProps {
  loginFeatureEntry: features.login.Entry;
}

type IProps = IFeatureProps;

const b = block('login-layout');

function LoginLayout(props: IProps) {
  const {
    loginFeatureEntry: { containers },
  } = props;
  const { LoginForm } = containers;

  return (
    <div className={b()}>
      <div className={b('container')}>
        <div className={b('login-form')}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

const connectedComponent = withAsyncFeatures({
  loginFeatureEntry: features.login.loadEntry,
})(LoginLayout);

export { connectedComponent as LoginLayout };
