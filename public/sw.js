if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>a(e,t),l={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>l[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2d9f8486dc1142452c7615191c52a99f"},{url:"/_next/static/chunks/114-c2a48ac56589b84c.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/173-f47b1dd39a382a2b.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/23-b083653f294895b5.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/231-f5129001f0bff68f.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/31-bb423c46ddb4d4fc.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/392-2dfd9dcc8417b564.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/500-d800dfd43c66bdac.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/570-19c9ba8b76341a5e.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/67-f377948a887cdc29.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/678-fad411dd393a349a.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/about_us/page-716cadd1487359d0.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/age-groups/%5BageGroupId%5D/loading-219abe9126d95383.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/age-groups/%5BageGroupId%5D/page-7c85a42230bd6053.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/agreement/page-dea392cf7d5fb5da.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/cart/page-c5fe80e5a7e5087f.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/category/%5BcategoryId%5D/loading-b46481cab23b5a83.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/category/%5BcategoryId%5D/page-69e17809fd3e98a1.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/contacts/page-332185660142d40b.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/delivery/page-2051e291e6953f10.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/loading-7e66e3a0fda39016.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/new/loading-bee95c9dc142fc62.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/new/page-a912991bc8df2d54.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/order-confirm/page-e60f17636ba0137a.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/page-d66f57302398fd84.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/povernenia_tovary/page-efeb371d3e013965.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/product/%5BproductId%5D/loading-182771ac356a73dc.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/product/%5BproductId%5D/page-5973f7ad42066295.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/publishings/%5BpublishingId%5D/loading-6d19226c462271ff.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/publishings/%5BpublishingId%5D/page-89decde39700a1c2.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/sale/loading-f7413f895b655fa8.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/sale/page-049599663aec1f2d.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/seria/%5BseriaId%5D/loading-6d61bead7e7049e5.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/(routes)/seria/%5BseriaId%5D/page-9d00c9057cd7172e.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/_not-found/page-0c0635e4b70a253f.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/global-error-cf573712e72131fe.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/layout-d0e69e6b7e9c50bc.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/app/not-found-7b0c57fe75a37ec0.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/fd9d1056-c1c6efb6e6511a73.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/main-app-a9f0db7a98e74db9.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/main-d931f3b1261c60f7.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-56dc4f05052974f6.js",revision:"vxjWyaXXS04G26-Zl6Xsl"},{url:"/_next/static/css/34b62243e72554fb.css",revision:"34b62243e72554fb"},{url:"/_next/static/media/634216363f5c73c1-s.p.woff2",revision:"4a1bf14c88bdef173c2a39c5c60e65ce"},{url:"/_next/static/media/88325a2c1fede2f4-s.woff2",revision:"93131c3ec4fe9782c2c40a708db9b0b6"},{url:"/_next/static/media/aec774cbe1963439-s.woff2",revision:"37f8885214448afc8f3b3678db525598"},{url:"/_next/static/media/d83fe381bb17eb77-s.woff2",revision:"215b11e73137fdb7d9a773e0211c29d6"},{url:"/_next/static/media/e1c529c04de64b40-s.woff2",revision:"e88b1871ed8eef59b7df05a91a6f2157"},{url:"/_next/static/vxjWyaXXS04G26-Zl6Xsl/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/vxjWyaXXS04G26-Zl6Xsl/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"a8c8d08ea1601ae63163c1afba2148c7"},{url:"/android-chrome-512x512.png",revision:"a6ebdbdb3ed1335abe8d84455886eef1"},{url:"/apple-touch-icon.png",revision:"0395fecf96cf14f496620ed44bd7bc32"},{url:"/baner.jpg",revision:"8dd9c54264eadba6310765bb4c348a44"},{url:"/favicon-16x16.png",revision:"bd2574de5ebbeb7cd1a833462eca4912"},{url:"/favicon-32x32.png",revision:"c5dcec338eddc01d1888690c84b3f3e0"},{url:"/favicon.ico",revision:"397f79abb73e99e2bf78882e74c8a20d"},{url:"/label.png",revision:"6256f7c15ffe605069bb734f4114411a"},{url:"/logo.png",revision:"2def22a82bce500c7b39a9eb18adfe94"},{url:"/logo.webp",revision:"976af9a27edec2eb7ae0427e9cf0ce42"},{url:"/name.png",revision:"21796911948b5bf24400df6a9881e2e2"},{url:"/novap.jpg",revision:"b83c2a67c7676ccbd97d1ec64bc354ad"},{url:"/novaposhta.svg",revision:"3f8be5bbc6ebc321a7f0c552f36281e2"},{url:"/robots.txt",revision:"7dfb0c24e0ad8365857da6f3e210087a"},{url:"/sitemap-0.xml",revision:"17ed34ccf834348087b147ec43787f9d"},{url:"/sitemap.xml",revision:"5d4210a232723daf53978222a707dadb"},{url:"/ukrposhta.png",revision:"16c01d43ea0018514246f27cadee264f"},{url:"/ukrposhta_logo.png",revision:"e5cacaac67601eb17739086ed7d76bed"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
