import React, {useState, useEffect} from 'react'
import axios from 'axios'
//import '../utils/igdb/.env'

export default function Home() {
    const url = 'https://id.twitch.tv/oauth2/token'

    const [info, updateInfo] = useState({
        "access_token": "",
        "expires_in": 0,
        "token_type": ""
    })

    const stuff = {
        client_id: "6llto5s67z1ag9f3p4gmbfchrph4jo",
        client_secret: "py4gqz02nmvejkfp5pims8p4mmt6kh",
        grant_type: "client_credentials"
    }

    const postData = () => {
        axios.post(url, stuff)
            .then((response) => {
                console.log(response);
                updateInfo(response.data)
            })
    }

    return (  
        <div>
            <button onClick={() => postData()}>
                POST Info
            </button>
            <div>Access Token: {info.access_token}</div>
            <div>Expires In: {info.expires_in}</div>
            <div>Token Type: {info.token_type}</div>
        </div>
    )
}
