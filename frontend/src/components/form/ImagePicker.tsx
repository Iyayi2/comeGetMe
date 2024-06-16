import css from './ImagePicker.module.css';

export default function ImagePicker() {
  return (
    <label htmlFor='image' className={css['image-picker']}>
      <input id='image' name='image' type='file' accept='image/*' />
      Add Pic
    </label>
  );
}
