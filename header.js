function checkOnline(networkCheck, url) {
    if (networkCheck === true) {
        return true;
    }
    let isConnected;
    fetch(url)
        .then(response => {
            response.ok,
                isConnected = true;
        })
        .catch(error => {
            isConnected = false;

        });
    console.log(isConnected)
    return isConnected;
}
function checkOnlineStatus() {
    fetch(window.location.href)
        .then(response => {
            if (response.ok) {
                console.log("You're online!");
            } else {
                console.log("You're currently offline. Please check your internet connection.");
            }
        })
        .catch(error => {
            console.log("You're currently offline. Please check your internet connection.");
        });
}
checkOnlineStatus();
function createButton(buttonId, buttonText, networkCheck) {
    let button = document.createElement("button");
    button.id = buttonId;
    button.innerHTML = buttonText
    button.classList.add(buttonId);
    button.onclick = () => {
        let path = buttonId;
        console.log(path)
        if (checkOnline(networkCheck, path) === false) {
            window.location.href = "/offline.html";
            return;
        }
        window.location.href = path + ".html";
    }
    return button;
}

function createInstallable() {
    let deferredPrompt = null;
    let button = document.createElement("button");
    button.id = "installButton";
    button.innerHTML = "Install";
    button.style.display = 'none'
    // Check if browser is already in standalone mode or default prompt is available
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        deferredPrompt = { prompt: () => { } }; // Set a default value for deferredPrompt
    } else {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault()
            deferredPrompt = event;
            button.style.display = 'inline'
            console.log("prompted meow")

        });
    }

    button.onclick = async () => {
        console.log(deferredPrompt)
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                button.style.display = 'none';
                deferredPrompt = null;
            }
        }
    };


    //let meow = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    return button;
}

function getPWADisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
        return 'twa';
    } else if (navigator.standalone || isStandalone) {
        return 'standalone';
    }

    return 'browser';
}
function linkAppButton() {
    let button = document.createElement("button");
    button.id = "linkAppBtn";
    button.innerHTML = "Open App"
    if (canPWA() === false || getPWADisplayMode() !== 'browser') {
        button.style.display = 'none'
    }

    window.addEventListener('beforeinstallprompt', openApp
    );
    if (button.style.display !== 'none') {

    }

    return button;
}
async function openApp() {
    console.log("ARF")
    try {
        const registration = await navigator.serviceWorker.ready;
        const controller = registration.active;
        console.log("meow");
        controller.postMessage('launch-pwa');
    } catch (error) {
        console.error('Error waiting for Service Worker:', error);
    }

}
function canPWA() {
    const pwaFeatures = [
        'serviceWorker',
        'BeforeInstallPromptEvent',
        'PushManager',
        'CacheStorage',
        'navigator.geolocation'
    ];
    let meow = false;
    pwaFeatures.forEach(feature => {
        if (feature in window || feature in navigator) {
            meow = true;
        } else {

        }
    });
    return meow;
}
function buildHeader() {
    let nav = document.createElement("nav");
    nav.classList.add("buttonHeader");
    document.body.appendChild(nav);
    nav.appendChild(createButton("index", "Home", false));
    nav.appendChild(createButton("about", "About", false));
    nav.appendChild(createButton("contact", "Contact", true));

    //nav.appendChild(createButton("chat", "Chat"));
    let install = createInstallable(nav);
    if (install !== null) {
        nav.appendChild(install);
    }
    nav.appendChild(linkAppButton())
}

buildHeader();
function routeButton(direction) {
    window.location.href = direction;
}
