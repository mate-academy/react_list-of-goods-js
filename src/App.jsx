import { useState } from 'react';
import classNames from 'classnames';
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

const SORT_ABC = 'abc';
const SORT_LENGTH = 'length';

function prepareGoods(goods, { sortField, reversed }) {
  let copiedGoods = [...goods];

  if (sortField) {
    copiedGoods = copiedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_LENGTH:
          return good1[sortField] - good2[sortField];

        case SORT_ABC:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    copiedGoods = copiedGoods.reverse();
  }

  return copiedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const preparedGoods = prepareGoods(goodsFromServer, { sortField, reversed });

  const getReset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_ABC,
          })}
          onClick={() => setSortField(SORT_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField !== '' || reversed ? (
          <button
            type="button"
            className={classNames('button is-success', {
              'is-light': sortField !== '' || reversed,
            })}
            onClick={getReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={crypto.randomUUID()}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
