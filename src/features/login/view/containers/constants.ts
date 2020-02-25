import { composeValidators, makeRequired, makeEmailValidator } from 'shared/validators';

const validateEmail = composeValidators(
  makeRequired('Поле обязательно'),
  makeEmailValidator('Неверный email'),
);

const validatePassword = makeRequired('Поле обязательно');

export { validateEmail, validatePassword };
