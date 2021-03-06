
console.log('Javascript loaded');

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById("username") !== null) {
        console.log("User is Authenticated");
        authenticated_view();
    }
})

function authenticated_view() {

    console.log('Loading Authenticated view');

    highlight_post();
}

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

function set_btn_text(user) {
    // Set the text for the Follow button

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

function toggle_follow(user) {
    // Toggle the Follow button on the Resume page

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
