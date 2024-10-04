function createButton(buttonId, buttonText) {
    let button = document.createElement("button");
    button.id = buttonId;
    button.innerHTML = buttonText
    button.classList.add(buttonId);
    button.onclick = () => {
        console.log(window.navigator.onLine)
        if (window.navigator.onLine) {
            window.location.pathname + routeButton(buttonId + ".html");
        } else {
            window.location.pathname = "/offline.html"
        }
    }
    return button;
}
function createInstallable() {
    let deferredPrompt = null;
    let button = document.createElement("button");
    button.id = "installButton";
    button.innerHTML = "Install";

    // Check if browser is already in standalone mode or default prompt is available
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        deferredPrompt = { prompt: () => { } }; // Set a default value for deferredPrompt
    } else {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault()
            deferredPrompt = event;
            console.log("meow")
            console.log(deferredPrompt)
            if (deferredPrompt === null) {
                button.style.display = 'none';
            }
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

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        button.style.display = 'none';
    } else {
        console.log("mrrrrp")
    }

    return button;
}
function buildHeader() {
    let nav = document.createElement("nav");
    nav.classList.add("buttonHeader");
    document.body.appendChild(nav);
    nav.appendChild(createButton("index", "Home"));
    nav.appendChild(createButton("about", "About"));
    nav.appendChild(createButton("contact", "Contact"));
    //nav.appendChild(createButton("chat", "Chat"));
    let install = createInstallable();
    if (install !== null) {
        nav.appendChild(install);
    }
}

buildHeader();
function routeButton(direction) {
    window.location.href = direction;
}
