import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortFiled, setSortFiled] = useState('');
  const [reverseField, setReverseFiled] = useState(false);
  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortFiled) {
      case SORT_BY_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_BY_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverseField) {
    visibleGoods.reverse();
  }

  const reset = () => {
    setSortFiled('');
    setReverseFiled(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortFiled(SORT_BY_ALPHABET)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortFiled !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortFiled(SORT_BY_LENGTH)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortFiled !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseFiled(!reverseField)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(sortFiled || reverseField) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
