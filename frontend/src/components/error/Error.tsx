import ghost from '@/assets/pngs/ghost.png'
import man from '@/assets/pngs/man-with-gift.png'
import yardsale from '@/assets/pngs/yardsale.png'
import css from './Error.module.css';

export default function ErrorPage({ type = 'default' }: { type?: string }) {
  const message = {
    default: 'Unable to find the page you\'re looking for...',
         ad: 'Looks like this item cannot be found...',
     market: 'Looks like slim pickings, come back another day',
  }[type]

  const image = {
    default: ghost,
         ad: man,
     market: yardsale,
  }[type]

  return (
    <div className={css.error}>
      <img src={image} alt='error logo' />
      <h1>{message}</h1>
    </div>
  );
}
