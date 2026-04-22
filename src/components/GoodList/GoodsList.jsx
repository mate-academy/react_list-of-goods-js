import { SortTypes } from '../../constants/sortTypes';

const Button = ({ name, color, isActive, onClick }) => {
  const classValue = `button ${color} ${isActive ? '' : 'is-light'}`;

  return (
    <button
      type="button"
      className={classValue}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export const GoodList = ({
  goods,
  sortBy,
  isReversed,
  onSort,
  onReverse,
  onReset,
  hasChanges,
}) => {
  const handleSortAlphabetical = () => onSort(SortTypes.ALPHABETICAL);
  const handleSortLength = () => onSort(SortTypes.LENGTH);

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          name="Sort alphabetically"
          color="is-info"
          isActive={sortBy === SortTypes.ALPHABETICAL}
          onClick={handleSortAlphabetical}
        />

        <Button
          name="Sort by length"
          color="is-success"
          isActive={sortBy === SortTypes.LENGTH}
          onClick={handleSortLength}
        />

        <Button
          name="Reverse"
          color="is-warning"
          isActive={isReversed}
          onClick={onReverse}
        />

        {hasChanges && (
          <Button
            name="Reset"
            color="is-danger"
            isActive
            onClick={onReset}
          />
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li
            key={good.idx}
            data-cy="Good"
          >
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
