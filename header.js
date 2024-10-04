function createButton(buttonId, buttonText) {
    let button = document.createElement("button");
    button.id = buttonId;
    button.innerHTML = buttonText
    button.classList.add(buttonId);
    button.onclick = () => { window.location.pathname + routeButton(buttonId + ".html") }
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
        });
    }

    button.onclick = async () => {
        if ('beforeinstallprompt' in window) {

            console.log("mmmmmm")

        }
        console.log(deferredPrompt)
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    };

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        button.style.display = 'none';
    } else {
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