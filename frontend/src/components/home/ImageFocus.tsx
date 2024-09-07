import woman from '@/assets/pngs/autumn-woman.png';
import css from './ImageFocus.module.css';

export default function ImageFocus() {
  return (
    <div className={css['image-focus']}>
      <p>
        <span>Advertise</span>
        <span>Freely</span>
      </p>
      <img src={woman} alt='woman in autumn' />
      <p>
        <span>Reach Your</span>
        <span>Audience</span>
      </p>
    </div>
  );
}
