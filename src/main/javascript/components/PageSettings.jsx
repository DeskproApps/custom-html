import React from 'react';
import PropTypes from 'prop-types';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Section } from '@deskpro/react-components';

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
      <Section>
        It appears the application did not install properly. Please contact your administrator.
      </Section>
    );
  }
}

export default sdkConnect(PageSettings);
