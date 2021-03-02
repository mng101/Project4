
console.log('Javascript loaded');

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById("username") !== null) {
        console.log("User is Authenticated");
        authenticated_view();
    } else {
        console.log("User is not Authenticated");
        unauthenticated_view();
    }
})

function authenticated_view() {

    console.log('Loading Authenticated view');
    // document.querySelector('#new-post-view').style.display = 'block';
    // document.querySelector('#all-post-view').style.display = 'block';
    // document.querySelector('#following-post-view').style.display = 'none'

    // console.log("Reading all posts - Auth view");
    // Show all posts
    // show_all_posts();
    highlight_post();
}

function unauthenticated_view() {

    console.log('Loading Unauthenticated view');
    // document.querySelector('#new-post-view').style.display = 'none';
    // document.querySelector('#all-post-view').style.display = 'block';
    // document.querySelector('#following-post-view').style.display = 'none'
    //
    // console.log("Reading all posts - Unauth view");
    // Show all posts
    // show_all_posts();
}

function highlight_post() {
    console.log("Hightlight Post called");
    const elements = document.getElementsByClassName("match")
    console.log(elements);

    for (var i = 0; i < elements.length; i++) {
        console.log("Processing element: ", i);
        // elements[i].style.background = "#c4c4c4";
        elements[i].style.background = "#b0f6f6";
    }
}

function follower_count(user) {

}

function toggle_follow(user) {
    console.log("Follow button clicked");
    // let u = user
    console.log ("Parameter: ", user)
    let b = document.getElementById("follow_btn").innerHTML
    console.log("Button text: ", b)

    // BASE_URL = window.location.href;
    let URL = window.location.protocol + "//" + window.location.host + "/"
                + "follower/" + user

    let value = fetch(URL)
        .then(response => response.json())
        .then (data => {
            if (data.is_follower) {
                console.log(data)
                console.log("Is follower")
            } else {
                console.log("Is not a follower")
            }
        })
        .then (result => {
            console.log('Result: ', result)
        })
        .catch (error => {
            console.log('Error: ', error)
        });

    // console.log("The value of is_follower is: ", f)

    // var json = JSON.parse(response)
    // console.log("Response: ", json)

    // if (json.is_follower)
    //     console.log ("Is a follower")
    // else
    //     console.log("Is not a follower")
}


