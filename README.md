# Reactive Blog

Try the website here: [https://react-posts.herokuapp.com/](https://react-posts.herokuapp.com/)

Reactive Blog is a web blog application.

## Public Part (Accessible without authentication) - access control

- The public part of the project is visible without authentication
- Home page
- Navigation menu: Giving access only to the pages, intended for users with free access - home page, blog, user login and registration
- Blog: Showing all blog posts and their content
- Access to detailed information about each listing - image, author name, description, category and comments.

## Private Part (Available for Registered Users) - access control

- Registered users have personal areas in the web application accessible after their successful login:

1. Home page giving access to their profile page.
2. Profile page containing information about the current user:
   - Personal data, email, etc.
   - Posts created by this user
3. Access to post details page
4. Create new post.

## Technologies

- React.JS, NodeJS, ExpressJS, MongoDB, JavaScript, CSS, HTML
- Heroku

## Screens (Pages)

- **Home Page** (home page) - home page for unregistered users
- **Login / Register** - registration with first and last name, e-mail and password
- **Blog** - list of all available blog posts
- **Profile Page** - information about the current user
- **Details Page** - a page giving information about a specific blog post
- **Create Page** - page for creating new blog post

## Implementation

### Data structure

#### Collections

- Users

```javascript
{
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    avatar: String, //(Set to a default one by the server for now)
    posts: Array, //(Array of the posts the user has created)
}
```

- Blog Post

```javascript
{
    title: String,
    categories: Array,
    imageUrl: String,
    dateOfCreation: Date,
    description: String, //(This keeps the blog body as a String of HTML that is parsed to HTML on the Client Side)
    author: Pointer<User>,
    upvotes: Array, //(Array of user IDs that upvoted the post. Can be populated if needed with user infos without the password!)
    downvotes: Array, //(Array of user IDs that downvotes the post. Can be populated if needed with user infos without the password!)
    rating: Number,
    comments: Array, //Comment structure can be found below

}
```

- Comment

```javascript
{
    author: Pointer<User>,
    comment: String, //(The comment body)
    dateOfCreation: Date,
    upvotes: Array, //(Array of user IDs that upvoted the comment. Can be populated if needed with user infos without the password!)
    downvotes: Array, //(Array of user IDs that downvotes the comment. Can be populated if needed with user infos without the password!)
    rating: Number,
}
```

## Additional functionality

- Dynamic Form Validation
- Demonstrates use of programming concepts - React Hooks, Context API
- Integration of the following APIs:
  - Goole Maps
  - Tiny MCE (For better experience when creating the blog body)
- Good UI and UX (Fully responsive)
- The application is deployed in Heroku and its Back-end is also deployed in Heroku on a separate dyno
- Good authentication, the application uses a Server-side cookie to check the requests and a client-side cookie to keep userName and userId

## Todos

- Finish edit and delete user funtionality
- Implement change password funtionality
- Implement edit and delete post funtionality
- Implement edit and delete comment funtionality
- Implement e-mail confirmation funtionality
- Implement e-mail change functionality
