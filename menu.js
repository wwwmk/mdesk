function isClickedInSide(node, tagName) {
    while (node) {
        if (node.nodeType == 1 && node.getAttribute(tagName)) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}

function closeAllMenus() {
    document.querySelectorAll("[menu].hidden-top").forEach(item => {
        item.classList.remove("hidden-top");
    });
}


function setMenuClicks() {
    document.body.addEventListener("click", function (event) {
        var clickedTarget = isClickedInSide(event.target, "menutoopen");
        if (clickedTarget) {
            let menutoopen = clickedTarget.getAttribute("menutoopen")
            openMenu(document.querySelector("[menu=" + menutoopen + "]"), clickedTarget);
        }
        else if (isClickedInSide(event.target, "menu") == null && clickedTarget == null) {
            document.querySelectorAll("[menu].hidden-top").forEach(item => {
                item.classList.remove("hidden-top");
            });
        }
    }, false);

    window.addEventListener("scroll", closeAllMenus);
}
setMenuClicks();

function openMenu(menu, button) {
    menu.classList.toggle("hidden-top");
    switch (button.getAttribute("menuprefer")) {
        case "left":
            menu.style.left = button.getBoundingClientRect().x - menu.offsetWidth + button.offsetWidth;
            break;
        case "right":
            menu.style.left = button.getBoundingClientRect().x;
            break;
        case "center":
            menu.style.left = button.getBoundingClientRect().x - menu.offsetWidth / 2 + button.offsetWidth / 2;
            break;
        default:
            if (button.getBoundingClientRect().x - button.offsetWidth / 2 < document.body.offsetWidth / 2) {
                menu.style.left = button.getBoundingClientRect().x;
            }
            else {
                menu.style.left = button.getBoundingClientRect().x - menu.offsetWidth + button.offsetWidth;
            }
    }
    //did we go too far?
    if (menu.getBoundingClientRect().x + menu.offsetWidth > document.body.offsetWidth) {
        menu.style.left = button.getBoundingClientRect().x - menu.offsetWidth + button.offsetWidth;
    }
    if (menu.getBoundingClientRect().x <= 0) {
        menu.style.left = button.getBoundingClientRect().x;
    }
    //y-axis
    if (button.getBoundingClientRect().y + button.offsetHeight + menu.offsetHeight > document.body.clientHeight) {
        menu.style.top = button.getBoundingClientRect().y - menu.offsetHeight;
    }
    else {
        menu.style.top = button.getBoundingClientRect().y + button.offsetHeight;
    }
}