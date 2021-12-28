function downloadVideo(){
    console.log("button");
    var dl = document.getElementById("videoDownloadDropdown");
    if(dl.className.indexOf("shown") > -1){
        dl.className = dl.className.replace("shown", "");
    }
    else{
        dl.className += "shown";
    }

}

function downloadURI(event){
    event.preventDefault();
    event.stopPropagation();

    var url = event.currentTarget.getAttribute("href");
    var name = document.getElementsByTagName("title")[0].innerText;
    var datatype = event.currentTarget.getAttribute("data-type");
    var data = {url : url, name: name, sender: "YTDL", type: datatype};
    

    window.postMessage(data, '*');
}

    var videoUrls = ytplayer.config.args.url_encoded_fmt_stream_map.split(",").map(function(item){
        return item.split("&").reduce(function(pre, cur){
            console.log(pre, cur);
            cur = cur.split("=");
            return Object.assign(pre, {[cur[0]]: decodeURIComponent(cur[1])});
        }, {});
    });

    console.log("loaded extensioin", videoUrls);

    var container = document.getElementById("watch8-secondary-actions");
    var btn = document.createElement("button");
    btn.className = "style-scope ytd-subscribe-button-renderer";
    btn.setAttribute("role", "button");
    btn.innerText = "Download";
    btn.id = "downloadVideo";

    var dropdown = document.createElement("div");
    dropdown.id = "videoDownloadDropdown";
    container.appendChild(dropdown);

    var dropList = document.createElement("ul");
    dropdown.appendChild(dropList);

    container.appendChild(btn);

    for(i in videoUrls){
        var item = document.createElement("a");
        item.innerText = videoUrls[i]["quality"];
        item.setAttribute("href", videoUrls[i]["url"]);
        item.setAttribute("target", "_blank");
        item.setAttribute("data-type", videoUrls[i]["type"]);
        item.addEventListener("click", downloadURI);
        dropList.appendChild(item);
    }

    btn.addEventListener("click", downoadVide);;


