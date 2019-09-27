import {useEffect, useState} from "react";
import axios from 'axios';

function useService(url = "", initialData = {}, callback = (data) => {
    return data
}) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cancelRequest, setCancelRequest] = useState(false);

    const fetchData= async () => {
        setLoading(true);
        axios.get(url)
            .then(response => {

                if (!cancelRequest) {
                    setLoading(false);
                    setData(callback(response.data));
                }
            })
            .catch(error => {
                if (!cancelRequest) {
                    setLoading(false);
                    setError(error);
                }
            });
    };

    useEffect( () => {
        fetchData();
        return () => {
            setCancelRequest(true);
        };
    }, []);


    return {
        data, error, loading
    }
}

export default useService;
