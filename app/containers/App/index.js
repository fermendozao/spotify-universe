/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import GalaxyPage from 'containers/GalaxyPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import stars from './stars.png';
import twinkling from './twinkling.png';
import clouds from './clouds.png';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;

  @keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
  @-webkit-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
  @-moz-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
  @-ms-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
  @keyframes move-clouds-back {
    from {background-position:0 0;}
    to {background-position:10000px 0;}
  }
  @-webkit-keyframes move-clouds-back {
    from {background-position:0 0;}
    to {background-position:10000px 0;}
  }
  @-moz-keyframes move-clouds-back {
    from {background-position:0 0;}
    to {background-position:10000px 0;}
  }
  @-ms-keyframes move-clouds-back {
    from {background-position: 0;}
    to {background-position:10000px 0;}
  }

  .stars, .twinkling, .clouds {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .stars {
    background: #000 url(${stars}) repeat top center;
    z-index: 0;
  }

  .twinkling {
    background:transparent url(${twinkling}) repeat top center;
    animation:move-twink-back 500s linear infinite;
    z-index: 1;
  }

  .clouds {
    background:transparent url(${clouds}) repeat top center;
    animation:move-twink-back 200s linear infinite;
    z-index: 3;
  }

  .content-wrapper {
    z-index: 9999;
  }
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>

      <div className="bg-wrapper">
        <div className="stars" />
        <div className="twinkling" />
        <div className="clouds" />
      </div>
      <div className="content-wrapper">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/my-galaxy" component={GalaxyPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    </AppWrapper>
  );
}
