# Project 4 - Network

Web Programming with Python and Javascript

Demonstration of a Twitter-like social network for making posts and following users

Index Page. The unauthenticated view shows the list of paginated posts with the most recent post first. Each post shows the name of the poster, the content of the post, date and time when the post was submitted, and the number of likes the post has received. On this page, users can also Login or Register to access the site. Unauthenticated users do not have the option of voting for the post.

Users can use the 'Next Page' button at the bottom of the page to navigate to the next set of posts. The 2nd and subsequent pages display the "Previous Page' button to navigae to the previous page.

Selecting the Name of the poster, displays the poster's profile page. The profile page shows some deatils about the poster, including the number of followers, and the number of users followed, and a listing of all their posts.

Users can login to the site using the option in the navigation bar, can also register on the site.

When a user is authenticated, the index page displays a form, where the user can create new posts. The users own posts are highlighted. Posts by other users, include a button to allow the user to vote on the post. A user cannot Vote Up their own posts. Posts previously voted on show the 'Vote Down' button to withdraw the vote.

When a user clicks on the Vote Up botton, the Vote count increaments, and the button chnages to 'Vote Down'. Selecting the 'Vote Down' button, reverses this action.

Selecting the users own post, displayes the post in a textbox, where the user can update the post. The updated post is saved to the database and also reflected in the post displayed.

Selecting the poster's name in the list, displays the poster's profile page. Here the user can opt to follow the poster. If the user was previously following the poster, they can 'Unfollow' on this page. The follower count is updated when a user Follows or Unfollows the poster.

Selecting 'Following' in the navigation bar, displays a list of all posts made users the current user follows. The posts are displayed in reverse cronological order. 
