# Projenin amacı

spotify palylistlerinde olan muzikleri yootubedan bulup indirme

# Kurulum 

Aşağıdaki adımları izleyerek projeyi yerel makinenizde çalıştırabilirsiniz
1. projeyi klonlayın:
```shell
git clone https://github.com/melihAkn/spotifyPlaylistDownload.git
```

2. Proje klasörüne gidin:

```shell
cd .\spotifyPlaylistDownload
```

3. Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```shell
npm install
```
4. projenin ana dizinine .env adında bir dosya oluşturun ve içine aşağıdaki adımlarla birlikte aldıgınız degerleri yazın
client id ve client secret için https://developer.spotify.com/dashboard/ bu adresten bir uygulama oluşturun
client_ID ve client_Secret kodlarını env dosyasına ekleyin ve generateToken() fonksiyonunu çalıstırıp accessTokeni olusturun
https://console.cloud.google.com/apis/dashboard bu adresten youtube Data Api V3 aktif edin sonrasında credentials kısmından api keyinize erişin
son olarak indirmek istediğiniz spotify playlist'in id env dosyasına ekleyin
```shell
CLIENT_ID = ''
CLIENT_SECRET = ''
SPOTIFY_ACCESSTOKEN = "Bearer "
YOUTUBE_APIKEY = ''
SPOTIFY_PLAYLIST_ID = ""
```

5. Projeyi başlatmak için aşağıdaki komutu çalıştırın:
indirmek istediğiniz muzikler proje ana dizininde /musics klasorunun içine indirilecek

```shell
node app.js
```