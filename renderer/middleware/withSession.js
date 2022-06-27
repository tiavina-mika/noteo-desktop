import { getCurrentUser } from '../controllers/auth';
import {
  COOKIES, PATH_NAMES, SESSION_TOKEN_NAME,
} from '../utils/constants';
import { clearCookies }from '../utils/cookies';

const withSession = (fn) => async ({
  req, res, resolvedUrl, ...others
}) => {
  // the req, res, params is inside a context if using this function in getServerSideProps
  const cookies = req.cookies || req.req.cookies;
  let sessionToken = cookies ? cookies[SESSION_TOKEN_NAME] : '';

  let currentUser = null;
  if (sessionToken) {
    try {
      currentUser = await getCurrentUser(sessionToken);

      if (!currentUser) {
        clearCookies(res, [SESSION_TOKEN_NAME])
        return {
          redirect: { destination: PATH_NAMES.login, permanent: false },
        }
      }
    } catch (e) {
      if (e.response?.data?.code === 209) {
        COOKIES.forEach((cookie) => res.clearCookie(cookie, { path: '/' }));
        sessionToken = null;
      }
    }
  }

  // dashboard access denied
  if (!sessionToken) {
    return {
      redirect: { destination: PATH_NAMES.login, permanent: false },
    };
  }

  const values = {
    req,
    res,
    resolvedUrl,
    sessionToken,
    ...others,
  };

  let result = { props: {} };

  result = await fn(values);

  const props = {
    __currentUser: currentUser,
    __sessionToken: sessionToken,
    _pathname: resolvedUrl,
    ...result.props,
  };

  // props used directly in main _app
  return {
    ...result,
    props,
  };
};

export default withSession;
