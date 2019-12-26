# react-zeplin-login

[![npm](https://img.shields.io/npm/v/react-zeplin-login?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/react-zeplin-login)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-zeplin-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-zeplin-login)
[![npm](https://img.shields.io/npm/dt/react-zeplin-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-zeplin-login)

React component for a simple OAuth login with Zeplin.

[DEMO HERE](https://alexandrtovmach.github.io/react-zeplin-login/)

![button examples](https://user-images.githubusercontent.com/28801003/71491334-c82ea080-2838-11ea-862d-96529b907bec.png)

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

3. Find more info about keys and OAuth apps in [Zeplin official docs](https://docs.zeplin.dev/reference#authentication)

## 📖 API

| Property     | Type                                                                    | Default     | Description                                                                                               |
| ------------ | ----------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| authCallback | function                                                                | required    | Callback function which takes two arguments `(error, authData)`                                           |
| clientId     | string                                                                  | required    | Client ID of your OAuth App                                                                               |
| clientSecret | string                                                                  | required    | Client Secret of your OAuth App                                                                           |
| redirectUri  | string                                                                  | required    | Authorization callback URL of your OAuth App                                                              |
| buttonTheme  | enum(`"classic"`, `"light"`, `"light_short"`, `"dark"`, `"dark_short"`) | `"classic"` | Button style theme. Just `"classic"` is approved by Zeplin team, and de-facto is only one official option |
| className    | string                                                                  | `""`        | Custom class name                                                                                         |

## 📝 License

[MIT](https://github.com/alexandrtovmach/react-zeplin-login/blob/master/LICENSE)
