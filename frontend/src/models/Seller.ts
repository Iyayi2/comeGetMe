export default class Seller {
       _id: string;
  username: string;
   listing: { _id: string; title: string; price: number; imageUrl: string };

  constructor() {
    this._id      = '';
    this.username = '';
    this.listing  = { _id: '', title: '', price: 0, imageUrl: '' };
  }
}
