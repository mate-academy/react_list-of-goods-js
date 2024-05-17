import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodList } from './components/goodList/goodList';

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

const ALPHABET = 'alphabetically';
const LENGTH = 'by-length';
const REVERSE = 'reverse';

export const App = () => {
  const [sortBy, setSortBy] = useState('');

  const visibleGoods = () => {
    switch (sortBy) {
      case ALPHABET:
        return [...goodsFromServer].sort((good1, good2) =>
          good1.localeCompare(good2),
        );

      case LENGTH:
        return [...goodsFromServer].sort((a, b) => a.length - b.length);

      case REVERSE:
        return [...goodsFromServer].reverse();

      default:
        return [...goodsFromServer];
    }
  };

  const sorted = visibleGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== ALPHABET,
          })}
          onClick={() => setSortBy(ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== LENGTH,
          })}
          onClick={() => setSortBy(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': sortBy !== REVERSE,
          })}
          onClick={() => setSortBy(REVERSE)}
        >
          Reverse
        </button>

        {sortBy !== '' && (
          <button
            type="button"
            className={classNames('button is-danger', {
              'is-light': sortBy !== '',
            })}
            onClick={() => setSortBy('')}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={sorted} />
    </div>
  );
};
