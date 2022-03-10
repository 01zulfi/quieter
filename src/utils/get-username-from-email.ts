const getUsernameFromEmail = (email: string): string =>
  email.substring(0, email.indexOf('@'));

export default getUsernameFromEmail;
