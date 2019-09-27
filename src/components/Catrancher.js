import React from 'react';
import Cat from './Cat';
import Clowder from './Clowder';
import useService from "./useService";

/**
 *  Catrancher view whereby user can selct a cat to cretae a clowder
 */
function Catrancher() {

    const {data, error, loading} = useService("http://quantcats.herokuapp.com/bag", [], data =>
        data.cats.map(aCat => aCat.join().replace(/,/g, "")));


    if (loading) {
        return "Loading...";
    }

    if (error.length) {

        return <div data-testid="cat-list-data-error">{error}</div>;
    }

    if (data.length) {
        return (
            <div data-testid="catrancher-container" className="catrancher-container">
                <div className="cats-view" data-test-id="cats-list">
                    {
                        data.map((cat) => <Cat key={cat} data={cat}/>)
                    }
                </div>
                <table border="1" className="clowder-view" data-testid="clowders-list">

                    {
                        Array(3).fill(Array(3).fill("")).map((aCatArray, index) => <Clowder key={`clowder_${index}`}
                                                                                            data={aCatArray}
                                                                                            index={index}/>)
                    }

                </table>
            </div>
        )

    }

    return null;
}

export default Catrancher;


//GET http://quantcats.herokuapp.com/bag

//GET http://quantcats.herokuapp.com/static/cats/<id>.png
// Example: http://quantcats.herokuapp.com/static/cats/2wsr.png

//GET http://quantcats.herokuapp.com/clowder?cat=<id1>&cat=<id2>&cat=<id3>
// Example: http://quantcats.herokuapp.com/clowder?cat=1ttg&cat=2wsb&cat=3brr
