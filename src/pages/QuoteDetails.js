import React, { Fragment, useEffect } from "react";
import { useParams, Route, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";


const QuoteDetail = () => {
  const params = useParams();
  const {quoteId} = params;

  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest])

  if (status === 'pending'){
    return (
        <div className="centered">
            <LoadingSpinner/>
        </div>
    )
  }

  if (error) {
    return <p className="centered">{error}</p>
  }

  if(!loadedQuotes){
    return <p>No quotes found!</p>
  }


  return (
    <Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
