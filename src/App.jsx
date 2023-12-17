import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_NAME = 'name';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField === SORT_NAME) {
    preparedGoods.sort((prod1, prod2) => prod1.localeCompare(prod2));
  }

  if (sortField === SORT_LENGTH) {
    preparedGoods.sort(
      (product1, product2) => product1.length - product2.length
    );
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isChanged = sortField !== '' || isReversed;

  const onReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== SORT_NAME },
            'button is-info'
          )}
          onClick={() => {setSortField(SORT_NAME)}}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== SORT_LENGTH },
            'button is-success'
          )}
          onClick={() => {setSortField(SORT_LENGTH)}}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': isReversed === false },
            'button is-warning'
          )}
          onClick={() => {
            setIsReversed((prevIsReversed) => !prevIsReversed);
          }}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((item) => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
