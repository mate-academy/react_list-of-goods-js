import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortField, setSortField] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [reverse, setReverse] = useState(false);

  const toSort = (field) => {
    let sortedGoods = [...goods];
    switch (field) {
      case 'Sort alphabetically':
        sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case 'Sort by length':
        sortedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      case 'Reverse':
        sortedGoods.reverse();
        setReverse(!reverse)
        break;
      case 'Reset':
        sortedGoods = [...goodsFromServer];
        break;
      default:
        break;
    }
    setGoods(sortedGoods);
  };

  const handleSort = (field) => {
    setSortField(field);
    toSort(field);
    if (field === 'Reset') {
      setShowReset(false);
    } else {
      setShowReset(true);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length', 'Reverse'].map(field => (
          <button
            key={field}
            className={classNames(
              'button',
              {
                'is-info': field === 'Sort alphabetically',
                'is-success': field === 'Sort by length',
                'is-warning': field === 'Reverse',
                'is-light': sortField !== field
              }
            )}
            onClick={() => handleSort(field)}
          >
            {field}
          </button>
        ))}
        {showReset && (
          <button
            className={classNames(
              'button is-danger is-light'
            )}
            onClick={() => handleSort('Reset')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
