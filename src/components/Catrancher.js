import React, {useEffect} from 'react';
import Cat from './Cat';
import Clowder from './Clowder';
import useService from "./useService";

//GET http://quantcats.herokuapp.com/bag

//GET http://quantcats.herokuapp.com/static/cats/<id>.png
// Example: http://quantcats.herokuapp.com/static/cats/2wsr.png

//GET http://quantcats.herokuapp.com/clowder?cat=<id1>&cat=<id2>&cat=<id3>
// Example: http://quantcats.herokuapp.com/clowder?cat=1ttg&cat=2wsb&cat=3brr

function Catrancher() {
    const {data, error, loading} = useService("http://quantcats.herokuapp.com/bag", []);

    if (loading) {
        return "Loading..."
    }

    if (error) {
        return <div data-testid="cat-list-data-error"></div>;
    }

    if (data && data.cats) {
       return(
           <div data-testid="catrancher-container">
               <div className="cats-view" data-test-id="cat-list">
                   {
                       data.cats.map((cat, index) => <Cat key={index} data={cat}/>)
                   }
               </div>
               <div className="clowder-view" data-testid="clowders">
                   {
                       Array(3).fill("").map((anArray, index) => <Clowder key={`clowder_${index}`}/>)
                   }
               </div>
           </div>
       )

    }

    return null;
}

export default Catrancher;
