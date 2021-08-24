export interface Account {
  sub: string;
  role: string;
  preferred_username: string;
  name: string;
  family_name: string;
  given_name: string;
  username: string;
  email: string;
  email_verified: boolean;
  picture: string;
  phone_number: string;
  phone_number_verified: boolean;
  locale: string;
  gender: string;
  birthdate: string;
  address: string;
  provider: string;
  idToken: string;
  base64_picture?: any;
  city: string;
  country: string;
  postOfficeId: string;
  currencyCode: string;
}
