import {useEffect, useState} from "react";
import axios from "axios";


function useClowderManagement() {

    //clowder
    const [clowderList, setClowderList] = useState(Array(3).fill(Array(3).fill("")));
    const [clowdersMade, setClowdersMade] = useState(0);
    const [selectedCats, setSelectedCats] = useState([]);

    //cat data
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cancelRequest, setCancelRequest] = useState(false);

    const callback = data =>
        data.cats.map(aCat => {
                return {
                    id: aCat.join().replace(/,/g, ""),
                    selected: false
                }
            }
        );
    const fetchData = async () => {
        setLoading(true);
        axios.get("http://quantcats.herokuapp.com/bag")
            .then(response => {
                if (!cancelRequest) {
                    setLoading(false);
                    setData(callback(response.data));
                }
            })
            .catch(error => {
                if (!cancelRequest) {
                    setLoading(false);
                    setError("data not received");
                }
            });
    };

    const addToClowder = (aCatArray) => {
        if (clowdersMade < 3) {
            const updatedClowder = clowderList.map((clowder, index) => {
                if (index === clowdersMade) {
                    setClowdersMade(clowdersMade + 1);
                    return aCatArray;

                }
                return clowder;
            });
            setClowderList(updatedClowder);
        }
    };

    const updateCatSelection = (aCatId) => {
        if (selectedCats.includes(aCatId)) {
            setSelectedCats(selectedCats.filter(id => id !== aCatId));

        } else {
            setSelectedCats([...selectedCats, aCatId]);
        }

        setData(data.map(aCat => {
            if (aCat.id === aCatId) {
                return {
                    id: aCatId,
                    selected: !aCat.selected,
                }
            }
            return aCat;
        }));
    };

    useEffect(() => {
        fetchData();
        return () => {
            setCancelRequest(true);
        };
    }, []);

    useEffect(() => {
        if (selectedCats.length === 3) {
            //validate clowder
            axios.get(`http://quantcats.herokuapp.com/clowder?cat=${selectedCats[0]}&cat=${selectedCats[1]}&cat=${selectedCats[2]}`)
                .then(response => {
                    addToClowder(selectedCats);
                    alert("Successfully created a clowder");
                }).catch(() => {
                    alert("Clowder failed");

                }
            ).finally(() => {
                setSelectedCats([]);
                setData(data.map(aCat => {
                    return {
                        id: aCat.id,
                        selected: false
                    }
                }));
            });
        }

    }, [selectedCats]);

    return {clowderList, updateCatSelection, data, error, loading}

}

export default useClowderManagement;
