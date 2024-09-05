import Banner from '@/components/home/Banner';
import Photos from '@/components/home/Photos';

export default function HomePage() {
  return (
    <section
      style={{
              display: 'flex',
        flexDirection: 'column',
                  gap: '1rem',
               margin: '1rem auto',
      }}
    >
      <Photos />
      <Banner />
    </section>
  );
}
