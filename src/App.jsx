import 'bulma/css/bulma.css';
import classNames from 'classnames';
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

const SORT_FIELD_ASC = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const REVERSE = 'Reverse';
const RESET = 'Reset';

export const App = () => {
  const [goodsList, setGoodList] = useState([...goodsFromServer]);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const resetList = () => {
    setGoodList([...goodsFromServer]);
    setSortField('');
    setIsReversed(false);
  };

  const toggleReverseList = () => {
    setGoodList([...goodsList].reverse());
    setIsReversed(!isReversed);
  };

  const sortList = sortRule => {
    setGoodList(
      [...goodsList].sort((good1, good2) => {
        switch (sortRule) {
          case SORT_FIELD_ASC:
            return isReversed
              ? good2.localeCompare(good1)
              : good1.localeCompare(good2);

          case SORT_FIELD_LENGTH:
            return isReversed
              ? good2.length - good1.length
              : good1.length - good2.length;

          default:
            return 0;
        }
      }),
    );

    setSortField(sortRule);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ASC,
          })}
          onClick={() => sortList(SORT_FIELD_ASC)}
        >
          {SORT_FIELD_ASC}
        </button>
        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => sortList(SORT_FIELD_LENGTH)}
        >
          {SORT_FIELD_LENGTH}
        </button>
        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => toggleReverseList()}
        >
          {REVERSE}
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => resetList()}
          >
            {RESET}
          </button>
        )}
      </div>
      <ul>
        {goodsList.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
