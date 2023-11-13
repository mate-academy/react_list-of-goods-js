import { ComponentItem } from '../ComponentItem/ComponentItem';

export const ComponentList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <ComponentItem
        good={good}
        key={good}
      />
    ))}
  </ul>
);
