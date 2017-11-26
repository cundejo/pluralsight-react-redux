import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CoursesForm';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

function setup(loading) {
  let props = {
    course: {}, errors: {}, loading: loading,
    onSave: () => {}, onChange: () => {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props}/>);
  let output = renderer.getRenderOutput();

  return {
    props, renderer, output
  };
}

describe('CourseForm via React Test Utils', () => {
  const {output} = setup();

  it('render form', () => {
    expect(output.type).toBe('form');
  });

  it('render the form fields', () => {
    let [textInput1, selectInput, textInput2, textInput3, buttonSubmit] = output.props.children;
    expect(textInput1.type).toBe(TextInput);
    expect(selectInput.type).toBe(SelectInput);
    expect(textInput2.type).toBe(TextInput);
    expect(textInput3.type).toBe(TextInput);
    expect(buttonSubmit.type).toBe('input');
  });

  it('save btn is labeled Save when its not saving', () => {
    const {output} = setup(false);
    const buttonSubmit = output.props.children[4];
    expect(buttonSubmit.props.value).toBe('Save');
  });

  it('save btn is labeled Saving... when its saving', () => {
    const {output} = setup(true);
    const buttonSubmit = output.props.children[4];
    expect(buttonSubmit.props.value).toBe('Saving...');
  });
});
