waitForElm("#primary-inner").then(elm => {
    console.log("Got it");

    elm.insertBefore(createVideo(), elm.children[1]);

    console.log(elm)
});

function createVideo() {
    return htmlToElement(`
    <div class="youtube-container">
    <iframe width="560" height="315" class="gameplay-embeded-video"  src="https://www.youtube.com/embed/7ghSziUQnhs?controls=0&amp;start=1000&autoplay=1&mute=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    `)
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}