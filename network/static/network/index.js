
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

function unauthenticated_view() {

    console.log('Loading Unauthenticated view');
    document.querySelector('#new-post-view').style.display = 'none';
    document.querySelector('#all-post-view').style.display = 'block';
    document.querySelector('#following-post-view').style.display = 'none'

    console.log("Reading all posts - Unauth view");
}

function authenticated_view() {

    console.log('Loading Authenticated view');
    document.querySelector('#new-post-view').style.display = 'block';
    document.querySelector('#all-post-view').style.display = 'block';
    document.querySelector('#following-post-view').style.display = 'none'

    console.log("Reading all posts - Auth view");

    highlight_post();
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
