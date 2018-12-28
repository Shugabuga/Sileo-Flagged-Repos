function update() {
    var req = new XMLHttpRequest();
    req.open("GET", "https://cors-anywhere.herokuapp.com/https://flagged-repo-api.getsileo.app/info", true);
    req.setRequestHeader("Content-Type","application/json");
    req.onload = function (e) {
        if(req.readyState === 4 && req.status === 200) {
            resp = JSON.parse(req.responseText);
            document.getElementById("flaggedRepos").innerHTML = resp.flagged_count;
            var date = new Date(resp.updated);
            var date_options = { year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById("lastUpdated").innerHTML = "Last Updated: " + date.toLocaleDateString("en-GB", date_options);
        }
    }
    req.send();
}

function search() {
    var req = new XMLHttpRequest();
    req.open("POST", "https://cors-anywhere.herokuapp.com/https://flagged-repo-api.getsileo.app/flagged", true);
    var url = document.getElementById("search").value;
    if(url.indexOf("http") == -1) {
        url = "https://" + url;
    }
    var body = JSON.stringify({"url": url });
    req.setRequestHeader("Content-Type","application/json");
    req.onload = function (e) {
        if(req.readyState === 4 && req.status === 200) {
            resp = req.responseText;
            if(resp == "true") {
                document.getElementById("isPiracy").innerHTML = "This repo <b>is</b> flagged!";
                document.getElementById("isPiracy").style.color = "#2cb1be";
            } else if(url.indexOf(".") == -1) {
                document.getElementById("isPiracy").innerHTML = "Type in a repo URL to search...";
                document.getElementById("isPiracy").style.color = "#919196";
            } else {
                document.getElementById("isPiracy").innerHTML = "This repo is not flagged.";
                document.getElementById("isPiracy").style.color = "#919196";
            }
        }
    }
    req.send(body);
}

document.getElementById("search").addEventListener("keyup", search);

window.onload = function() {
    update();
    window.setInterval(update, 10000);
}