/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';

const queryString = require('query-string');

export class CallbackPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      username: null,
    };
  }

  componentWillMount() {
    // Obtain query params
    const queryParams = this.props.hash;
    const parsed = queryString.parse(queryParams);
    const { access_token: accessToken, state } = parsed;

    // Get stored spotify auth state
    const storedState = localStorage.getItem('spotify_auth_state');
    console.log(state);
    console.log(storedState);

    if (accessToken && (state == null || state !== storedState)) {
      this.setState({
        error: 'There was an error during the authentication',
      });
    } else {
      localStorage.removeItem('spotify_auth_state');
      if (accessToken) {
        localStorage.setItem('spotifyAuthToken', accessToken);
        axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((response) => {
          return response.json();
        }).then((data) => {
          this.setState({
            username: data.display_name,
          });
        });
      } else {
        console.log('show login again');
      }
    }
  }

  render() {
    const { error, username } = this.state;
    return (
      <div>
        {!error && !username &&
          <h1>Loading your data...</h1>
        }

        {!error && username &&
          <h1>Welcome {username}</h1>
        }

        {error &&
          <p>{error}</p>
        }


      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    hash: ownProps.location.hash,
  };
};

export default connect(
  mapStateToProps,
  null
)(CallbackPage);
