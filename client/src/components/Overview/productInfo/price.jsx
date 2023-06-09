/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { styleContext } from '../../App';

export default function Price() {
  const { style } = React.useContext(styleContext);
  // if onSale cross out default price and display sale price

  return (
    style.sale_price
      ? (
        <>
          <div className="info-text" style={{ fontSize: '2rem' }}> {`$${style.sale_price}`} </div>
          <strike className="info-text slash-price" style={{ fontSize: '2rem' }}> {`$${style.original_price}`} </strike>
        </>
      )
      : <div className="info-text" style={{ fontSize: '2rem' }}> {`$${style.original_price}`} </div>
  );
}
