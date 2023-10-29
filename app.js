const axios = require('axios')
const qs = require('qs')
const fs = require('fs')
require('dotenv').config()
const ffmpeg = require('ffmpeg')
const ytdl = require('ytdl-core')
const { google } = require('googleapis');

//2. asama spotify playlistinden muzik isimlerini ve artist isimlerini alma
//Stage 2: Retrieving music names and artist names from the Spotify playlist
let musicNameAndArtistNameArray = []

let accesToken = process.env.SPOTIFY_ACCESSTOKEN
const apiURL = `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks`
function makeRequest() {
  axios.get(apiURL , {
    headers: {
        Authorization: accesToken
      }
})
    .then(async data => {
        data.data.items.forEach(async element => {
          let musicNameAndArtistName = element.track.name + element.track.artists[0].name
          musicNameAndArtistNameArray.push(element.track.name + element.track.artists[0].name)
//3.asama alinan muzik ismi ve artistin isminin youtube da aranmasi 
//Stage 3: Searching for the retrieved music name and artist's name on YouTube
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
//4. asama bulunan videonun indirilip musics klasorune kaydedilmesi
//Stage 4: Downloading the found video and saving it to the 'musics' folder
            videos.forEach(e => {
              const videoURL = `https://www.youtube.com/watch?v=${e.videoID}`;
              const outputMP3Path = `musics/${e.videoTitle}.mp3`;
              
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