import { GoodCard } from '../goodCard/GoodCard';

export const GoodList = ({ goods }) => {
  return (
    <section className="TodoList">
      <ul>
        {goods.map(good => (
          <GoodCard good={good} key={good} />
        ))}
      </ul>
    </section>
  );
};
