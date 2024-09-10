import 'bulma/css/bulma.css';
import cn from 'classnames';
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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

  const sortGoods = (field, reverse = false) => {
    const sortedGoods = [...goodsFromServer];

    if (field === 'alphabet') {
      sortedGoods.sort((name1, name2) => {
        return name1.localeCompare(name2);
      });
    } else if (field === 'length') {
      sortedGoods.sort((name1, name2) => {
        return name1.length - name2.length;
      });
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
  };

  const handleSortAlphabetically = () => {
    setSortField('alphabet');
    setIsReversed(false);
    sortGoods('alphabet', false);
  };

  const handleSortLength = () => {
    setSortField('length');
    setIsReversed(false);
    sortGoods('length', false);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
    sortGoods(sortField, !isReversed);
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
    setVisibleGoods([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
