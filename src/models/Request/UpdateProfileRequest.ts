export interface UpdateProfileRequest {
  fullName: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  countryCode: string;
}

export interface UpdateCustomerRequest {
  fullName: string;
  birthDate: string;
  gender: number;
  phone: string;
  countryCode: string;
}
