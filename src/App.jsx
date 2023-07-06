import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);

  const onClickReverse = () => {
    setReverseField(!reverseField);
  };

  const onReset = () => {
    setSortField('');
    setReverseField(false);
  };

  function prepareGoods(sortBy) {
    const allGoods = [...goodsFromServer];

    if (sortBy === SORT_FIELD_ALPHABET) {
      return allGoods.sort();
    }

    if (sortBy === SORT_FIELD_LENGTH) {
      return allGoods.sort(
        (firstGood, nextGood) => firstGood.length - nextGood.length,
      );
    }

    return allGoods;
  }

  const preparedGoods = prepareGoods(sortField);

  if (reverseField) {
    preparedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET })}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverseField })}
          onClick={onClickReverse}
        >
          Reverse
        </button>

        {(sortField || reverseField)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={onReset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
