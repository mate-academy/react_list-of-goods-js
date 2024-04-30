import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';
import cn from 'classnames';

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
  const ALPHABET_SORT_CONDITION = 'alphabet';
  const LENGTH_SORT_CONDITION = 'length';

  const [sortCondition, setSortCondition] = useState('');
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    const sortedGoods = [...visibleGoods];

    switch (sortCondition) {
      case ALPHABET_SORT_CONDITION:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case LENGTH_SORT_CONDITION:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    setVisibleGoods(sortedGoods);
  }, [sortCondition, visibleGoods]);

  const handleReset = () => {
    setVisibleGoods(goodsFromServer);
    setSortCondition('');
    setIsReversed(false);
  };

  const handleReverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortCondition !== ALPHABET_SORT_CONDITION,
          })}
          onClick={() => setSortCondition(ALPHABET_SORT_CONDITION)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortCondition !== LENGTH_SORT_CONDITION,
          })}
          onClick={() => setSortCondition(LENGTH_SORT_CONDITION)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
