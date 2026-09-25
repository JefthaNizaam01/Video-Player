var videos = [
    { id: "1", title: "Learn HTML in 20 Minutes", channel: "Zaio Academy", views: "1.2M views", age: "2 weeks ago", cat: "coding", color: "#e74c3c", dur: "20:04" },
    { id: "2", title: "CSS Flexbox Explained Simply", channel: "CodeWithNizaam", views: "890K views", age: "1 month ago", cat: "coding", color: "#3498db", dur: "14:22" },
    { id: "3", title: "JavaScript Arrays — Full Guide", channel: "Zaio Academy", views: "2.1M views", age: "3 days ago", cat: "coding", color: "#f39c12", dur: "32:10" },
    { id: "4", title: "Lo-Fi Beats to Study To", channel: "Chill Hub", views: "12M views", age: "1 year ago", cat: "music", color: "#9b59b6", dur: "Live" },
    { id: "5", title: "Minecraft Speedrun Attempt #47", channel: "BlockRunner", views: "456K views", age: "5 hours ago", cat: "gaming", color: "#2ecc71", dur: "18:55" },
    { id: "6", title: "A Day in Cape Town Vlog", channel: "Travel ZA", views: "78K views", age: "4 days ago", cat: "vlogs", color: "#1abc9c", dur: "11:03" },
    { id: "7", title: "React Hooks for Beginners", channel: "Zaio Academy", views: "670K views", age: "2 months ago", cat: "coding", color: "#e67e22", dur: "25:40" },
    { id: "8", title: "Piano Cover — Popular Hits", channel: "Keys & Melody", views: "3.4M views", age: "6 months ago", cat: "music", color: "#34495e", dur: "8:12" },
    { id: "9", title: "FIFA Ultimate Team Tips", channel: "GameZone SA", views: "210K views", age: "1 week ago", cat: "gaming", color: "#16a085", dur: "9:44" },
    { id: "10", title: "Morning Routine 2025", channel: "LifeWithLee", views: "920K views", age: "3 weeks ago", cat: "vlogs", color: "#c0392b", dur: "15:30" },
    { id: "11", title: "Build a Portfolio Website", channel: "CodeWithNizaam", views: "145K views", age: "8 days ago", cat: "coding", color: "#8e44ad", dur: "42:00" },
    { id: "12", title: "Street Food Tour — Joburg", channel: "Travel ZA", views: "1.8M views", age: "2 years ago", cat: "vlogs", color: "#d35400", dur: "22:18" }
];

var grid = document.getElementById("video-grid");
var searchInput = document.getElementById("search");
var miniPlayer = document.getElementById("mini-player");
var miniTitle = document.getElementById("mini-title");
var miniChannel = document.getElementById("mini-channel");
var miniThumb = document.getElementById("mini-thumb");
var miniClose = document.getElementById("mini-close");
var wlList = document.getElementById("wl-list");
var wlEmpty = document.getElementById("wl-empty");
var wlCount = document.getElementById("wl-count");
var menuBtn = document.getElementById("menu-btn");
var sidebar = document.getElementById("sidebar");

var WATCH_KEY = "zaio_watch_later";

