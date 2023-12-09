import { Good } from '../Good';

export function GoodList({ goods }) {
  return (
    <ul>
      {goods.map(good => (
        <Good good={good} key={good} />
      ))}
    </ul>
  );
}
