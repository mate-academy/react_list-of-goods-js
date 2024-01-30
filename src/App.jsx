
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
// import { set } from 'cypress/types/lodash';
// import { link } from 'fs';

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

  function action(initialValue, howToSotr, reverse) {
    const sortedGoods = [...initialValue];

    if (howToSotr === 'sortAlphabet') {
      sortedGoods.sort((el1, el2) => el1.localeCompare(el2));
    } else if (howToSotr === 'sortLength') {
      sortedGoods.sort((el1, el2) => el1.length - el2.length);
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  const toRender = action(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('sortAlphabet')}
          type="button"
          className={`button is-info ${sortField === 'sortAlphabet' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('sortLength')}
          type="button"
          className={`button is-success ${sortField === 'sortLength' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        <button
          onClick={() => {
            setSortField('');
            setIsReversed(false);
          }}
          type="button"
          className={`button is-danger is-light ${!(sortField !== '' || isReversed === true) && 'hiden'}`}
        >
          Reset
        </button>
      </div>

      <ul>
        {toRender.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
};
