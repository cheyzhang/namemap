
import React, { useEffect, useState } from 'react';
// import '../../../../../styles/query.scss';


// modified from: https://reactjs.org/docs/forms.html
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.quarter_height = props.height;
        this.quarter_width = props.width;
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label style={{fontFamily: 'Roboto', fontSize: 20, marginLeft: this.quarter_width / 4}}>
                    Last Name to Query:
                    <input style={{fontFamily: 'Roboto', fontSize: 18, borderRadius: 4, marginLeft: 5, height: 20}} type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
            </form>
        );
    }
};

export default Form;
