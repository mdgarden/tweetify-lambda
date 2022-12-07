import axios from "axios";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_SECRET_ID = process.env.SPOTIFY_SECRET_ID;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=10";

/**
 * Spotify의 OAuth2.0 권한 획득
 *
 */
const refreshToken = async () => {
  const params = {
    grant_type: "refresh_token",
    refresh_token: SPOTIFY_REFRESH_TOKEN,
  };

  await axios({
    method: "post",
    url: REFRESH_TOKEN_URL,
    data: params,
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_SECRET_ID).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 *
 * spotify에서 현재 듣고 있는 곡을 취득
 */
export const getCurrentlyPlaying = async () => {
  const token = refreshToken();
  const response = await axios({
    method: "get",
    url: RECENTLY_PLAYING_URL,
    headers: { Authorization: "Bearer " + token },
  });
  return;
};
