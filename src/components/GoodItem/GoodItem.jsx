export const GoodItem = ({ good }) => {
  return (
    <li data-cy="Good" key={good}>
      {good}
    </li>
  );
};
