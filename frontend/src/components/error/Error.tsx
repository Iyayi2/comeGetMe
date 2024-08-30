import ghost from '@/assets/pngs/ghost.png'
import man from '@/assets/pngs/man-with-gift.png'
import yardsale from '@/assets/pngs/yardsale.png'
import denied from '@/assets/pngs/access-denied.png'
import css from './Error.module.css';

export default function ErrorPage({ type = 'default' }: { type?: string }) {
  const message = {
    default: 'Unable to find the page you\'re looking for...',
    product: 'Looks like this item cannot be found...',
     market: 'Looks like slim pickings, come back another day',
      inbox: 'Access Denied. Please Log In',
  }[type]

  const image = {
    default: ghost,
    product: man,
     market: yardsale,
      inbox: denied,
  }[type]

  return (
    <div className={css.error}>
      <img src={image} alt='error logo' />
      <h1>{message}</h1>
    </div>
  );
}
