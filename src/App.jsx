
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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function action(initialValue, howToSotr, reverse) {
    const sortedGoods = [...initialValue];
    const alphabetically = 'sortAlphabet';
    const lengthly = 'sortLength';

    switch (howToSotr) {
      case alphabetically:
        sortedGoods.sort((el1, el2) => el1.localeCompare(el2));
        break;
      case lengthly:
        sortedGoods.sort((el1, el2) => el1.length - el2.length);
        break;
      default:
        break;
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  const toRender = action(goodsFromServer, sortField, isReversed);

  const alphabetClass = classNames({
    button: true,
    'is-info': true,
    'is-light': !(sortField === 'sortAlphabet'),
  });

  const lengthClass = classNames({
    button: true,
    'is-success': true,
    'is-light': !(sortField === 'sortLength'),
  });

  const reverseClass = classNames({
    button: true,
    'is-warning': true,
    'is-light': (!isReversed),
  });

  const resetClass = classNames({
    button: true,
    'is-danger': true,
    'is-light': true,
    hiden: !(sortField !== '' || isReversed === true),
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('sortAlphabet')}
          type="button"
          className={alphabetClass}

        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('sortLength')}
          type="button"
          className={lengthClass}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={reverseClass}
        >
          Reverse
        </button>

        <button
          onClick={() => {
            setSortField('');
            setIsReversed(false);
          }}
          type="button"
          className={resetClass}
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
