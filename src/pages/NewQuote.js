import { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from '../hooks/hooks/use-http';
import { addQuote } from '../lib/lib/api';

const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote)

    useEffect(()=>{
        if(status==='completed'){
            history.push('/quotes');
        }
    },[status, history])

    const history = useHistory();
    const addQuoteHandler = (quotesData) => {
        sendRequest(quotesData)

        history.push('/quotes')
    }
    return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
}

export default NewQuote;