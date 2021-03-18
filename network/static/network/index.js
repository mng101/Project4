
console.log('Javascript loaded 1');

document.addEventListener('DOMContentLoaded', function() {
    highlight_post();
})

// Highlight posts by the authenticated user. These posts are identified by the <div id="match">
//
function highlight_post() {
    console.log("Hightlighting Post");
    const elements = document.getElementsByClassName("match")
    console.log(elements);

    for ( let i = 0; i < elements.length; i++) {
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
        alert("Cannot submit an empty post");
        return
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

    let BASE_URL = window.location.protocol + "//" + window.location.host

    fetch(`${BASE_URL}/follower_count/${user}`)
        .then(response => response.json())
        .then (data => {
            let c1 = data.followers
            let c2 = data.follows
            console.log("Follower count is: ", c1, c2)
            element.innerHTML = "Follows: <b>" + `${c2}` + "</b>&nbsp Followers: <b>" + `${c1}` + "</b>"
        })
        .then (result => { return (result)})
        .catch (error => {
            console.log('Error: ', error)
        });
}

// Set the text for the Follow button on Resume page
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
        .then(response => response.json())
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

    const vote_btn = element

    // BASE_URL = window.location.href;
    const BASEURL = window.location.protocol + "//" + window.location.host

    fetch(`${BASEURL}/toggle_vote/${post}`)
        .then(response => response.json())
        .then (data => {
            let votes = data.votes
            let action = data.action
            console.log("Data :", votes, action)
        })
        .then (error => {
            console.log("Error : ", error)
        })
        .finally ( function() {
            console.log("Finally section")
            // Update the post header with the new count and button
            // The vote count is in the table cell to the left (previous) of the Vote button
            let c1 = vote_btn.parentElement.previousElementSibling
            c1.innerHTML = "Votes: <b>" + `${votes}` + "</b> "
            let action;
            if (action === 'created') {
                console.log(post, " Voted Up")
                vote_btn.innerText = "Vote Down"
            } else {
                console.log(post, " Vote Down")
                vote_btn.innerText = "Vote Up"
            }
        })
}

function update_post(element, post_id) {
    console.log("Updating Post")

    let post_body = document.getElementById('updated_post').value

    if (post_body.length === 0) {
        console.log("Cannot submit an empty Post")
        alert("Cannot submit an empty post");
    }

    let updatedpost = [{"post_id": post_id, "post_body": post_body}];

    fetch('/updatepost', {
        method: 'PUT',
        body: JSON.stringify(updatedpost)
    })
        .then(response => {
            console.log('Response', response);
        })
        .catch (error => {
            console.log("Error: ", error);
        })
        .finally ( function() {
            console.log("Finally section of Update Post ")
            let update_form = element.parentElement.parentElement
            let post_display = update_form.nextSibling
        //  Update the display with the updated post
            post_display.innerText = post_body
        //  Remove the post update form, and display the update post body
            update_form.remove()
            post_display.style.display = "block"
        })
}

function show_post_form(element, post_id) {
    console.log("Showing Post Update form: ", element, post_id)

    let e = element
    let postbody = e.innerText

//    Build a form, with textarea to update the post body
    let a1 = document.createElement('div')
    let a2 = document.createElement("form")
    let a3 = document.createElement("textarea")
    a3.classList.add("form-control")
    a3.setAttribute("id", "updated_post")
    a3.innerText = postbody         // Paste the post body in the textarea
    let a4 = document.createElement('input')
    // a4.type = "submit"
    a4.type = "button"
    a4.value = "Update Post"
    a4.className = "btn"
    a4.className += " btn-primary"
    a4.className += " btn-sm"

    a2.appendChild(a3)
    a2.appendChild(a4)
    a1.appendChild((a2))

    // Add Event Listener after appending all the Child elements
    a4.addEventListener("click", function() {update_post(this, post_id);})
    console.log("Event listener added")

    // Hide the Post element and show the Post Edit form
    e.style.display="none"
    // e.parentElement.insertAdjacentElement('beforebegin', a1)
    e.insertAdjacentElement('beforebegin', a1)
    console.log("Form inserted into the page")
}
