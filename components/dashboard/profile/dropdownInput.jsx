import React, { Component } from 'react';
import { Form, Dropdown, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { space, layout, color, border, typography } from 'styled-system';
import { addUniAPI } from '~/redux/api/signup';
import _ from 'lodash';

const Label = styled.label`
  ${space}
  ${layout}
  ${typography}
`;

const Div = styled.div`
  ${space}
  ${layout}
  ${color}
`;

class DropdownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initial,
      options: this.props.options,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e, { value }) => this.setState({ value: value });

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ key: value, text: value, value }, ...prevState.options],
    }));
    if (this.props.field.en === 'uni') {
      addUniAPI({ name: value });
    }
  };

  render() {
    
    let { field, error } = this.props;
    const { value } = this.state;
    const labelWidth = '170px';
    return (
      <Form.Group inline>
        <Label py={2} style={{ width: labelWidth }}>
          {field.fa}:
        </Label>
        <Div
          //px={6}
          //width={[1/2]}
          //py={4}
          //mx={6}
          width={[95 / 100, 69 / 192, 69 / 192]}
          backgroundColor="rgba(255, 100, 255, 0.3)"
          borderRadius={6}
        >
          <Dropdown
            defaultValue={value}
            options={this.state.options}
            placeholder={field.fa}
            search
            selection
            fluid
            //width={6}
            error={error}
            readOnly={field.readOnly}
            allowAdditions={this.props.allowAdd}
            //value={value}
            name={field.en}
            onAddItem={this.handleAddition}
            onChange={this.handleChange}
          />
        </Div>
      </Form.Group>
    );
  }
}

export default DropdownInput;
