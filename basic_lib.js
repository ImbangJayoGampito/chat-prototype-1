
function findAnimation(toFind) {
    const styleSheets = document.styleSheets;
    let anims = null;
    for (let i = 0; i < styleSheets.length; i++) {
        let style = styleSheets[i];
        if (!style.cssRules) { continue; }
        for (let j = 0; j < style.cssRules.length; j++) {
            let rule = style.cssRules[j];
            if (!(rule.type == window.CSSRule.KEYFRAMES_RULE
                || rule.type == window.CSSRule.WEBKIT_KEYFRAMES_RULE)) {
                continue;
            }
            if (rule.name != toFind) {
                continue;
            }
            anims = rule;
            break;
        }
        if (anims) {
            break;
        }
    }
    console.log(anims);
}


function enlargeImage(link) {
    let div_main = document.createElement("div");
    div_main.id = "popup_page";
    div_main.classList.add("popup");

    let image = document.createElement("img");
    image.src = link;
    image.classList.add("popup_image")
    let text_close = document.createElement("h3");
    text_close.innerHTML = "Click to close";
    text_close.classList.add("popup_text")
    let time = getComputedStyle(document.body).getPropertyValue("--popup-quit");
    div_main.onclick = () => { shrinkImage(div_main, image, text_close, time) }
    div_main.appendChild(image);
    div_main.appendChild(text_close)
    document.body.appendChild(div_main);
}
function shrinkImage(div, image, text, time) {

    time = parseFloat(time);
    div.classList.add("fading")
    image.classList.add("fading")
    text.classList.add("fading")
    setTimeout(function () {
        div.remove();
    }, (time * 1000) - 20)


}


export function embedFunction(imageElement) {
    enlargeImage(imageElement.src);
}
export const GatherMethod = Object.freeze({
    FROM_ID: 0,
    FROM_CLASS: 1,
    FROM_NAME: 2,
    FROM_TAG: 3
})
function getElementFromParent(parent, name, method) {
    let result = null;
    switch (method) {
        case GatherMethod.FROM_ID:
            result = parent.getElementById(name);
            break;
        case GatherMethod.FROM_CLASS:
            result = parent.getElementsByClassName(name);
            break;
        case GatherMethod.FROM_NAME:
            result = parent.getElementsByName(name);
            break;
        case GatherMethod.FROM_TAG:
            result = parent.getElementsByTagName(name);
            break;
    }
    return result;
}
export function addClickFunction(name, funcToExecute, parent, getMethod) {
    let toAffect = getElementFromParent(parent, name, getMethod);
    console.log(toAffect.length)
    for (let i = 0; i < toAffect.length; i++) {
        toAffect[i].onclick = () => { funcToExecute(toAffect[i]) };
    }
}