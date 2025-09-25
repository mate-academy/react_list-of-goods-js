export const SortList = ({ list }) => {
  return (
    <ul>
      {list.map(good => (
        <li className="Good" data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};
