# react-zeplin-login

[![npm](https://img.shields.io/npm/v/react-zeplin-login?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/react-zeplin-login)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-zeplin-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-zeplin-login)
[![npm](https://img.shields.io/npm/dt/react-zeplin-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-zeplin-login)

React component for a simple OAuth login with Zeplin.

[DEMO HERE](https://alexandrtovmach.github.io/react-zeplin-login/)

![image](https://user-images.githubusercontent.com/28801003/70469597-ff2f5300-1ad1-11ea-880f-2d604d9ed41b.png)

## 🚀 Get Started

Follow these steps to start using React Zeplin Login:

1. Installation

   ```sh
   # with npm
   npm i react-zeplin-login

   # with yarn
   yarn add react-zeplin-login
   ```

2. Import and configure component.

   ```jsx
   import React from "react";
   import ZeplinLogin from "react-zeplin-login";

   export default props => {
     const authHandler = (err, data) => {
       console.log(err, data);
     };

     return (
       <ZeplinLogin
         authCallback={authHandler}
         clientId={CLIENT_ID}
         clientSecret={CLIENT_SECRET}
         redirectUri={REDIRECT_URI}
       />
     );
   };
   ```

3. Find more info about keys and OAuth apps in [Zeplin official docs](https://www.zeplin.com/developers/api#oauth2)

## 📖 API

| Property     | Type                                                       | Default   | Description                                                            |
| ------------ | ---------------------------------------------------------- | --------- | ---------------------------------------------------------------------- |
| authCallback | function                                                   | required  | Callback function which takes two arguments `(error, authData)`        |
| clientId     | string                                                     | required  | Client ID of your OAuth App                                            |
| clientSecret | string                                                     | required  | Client Secret of your OAuth App                                        |
| redirectUri  | string                                                     | required  | Authorization callback URL of your OAuth App                           |
| buttonTheme  | enum(`"light"`, `"light_short"`, `"dark"`, `"dark_short"`) | `"light"` | Button style theme that based on Zeplin styles                          |
| className    | string                                                     | `""`      | Custom class name                                                      |

## 📝 License

[MIT](https://github.com/alexandrtovmach/react-zeplin-login/blob/master/LICENSE)
