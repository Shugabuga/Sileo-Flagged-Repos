function update() {
    let req = new XMLHttpRequest();
    req.open("GET", "https://cors-anywhere.herokuapp.com/https://flagged-repo-api.getsileo.app/info", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onload = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            resp = JSON.parse(req.responseText);
            document.getElementById("flaggedRepos").innerHTML = resp.flagged_count;
            let date = new Date(resp.updated);
            let date_options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            document.getElementById("lastUpdated").innerHTML = "Last Updated: " + date.toLocaleDateString("en-GB", date_options);
        }
    }
    req.send();
}

function search() {
    let req = new XMLHttpRequest();
    req.open("POST", "https://cors-anywhere.herokuapp.com/https://flagged-repo-api.getsileo.app/flagged", true);
    let url = document.getElementById("search").value;
    if (url.indexOf("http") == -1) {
        url = "https://" + url;
    }
    let body = JSON.stringify({
        url: url
    });
    req.setRequestHeader("Content-Type", "application/json");
    req.onload = function (e) {
        if (req.readyState === 4 && req.status === 200) {
            resp = req.responseText;
            // Cache the element.
            const piracyElement = document.getElementById("isPiracy");
            if (resp == "true") {
                piracyElement.innerHTML = "This repo <b>is</b> flagged!";
                piracyElement.style.color = "#2cb1be";
            } else if (url.indexOf(".") == -1) {
                piracyElement.innerHTML = "Type in a repo URL to search...";
                piracyElement.style.color = "#919196";
            } else {
                piracyElement.innerHTML = "This repo is not flagged.";
                piracyElement.style.color = "#919196";
            }
        }
    }
    req.send(body);
}

document.getElementById("search").addEventListener("keyup", search);

window.onload = function () {
    update();
    window.setInterval(update, 10000);
    console.info("%cDid you know? %cThis site is open-source at %chttps://github.com/Shugabuga/Sileo-Flagged-Repos%c!", "color:#2cb1be;font-weight:bold", "color:#2cb1be", "color:#919196", "color:#2cb1be");
}