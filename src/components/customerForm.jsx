import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCustomer, saveCustomer } from "./../services/customerService";
import * as auth from "./../services/authService";

class CustomerForm extends Form {
  state = {
    data: { name: "", phone: "", email: "", address: "" },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(5).max(255).required().label("Name"),
    phone: Joi.string().min(5).max(255).required().label("Phone"),
    email: Joi.string().email().min(5).max(255).required().label("Email"),
    address: Joi.string().min(5).max(255).required().label("Address"),
  };

  async populateCustomer() {
    const customerId = this.props.match.params.id;
    if (!customerId) return;
    try {
      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateCustomer();
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
    };
  }

  doSubmit = async () => {
    await saveCustomer(this.state.data);
    this.props.history.push("/customers");
  };

  render() {
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      return (
        <div className="container my-5">
          <h1>Customer Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("phone", "Phone")}
            {this.renderInput("email", "Email")}
            {this.renderInput("address", "Address")}
            {this.renderButton("Save")}
          </form>
        </div>
      );
    }

    return (
      <div className="container my-5">
        <h1>Not Authorised</h1>
      </div>
    );
  }
}

export default CustomerForm;
