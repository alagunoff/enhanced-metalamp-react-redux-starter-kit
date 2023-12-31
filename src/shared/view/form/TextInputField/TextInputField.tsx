import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { TextInput, TextInputProps } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';
import { TranslateFunction } from 'services/i18n';

type IProps = TextInputProps & FieldRenderProps & { t?: TranslateFunction };

function TextInputField(props: IProps) {
  const { input, meta, t, ...rest } = props;
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error
    : meta.touched && meta.error;

  return (
    <TextInput
      {...rest}
      helperText={error && t ? t(error) : error}
      error={Boolean(error)}
      {...input}
    />
  );
}

const Component = getFieldWithComponent(TextInputField);

export { Component as TextInputField };
