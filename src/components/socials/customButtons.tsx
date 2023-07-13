
import {FacebookSvgIcon, GoogleSvgIcon} from './icons/icons';
import {createButton, createSvgIcon} from "react-social-login-buttons";

const facebookSignupConfig = {
  text: "Sign Up with Facebook",
  icon: createSvgIcon(FacebookSvgIcon),
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998", fontSize: '14px' },
  activeStyle: { background: "#293e69" }
};
/** Facebook Sign Up button. */
const FacebookSignUpButton = createButton(facebookSignupConfig);

const googleSignUpConfig = {
    text: "Sign Up with Google",
    icon: createSvgIcon(GoogleSvgIcon),
    iconFormat: name => `fa fa-${name}`,
    style: { background: "white", fontSize: '14px', color: 'black', },
    activeStyle: { background: "#EFF0EE" }
  };
  /** Google Sign Up button. */
  const GoogleSignUpButton = createButton(googleSignUpConfig);


export{ FacebookSignUpButton, GoogleSignUpButton }