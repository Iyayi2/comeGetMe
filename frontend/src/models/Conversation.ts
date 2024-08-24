import Seller from './Seller';

export default class Conversation {
      _id: string;
  members: [{ email: string; username: string; _id: string }, seller: Seller];

  constructor() {
    this._id     = '';
    this.members = [
      { _id: '', username: '', email: '' },
      { _id: '', username: '', product: { _id: '', title: '', price: 0, imageUrl: '' } },
    ];
  }
}
