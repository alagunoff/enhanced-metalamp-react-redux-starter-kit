function makePasswordValidator<T>(error: T) {
  return (validatedValue: string) => {
    const re = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]){8,}/g;
    const isValid = re.test(String(validatedValue));

    return isValid ? undefined : error;
  };
}

export { makePasswordValidator };
