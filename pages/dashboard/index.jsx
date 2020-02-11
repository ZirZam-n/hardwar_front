import _ from 'lodash';
import React, { Component } from 'react';
import withAuth from '~/components/global/withAuth';
import Layout from '~/components/global/layout';
import { contestAPI, allContestsAPI, milestoneAPI } from '~/redux/api/dashboard';
import Container from '~/components/dashboard/contest/index';

class Dashboard extends Component {
  static async getInitialProps(ctx, token) {
    let status_code = 200;
    const allRes = await allContestsAPI(token);
console.log(allRes)
    const { contests } = allRes.data;
    return { contests, token, status_code };
  }

  render() {
    const { contests, token } = this.props;
    console.log("TOKEN")
    console.log(token)
    console.log(contests);
    return (
      <Layout token={token} hasNavbar hasFooter >
        <Container contests={contests} />
      </Layout>
    );
  }
}

export default withAuth(true)(Dashboard);
