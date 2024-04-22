import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList/GoodsList';
import { goodsFromServer } from './api/goodsList';
import { buttons } from './helpers/buttons';
import { ALPHABET, lENGTH } from './constants/constants';

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const isStateChanged = sortField || reversed;

  const onSortByAlphabetClick = () => {
    const sortedGoods = [...goods].sort((a, b) =>
      !reversed ? a.localeCompare(b) : b.localeCompare(a),
    );

    setGoods(sortedGoods);
    setSortField(ALPHABET);
  };

  const onResetClick = () => {
    setGoods(goodsFromServer);
    setSortField('');
    setReversed(false);
  };

  const onSortByLengthClick = () => {
    const sortedGoods = [...goods].sort((a, b) =>
      !reversed ? a.length - b.length : b.length - a.length,
    );

    setGoods(sortedGoods);
    setSortField(lENGTH);
  };

  const onReverseClick = () => {
    setGoods([...goods].reverse());

    setReversed(!reversed);
  };

  const buttonList = buttons(
    sortField,
    onSortByAlphabetClick,
    onSortByLengthClick,
    onReverseClick,
    onResetClick,
    isStateChanged,
    reversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        {buttonList.map(
          button =>
            button.condition !== false && (
              <button
                key={button.text}
                onClick={button.onClick}
                type="button"
                className={button.classNames}
              >
                {button.text}
              </button>
            ),
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
