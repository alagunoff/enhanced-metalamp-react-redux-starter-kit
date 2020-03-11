import {
  composeValidators,
  makeRequired,
  makeEmailValidator,
  makePasswordValidator,
} from 'shared/validators';

const validateEmail = composeValidators(
  makeRequired('Поле обязательно'),
  makeEmailValidator('Некорректный email'),
);

const validatePassword = composeValidators(
  makeRequired('Поле обязательно'),
  makePasswordValidator('Пароль не удовлетворяет требованиям'),
);

export { validateEmail, validatePassword };
