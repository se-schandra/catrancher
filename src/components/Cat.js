import React from 'react';

/**
 * Renders the cat view
 * @param data : Cat data, mainly id at moment
 * @param selected: if cat is selected
 * @param updateCatSelection: click handler when cat is clicked
 */
function Cat({data, selected, updateCatSelection}) {
    if (data) {
        const src = `http://quantcats.herokuapp.com/static/cats/${data}.png`;
        return (
            updateCatSelection ?
                <img onClick={updateCatSelection} src={src} className={selected ? "selected" : ""}/> :
                <img src={src}/>
        );
    }

    return null;
}

export default React.memo(Cat);
