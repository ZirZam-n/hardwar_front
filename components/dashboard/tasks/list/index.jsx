import React from 'react';
import NoSSR from 'react-no-ssr';
import { Responsive } from 'semantic-ui-react';
import Mobile from './mobile';
import Desktop from './desktop';

function ListSection({ cid, mid, tasks }) {
  return (
    <NoSSR>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Mobile cid={cid} mid={mid} tasks={tasks} />
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Desktop cid={cid} mid={mid} tasks={tasks} />
      </Responsive>
    </NoSSR>
  );
}

export default ListSection;
