export default class Seller {
       _id: string;
  username: string;
   product: { _id: string; title: string; price: number; imageUrl: string };

  constructor() {
    this._id      = '';
    this.username = '';
    this.product  = { _id: '', title: '', price: 0, imageUrl: '' };
  }
}
