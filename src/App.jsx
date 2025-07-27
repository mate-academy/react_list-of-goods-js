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
  const [goodsData, setGoodsData] = useState(goodsFromServer);
  const [activeButton, setActiveButton] = useState(''); // '', 'length', 'alphabetically', 'Reverse'

  function alphabeticSort() {
    const sortedGoodsData = [...goodsData].sort();

    setGoodsData(sortedGoodsData);
    setActiveButton('alphabetically');
  }

  function lengthSort() {
    const sortedLengthGoodsData = [...goodsData].sort(
      (goods1, goods2) => goods1.length - goods2.length,
    );

    setGoodsData(sortedLengthGoodsData);
    setActiveButton('length');
  }

  function resetButton() {
    setGoodsData([...goodsFromServer]);
    setActiveButton('reset');
  }

  function reverseGoods() {
    const reversedGoodsData = [...goodsData].reverse();

    setGoodsData(reversedGoodsData);
    setActiveButton('reverse');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => alphabeticSort()}
          className={`button is-info ${
            activeButton === 'alphabetically' ? '' : 'is-light'
          }`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => lengthSort()}
          className={`button is-info ${activeButton === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={`button is-info ${activeButton === 'reverse' ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={resetButton}
          className={`button is-info ${activeButton === 'reset' ? '' : 'is-light'}`}
        >
          Reset
        </button>
      </div>

      <ul>
        {goodsData.map(str => (
          <li key={str} data-cy="Good">
            {str}
          </li>
        ))}
      </ul>
    </div>
  );
};
