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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'Sort alphabetically':
          return good1.localeCompare(good2);
        case 'Sort by length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length', 'Reverse', 'Reset'].map(
          field =>
            !(field === 'Reset' && !sortField && !reversed) && (
              <button
                onClick={() => {
                  if (field === 'Reverse') {
                    setReversed(!reversed);

                    return;
                  }

                  if (field === 'Reset') {
                    setReversed(false);
                    setSortField('');

                    return;
                  }

                  setSortField(field);
                }}
                type="button"
                className={`button is-info ${
                  field === sortField || (field === 'Reverse' && reversed)
                    ? ''
                    : 'is-light'
                }`}
                key={field}
              >
                {field}
              </button>
            ),
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
