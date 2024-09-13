import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css['footer']}>
      <h2>Images provided by</h2>
      <div>
        <a href='https://www.freepik.com/'  target="_blank">FreePik </a>
        <a href='https://www.pngwing.com/'  target="_blank">PNGWing </a>
        <a href='https://www.cleanpng.com/' target="_blank">CleanPNG</a>
      </div>
    </footer>
  );
}
