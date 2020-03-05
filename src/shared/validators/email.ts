export function makeEmailValidator<T>(error: T) {
  return (validatedValue: string) => {
    if (!validatedValue) {
      return error;
    }
    const re = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(validatedValue).toLowerCase());
    if (!isValid) {
      return error;
    }
    return undefined;
  };
}
