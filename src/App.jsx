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
  const [initialGoods] = useState(
    () => goodsFromServer.map((name, idx) => ({ id: idx + 1, name })),
    // eslint-disable-next-line function-paren-newline
  );

  const [goods, setGoods] = useState(() => initialGoods.map(g => ({ ...g })));

  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const handleSortAlphabetically = () => {
    setSortField('alphabetical');
    setReversed(false);
    setGoods(prev => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleSortByLength = () => {
    setSortField('length');
    setReversed(false);
    setGoods(prev => [...prev].sort((a, b) => a.name.length - b.name.length));
  };

  const handleReverse = () => {
    setGoods(prev => [...prev].reverse());
    setReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortField('');
    setReversed(false);
    setGoods(initialGoods.map(g => ({ ...g })));
  };

  const isChanged = !goods.every((item, i) => item.id === initialGoods[i].id);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== 'alphabetical',
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(g => (
          <li key={g.id} data-cy="Good">
            {g.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
