import {
  composeValidators,
  makeRequired,
  makeEmailValidator,
  makePasswordValidator,
} from 'shared/validators';

const validateEmail = composeValidators(
  makeRequired('Поле обязательно'),
  makeEmailValidator('Неверный email'),
);

const validatePassword = composeValidators(
  makeRequired('Поле обязательно'),
  makePasswordValidator('Неверный пароль'),
);

export { validateEmail, validatePassword };
