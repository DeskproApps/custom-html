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
    this.state = {
      html: ""
    };
  }

  /**
   * Invoked immediately after a component is mounted
   */
  componentDidMount() {

    if (!this.props.storage.app.settings || !this.props.storage.app.settings.html) {
      this.props.route.to('settings');
      return
    }

    try {
      const template = Handlebars.compile(this.props.storage.app.settings.html || '');
      const html      = template(this.getTemplateContext());
      this.setState({ html  })
    } catch (error) {
      this.props.ui.error(error);
    }


  }

  /**
   * Returns the values used in templates
   *
   * @returns {*}
   */
  getTemplateContext = () => {
    return Object.assign({}, {
      tab: this.getTabData(),
      me: this.getMe(),
      storage: JSON.parse(JSON.stringify(this.props.storage))
    });
  };

  /**
   * Returns a copy of the data loaded in the container tab.
   * Exposed as method on the global window object
   *
   * @returns {object}
   */
  getTabData = () =>
  {
    return JSON.parse(JSON.stringify(this.props.tabData));
  };

  /**
   * Returns a copy of the data representation of the current authenticated user.
   * Exposed as method on the global window object
   *
   * @returns {object}
   */
  getMe = () =>
  {
    return JSON.parse(JSON.stringify(this.props.me));
  };


  /**
   * @returns {XML}
   */
  render() {
    return (
      <Container>
        <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </Container>
    );
  }
}

export default sdkConnect(PageHome);
