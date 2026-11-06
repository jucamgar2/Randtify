const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_ULR;

const generateRandomString = (length) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
};

export const getAuthToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const accessTokenIssuedAt = localStorage.getItem('issued_at') ? localStorage.getItem('issued_at') : new Date();
    const refreshTokenIssuedAt = localStorage.getItem('refresh_start') ? localStorage.getItem('refresh_start') : new Date();
    const elapsedHours = (new Date().getTime() - new Date(accessTokenIssuedAt).getTime()) / (1000 * 60 * 60);
    const elapsedRefreshToken = (new Date().getTime() - new Date(refreshTokenIssuedAt).getTime()) / (1000 * 60 * 60 * 24);
    if(!accessToken ) {
        findAuthToken();
    }else if(elapsedHours >= 1) {
        findRefreshToken();
    }else if(elapsedRefreshToken >= 180) {
        findAuthToken();
    }
    return accessToken;
}

const findRefreshToken = async () => {
    const refresh = localStorage.getItem("refresh_token");
    const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refresh,
                client_id: CLIENT_ID
            }),
        }
        
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error_description || "Spotify authentication failed");
    }
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("issued_at", new Date());
}

const findAuthToken = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const state = generateRandomString(32);
    localStorage.setItem("code_verifier", codeVerifier);
    localStorage.setItem("spotify_state", state);
    const scope = "user-read-private user-read-email user-top-read";
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: REDIRECT_URI,
        state
    };
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
};

export const getToken = async (code) => {
    const codeVerifier = localStorage.getItem("code_verifier");
    const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
                code_verifier: codeVerifier
            })
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error_description || "Spotify authentication failed");
    }
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("issued_at", new Date());
    localStorage.setItem("refresh_start", new Date());
    localStorage.removeItem("code_verifier");
    localStorage.removeItem("spotify_state");
    return data;
};