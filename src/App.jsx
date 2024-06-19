import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { GoodList } from './components/GoodList';

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

const SORT_FIELD_ALPHABET = 'alph';
const SORT_FIELD_LENGTH = 'length';
const REVERSE = 'reverse';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');

  const sortAlph = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
    );
    setSortField('alph');
  };

  const sortLength = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
    );
    setSortField('length');
  };

  const reverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setSortField('reverse');
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length', 'Reverse'].map(field => (
          <button
            key={field}
            type="button"
            className={cn(
              'button',
              { 'is-info': field === 'Sort alphabetically' },
              { 'is-success': field === 'Sort by length' },
              { 'is-warning': field === 'Reverse' },
              {
                'is-light':
                  (sortField !== SORT_FIELD_ALPHABET &&
                    field === 'Sort alphabetically') ||
                  (sortField !== SORT_FIELD_LENGTH &&
                    field === 'Sort by length') ||
                  (sortField !== REVERSE && field === 'Reverse'),
              },
            )}
            onClick={
              (field === 'Sort alphabetically' && sortAlph) ||
              (field === 'Sort by length' && sortLength) ||
              (field === 'Reverse' && reverse)
            }
          >
            {field}
          </button>
        ))}
        {(sortField === SORT_FIELD_ALPHABET ||
          sortField === SORT_FIELD_LENGTH ||
          sortField === REVERSE) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger
            is-light"
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={visibleGoods} />
    </div>
  );
};
