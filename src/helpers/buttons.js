import cn from 'classnames';
import { ALPHABET, lENGTH } from '../constants/constants';

export const getButtonsList = (
  sortField,
  onSortByAlphabetClick,
  onSortByLengthClick,
  onReverseClick,
  onResetClick,
  isStateChanged,
  reversed,
) => [
  {
    text: 'Sort alphabetically',
    onClick: onSortByAlphabetClick,
    classNames: cn('button', 'is-info', 'is-active', {
      'is-light': sortField !== ALPHABET,
    }),
  },
  {
    text: 'Sort by length',
    onClick: onSortByLengthClick,
    classNames: cn('button', 'is-success', {
      'is-light': sortField !== lENGTH,
    }),
  },
  {
    text: 'Reverse',
    onClick: onReverseClick,
    classNames: cn('button', 'is-warning', {
      'is-light': !reversed,
    }),
  },
  {
    text: 'Reset',
    onClick: onResetClick,
    classNames: 'button is-danger is-light',
    condition: isStateChanged,
  },
];
