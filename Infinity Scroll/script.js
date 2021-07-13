const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 4;
const apiKey = 'sJSgE3w9eoUqsaHJnw9FxW2HU_spjZPnWKezimcCM54';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
    imagesLoaded += 1;
    console.log('Image Loaded');
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 10;
        console.log('ready = ', ready);
    }
}

// Helper Function To Set Attributes On DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links And Photos, Add To DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('Total Images ', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo)  => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description); 
        // img.setAttribute('title', photo.alt_description); 
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Check to see if scrolling is near the bottom, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// Get Phothos - Testing
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Error Message Goes Here
    }
}

// On Load
getPhotos();