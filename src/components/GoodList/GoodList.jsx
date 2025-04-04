export const GoodList = ({ goods }) => (
  <div className="GoodList">
    {goods.map(good => (
      <ul key={good}>
        <li data-cy="Good">{good}</li>
      </ul>
    ))}
  </div>
);
