export class EditProfileDto {
  userId: string
  accountId: number
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  country: string;
  phoneNumber: string
  password?: string

  constructor(userId: string, accountId: number, firstName: string, lastName: string, email: string, gender: string, dateOfBirth: Date, country: string, phoneNumber: string, password: string) {
    this.userId = userId;
    this.accountId = accountId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.country = country;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}
