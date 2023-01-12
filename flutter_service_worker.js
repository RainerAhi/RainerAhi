'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "79f4eb34905d2bebd826765a897b1fb9",
"assets/FontManifest.json": "08d5950187213be2035d2583a3067fd1",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/lib/Assets/7f09a70e": "f8decf68b3caf82986c38343cdbedd74",
"assets/lib/Assets/Anurati-Regular.ttf": "ca8632f4d0aacae4633cbfc2f1a673f1",
"assets/lib/Assets/arrow2.png": "9323b69b68d29f725cb1f908521c9637",
"assets/lib/Assets/e40281a5": "31270ebba06937136fbd788018994472",
"assets/lib/Assets/logo3.png": "2142f2c9dbb8649f1922da6092779806",
"assets/lib/Assets/rocket3.png": "b5201b5d729da1efc6c2343aa38156ef",
"assets/lib/Assets/test52.png": "ba05ab774993216d86a18d96de5322c6",
"assets/lib/Assets/test53.png": "8f680c89f30630cafc63e3db02507f33",
"assets/lib/Assets/test54.png": "f8decf68b3caf82986c38343cdbedd74",
"assets/lib/Assets/test55.png": "093ebd4cc2e1e9d964ddccbf4d212022",
"assets/lib/Assets/test56.png": "cf022d8c900ef471775f14d8e53076f6",
"assets/lib/Assets/test57.png": "d7f9412511ba5cdb3a026d776ab88b53",
"assets/lib/Assets/test58.png": "838ef771b95bedc3b9fa3f9d571f05a5",
"assets/lib/Assets/test60.png": "ebc8f2a314e2d30c802b8a119de4704e",
"assets/lib/Assets/test61.png": "49a160c66e8a02b246b0e06393ec8a8f",
"assets/lib/Assets/test62.png": "52d23721e0f3243559972b4cc8e67426",
"assets/lib/Assets/test63.png": "d53f0d719d16eb23543b98cc9f369845",
"assets/lib/Assets/test64.png": "4e795498c2db3493741ad6a9dca5dbce",
"assets/lib/Assets/test65.png": "e4cc03d4e30bdb73c27215e6ceff0839",
"assets/lib/Assets/test66.png": "833b392182fd203d83240fdeef7b022d",
"assets/lib/Assets/test67.png": "f5edf3a3875c54263fec4681d7b9f50f",
"assets/lib/Assets/test68.png": "099b631b80229bc5fe38173d48f83d9a",
"assets/lib/Assets/test69.png": "5c8f27440b6d4e7bad489254c0af3d29",
"assets/lib/Assets/test70.png": "09e6f566d567c6721a26963fad7dfc82",
"assets/lib/Assets/test71.png": "294c9b16189c6868ec88351cc077f868",
"assets/lib/Assets/test72.png": "3c6c1c19e60ea384120945de3090760d",
"assets/lib/Assets/test73.png": "eee20492ca1f0ace63d5257a81718349",
"assets/lib/Assets/test74.png": "b1ec05ffe1b5daeb84f3ce0309cbad00",
"assets/lib/Assets/test75.png": "d247d117e8f6c7729ea281fe76bf368f",
"assets/lib/Assets/tiktok.png": "5f1413ca184c7e24e1d213fcc43c6a82",
"assets/lib/Assets/tiktok2.png": "f94a75c604ede9746c3be9e5c01cfeb5",
"assets/NOTICES": "97e2ef35667503e95432a115c3cb3a5a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "6333b551ea27fd9d8e1271e92def26a9",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "0477e67a22423b71a0bfe65ff84e0037",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "b3dbeb5a5bade269a7c9cc730f4a8ea5",
"icons/Icon-512.png": "ba7bd8a9ac6a449445340111c6e1d88d",
"icons/Icon-maskable-192.png": "b3dbeb5a5bade269a7c9cc730f4a8ea5",
"icons/Icon-maskable-512.png": "ba7bd8a9ac6a449445340111c6e1d88d",
"index.html": "4e5ce0bc42ff5dc070bd3c166e4504bd",
"/": "4e5ce0bc42ff5dc070bd3c166e4504bd",
"main.dart.js": "9eedf378921db1c4373e84292fa2d825",
"manifest.json": "a2d51917e451df9a1c83f7aa57e3e055",
"version.json": "81dd66efbc0a29a69803b0b6ace92c10"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
