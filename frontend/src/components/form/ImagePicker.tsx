import { ChangeEvent, useState } from 'react';
import { APIError } from '@/hooks/useHTTP';
import css from './ImagePicker.module.css';

export default function ImagePicker({ error }: { error: APIError }) {
  const [image, setImage] = useState<string | null>(null);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
    } else {
      setImage(null);
    }
  };

  return (
    <div className={css['image-picker']}>
      <p style={{ color: error?.['imageUrl' as keyof APIError] ? 'red' : '' }}>picture {error?.['imageUrl' as keyof APIError]}</p>
      <label htmlFor='image'>
        <input id='image' name='image' type='file' accept='image/*' onChange={changeHandler} />
        {image ? <img src={image} alt='Selected' /> : 'Click to Upload'}
      </label>
    </div>
  );
}
