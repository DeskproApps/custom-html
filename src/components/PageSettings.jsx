import React from 'react';
import PropTypes from 'prop-types';
import { Content } from '@deskpro/apps-components';

/**
 * Renders the app's settings page.
 */
class PageSettings extends React.PureComponent {
  static propTypes = {
    /**
     * Instance of sdk route.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/route.html
     */
    route: PropTypes.object.isRequired,

    /**
     * Instance of sdk storage.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/storage.html
     */
    storage: PropTypes.object.isRequired
  };

  /**
   * @returns {XML}
   */
  render() {

    return (
      <Content>
        It appears the application did not install properly. Please contact your administrator.
      </Content>
    );
  }
}

export default PageSettings;
