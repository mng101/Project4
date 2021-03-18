
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

    BASE_URL = window.location.protocol + "//" + window.location.host

    fetch(`${BASE_URL}/follower_count/${user}`)
        .then(response => response.json())
        .then (data => {
            c1 = data.followers
            c2 = data.follows
            console.log("Follower count is: ", c1, c2)
            element.innerHTML = "Follows: <b>" + `${c2}` + "</b>&nbsp Followers: <b>" + `${c1}` + "</b>"
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
            votes = data.votes
            action = data.action
            console.log("Data :", votes, action)
        })
        .then (error => {
            console.log("Error : ", error)
        })
        .finally ( function() {
            console.log("Finally section")
            // Update the post header with the new count and button
            // The vote count is in the table cell to the left of the Vote button
            c1 = vote_btn.parentElement.previousElementSibling
            c1.innerHTML = "Votes: <b>" + votes + "</b> "
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

    // e = document.getElementById('updated_post')

    post_body = document.getElementById('updated_post').value

    if (post_body.length === 0) {
        console.log("Cannot submit an empty Post")
        alert("Cannot submit an empty post");
    }

    updatedpost = [{"post_id": post_id, "post_body": post_body}];

    fetch('/updatepost', {
        method: 'PUT',
        body: JSON.stringify(updatedpost)
    })
        .then(response => {
            console.log('Response', response);
        })
        // .then (result => {
        //     console.log('Result:', result);
        // })
        .catch (error => {
            console.log("Error: ", error);
        })
        .finally ( function() {
            console.log("Finally section of Update Post ")
            update_form = element.parentElement.parentElement
            post_display = update_form.nextSibling
        //  Update the display with the updated post
            post_display.innerText = post_body

        //  Remove the post update form, sand display the update post body
            update_form.remove()
            post_display.style.display = "block"
        })
}

function show_post_form(element, post_id) {
    console.log("Showing Post Update form: ", element, post_id)

    e = element
    postbody = e.innerText

//    Build a form, with textarea to update the post body
    a1 = document.createElement('div')
    a2 = document.createElement("form")
    a3 = document.createElement("textarea")
    a3.classList.add("form-control")
    a3.setAttribute("id", "updated_post")
    a3.innerText = postbody         // Paste the post body in the textarea
    a4 = document.createElement('input')
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

    // input = document.createElement('form')
    // input.setAttribute('id', 'post_update_form')
    //
    // s1 = '<textarea className="form-control"></textarea> '
    // s1 += '<input type="submit" value="Post" onclick="update_post(this, post_id)" class="btn btn-primary btn-sm"'
    //
    // // input.append(s1)
    // input.innerHTML = s1
    //
    // e.parentElement.insertAdjacentElement('beforebegin', input)
    //
    // input.style.display = "block"
    // e.style.display = "none"
}
