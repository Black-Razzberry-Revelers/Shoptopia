import React from 'react';
import ProductInfo from './productInfo';
import StyleSelect from './styleSelect';
import Gallery from './Gallery';
import AddToCart from './addToCart';
import { productsData, productData, stylesData } from './mockData';

export const styleContext = React.createContext(null);

export default function Overview() {
  const [styles, setStyles] = React.useState(stylesData.results);
  const [style, setStyle] = React.useState(styles[0]);
  const [gallery, setGallery] = React.useState(style.photos);
  const [display, setDisplay] = React.useState(gallery[0].url);

  React.useEffect(() => {
    setGallery(style.photos);
    setDisplay(style.photos[0].url);
  }, [style]);

  React.useEffect(() => {
    // GET
    setStyles(stylesData.results);
    console.log('rendering');
    styles.forEach((option, i) => {
      if (option['default?']) {
        const defaultStyle = option;
        defaultStyle.index = i;
        setStyle(defaultStyle);
      }
    });
  }, []);

  return (
    <styleContext.Provider value={{ style, setStyle }}>
      <ProductInfo />
      <div className="row2">
        <StyleSelect styles={styles} />
        <Gallery gallery={gallery} display={display} setDisplay={setDisplay} />
      </div>
      <AddToCart />
    </styleContext.Provider>
  );
}
