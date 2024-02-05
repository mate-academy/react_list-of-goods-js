import { goodsFromServer, btns } from '../assets/arrsBtnsGoodsInStrs';

export const goodsFromServerModObj
= goodsFromServer.map(item => (
  { id: goodsFromServer.indexOf(item) + 1, name: item }));

export const buttons = btns.map(item => (
  { id: btns.indexOf(item) + 1, name: item }
));
