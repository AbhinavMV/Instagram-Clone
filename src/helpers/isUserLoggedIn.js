import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const IsUserLoggedIn = ({ user, isLoggedInPath, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }
        if (user) {
          return <Redirect to={{ pathname: isLoggedInPath, state: { from: location } }} />;
        }
        return null;
      }}
    />
  );
};

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
  isLoggedInPath: PropTypes.string,
  children: PropTypes.object.isRequired,
};

export default IsUserLoggedIn;
