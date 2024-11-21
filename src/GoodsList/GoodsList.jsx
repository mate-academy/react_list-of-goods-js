import { GoodsCard } from '../GoodCard/GoodsCard';

export const GoodsList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good.id}>
          <GoodsCard goods={good} />
        </li>
      ))}
    </ul>
  );
};
