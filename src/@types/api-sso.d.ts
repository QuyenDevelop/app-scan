interface UserProfileType {
  amr: string[];
  at_hash: string;
  aud: string;
  auth_time: number;
  email: string;
  exp: number;
  iat: number;
  idp: string;
  iss: string;
  nbf: number;
  phone_number: string;
  preferred_username: string;
  email_verified: true;
  sid: string;
  sub: string;
}

interface AuthorizeResult {
  access_token: string;
  expires_in: number;
  authorizeAdditionalParameters?: { [name: string]: string };
  tokenAdditionalParameters?: { [name: string]: string };
  additionalParameters?: { [name: string]: string };
  id_token: string;
  refresh_token: string;
  token_type: string;
  scopes: [string];
}

export interface RefreshResult {
  access_token: string;
  expires_in: string;
  additionalParameters?: { [name: string]: string };
  id_token: string;
  refresh_token: string;
  token_type: string;
}
