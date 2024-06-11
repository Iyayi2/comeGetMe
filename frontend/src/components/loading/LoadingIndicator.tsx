import css from './LoadingIndicator.module.css';

export default function LoadingIndicator() {
  return (
    <div className={css['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
