import React from 'react';
import { autobind } from 'core-decorators';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

type IProps = Omit<TextFieldProps, 'ref'>;

interface IState {
  type?: string;
}

class TextInput extends React.PureComponent<IProps, IState> {
  public state: IState = {
    type: this.props.type,
  };

  public render() {
    const { InputProps } = this.props;
    const { type } = this.state;

    return (
      <TextField
        {...this.props as TextFieldProps}
        type={type}
        InputProps={{
          ...InputProps,
          endAdornment: this.renderEndAdornment(),
        }}
        fullWidth
      />
    );
  }

  private renderEndAdornment(): React.ReactNode {
    const { type } = this.props;

    return type === 'password' ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="Toggle password visibility"
          onClick={this.handleClickShowPassword}
        >
          {this.state.type === 'password' ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    ) : null;
  }

  @autobind
  private handleClickShowPassword() {
    this.setState(state => ({
      type: state.type === 'password' ? 'text' : 'password',
    }));
  }
}

export { TextInput, IProps };
