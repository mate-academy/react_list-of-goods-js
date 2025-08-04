const GoodsList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      <li key={good} className="Good">
        {good}
      </li>
    ))}
  </ul>
);

export default GoodsList;
