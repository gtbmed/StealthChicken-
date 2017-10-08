import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import { FormBtn, Input, TextArea } from '../../components/Form';

export default class Home extends Component {
    state = {
        userName: "",
        email: "",
        password: "",
        repeatPass: ""
    };

    componentDidMount() {
        this.letMeIn();
    };

    letMeIn() {
        //api call to retrieve login authorization 
    };

    handleInputChange(event) {
        const { name, value } =event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit(event) {
        event.preventDefault();
        if (this.state.userName && this.state.password) {
            //set up API 
        }
    };

    render() {
        return (
            
            <h3>Sign up below!</h3>
            //Here is where an account is created 
            <form onSubmit={this.}>
                <label>
                    Username:
                    <Input 
                        value={this.state.userName}
                        onChange={this.handleInputChange}
                        name="username"
                        placeholder="Username (required)"
                    />
                </label>
                <label>
                    Email Address:
                    <Input 
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        name="email"
                        placeholder="Email Address"
                    />
                </label>
                <label>
                    Create Password:
                    <Input
                        value={this.state.password}
                        onChange={this.state.handleInputChange}
                        name="password"
                        placeholder="Password (required)"
                    />
                </label>
                <label>
                    Re-enter Password:
                    <Input
                        value={this.state.repeatPass}
                        onChange={this.state.handleInputChange}
                        name="repeat password"
                        placeholder="Repeat Password (required)"
                    />
                </label>
                <label>
                    Select Specialty:
                    <FormSelect options={[
                            { label: 'Endocrinologist', value: 'endo' },
                            { label: 'Primary Care Physician', value: 'primary' },
                            { label: 'Cardiologist', value: 'cardio' },
                            { label: 'Certified Diabetes Educator', value: 'CDE', disabled: true },
                        ]} 
                        firstOption="Select" 
                        onChange={this.handleSelect} />
                </label>
                <FormBtn
                    disabled={!(this.state.userName && this.state.password)}
                    onClick={this.handleFromSubmit}
                >
                    Create Account
                </FormBtn>
            </form>
        )
    }
}