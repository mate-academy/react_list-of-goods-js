import { GoodInfo } from '../GoodInfo';

export const GoodList = ({ goods }) => (
  <>
    <ul>
      {goods?.map(good => (
        <GoodInfo good={good} />
      ))}
    </ul>
  </>
);
