import React from 'react';
import PropTypes from 'prop-types';
import Handlebars from 'handlebars';
import { Content } from '@deskpro/apps-components';

/**
 * Renders the defined template.
 */
class PageHome extends React.PureComponent {

  static propTypes = {

    location: PropTypes.object.isRequired,

    history: PropTypes.object.isRequired,

    dpapp: PropTypes.object.isRequired,
  };

  componentDidUpdate()
  {
    const { dpapp } = this.props;
    const { title } = this.props.location.state;
    if (title) {
      dpapp.ui.changeTitle(title);
    }
  }

  render() {
    const { history, dpapp } = this.props;
    const { title, html, context } = this.props.location.state;
    if (!html || !title) {
      history.push("settings");
      history.go(1);
      return null;
    }

    try {
      const template = Handlebars.compile(html);
      const renderedTemplate = template(context);
      return (
        <Content>
          <div dangerouslySetInnerHTML={{ __html: renderedTemplate }} />
        </Content>
      );

    } catch (error) {
      if (error instanceof Error) {
        dpapp.ui.showErrorNotification(error)
      } else {
        dpapp.ui.showNotification(error, 'error')
      }
      console.error(error);
      return null;
    }
  }
}

export default PageHome;
