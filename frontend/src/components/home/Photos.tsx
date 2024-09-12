import stock1 from '@/assets/logo/photo1.jpg';
import stock2 from '@/assets/logo/photo2.jpg';
import stock3 from '@/assets/logo/photo3.jpg';
import stock4 from '@/assets/logo/photo4.jpg';
import css from './Photos.module.css'

export default function Photos() {
  return (
    <div className={css.container}>
      <div className={css.row}>
        <img src={stock1} alt='stock' />
        <img src={stock2} alt='stock' />
      </div>
      <h1>▢▢▢ Come Get Me ▫◻</h1>
      <div className={css.row}>
        <img src={stock3} alt='stock' />
        <img src={stock4} alt='stock' />
      </div>
    </div>
  );
}
