import React from 'react';
import PropTypes from 'prop-types';
import Handlebars from 'handlebars';
import { sdkConnect } from '@deskpro/apps-sdk-react';
import { Container } from '@deskpro/react-components';

/**
 * Renders the defined template.
 */
class PageHome extends React.PureComponent {
  static propTypes = {
    /**
     * Instance of sdk storage.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/storage.html
     */
    storage: PropTypes.object.isRequired,

    /**
     * Populated with the details of the currently opened ticket.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/tabdata.html
     */
    tabData: PropTypes.object.isRequired,

    /**
     * Instance of sdk ui.
     * @see https://deskpro.gitbooks.io/deskpro-apps/api/props/ui.html
     */
    ui: PropTypes.object.isRequired
  };

  /**
   * Constructor
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    try {
      if (!props.storage.app.settings || !props.storage.app.settings.template) {
        props.route.to('settings');
      } else {
        const template = Handlebars.compile(props.storage.app.settings.template || '');
        this.html      = template(props.tabData);
      }
    } catch (error) {
      props.ui.error(error);
      props.route.to('settings');
    }
  }

  /**
   * @returns {XML}
   */
  render() {
    return (
      <Container>
        <div dangerouslySetInnerHTML={{ __html: this.html }} />
      </Container>
    );
  }
}

export default sdkConnect(PageHome);
