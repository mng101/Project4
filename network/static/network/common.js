
// Highlight posts by the authenticated user. These are identified by
// the <div id="match">
//
function highlight_post() {
    console.log("Hightlighting Post");
    const elements = document.getElementsByClassName("match")
    console.log(elements);

    for (var i = 0; i < elements.length; i++) {
        // console.log("Processing element: ", i);
        elements[i].style.background = "#b0f6f6";
    }
}
