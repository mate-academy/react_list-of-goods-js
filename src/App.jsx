import { useState } from 'react';

import 'bulma/css/bulma.css';

import { ALPHABET, lENGTH } from './constants/constants';

import { GoodsList } from './components/GoodsList/GoodsList';

import { getButtonsList } from './helpers/buttons';

import { goodsFromServer } from './api/goodsList';

import './App.scss';


export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const isResetBtnVisible = sortField || reversed;

  const onSortByAlphabetClick = () => {
    const sortedGoods = [...goods].sort((a, b) =>
      reversed ? b.localeCompare(a) : a.localeCompare(b),
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
      reversed ? b.length - a.length : a.length - b.length,
    );

    setGoods(sortedGoods);
    setSortField(lENGTH);
  };

  const onReverseClick = () => {
    setGoods([...goods].reverse());

    setReversed(!reversed);
  };

  const buttonList = getButtonsList(
    sortField,
    onSortByAlphabetClick,
    onSortByLengthClick,
    onReverseClick,
    onResetClick,
    isResetBtnVisible,
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
