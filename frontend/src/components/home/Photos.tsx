import stock1 from '@/assets/stock/stock01.jpg';
import stock2 from '@/assets/stock/stock02.jpg';
import stock3 from '@/assets/stock/stock03.jpg';
import stock4 from '@/assets/stock/stock04.jpg';
import css from './Photos.module.css'

export default function Photos() {
  return (
    <div className={css.container}>
      <div className={css.row}>
        <img src={stock1} alt='stock' />
        <img src={stock2} alt='stock' />
      </div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Bebas Neue' }}>▢▢▢ Come Get Me ▫◻</h1>
      <div className={css.row}>
        <img src={stock3} alt='stock' />
        <img src={stock4} alt='stock' />
      </div>
    </div>
  );
}
