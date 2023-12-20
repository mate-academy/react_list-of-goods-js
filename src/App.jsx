import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './Components/GoodList/GoodList';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

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

function getPreparedGoods(goods, { sortField, reversed }) {
  const preparedGoods = [...goods];
  const preparedForReverse = [...preparedGoods];
  const reversedGoods = preparedForReverse.reverse();

  if (!reversed) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    reversedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good2.localeCompare(good1);

        case SORT_FIELD_LENGTH:
          return good2.length - good1.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return reversedGoods;
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const [nameClicked, setNameClicked] = useState(false);
  const [resetState, setResetState] = useState(false);
  const [lengthClicked, setLengthClicked] = useState(false);
  const visibleGoods
  = getPreparedGoods(goodsFromServer, { sortField, reversed });

  function clickName() {
    const nameButton = document.getElementById('name');
    const lengthButton = document.getElementById('length');

    setSortField(SORT_FIELD_NAME);
    nameButton.classList.remove('is-light');
    setNameClicked(true);

    if (lengthClicked) {
      lengthButton.classList.add('is-light');
    }

    setResetState(true);
  }

  function clickLength() {
    const lengthButton = document.getElementById('length');
    const nameButton = document.getElementById('name');

    setSortField(SORT_FIELD_LENGTH);
    lengthButton.classList.remove('is-light');
    setLengthClicked(true);

    if (nameClicked) {
      nameButton.classList.add('is-light');
    }

    setResetState(true);
  }

  function clickReverse() {
    const reverseButton = document.getElementById('reverse');

    if (reversed) {
      reverseButton.classList.add('is-light');
      setReversed(false);
      if (!nameClicked && !lengthClicked) {
        setResetState(false);
      }
    } else {
      setReversed(true);
      reverseButton.classList.remove('is-light');
      setResetState(true);
    }
  }

  function clickReset() {
    const nameButton = document.getElementById('name');
    const lengthButton = document.getElementById('length');
    const reverseButton = document.getElementById('reverse');

    nameButton.classList.add('is-light');
    lengthButton.classList.add('is-light');
    reverseButton.classList.add('is-light');
    setReversed(false);
    setLengthClicked(false);
    setNameClicked(false);
    setSortField('');

    setResetState(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          id="name"
          className="button is-info is-light"
          onClick={() => clickName()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          id="length"
          className="button is-success is-light"
          onClick={() => clickLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          id="reverse"
          className="button is-warning is-light"
          onClick={() => clickReverse()}
        >
          Reverse
        </button>

        {
          resetState && (
            <button
              type="button"
              id="reset"
              className="button is-danger is-light"
              onClick={() => clickReset()}
            >
              Reset
            </button>
          )
        }
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
