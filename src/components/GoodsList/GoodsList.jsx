const GoodsList = ({ goods }) => (
  <ul>
    {goods.map(el => (
      <li data-cy="Good" key={el}>
        {el}
      </li>
    ))}
  </ul>
);

export default GoodsList;
