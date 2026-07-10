import { GoodsItem } from '../GoodsItem/GoodsItem';

export const GoodsList = ({ goods }) => {
  return (
    <ul>
      {goods.map((good) => (
        <GoodsItem good={good} key={Math.floor(Math.random() * 10000)} />
      ))}
    </ul>
  );
};
