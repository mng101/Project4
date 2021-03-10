
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

// // TODO - Add function count_votes similar to the follower_count
// // Get the Vote count for the Post
//    TODO - The vote count is now set in the view.py file
//    - Modify this function to update the vote count when the toggle vote is clicked
// //
// function vote_count(element, id) {
//     console.log("Get the Vote count for the post :", id)
//     console.log("Element Id is: ", element, element.innerHTML)
//
//     // BASE_URL = window.location.href;
//     const BASEURL = window.location.protocol + "//" + window.location.host
//
//     fetch(`${BASEURL}/vote_count/${id}`)
//         .then (response => response.json())
//         .then (data => {
//             // console.log("data")
//             count = data.votes
//             console.log ("Votes: ", count, id)
//             element.innerHTML = "Votes: <b>" + `${count}` + "</b>  "
//         })
//         .then (result => { return (result)})
//         .catch (error => {
//             console.log ("Error: ", error)
//         })
//         // .finally (function(){
//         //     console.log("Updating count for: ", id, count)
//         //     console.log("Element is: ", element, element.innerText)
//         //     element.innerText = "Votes: <b>" + `${count}` + "</b>;"
//         // });
// }

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

// Toggle the Vote button on the paginated posts
//
function toggle_vote(element, post) {
    console.log("Toggle Vote button : ", post)
    console.log("Element is: ", element)
    console.log("The value of this is :", this.innerHTML)

    // TODO - Add logic similar to the toggle_follow

    // // BASE_URL = window.location.href;
    // const BASEURL = window.location.protocol + "//" + window.location.host
    //
    // fetch(`${BASEURL}/toggle_follow/${user}`)
    //     .then (data => {
    //         console.log("Toggle follow : ", data.message)
    //     })
    //     .then(error => {
    //         console.log("Error: ", error)
    //     })
    //     .finally (function (){
    //             console.log(".finally section")
    //             set_btn_text(`${user}`)
    //             follower_count(`${user}`)
    // });
}

function update_post(element, post_id) {
    console.log("Update Post selected: ", post_id)
    console.log("Element: ", element)
    //
    // TODO - Complete this function
}
