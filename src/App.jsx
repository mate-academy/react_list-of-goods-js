import 'bulma/css/bulma.css';
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

export const sortList = [
  {
    id: 1,
    title: 'Sort alphabetically',
    className: 'is-info',
  },
  {
    id: 2,
    title: 'Sort by length',
    className: 'is-success',
  },
  {
    id: 3,
    title: 'Reverse',
    className: 'is-warning',
  },
];

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [isReverse, setIsReverse] = useState(false);

  const visibleList = [...goodsFromServer].sort((a, b) => {
    switch (sortField) {
      case 'Sort alphabetically':
        return a.localeCompare(b);
      case 'Sort by length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    visibleList.reverse();
  }

  const handleSort = field => {
    switch (field) {
      case 'Reverse':
        setIsReverse(!isReverse);
        break;
      case 'Reset':
        setSortField(null);
        setIsReverse(false);
        break;
      default:
        setSortField(field);
    }
  };

  const isOriginal =
    visibleList.length === goodsFromServer.length &&
    visibleList.every((v, i) => v === goodsFromServer[i]);

  return (
    <div className="section content">
      <div className="buttons">
        {sortList.map(field => (
          <button
            key={field.id}
            type="button"
            className={`button ${field.className} ${
              field.title === sortField ||
              (field.title === 'Reverse' && isReverse)
                ? ''
                : 'is-light'
            }`}
            onClick={() => handleSort(field.title)}
          >
            {field.title}
          </button>
        ))}

        {!isOriginal && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort('Reset')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );

  /*  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className="button is-info is-light">
          Sort alphabetically
        </button>

        <button type="button" className="button is-success is-light">
          Sort by length
        </button>

        <button type="button" className="button is-warning is-light">
          Reverse
        </button>

        <button type="button" className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
        <li data-cy="Good">Dumplings</li>
        <li data-cy="Good">Carrot</li>
        <li data-cy="Good">Eggs</li>
        <li data-cy="Good">Ice cream</li>
        <li data-cy="Good">Apple</li>
        <li data-cy="Good">...</li>
      </ul>
    </div>
  );  */
};
