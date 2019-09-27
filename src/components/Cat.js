import React from 'react';

/**
 * Renders the cat view
 * @param data : Cat data, mainly id at moment
 */
function Cat({data}) {
    if (data) {
        return <img src={`http://quantcats.herokuapp.com/static/cats/${data}.png`}/>
    }

    return null;
}

export default Cat;
