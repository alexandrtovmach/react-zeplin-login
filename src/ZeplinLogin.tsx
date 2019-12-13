import * as React from "react";

import { ZeplinLoginProps, ZeplinLoginState } from "..";
import ZeplinLoginButton from "./ZeplinLoginButton";
import { openWindow, observeWindow } from "./services/window";
import {
  obtainOauthRequestToken,
  obtainOauthAccessToken
} from "./services/oauth1";

export default class ZeplinLoginComponent extends React.Component<
  ZeplinLoginProps,
  ZeplinLoginState
> {
  constructor(props: ZeplinLoginProps) {
    super(props);

    this.state = {
      isCompleted: false
    };
  }

  componentDidMount() {
    this.initializeProcess();
  }

  initializeProcess = () => {
    if (window.opener) {
      const [, oauthToken, oauthVerifier] =
        window.location.search.match(
          /^(?=.*oauth_token=([^&]+)|)(?=.*oauth_verifier=([^&]+)|).+$/
        ) || [];
      window.opener.postMessage(
        {
          type: "authorized",
          data: {
            oauthToken,
            oauthVerifier
          }
        },
        window.origin
      );
    } else {
      const { authCallback, consumerKey, consumerSecret } = this.props;
      window.onmessage = async ({ data: { type, data } }: any) => {
        if (type === "authorized") {
          const accessTokenData = await obtainOauthAccessToken({
            apiUrl: "https://api.zeplin.com/oauth/access_token",
            consumerKey,
            consumerSecret,
            oauthToken: data.oauthToken,
            oauthVerifier: data.oauthVerifier,
            method: "POST"
          });
          const { popup } = this.state;
          this.setState(
            {
              isCompleted: true
            },
            () => {
              authCallback && authCallback(undefined, accessTokenData);
              popup && popup.close();
            }
          );
        }
      };
    }
  };

  handleLoginClick = async () => {
    const { consumerKey, consumerSecret, callbackUrl } = this.props;
    const url = callbackUrl || window.location.href;
    const obtainRequestTokenConfig = {
      apiUrl: "https://api.zeplin.com/oauth/request_token",
      callbackUrl: url,
      consumerKey,
      consumerSecret,
      method: "POST"
    };
    const requestTokenData = await obtainOauthRequestToken(
      obtainRequestTokenConfig
    );
    if (requestTokenData.oauth_callback_confirmed === "true") {
      const popup = openWindow({
        url: `https://api.zeplin.com/oauth/authorize?oauth_token=${requestTokenData.oauth_token}`,
        name: "Log in with Zeplin"
      });

      if (popup) {
        observeWindow({ popup, onClose: this.handleClosingPopup });
        this.setState({
          popup
        });
      }
    } else {
      this.handleError(
        `Callback URL "${url}" is not confirmed. Please check that is whitelisted within the Zeplin app settings.`
      );
    }
  };

  handleClosingPopup = () => {
    const { authCallback } = this.props;
    const { isCompleted } = this.state;
    if (!isCompleted) {
      authCallback && authCallback("User closed OAuth popup");
    }
  };

  handleError = (message: string) => {
    const { authCallback } = this.props;
    authCallback(message);
  };

  render() {
    const { buttonTheme, className } = this.props;

    return (
      <>
        <ZeplinLoginButton
          buttonTheme={buttonTheme || "light"}
          buttonClassName={className}
          onClick={this.handleLoginClick}
        />
      </>
    );
  }
}
