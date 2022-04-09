# quieter: social media for quiet folks

[Visit the website](https://quieter-app.web.app/)

## About the Project

A social media application where users can join communities, create posts and comment. Visit the [about page of quieter](https://quieter-app.web.app/about) to learn about quieter specific terms.

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [React Testing Libary](https://testing-library.com/docs/react-testing-library/intro/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)

## Getting Started

1. Clone the repository. 

```bash
git clone git@github.com:01zulfi/quieter.git
```
2. Make sure all the tests pass.

```bash
npm test
```

3. Go to [console.firebase.com](https://console.firebase.google.com/) and create a new project. Firebase will provide a configuration object. Replace it with the one in [`src/utils/firebase-config.ts`](https://github.com/01zulfi/quieter/blob/main/src/utils/firebase-config.ts).
   - Make sure to enable firebase firestore and authentication.

4. Serve the app locally. It should be live at http://localhost:3000/.

```bash
npm start
```

## Features

- Users can login the app through email and google. There's also a sign in as guest option, though guest users can only view certain parts of the app. Guest users cannot interact with quieter i.e. they cannot post, comment, and like.
- Users can create new communities; the user who creates a community will now be the admin. Admins can edit community details and delete the community at their discretion
- Users can create posts. Posts are always linked to a community. The user who creates a post is referred to as the author. Authors can edit post details and delete the post at their discretion.
- Users can create comments on posts. The user who creates a comment is referred to as the author. Authors can delete the comment at their discretion.
- Users can like posts. 
- Users can join/leave communities. Joining a community is not mandatory for a user to create a post in it.
- Users have a personalized feed at their homepage. It shows posts from their joined communities and from the communities they're admin at. It will also show posts that they have created.
- Users can view their profile stats at their page. They can choose to hide their profile stats if they wish.
- Users can select avatars from a predefined selection.
- Users can switch between a light and a dark theme.

## Attributions

1. Image in Sign in Page from [unsplash](https://unsplash.com/photos/5d5H42WDT4M).
2. "Rubik" font and icons from [google](https://fonts.google.com/).
3. Avatar SVGs from [svgrepo.com](https://www.svgrepo.com/).
4. Color palette for light and dark theme from [nordtheme](https://www.nordtheme.com/).
