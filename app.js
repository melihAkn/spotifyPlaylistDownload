const axios = require('axios')
const qs = require('qs')
const fs = require('fs')
require('dotenv').config()
const ffmpeg = require('ffmpeg')
const ytdl = require('ytdl-core')
const { google } = require('googleapis');
//1. asama gerekli tokenin olusturulması
const generateToken = async () => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const data = { grant_type: "client_credentials" };
    const options = {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
      url: "https://accounts.spotify.com/api/token",
    };
    const response = await axios(options);
  
    const { access_token } = response.data;
    token = access_token
    console.log(access_token)
    return access_token

  }
//generateToken()
//1. asama spotify playlistinden muzik isimlerini ve artist isimlerini alma
let musicNameAndArtistNameArray = []

let accesToken = process.env.SPOTIFY_ACCESSTOKEN
const apiURL = "https://api.spotify.com/v1/playlists/16uFsmsFjTY3hGk6ZblbMU/tracks"
function makeRequest() {
  axios.get(apiURL , {
    headers: {
        Authorization: accesToken
      }
})
    .then(async data => {
        //api cagrisi basarili olursa calısacak kodlar
        data.data.items.forEach(async element => {
          let musicNameAndArtistName = element.track.name + element.track.artists[0].name
          musicNameAndArtistNameArray.push(element.track.name + element.track.artists[0].name)
          const apiKey = process.env.YOUTUBE_APIKEY; 
          const youtube = google.youtube({
            version: 'v3',
            auth: apiKey
          });
            const searchResponse =await youtube.search.list({
              part: 'snippet',
              q: musicNameAndArtistName, 
              maxResults: 1
            });
            const videos = [];
            searchResponse.data.items.forEach(searchResult => {
              switch (searchResult.id.kind) {
                case 'youtube#video':
                  videos.push({ videoTitle : searchResult.snippet.title , videoID : searchResult.id.videoId})
                  break;
              }
              })
            console.log(videos);
            videos.forEach(e => {
              const videoURL = `https://www.youtube.com/watch?v=${e.videoID}`; // Video URL'sini buraya ekleyin
              const outputMP3Path = `musics/${e.videoTitle}.mp3`; // Dönüştürülen MP3 dosyasının kaydedileceği yol
              
              const video = ytdl(videoURL, {
                quality: 'highest',
                filter: 'audio',
              });
              video.pipe(fs.createWriteStream(`./musics/${e.videoTitle}.mp3`));
            })
        });
})
        .catch(async e => {
            console.log(e.response.data.error.message)
            console.log(e.response.data.error.status)
        })
      }
makeRequest()