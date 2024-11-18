
export class Account {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  country: string;
  phoneNumber: string


  constructor(id: number, firstName: string, lastName: string, gender: string, dateOfBirth: Date, country: string, phoneNumber: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.country = country;
    this.phoneNumber = phoneNumber;
  }
}
