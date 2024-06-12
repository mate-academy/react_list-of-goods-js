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

export const GoodsList = ({ goods }) => (
  <>
    {goods.map(good => (
      <li data-cy="Good">{good}</li>
    ))}
  </>
);

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let VisibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'alphabet':
        return good1.localeCompare(good2);
      case 'length':
        return good1.length - good2.length;
      case 'reset':
        return (VisibleGoods = goodsFromServer);
      default:
        return 0;
    }
  });

  if (isReversed) {
    VisibleGoods.reverse();
  }

  const reverse = () => {
    setIsReversed(prevState => !prevState);
  };

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
          onClick={() => setSortField('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortField !== '' || isReversed === true ? (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        <GoodsList goods={VisibleGoods} />
      </ul>
    </div>
  );
};
