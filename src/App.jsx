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

const SORT_FIELD_RESET = '';
const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [stateReverse, setStateReverse] = useState(false);
  const showResetButton = sortField || stateReverse;

  const sortedgoods = [...goods];

  // eslint-disable-next-line default-case
  switch (sortField) {
    case SORT_FIELD_NAME:
      sortedgoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_FIELD_LENGTH:
      sortedgoods.sort((good1, good2) => good1.length - good2.length);
      break;
  }

  if (stateReverse) {
    sortedgoods.reverse();
  }

  function setReset() {
    setSortField(SORT_FIELD_RESET);
    setGoods([...goodsFromServer]);
    setStateReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_NAME)}
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setStateReverse(prev => !prev)}
          className={classNames('button is-info', {
            'is-light': !stateReverse,
          })}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            onClick={setReset}
            className={classNames('button is-info', {
              'is-light': sortField !== SORT_FIELD_RESET,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedgoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
