import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventForm from './EventForm';
import axios from 'axios'; // Import Axios

const EventUpdate = () => {
    const { id } = useParams();
    const [empdata, empdatachange] = useState();

    useEffect(() => {
        let data = JSON.stringify({
            "eventId": id
        });

        let config = {
            method: 'post', // Use POST method
            maxBodyLength: Infinity,
            url: 'http://localhost:3002/Event/getEventById',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                empdatachange(response.data); // Update state with response data
            })
            .catch((error) => {
                console.log(error);
            });

    }, [id]); // Include id in the dependency array
    return (
        empdata ?
            <EventForm data={empdata} />
            :
            <h3>Loading....</h3>
    );
}

export default EventUpdate;
