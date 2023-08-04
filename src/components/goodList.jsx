import { Good } from './good';

export const GoodList = ({ goods }) => (
  goods.map(({ name, id }) => (
    <Good
      key={id}
      name={name}
    />
  ))
);
