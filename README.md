# VirtualCesiumPortal

Get involved in the co-design of your city within minutes, it is now possible!

**Mobile Only**
You try the app on : https://virtualparticipatoryportal.netlify.app/

Works worldwide, in Switzerland first with Swisstopo data, outside Switzerland with OSM data.


## To serve locally

1) install the app after clone 
```
npm install
```


2) add a local cert with vite (https require for authorizations)
```
mkdir -p .cert && mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem 'localhost'
```


3) add the certificate path in `vite.config.js`, check on https://stackoverflow.com/questions/69417788/vite-https-on-localhost
```
server: {
    https: {
      key: fs.readFileSync('./.cert/key.pem'),
      cert: fs.readFileSync('./.cert/cert.pem'),
    },
  },
```


4) Get free API Key and change the .env file
https://firebase.google.com/
https://cesium.com/platform/cesiumjs/


5) Enjoy the app :)



