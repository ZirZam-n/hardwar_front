/* eslint-disable camelcase */
import _ from 'lodash';
import React, { Component } from 'react';
import { Grid, Form as F, Message, Button } from 'semantic-ui-react';
import Input from './input';
import DropdownInput from './dropdownInput';
import { C_NUMBER_MODE } from 'highlight.js';

class Form extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { update, token, password_update } = this.props;
    if (this.props.type === 'profile') {
      const new_fields = {
        profile: {
          firstname_fa: this.firstname_fa.state.value,
          firstname_en: this.firstname_en.state.value,
          lastname_fa: this.lastname_fa.state.value,
          lastname_en: this.lastname_en.state.value,
          birth_date: _.join(_.reverse(_.split(this.birth_date.state.value, '-')), '-'),
          uni: this.uni.state.value,
          major: this.major.state.value,
          bmp: this.bmp.state.value,
          student_id: this.student_id.state.value,
          phone_number: this.phone_number.state.value,
        },
      };
      // console.log(new_fields);
      update(new_fields, token);
    } else {
      const new_fields = {
        password: {
          old_password: this.old_password.state.value,
          new_password1: this.new_password1.state.value,
          new_password2: this.new_password2.state.value,
        },
      };
      // console.log(new_fields);
      password_update(new_fields, token);
    }
  }

  render() {
    const { success, fail } = this.props.profile;
    const profileData = { ...this.props.profileData, ...this.props.profileData.profile };

    const { fields } = this.props;
    let { errors } = this.props.profile;
    let showError = true;
    if (!_.isUndefined(this.props.profile.errors.profile)) {
      errors = this.props.profile.errors.profile;
      showError = false;
    }

    return (
      <Grid>
        <Grid.Column verticalAlign="middle">
          <F onSubmit={this.onSubmit} dir="RTL">
            {_.map(fields, (field) => {
              if (field.dropdown) {
                return (
                  <DropdownInput
                    ref={(c) => {
                      this[field.en] = c;
                    }}
                    key={field.en}
                    field={field}
                    error={errors[field.en] != '' && !_.isUndefined(errors[field.en])}
                    initial={profileData[field.en]}
                    options={this.props.options[field.en]}
                    allowAdd={field.en !== 'bmp'}
                  />
                );
              }
              let error = errors[field.en] != '' && !_.isUndefined(errors[field.en]);
              if (showError) error = errors[field.en];
              return (
                <Input
                  ref={(c) => {
                    this[field.en] = c;
                  }}
                  key={field.en}
                  field={field}
                  error={error}
                  initial={profileData[field.en]}
                />
              );
            })}

            <Message hidden={!success} positive>
              تغییرات با موفقیت ذخیره شد.
            </Message>
            <Message hidden={!fail} negative>
              تغییرات بدون موفقیت ذخیره شد.
            </Message>
            <F.Button primary content="ذخیره‌ی تغییرات" floated="right" size="large" />
          </F>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Form;
