
console.log('Javascript loaded');

// document.addEventListener('DOMContentLoaded', function() {
//     console.log('Unauthenticated view');
//     // For Unauthenticated users show the all-post-view and hide all others
//     //
//     document.querySelector('#new-post-view').style.display = 'none';
//     document.querySelector('#all-post-view').style.display = 'block';
//     document.querySelector('#following-post-view').style.display = 'none';
//     // document.querySelector('#profile').style.display = 'none';
// });

function authenticated_view() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Authenticated view');
        document.querySelector('#new-post-view').style.display = 'block';
        document.querySelector('#all-post-view').style.display = 'block';
        document.querySelector('#following-post-view').style.display = 'none'
    });
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

function unauthenticated_view() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Unauthenticated view');
        document.querySelector('#new-post-view').style.display = 'none';
        document.querySelector('#all-post-view').style.display = 'block';
        document.querySelector('#following-post-view').style.display = 'none'
    });

    // Fetch one page of posts
    fetch('/allposts')
        .then(response => response.json())
        .then(data => {
            console.log('Data Received: ', data);
            data.forEach(post => show_post(post))
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}

function show_post(post) {
    console.log('Displays Posts loaded');

    const element = document.createElement('div');
    element.className = 'posts';

    // Capture the UTC timestamp for conversion to the locale format
    const utcDate = new Date(post.timestamp);

    // Display the Username, Timestamp, and body of the Post
    element.innerHTML = `<b>${post.user}</b> <span style="float: right">${utcDate.toLocaleString()}</span>`;
    element.innerHTML += `<br>${post.body}`;

    // Add event handlers to count 'likes' and 'dislikes'

    // Add Post to the DOM
    document.querySelector('#all-post-view').append(element);
}
