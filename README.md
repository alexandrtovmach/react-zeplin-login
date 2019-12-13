# react-zeplin-login

[![npm](https://img.shields.io/npm/v/react-zeplin-login?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/react-zeplin-login)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-zeplin-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-zeplin-login)
[![npm](https://img.shields.io/npm/dt/react-zeplin-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-zeplin-login)

React component for a simple OAuth login with Zeplin.

[DEMO HERE](https://alexandrtovmach.github.io/react-zeplin-login/)

![image](https://user-images.githubusercontent.com/28801003/70518342-dc895280-1b42-11ea-905a-eed1bdf63694.png)

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
         consumerKey={CONSUMER_KEY}
         consumerSecret={CONSUMER_SECRET}
         callbackUrl={CALLBACK_URL}
       />
     );
   };
   ```

3. Find more info about keys and Zeplin developer apps in [official docs](https://developer.zeplin.com/en/docs/basics/apps/overview).

## 📖 API

| Property       | Type                                                       | Default   | Description                                                                                                          |
| -------------- | ---------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| authCallback   | function                                                   | required  | Callback function which takes two arguments `(error, authData)`                                                      |
| consumerKey    | string                                                     | required  | Consumer API Key of your Zeplin developer app (not Access Token)                                                     |
| consumerSecret | string                                                     | required  | Consumer API Secret of your Zeplin developer app (not Access Token Secret)                                           |
| callbackUrl    | string                                                     | required  | Whitelisted [callback URL](https://developer.zeplin.com/en/docs/basics/apps/guides/callback-urls) of your Zeplin app |
| buttonTheme    | enum(`"light"`, `"light_short"`, `"dark"`, `"dark_short"`) | `"light"` | Button style theme, that based on [Zeplin Brand Design](https://about.zeplin.com/en_us/company/brand-resources.html) |
| className      | string                                                     | `""`      | Custom class name                                                                                                    |

## 📝 License

[MIT](https://github.com/alexandrtovmach/react-zeplin-login/blob/master/LICENSE)
