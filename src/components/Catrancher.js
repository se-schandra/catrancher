import React from 'react';
import Cat from './Cat';
import Clowders from './Clowders';
import useClowderManagement from "./useClowderManagement";

/**
 *  Catrancher view whereby user can selct a cat to cretae a clowder
 */
function Catrancher() {

    const {clowderList, updateCatSelection, data, error, loading} = useClowderManagement();

    if (loading) {
        return "Loading...";
    }

    if (error.length) {

        return <div data-testid="cat-list-data-error">{error}</div>;
    }


    if (data.length) {
        return (
            <div data-testid="catrancher-container" className="catrancher-container">

                <div className="cats-view" data-testid="cats-list">
                    {
                        data.map((cat) => <Cat key={cat.id} data={cat.id} selected={cat.selected}
                                               updateCatSelection={updateCatSelection.bind(this, cat.id)}/>)
                    }
                </div>
                <Clowders clowderList={clowderList}/>

            </div>
        )

    }


    return null;
}

export default Catrancher;
