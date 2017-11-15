import React from 'react';
import { sdkConnect, LinkButton } from '@deskpro/apps-sdk-react';
import { Container, Section, Heading } from '@deskpro/react-components';

/**
 * Renders the app's help page.
 */
const PageHelp = () => (
  <Container>
    <Heading size={2}>
      Help
    </Heading>
    <Section>
      <p>
        Use this app to render details of the opened tab using
        a custom HTML template.
      </p>

      <Heading size={3}>
        Template
      </Heading>
      <p>
        The <a href="https://deskpro.gitbooks.io/deskpro-apps/apps/tabdata.html" target="_blank">tab data</a> is
        displayed using an admin created template which may
        contain <a href="http://handlebarsjs.com/expressions.html" target="_blank">Handlebars expressions</a>.
      </p>
      <pre>
        <code>
          {`<div>
  Ticket by {{person.emails.[0].email}}
</div>`}
        </code>
      </pre>
    </Section>
    <LinkButton to="home">
      Close
    </LinkButton>
  </Container>
);

export default sdkConnect(PageHelp);
