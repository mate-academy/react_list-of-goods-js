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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const [isLight, setIsLight] = useState('');

  let visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods = visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const goodsIsEqual = Object.keys(visibleGoods).every(
    key => visibleGoods[key] === goodsFromServer[key],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
            setIsLight('alphabetically');
          }}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': isLight !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
            setIsLight('length');
          }}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': isLight !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversed(!reversed);
          }}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {!goodsIsEqual && (
          <button
            onClick={() => {
              setSortField('');
              setReversed(false);
              setIsLight('');
            }}
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
