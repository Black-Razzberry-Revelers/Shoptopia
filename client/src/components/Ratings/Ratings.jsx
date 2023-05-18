/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import fetcher from '../fetcher';
import ReviewsList from './sub-comps/ReviewsList';
import RatingBreakdown from './sub-comps/RatingBreakdown';
import ProductBreakdown from './sub-comps/ProductBreakdown';
import WriteNewReview from './sub-comps/WriteNewReview';
import averageRating from '../../calculateAvgRating';
import Stars from '../stars';

function Ratings(/* {product_id } */) {
  const [reviews, setReviews] = useState();
  const [metaData, setMetaData] = useState();
  const [moreReviews, setMoreReviews] = useState(false);
  const [writeReview, setWriteReview] = useState(false);
  const [sortReviews, setSortReviews] = useState('relevant');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetcher
      .getListReviews(1, 1000, sortReviews, 40346)
      .then((result) => {
        setReviews(result.data.results);
      })
      .catch((err) => console.log('RATINGS GET LIST REVIEWS ERR', err));
    fetcher
      .getReviewsMetadata(40346)
      .then((result) => setMetaData(result.data))
      .catch((err) => console.log('RATINGS GET META DATA ERR', err));
  }, [sortReviews]);

  return (
    <div className="Ratings" style={{ display: 'flex' }}>
      <div className="right" style={{ width: '50%' }}>
        <h2 className="section-head">Ratings & Reviews</h2>
        <div className="average-rating-stars-container">
          <h2 className="average-rating">{metaData && averageRating(metaData.ratings)}</h2>
          {metaData && <Stars avgRating={averageRating(metaData.ratings)} />}
        </div>

        {metaData && (
          <RatingBreakdown
            metaData={metaData}
            setFilters={setFilters}
            filters={filters}
          />
        )}
        {metaData && <ProductBreakdown metaData={metaData} />}
      </div>

      <div className="left" style={{ width: '50%' }}>
        <h3 className="rating-sub-head">{reviews && `${reviews.length} Reviews, sorted by`}</h3>
        <select className="sort-ratings" onChange={(e) => setSortReviews(e.target.value)}>
          <option value="relevant">Relevant</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>

        {reviews && (
          <ReviewsList
            reviews={reviews}
            filters={filters}
            moreReviews={moreReviews}

          />
        )}
        <button className="show-button" type="button" onClick={() => setMoreReviews(true)}>
          More Reviews
        </button>
        <button className="show-button" type="button" onClick={() => setWriteReview(true)}>
          Write New Review
        </button>
        {metaData && (
        <WriteNewReview
          setWriteReview={setWriteReview}
          metaData={metaData}
          writeReview={writeReview}
        />
        )}
      </div>
    </div>
  );
}

export default Ratings;
