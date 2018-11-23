import React from 'react';
import renderer from 'react-test-renderer';
import { createAppFromProps } from '@deskpro/apps-sdk';
import { createMemoryHistory as createHistory } from "history";


import PageHome from '../../../src/components/PageHome';

it('PageHome renders correctly in the normal state', () => {

  const dpapp = createAppFromProps({
    contextProps : {
      type:       'ticket',
      entityId:   '1',
      locationId: 'ticket-sidebar',
      tabId:      'tab-id',
      tabUrl:     'http://127.0.0.1'
    },
    instanceProps : {
      appId:          '1',
      instanceId:     '1',
      appTitle:       'GitHub',
      appPackageName: 'app-boilerplate-react'
    }
  });

  const history = createHistory({ initialEntries: ["loading"], initialIndex: 0});

  const state = {
    html:   "  Ticket by {{tab.person.emails.[0]}}\n",
    title:  "some title",
    context: {
      tab: {
        person: {
          emails: ["joe.kool@deskpro.com"]
        }
      } ,
      me: {}
    }
  };
  history.push("home", state);
  history.go(1);

  const tree = renderer.create(<PageHome
    dpapp=      {dpapp}
    history=    {history}
    location=   {{ state }}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
