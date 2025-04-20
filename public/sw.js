const OFFLINE_URL = "/index.html";

self.addEventListener("install", (event) => {
    event.waitUntil(preLoad());
});

const preLoad = async () =>{
    console.log("Installing web app");

    const cache = await caches.open("offline");
    console.log("caching index and important routes");

    return await cache.addAll([
        "/",
        OFFLINE_URL,
        '/index.css',
        '/manifest.json',
        '/Air_and_Space.jpg',
        '/AI_Teacher.png',
        '/favicon.ico',
        '/mars_texture.jpg',
        '/moon_texture.jpg',
        '/mars_thumbnail.jpg',
        '/pwa_icon.png',
        '/thundercat.jpg',
        '/wolfie.png',
        '/CS114.png',
    ]);
};

self.addEventListener("fetch", (event) => {
    event.respondWith(checkResponse(event.request).catch(() => {
        // If we get a 404, try to return the offline page.
        return returnFromCache(event.request);
    }));

    event.waitUntil(addToCache(event.request));
});

const checkResponse = (request) => {
    return new Promise(async (fulfill, reject) => {
        const resp = await fetch(request);

        if(resp.status !== 404) {
            fulfill(resp);
        } else {
            reject();
        }
    });
};

const addToCache = async (request) => {
    const cache = await caches.open("offline");
    const blocked_urls = [
        '/AI_Teacher',
        '/HiddenGems',
        '/CS114_Final',
        '/WolfiesEscape'
    ];

    if (blocked_urls.some(url => request.url.includes(url))) {
        console.log("Blocked URL: " + request.url);
        return null;
    }

    try {
        const response = await fetch(request);
        console.log(response.url + " was cached");
        return await cache.put(request, response);
    }
    catch (error) {
        console.log("Error caching " + request.url);
        return null;
    }
};

const returnFromCache = async (request) =>{
    const cache = await caches.open("offline");
    const matching = await cache.match(request);

    if (!matching || matching.status == 404) {
        return cache.match(OFFLINE_URL);
    } else {
        return matching;
    }
};