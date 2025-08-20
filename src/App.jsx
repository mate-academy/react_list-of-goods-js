/* eslint-disable default-case */
import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const buttons = [
  { id: 'name', value: 'Sort alphabetically', class: 'is-info' },
  { id: 'length', value: 'Sort by length', class: 'is-success' },
];

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

export const GoodList = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => (
      // eslint-disable-next-line prettier/prettier
      <li key={good} data-cy="Good" className="Good">
        {good}
      </li>
    ))}
  </ul>
);

export const isOrigin = (a, b) => {
  return a === '' && b === false;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  let visibleGoods = [...goodsFromServer];

  const handleReseted = () => {
    setSortField('');
    setReversed(false);
  };

  if (sortField) {
    visibleGoods = visibleGoods.slice().sort((a, b) => {
      switch (sortField) {
        case 'length':
          return a.length - b.length;
        case 'name':
          return a.localeCompare(b);
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(butt => (
          <button
            type="button"
            key={butt.id}
            className={classNames('button', butt.class, {
              'is-light': sortField !== butt.id,
            })}
            onClick={() => setSortField(butt.id)}
          >
            {butt.value}
          </button>
        ))}

        <button
          type="button"
          key="reverse"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {!isOrigin(sortField, reversed) && (
          <button
            type="button"
            key="reset"
            className="button is-danger is-light"
            onClick={handleReseted}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
