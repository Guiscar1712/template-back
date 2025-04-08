export interface UserResponseDto {
  id: string;
  name: string;
  status: string;
  phones: string[];
  emails: string[];
  addresses: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }[];
  // roles: string[];
}
