
export class RegistrationDto {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  country: string;
  phoneNumber: string;
  password: string;

  constructor(firstName: string, lastName: string, email: string, gender: string, dateOfBirth: Date, country: string, phoneNumber: string, password: string) {
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