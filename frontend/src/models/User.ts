export default class User {
        _id: string;
      email: string;
  password?: string;
   username: string;

  constructor() {
    this._id      = '';
    this.email    = '';
    this.password = '';
    this.username = '';
  }
}
