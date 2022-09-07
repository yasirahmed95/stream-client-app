import React from "react";
import { Form, Field } from "react-final-form";

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="text-danger">{error}</div>;
    }
  };

  const renderInput = ({ input, label, meta }) => {
    return (
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
          <input {...input} className="form-control" autoComplete="off" />
          {renderError(meta)}
        </div>
      </div>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
      errors.title = "You must enter a title";
    }

    if (!formValues.description) {
      errors.description = "You must enter a description";
    }

    return errors;
  };

  const renderForm = ({ handleSubmit }) => (
    <form onSubmit={handleSubmit} className="mt-3">
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="btn btn-primary">Submit</button>
    </form>
  );

  return (
    <Form
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={renderForm}
    />
  );
};

export default StreamForm;
