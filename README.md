<h2 align="center"> <a href="tr">Turkish</a> | <a href="eng">English</a>  </h2>

<h1 id="tr" align="center">spotify playlistlerinde olan muzikleri youtubedan bulup indirme</h1>

# Kurulum 

Aşağıdaki adımları izleyerek uygulamayı yerel makinenizde çalıştırabilirsiniz
1. uygulama klonlayın:
```shell
git clone https://github.com/melihAkn/spotifyPlaylistDownload.git
```

2. uygulama klasörüne gidin:

```shell
cd .\spotifyPlaylistDownload
```

3. Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```shell
npm install
```

4. uygulama ana dizinine .env adında bir dosya oluşturun ve içine aşağıdaki adımlarla birlikte aldıgınız degerleri yazın
client id ve client secret için https://developer.spotify.com/dashboard/ bu adresten bir uygulama oluşturun
client_ID ve client_Secret kodlarını env dosyasına ekleyin ve generateToken dosyasını çalıstırıp accessTokeni olusturun

```shell
node generateToken.js
```

https://console.cloud.google.com/apis/dashboard bu adresten youtube Data Api V3 aktif edin sonrasında credentials kısmından api keyinize erişin
son olarak indirmek istediğiniz spotify playlist'in id sini env dosyasına ekleyin
```shell
CLIENT_ID = ''
CLIENT_SECRET = ''
SPOTIFY_ACCESSTOKEN = "Bearer "
YOUTUBE_APIKEY = ''
SPOTIFY_PLAYLIST_ID = ""
```

5. uygulamayı başlatmak için aşağıdaki komutu çalıştırın:


```shell
node app.js
```
indirmek istediğiniz muzikleri musics klasorunde bulabilirsiniz

<h1 id="eng" align="center">download spotify playlist musics searching yotube </h1>
    
# Setup

watch the belowe steps and you can start the project
1. clone this repo:
```shell
git clone https://github.com/melihAkn/spotifyPlaylistDownload.git
```

2. go to project directory:

```shell
cd .\spotifyPlaylistDownload
```

3. download the necessary packages 

```shell
npm install
```
4. Create a file named .env in the application's root directory and write the obtained values into it following the steps below
"Create an application at this address: https://developer.spotify.com/dashboard/ for the client ID and client secret. Add the client_ID and client_Secret codes to the env file, and then run the script to create an access token.

```shell
node generateToken.js
```

Activate the YouTube Data API V3 at this address: https://console.cloud.google.com/apis/dashboard, and access your API key in the credentials section.
Finally, add the ID of the Spotify playlist you want to download to the env file."

```shell
CLIENT_ID = ''
CLIENT_SECRET = ''
SPOTIFY_ACCESSTOKEN = "Bearer "
YOUTUBE_APIKEY = ''
SPOTIFY_PLAYLIST_ID = ""
```

5. To start the application, run the following command:

```shell
node app.js
```
You can find the music you want to download in the 'musics' folder.