if (!self.define) {
  let e,
    s = {};
  const i = (i, a) => (
    (i = new URL(i + '.js', a).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, n) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let c = {};
    const p = (e) => i(e, t),
      r = { module: { uri: t }, exports: c, require: p };
    s[t] = Promise.all(a.map((e) => r[e] || p(e))).then((e) => (n(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '0a1a46ab682ce8a4adce45930e2ba798',
        },
        {
          url: '/_next/static/chunks/114-c0b46eed2da06ca3.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/192-266e1a44cc306bf1.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/23-184a61e3da8db7c4.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/31-12fa13dcd377b255.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/500-d62dfdd282237e4d.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/799-71410f232319d9dc.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/864-2c6806b90d101ab2.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/age-groups/%5BageGroupId%5D/loading-865726e8cb62a766.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/age-groups/%5BageGroupId%5D/page-0e8206cbb8988475.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/agreement/page-3282e0b4340c044e.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/cart/page-8393a5322e6d45f1.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/category/%5BcategoryId%5D/loading-5460d8ed73ac9870.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/category/%5BcategoryId%5D/page-bd21949e0d392efe.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/delivery/page-740d1de00f87ec08.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/loading-ee1d62dcb8986717.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/page-7a2a4b90c7e6e846.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/product/%5BproductId%5D/loading-25038842a1361e33.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/product/%5BproductId%5D/page-01414ee89e600a65.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/publishings/%5BpublishingValue%5D/loading-cb7e7d599ee05b2f.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/(routes)/publishings/%5BpublishingValue%5D/page-9a1515c1df2f3c87.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-6e0aee0d2302b734.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/app/layout-94ab72e53607c1fb.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/fd9d1056-f1332261ed5bd042.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/framework-aec844d2ccbe7592.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/main-71115149ccdb2caf.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/main-app-a9f0db7a98e74db9.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/pages/_app-6a626577ffa902a4.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/pages/_error-1be831200e60c5c0.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/webpack-c2f8e29fe56bbb3b.js',
          revision: 'pJLE5j2pk3qIOg1ZCMKpi',
        },
        {
          url: '/_next/static/css/78672dda5afe10f3.css',
          revision: '78672dda5afe10f3',
        },
        {
          url: '/_next/static/media/01af0fc7b4278e65-s.p.woff2',
          revision: '6fa778aa9ee280df9ff563f3a08b0350',
        },
        {
          url: '/_next/static/media/8cdee4d3ed444abc-s.woff2',
          revision: '420e1e96628860fae605e46bd196926d',
        },
        {
          url: '/_next/static/pJLE5j2pk3qIOg1ZCMKpi/_buildManifest.js',
          revision: '2ec694eb52ae4f523f265a46bae4d768',
        },
        {
          url: '/_next/static/pJLE5j2pk3qIOg1ZCMKpi/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/android-chrome-192x192.png',
          revision: 'a8c8d08ea1601ae63163c1afba2148c7',
        },
        {
          url: '/android-chrome-512x512.png',
          revision: 'a6ebdbdb3ed1335abe8d84455886eef1',
        },
        {
          url: '/apple-touch-icon.png',
          revision: '0395fecf96cf14f496620ed44bd7bc32',
        },
        {
          url: '/favicon-16x16.png',
          revision: 'bd2574de5ebbeb7cd1a833462eca4912',
        },
        {
          url: '/favicon-32x32.png',
          revision: 'c5dcec338eddc01d1888690c84b3f3e0',
        },
        { url: '/favicon.ico', revision: '397f79abb73e99e2bf78882e74c8a20d' },
        { url: '/logo.webp', revision: '976af9a27edec2eb7ae0427e9cf0ce42' },
        { url: '/novap.jpg', revision: 'b83c2a67c7676ccbd97d1ec64bc354ad' },
        {
          url: '/novaposhta.svg',
          revision: '3f8be5bbc6ebc321a7f0c552f36281e2',
        },
        {
          url: '/site.webmanifest',
          revision: '053100cb84a50d2ae7f5492f7dd7f25e',
        },
        { url: '/ukrposhta.png', revision: '16c01d43ea0018514246f27cadee264f' },
        {
          url: '/ukrposhta_logo.png',
          revision: 'e5cacaac67601eb17739086ed7d76bed',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: i,
              state: a,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
