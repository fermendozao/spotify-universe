import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import LoadingIndicator from 'components/LoadingIndicator';

const locationHelper = locationHelperBuilder({});

// User is Authenticated wrapper
// When authentication fails, redirect to login
const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.user.data !== null,
  authenticatingSelector: state => state.user.isFetching,
  wrapperDisplayName: "UserIsAuthenticated"
};

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults
);

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: LoadingIndicator,
  redirectPath: "/login"
});

// Not used at this time, useful for when having different roles
export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: "/",
  allowRedirectBack: false,
  authenticatedSelector: state =>
    state.user.data !== null && state.user.data.isAdmin,
  predicate: user => user.isAdmin,
  wrapperDisplayName: "UserIsAdmin"
});

// User is Not Authenticated wrapper
// When user is authenticated, redirect to dashboard
const userIsNotAuthenticatedDefaults = {
  authenticatedSelector: state =>
    state.user.data === null && state.user.isFetching === false,
  wrapperDisplayName: "UserIsNotAuthenticated"
};

export const userIsNotAuthenticated = connectedAuthWrapper(
  userIsNotAuthenticatedDefaults
);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/dashboard",
  allowRedirectBack: false
});