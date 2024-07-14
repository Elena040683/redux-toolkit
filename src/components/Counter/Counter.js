import s from './Counter.module.scss';

export function Counter ({value, handleDecrement, handleIncrement}){
  return (
  <div className={s.counter}>
  <button 
    className={`${s.btn} ${s.decrementBtn}`}
    onClick={handleDecrement}>
      -
  </button>
  <p>{value}</p>
  <button 
    className={`${s.btn} ${s.incrementBtn}`}
    onClick={handleIncrement}>
      +
  </button>
  </div>
  )
}