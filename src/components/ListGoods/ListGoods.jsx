import { Good } from '../Good/Good';

export const ListGoods = ({ goods }) => {
  return (
    <ul>
      {goods.map(el => {
        return <Good el={el} key={el} />;
      })}
    </ul>
  );
};
