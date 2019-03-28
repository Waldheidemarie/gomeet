import React from 'react';
import { Route, Link } from 'react-router-dom';
import { merge } from 'lodash';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            errorFields: {}
        };
        this.verifySubmit = this.verifySubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field) {
        return e => {
            const newState = merge({}, this.state.user, { [field]: e.target.value });
            this.setState({ user: newState });
        };
    }

    validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.errors != this.props.errors) {
            const emailTakenError = (
                <div>
                    This email is already in use. Would you rather
                        <Link to='/login'>log in</Link>?
                    </div>
            );
            let newErrorFields = merge({}, this.state.errorFields, { email: emailTakenError });
            this.setState({ errorFields: newErrorFields });
        }
    }

    verifySubmit(e) {
        e.preventDefault();
        this.setState({ errorFields: {}}, () => {
            let newErrorFields = {};
            if (this.state.user.name === '') {
                newErrorFields = merge({}, this.state.errorFields, { name: "Can't be empty" });
            }

            if (this.state.user.email === '') {
                newErrorFields = merge(newErrorFields, this.state.errorFields, { email: "Can't be empty" });
            } else if (!this.validateEmail(this.state.user.email)) {
                newErrorFields = merge(newErrorFields, this.state.errorFields, { email: "Doesn't look like an email address" });
            } 

            if (this.state.user.password === '') {
                newErrorFields = merge(newErrorFields, this.state.errorFields, { password: "Can't be empty" });
            } else if (this.state.user.password.length < 6) {
                newErrorFields = merge(newErrorFields, this.state.errorFields, { password: "Should be at least 6 characters" });
            }

            this.setState({ errorFields: newErrorFields});
            if (Object.values(this.state.errorFields).length === 0) {
                this.handleSubmit(e);
            }
        });
    }


    handleSubmit() {
        this.props.signup(this.state.user);
    }

    render() {
        let errors;
        if (this.state.errorFields.email && this.state.errorFields.email.length > 35) {
            errors = "Sorry, there was a problem. You'll find more details highlighted below.";
        } 
        
        return (
            <div>
                <Route
                    path="/"
                    render={
                        () => {
                            if (this.props.currentUser) {
                                return < Redirect to="/" />
                            }
                        }
                    }
                />
                <ul>{errors}</ul>

                <h2>Sign up</h2>
                <button onClick={this.props.demoUser}>Demo User</button>

                <form onSubmit={this.verifySubmit}>
                    <label>Your name</label>
                    <input type="text" value={this.state.name} onChange={this.handleChange('name')} />
                    <p>{this.state.errorFields.name}</p>

                    <label>Email address</label>
                    <input type="text" value={this.state.email} onChange={this.handleChange('email')} />
                    <div>{this.state.errorFields.email}</div>

                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.handleChange('password')} />
                    <p>{this.state.errorFields.password}</p>

                    <p>Location element</p>
                    <p>Your name is public. We'll use your email address to send you updates, and your location to find GoMeets near you.</p>
                    <input type="submit" value='Continue' />
                    <p>When you "Continue", you agree to GoMeet's Terms of Service. We will manage information about you as described in our Privacy Policy, and Cookie Policy.</p>
                </form>

                <p>Already a member? 
                    <Link to='/login'>Log in.</Link>
                </p>
            </div>
        );
    }
}



export default SignupForm;