import { motion } from 'framer-motion';
import { useState } from 'react';
import { Error } from './Input';
import css from './ImagePicker.module.css';

export default function ImagePicker({ error }: { error: object | null }) {
  const [image, setImage] = useState<string | null>(null);
  const hasError = error?.['imageUrl' as keyof typeof error];
  const delay = Object.keys(error || {}).indexOf('imageUrl') * 0.1; // converts object to array, then finds index of current element

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
    } else {
      setImage(null);
    }
  };

  return (
    <div className={css['image-picker']}>
      <motion.p animate={{ color: hasError ? '#FF0000' : '#000' }} transition={{ duration: 0.5, delay }}>
        <span>picture </span>
        <Error key={hasError} error={hasError} delay={delay} />
      </motion.p>
      <label htmlFor='image'>
        <input id='image' name='image' type='file' accept='image/*' onChange={changeHandler} />
        {image ? <img src={image} alt='Selected' /> : 'Click to Upload'}
      </label>
    </div>
  );
}
