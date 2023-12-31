import {
  composeValidators,
  makeRequired,
  makeMinCharactersValidator,
  makeMaxCharactersValidator,
  makeEmailValidator,
} from 'shared/validators';
import { tKeys } from 'services/i18n';

export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 35;
export const MIN_NICKNAME_LENGTH = 3;
export const MAX_NICKNAME_LENGTH = 13;
export const MAX_BIO_LENGTH = 200;

export const validateName = composeValidators(
  makeRequired(tKeys.shared.fieldIsRequiredError),
  makeMinCharactersValidator(MIN_NAME_LENGTH, {
    key: tKeys.shared.fieldMinLengthError,
    options: { minCharacters: MIN_NAME_LENGTH },
  }),
  makeMaxCharactersValidator(MAX_NAME_LENGTH, {
    key: tKeys.shared.fieldMaxLengthError,
    options: { maxCharacters: MAX_NAME_LENGTH },
  }),
);

export const validateEmail = composeValidators(
  makeRequired(tKeys.shared.fieldIsRequiredError),
  makeEmailValidator(tKeys.shared.fieldIsEmailError),
);

export const validateNickname = composeValidators(
  makeRequired(tKeys.shared.fieldIsRequiredError),
  makeMinCharactersValidator(MIN_NICKNAME_LENGTH, {
    key: tKeys.shared.fieldMinLengthError,
    options: { minCharacters: MIN_NICKNAME_LENGTH },
  }),
  makeMaxCharactersValidator(MAX_NICKNAME_LENGTH, {
    key: tKeys.shared.fieldMaxLengthError,
    options: { maxCharacters: MAX_NICKNAME_LENGTH },
  }),
);

export const validateBio = composeValidators(
  makeRequired(tKeys.shared.fieldIsRequiredError),
  makeMaxCharactersValidator(MAX_BIO_LENGTH, {
    key: tKeys.shared.fieldMaxLengthError,
    options: { maxCharacters: MAX_BIO_LENGTH },
  }),
);
