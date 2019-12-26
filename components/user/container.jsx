import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import network from './network';

export default class LoginSignupContainer extends Component {
  constructor(props) {
    super(props);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth >= 768) {
      this.renderCanvas();
    }
  }

  componentDidUpdate() {
    if (window.innerWidth >= 768) {
      this.renderCanvas();
    }
  }

  renderCanvas() {
    if (window.innerWidth >= 700) {
      network(this.canvas);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <a style={{ position: 'absolute', top: '2rem', right: '2rem' }} href="/">
          بازگشت
        </a>
        <Grid
          celled
          padded
          centered
          style={{
            padding: 0,
            width: '100vw',
            height: '100vh',
            position: 'absolute',
          }}
        >
          <Grid.Row style={{ height: '100%' }}>
            <Grid.Column computer={8} only="computer">
              <a href="/">
                <Image
                  style={{ zIndex: 1, position: 'absolute', margin: 10 }}
                  size="mini"
                  src="/images/logo.png"
                />
              </a>

              <canvas
                ref={(r) => {
                  this.canvas = r;
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </Grid.Column>

            <Grid.Column verticalAlign="middle" computer={8} tablet={8} mobile={14}>
              {children}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
