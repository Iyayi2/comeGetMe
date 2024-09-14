export default class Listing {
  description: string;
     imageUrl: string;
        price: number;
        title: string;
          _id: string;
       userId: { _id: string; username: string };

  constructor() {
    this.description = '';
    this.imageUrl    = '';
    this.price       =  0;
    this.title       = '';
    this._id         = '';
    this.userId      = { _id: '', username: '' };
  }
}
