import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const SORT_BY_LENGTH = 'length';
  const SORT_BY_ALPHABETH = 'alphabeth';

  let isChanged = false;

  let preparedGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'length':
        return good1.length - good2.length;
      case 'alphabeth':
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });

  if (sortField !== '' || reversed !== false) {
    isChanged = true;
  } else {
    isChanged = false;
  }

  if (reversed) {
    preparedGoods = preparedGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': sortField !== SORT_BY_ALPHABETH,
          })}
          onClick={() => setSortField(SORT_BY_ALPHABETH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': reversed !== true,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isChanged === true ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortField('');
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
