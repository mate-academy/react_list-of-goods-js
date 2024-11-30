import { Good } from '../Good/Good';

export const GoodList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <Good key={good.internalId} good={good} />
      ))}
    </ul>
  );
};
