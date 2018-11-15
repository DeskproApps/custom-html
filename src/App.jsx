import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router'
import { Loader } from '@deskpro/apps-components';
import { createMemoryHistory as createHistory } from "history";

import PageSettings from './components/PageSettings';
import PageHome from './components/PageHome';

const history = createHistory({
  initialEntries: ["loading"],
  initialIndex: 0
});


/**
 * Renders the HTML app.
 */
export default class App extends React.PureComponent {

  static propTypes = {
    dpapp: PropTypes.object.isRequired,
  };


  /**
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {
    const { storage, context } = this.props.dpapp;

    Promise.all([
      storage.getAppStorage([ "title", "html" ]),
      context.get('ticket').get(),
      context.getMe()
    ]).then(values => {

      const [data, tab, me] = values;
      const state = {
        html:   data.html,
        title:  data.title,
        context: { tab: tab.data, me }
      };
      history.push("home", state);
      history.go(1);
    });
  }

  renderHome = (props) => {
    const { dpapp } = this.props;
    return <PageHome {...props} dpapp={dpapp} />
  };

  /**
   * @returns {XML}
   */
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="settings" component={PageSettings} />
          <Route path="home" render={this.renderHome} />
          <Route path="loading" render={() => <Loader />} />
        </Switch>
      </Router>
    );
  }
}
