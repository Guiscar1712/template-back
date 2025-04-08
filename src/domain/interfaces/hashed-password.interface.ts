export interface IHashedPassword {
  hashPassword(password: string): Promise<string>;
  comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
