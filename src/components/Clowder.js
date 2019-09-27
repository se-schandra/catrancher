import React from 'react';

/**
 * Renders a placeholder to create the clowder conssisting of 3 cats
 * @param data : an array of 3 cats
 * @param index: position of clowder in clowder list

 */
function Clowder({data = [], index}) {

    if (data.length) {
        return <tr>{data.map((aCat, aCatArrayIndex) => <td
            key={`clowder_cat_${index}_${aCatArrayIndex}`}>{aCat}</td>)}</tr>
    }

    return null;

}

export default Clowder;
