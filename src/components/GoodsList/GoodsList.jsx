import { GoodCard } from '../GoodCard';

export function GoodsList({ goods }) {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good.id}>
          <GoodCard good={good} />
        </li>
      ))}
    </ul>
  );
}
