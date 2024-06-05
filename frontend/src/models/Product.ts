export default class Product {
  description: string;
     imageUrl: string;
        price: number;
        title: string;
       userId: string;
          _id: string;

  constructor() {
    this.description = '';
    this.imageUrl    = '';
    this.price       =  0;
    this.title       = '';
    this.userId      = '';
    this._id         = '';
  }
}
