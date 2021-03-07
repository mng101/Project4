
console.log('Javascript loaded 1');

document.addEventListener('DOMContentLoaded', function() {
    highlight_post();
})

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

function post_it() {
    console.log("Post button clicked");

    // Capture the value to POST in the Json Body
    // We only need the body of the Post. The user name will be captured by the API
    // and the timestamp will be automatically set
    //
    let body = document.getElementById("post-body").value;

    if (body.length === 0) {
        console.log("Cannot submit an empty Post")
    }

    fetch ('/newpost', {
        method: 'POST',
        body: JSON.stringify({body:body})
    })
    .then(response => {
        console.log('Response:', response);
    })
    .then (result => {
        console.log('Result:', result);
    })
    .catch (error => {
        console.log('Error:', error);
    })
}

// Update the follower count
//
function follower_count(user) {
    console.log("Updating follower count")
    let element = document.getElementById("followers")

    BASE_URL = window.location.protocol + "//" + window.location.host

    fetch(`${BASE_URL}/follower_count/${user}`)
        .then(response => response.json())
        .then (data => {
            count = data.followers
            console.log("Follower count is: ", count)
            element.innerHTML = "Followers:  <b>" + `${count}` + "</b>"
        })
        .then (result => { return (result)})
        .catch (error => {
            console.log('Error: ', error)
        });
}

// Set the text for the Follow button
//
function set_btn_text(user) {
    console.log("Setting buttton text")
    console.log ("Parameter: ", user)
    let element = document.getElementById("follow_btn")

    // BASE_URL = window.location.href;
    const BASEURL = window.location.protocol + "//" + window.location.host

    fetch(`${BASEURL}/is_follower/${user}`)
        .then(response => response.json())
        .then (data => {
            if (data.is_follower) {
                console.log("Value : ", data)
                console.log("Is follower. Set button to Unfollow")
                element.innerHTML = "UnFollow"
            } else {
                console.log("Is not a follower")
                element.innerHTML = "Follow"
            }
        })
        .then (result => { return (result)})
        .catch (error => {
            console.log('Error: ', error)
        });
}

// Toggle the Follow button on the Resume page
//
function toggle_follow(user) {
    console.log("Toggle Follow button")

    // BASE_URL = window.location.href;
    const BASEURL = window.location.protocol + "//" + window.location.host

    fetch(`${BASEURL}/toggle_follow/${user}`)
        .then (data => {
            console.log("Toggle follow : ", data.message)
        })
        .then(error => {
            console.log("Error: ", error)
        })
        .finally (function (){
                console.log(".finally section")
                set_btn_text(`${user}`)
                follower_count(`${user}`)
    });
}
