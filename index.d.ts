import * as React from "react";

type ZeplinLoginButtonTheme = "dark_short" | "light_short" | "dark" | "light";

interface ZeplinLoginProps {
  /**
   * Consumer API key
   */
  consumerKey: string;

  /**
   * Consumer API secret key
   */
  consumerSecret: string;

  /**
   * Callback function which takes two arguments (error, authData)
   */
  authCallback: (error?: any, result?: any) => void;

  /**
   * The redirect URI of the application, this should be same as the value in the application registration portal.
   */
  callbackUrl: string;

  /**
   * Name of theme for button style.
   */
  buttonTheme?: ZeplinLoginButtonTheme;

  // /**
  //  * Enable detailed logs of authorization process.
  //  */
  // debug?: boolean;

  /**
   * Additional class name string.
   */
  className?: string;
}


interface ZeplinLoginState {
  isCompleted: boolean;
  popup?: Window;
}

declare class ZeplinLogin extends React.Component<
  ZeplinLoginProps,
  ZeplinLoginState
> {}

export { ZeplinLogin, ZeplinLoginProps, ZeplinLoginState, ZeplinLoginButtonTheme };

export default ZeplinLogin;

