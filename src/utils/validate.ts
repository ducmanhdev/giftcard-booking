export const useValidatePhoneNumber = (phoneNumber: string) => {
  return (
    phoneNumber.replace(/\D/g, '').length === 10 ||
    phoneNumber.replace(/\D/g, '').length === 11
  );
};
export const useValidateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
