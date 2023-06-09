/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-shorthand */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import ProductInfo from './productInfo';
import StyleSelect from './styleSelect';
import Gallery from './Gallery';
import AddToCart from './addToCart';
import { styleContext } from '../App';
import Stars from '../stars';
import Description from './productInfo/description';

export default function Overview({ avgRating }) {
  const {
    style,
    setStyle,
    styles,
    product,
  } = React.useContext(styleContext);

  const [gallery, setGallery] = React.useState([]);
  const [display, setDisplay] = React.useState('');
  const [sizes, setSizes] = React.useState([]);

  React.useEffect(() => {
    if (style.photos) {
      setGallery(style.photos);
      setDisplay(style.photos[0]);
    }
    if (style.skus) {
      const sizesArr = [];
      for (const key in style.skus) {
        if (style.skus[key].quantity) {
          sizesArr.push(
            {
              key: key,
              size: style.skus[key].size,
              quantity: style.skus[key].quantity,
            },
          );
        }
      }
      setSizes(sizesArr);
    }
  }, [style]);

  return (
    <div data-testid="overview">

      <div className="overview">
        <div className="Description">
          <div className="stylesinfo">
            <div data-testid="productName" className="section-head" style={{ paddingTop: '5rem' }}>
              <div id="product-name">
                {product.name}
                <p data-testid="category" className="sub-head">
                  in: {product.category}
                </p>
              </div>
              <div style={{ width: '0rem' }}>
                <Stars avgRating={avgRating} />
              </div>
            </div>
            <ProductInfo />
            <StyleSelect styles={styles} />
            <AddToCart sizes={sizes} />
          </div>

        </div>

        <Gallery data-testid="gallery" gallery={gallery} display={display} setDisplay={setDisplay} />

      </div>
      <Description />
    </div>
  );
}
