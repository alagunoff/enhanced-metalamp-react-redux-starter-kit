import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { autobind } from 'core-decorators';

import { TextInputField } from 'shared/view/form';
import { Button } from 'shared/view/elements';
import { IAppReduxState } from 'shared/types/app';
//import { actionCreators } from './../../../redux';

import './LoginForm.scss';

const b = block('login-form');

type IActionProps = typeof mapDispatch;

type IProps = IActionProps;

function mapState(state: IAppReduxState) {
  return {
    loginState: state.login,
  };
}

const mapDispatch = {
  saveProfile: actionCreators.saveProfile,
};

class LoginForm extends React.PureComponent<IProps> {
  public render() {
    return (
      <div className={b()}>
        <form className={b('content')}>form login</form>
      </div>
    );
  }
}

const connectedComponent = connect(mapState, mapDispatch)(LoginForm);

export { connectedComponent as LoginForm };
