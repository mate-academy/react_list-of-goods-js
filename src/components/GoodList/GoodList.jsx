import { GoodItem } from '../GoodItem';

export function GoodList({ goodsList }) {
  return (
    <ul>
      {goodsList.map(good => (
        <GoodItem good={good} />
      ))}
    </ul>
  );
}
