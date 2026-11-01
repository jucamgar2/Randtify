
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const URL = 'https://accounts.spotify.com/api/token';

export const getToken = async () => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        })
    })
    console.log(response);
    const data = await response.json();
    console.log(data);
}