
export class User {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: Date;
  country: string;
  phoneNumber: string
  roles?: string[];
  id?: string;


  constructor(firstName: string, lastName: string, email: string, gender: string, dateOfBirth: Date, country: string, phoneNumber: string, roles?: string[], id?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.country = country;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
    this.id = id;
  }
}
