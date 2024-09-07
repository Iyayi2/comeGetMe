import woman from '@/assets/pngs/autumn-woman.png';
import leaves from '@/assets/pngs/leaves.png';
import balloons from '@/assets/pngs/balloons.png';
import css from './ImageFocus.module.css';

export default function ImageFocus() {
  return (
    <div className={css['image-focus']}>
      <p>
      <img src={balloons} alt='leaves' />
        <span>Advertise</span>
        <span>Freely</span>
      </p>
      <img src={woman} alt='woman in autumn' />
      <p>
        <img src={leaves} alt='leaves' />
        <span>Reach Your</span>
        <span>Audience</span>
      </p>
    </div>
  );
}