function getWatchLater() {
    try {
        return JSON.parse(localStorage.getItem(WATCH_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function setWatchLater(ids) {
    localStorage.setItem(WATCH_KEY, JSON.stringify(ids));
}

function thumbUrl(v) {
    return "https://picsum.photos/seed/" + v.id + "/640/360";
}

function renderGrid() {
    grid.innerHTML = "";
    for (var i = 0; i < videos.length; i++) {
        var v = videos[i];
        var saved = getWatchLater().indexOf(v.id) !== -1;
        var card = document.createElement("article");
        card.className = "video-card";
        card.setAttribute("data-cat", v.cat);
        card.setAttribute("data-title", v.title.toLowerCase());
        card.innerHTML =
            '<div class="thumb-wrap">' +
            '<img src="' + thumbUrl(v) + '" alt="">' +
            '<span class="duration">' + v.dur + '</span>' +
            '<button type="button" class="save-btn' + (saved ? " saved" : "") + '" data-id="' + v.id + '" aria-label="Save">⭐</button>' +
            "</div>" +
            '<div class="meta">' +
            '<div class="avatar" style="background:' + v.color + '">' + v.channel.charAt(0) + "</div>" +
            "<div>" +
            "<h3>" + v.title + "</h3>" +
            "<p>" + v.channel + "</p>" +
            "<p>" + v.views + " • " + v.age + "</p>" +
            "</div></div>";
        (function (video) {
            card.addEventListener("click", function (ev) {
                if (ev.target.classList.contains("save-btn")) return;
                openMiniPlayer(video);
            });
            card.querySelector(".save-btn").addEventListener("click", function (ev) {
                ev.stopPropagation();
                toggleWatchLater(video.id);
            });
        })(v);
        grid.appendChild(card);
    }
}

function openMiniPlayer(v) {
    miniTitle.textContent = v.title;
    miniChannel.textContent = v.channel + " • " + v.views;
    miniThumb.style.backgroundImage = "url(" + thumbUrl(v) + ")";
    miniPlayer.classList.remove("hidden");
}

function closeMiniPlayer() {
    miniPlayer.classList.add("hidden");
}

miniClose.addEventListener("click", closeMiniPlayer);

document.addEventListener("keydown", function (ev) {
    if (miniPlayer.classList.contains("hidden")) return;
    if (ev.key === "Escape" || ev.key === " ") {
        ev.preventDefault();
        closeMiniPlayer();
    }
});

function toggleWatchLater(id) {
    var list = getWatchLater();
    var idx = list.indexOf(id);
    if (idx === -1) {
        list.push(id);
        showToast("Added to Watch later");
    } else {
        list.splice(idx, 1);
        showToast("Removed from Watch later");
    }
    setWatchLater(list);
    renderWatchLater();
    updateSaveButtons();
}

function updateSaveButtons() {
    var list = getWatchLater();
    var buttons = document.querySelectorAll(".save-btn");
    for (var i = 0; i < buttons.length; i++) {
        var id = buttons[i].getAttribute("data-id");
        if (list.indexOf(id) !== -1) {
            buttons[i].classList.add("saved");
        } else {
            buttons[i].classList.remove("saved");
        }
    }
}

function renderWatchLater() {
    var ids = getWatchLater();
    wlCount.textContent = ids.length ? String(ids.length) : "";
    wlList.innerHTML = "";
    if (ids.length === 0) {
        wlEmpty.style.display = "block";
        return;
    }
    wlEmpty.style.display = "none";
    for (var i = 0; i < ids.length; i++) {
        var v = videos.filter(function (x) { return x.id === ids[i]; })[0];
        if (!v) continue;
        var row = document.createElement("div");
        row.className = "wl-item";
        row.innerHTML =
            '<img src="' + thumbUrl(v) + '" alt="">' +
            "<div><strong>" + v.title + "</strong><br><small>" + v.channel + "</small></div>" +
            '<button type="button" data-remove="' + v.id + '">Remove</button>';
        row.querySelector("button").addEventListener("click", function () {
            toggleWatchLater(this.getAttribute("data-remove"));
        });
        wlList.appendChild(row);
    }
}

function showToast(msg) {
    var old = document.querySelector(".toast");
    if (old) old.remove();
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
}

function filterVideos() {
    var q = searchInput.value.toLowerCase().trim();
    var activeChip = document.querySelector(".chip-active");
    var cat = activeChip ? activeChip.getAttribute("data-cat") : "all";
    var cards = document.querySelectorAll(".video-card");
    for (var i = 0; i < cards.length; i++) {
        var c = cards[i];
        var matchCat = cat === "all" || c.getAttribute("data-cat") === cat;
        var matchSearch = !q || c.getAttribute("data-title").indexOf(q) !== -1;
        if (matchCat && matchSearch) {
            c.classList.remove("hidden-card");
        } else {
            c.classList.add("hidden-card");
        }
    }
}

searchInput.addEventListener("input", filterVideos);

var chips = document.querySelectorAll(".chip");
for (var c = 0; c < chips.length; c++) {
    chips[c].addEventListener("click", function () {
        for (var j = 0; j < chips.length; j++) {
            chips[j].classList.remove("chip-active");
        }
        this.classList.add("chip-active");
        filterVideos();
    });
}

if (window.innerWidth <= 768) {
    sidebar.classList.add("collapsed");
}

menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
});

renderGrid();
renderWatchLater();
