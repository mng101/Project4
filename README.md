# Project 4 - Network

Web Programming with Python and Javascript

Demonstration of a Twitter-like social network for making posts and following users

0:02.00 -
Index Page. The unauthenticated view shows the list of paginated posts with the most recent post first. Each post shows the name of the poster, the content of the post, date and time when the post was submitted, and the number of likes the post has received. On this page, users can also Login or Register to access the site. Unauthenticated users do not have the option of voting for the post.

0:09.00 - 
Users can use the 'Next Page' button at the bottom of the page to navigate to the next set of posts. The 2nd and subsequent pages display the "Previous Page' button to navigate to the previous page.

0:13.00 - 
Selecting the Previous Page button bring the user to the previous page

0:20.00 - 
Selecting the Name of the poster, displays the poster's profile page. The profile page shows some details about the poster, including the number of followers, and the number of users followed, and a listing of all their posts.

0:34.20 -
Index Page again

0:35.00 - 
Users can login to the site using the option in the navigation bar, and can also register for the site.

0:42.20 - 
When a user is authenticated, the index page displays a form, where the user can create new posts. The users own posts are highlighted. Posts by other users, include a button to allow the user to vote on the post. A user cannot Vote Up their own posts. Posts previously voted on show the 'Vote Down' button to withdraw the vote.

0:47.00 -
Users can submit a new post by entering the body of the post in the form, and selecting Post.  A new post causes the page to reload, with the newly submitted post as the first post.

1:07.00 -
When a user clicks on the Vote Up button, the Vote count increments, and the button changes to 'Vote Down'. Selecting the 'Vote Down' button, reverses this action.

1:22.00 - 
Selecting the users own post, displays the post in a textbox, where the user can update the post. The updated post is saved to the database and also reflected in the post displayed. The date and time of the original post is maintained.

1:33.00 - 
Like in the case of the unauthenticated view, selecting the Next Page button, displays the next set os 10 posts.

1:42.00 - 
Selecting the poster's name in the list, displays the poster's profile page. Here the user can opt to follow the poster. If the user was previously following the poster, they can 'Unfollow' on this page. The follower count is updated when a user Follows or Unfollows the poster.

2:09.00 - 
Selecting 'Following' in the navigation bar, displays a list of all posts made by users the current user follows. The posts are displayed in reverse chronological order. 

2:16.00 - 
Selecting one of the users followed and unfollowing them, removes that users post from the following list
