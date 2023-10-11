import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD = {
  SORT_ALPHABETICALLY: 'Sort alphabetically',
  SORT_BY_LENGTH: 'Sort by length',
  REVERSE: 'Reverse',
};

export const App = () => {
  const [arrayValues, setArrayValues] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabet = () => {
    const alphabetSort = [...arrayValues].sort();

    if (isReversed) {
      alphabetSort.reverse();
    }

    setArrayValues(alphabetSort);
    setSortField(SORT_FIELD.SORT_ALPHABETICALLY);
  };

  const sortByLength = () => {
    const lenghtSort = [...goodsFromServer].sort(
      (value1, value2) => value1.length - value2.length,
    );

    if (isReversed) {
      lenghtSort.reverse();
    }

    setArrayValues(lenghtSort);
    setSortField(SORT_FIELD.SORT_BY_LENGTH);
  };

  const reset = () => {
    setArrayValues(goodsFromServer);
    setSortField('');

    if (isReversed) {
      setIsReversed(false);
    }
  };

  const reverse = () => {
    setArrayValues([...arrayValues].reverse());
    setIsReversed(current => !current);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={sortField === SORT_FIELD.SORT_ALPHABETICALLY ? (
            'button is-info'
          ) : (
            'button is-info is-light'
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={sortField === SORT_FIELD.SORT_BY_LENGTH ? (
            'button is-success'
          ) : (
            'button is-success is-light'
          )}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={isReversed ? (
            'button is-warning'
          ) : (
            'button is-warning is-light'
          )}
        >
          Reverse
        </button>

        {sortField !== '' || isReversed ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          null
        )}

      </div>
      {arrayValues.map(item => (
        <ul key={item}>
          <li data-cy="Good">{item}</li>
        </ul>
      ))}
    </div>
  );
};
