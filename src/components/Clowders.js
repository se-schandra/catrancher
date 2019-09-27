import React from 'react';
import Cat from "./Cat";

/**
 * Renders a placeholder to create the clowder conssisting of 3 cats
 * @param clowderList :array of clowders
 */
function Clowders({clowderList = []}) {

    if (clowderList.length) {


        return (
            <table border="1" className="clowder-view" data-testid="clowders-list">
                <tbody>
                {
                    clowderList.map((aCatArray, index) =>
                        <tr key={`clowder_${index}`}>{
                            aCatArray.map((aCat, aCatArrayIndex) =>
                                <td key={`clowder_cat_${index}_${aCatArrayIndex}`}>
                                    {
                                        <Cat data={aCat}/>
                                    }
                                </td>
                            )}</tr>)
                }
                </tbody>


            </table>
        )

    }

    return null;

}

export default Clowders;
