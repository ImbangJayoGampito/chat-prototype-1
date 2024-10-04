function createButton(buttonId, buttonText) {
    let button = document.createElement("button");
    button.id = buttonId;
    button.innerHTML = buttonText
    button.classList.add(buttonId);
    button.onclick = () => { window.location.pathname + routeButton(buttonId + ".html") }
    return button;
}
function createInstallable() {
    let deferredPrompt;
    let showButton = false;
    window.addEventListener('beforeinstallprompt', (event) => {
        if (event.platforms.includes('windows') || event.platforms.includes('play')) {

            // console.log('App is already installed');

        } else {
            event.preventDefault()
            deferredPrompt = event;
            showButton = true;
            // console.log('App is not installed');

        }

    });
    if (showButton === true) {
        return;
    }
    let button = document.createElement("button");
    button.id = "installButton";
    button.innerHTML = "Install";
    button.classList.add("install");
    button.onclick = async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    };
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
    nav.appendChild(createInstallable());
}

buildHeader();
function routeButton(direction) {
    window.location.href = direction;
}