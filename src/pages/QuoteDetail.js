import React, {useEffect} from 'react';
import {useParams, Route, Link, useRouteMatch} from 'react-router-dom';
import Comments from  '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
export default function QuoteDetail() {
    const match = useRouteMatch();
    const params = useParams();
    const { quotesId } = params;

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);
    useEffect(() => {
        sendRequest(quotesId);
    }, [sendRequest, quotesId])
    
    if (status === 'pending') {
        return <div className='centered'><LoadingSpinner/></div>
    }
    if (error) {
        return <p className='centered'>{error}</p>
    }

    if(!loadedQuote.text){
        return <p>No quote found</p>
    }
    return (
        <div>
            <h1>Quote detail</h1>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Watch comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </div>
    )
}
