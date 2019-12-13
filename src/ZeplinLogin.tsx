import * as React from "react";

import { ZeplinLoginProps, ZeplinLoginState } from "..";
import ZeplinLoginButton from "./ZeplinLoginButton";
import { openWindow, observeWindow } from "./services/window";

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
      const [match, code] =
        window.location.search.match(/.*code=([^&|\n|\t\s]+)/) || [];
      window.opener.postMessage(
        {
          type: "code",
          data: code
        },
        window.origin
      );
    } else {
      const { authCallback } = this.props;
      window.onmessage = ({ data: { type, data } }: any) => {
        if (type === "code") {
          this.sendTokenRequest(data)
            .then(res => res.json())
            .then(data => {
              const { popup } = this.state;
              this.setState(
                {
                  isCompleted: true
                },
                () => {
                  authCallback && authCallback(undefined, data);
                  popup && popup.close();
                }
              );
            });
        }
      };
    }
  };

  buildCodeRequestURL = () => {
    const { clientId, redirectUri } = this.props;
    const uri = encodeURIComponent(redirectUri || window.location.href);
    return `https://www.zeplin.com/oauth?client_id=${clientId}&redirect_uri=${uri}&state=null&response_type=code`;
  };

  sendTokenRequest = (code: string) => {
    const { clientId, clientSecret, redirectUri } = this.props;
    const uri = encodeURIComponent(redirectUri || window.location.href);
    return fetch(
      `https://www.zeplin.com/api/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${uri}&code=${code}&grant_type=authorization_code`,
      {
        method: "POST"
      }
    );
  };

  handleLoginClick = () => {
    const popup = openWindow({
      url: this.buildCodeRequestURL(),
      name: "Log in with Zeplin"
    });

    if (popup) {
      observeWindow({ popup, onClose: this.handleClosingPopup });
      this.setState({
        popup
      });
    }
  };

  handleClosingPopup = () => {
    const { authCallback } = this.props;
    const { isCompleted } = this.state;
    if (!isCompleted) {
      authCallback && authCallback("User closed OAuth popup");
    }
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
