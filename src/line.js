import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = { to: props.to };
    }

    IsFocused() {
        return this.props.focused.input === this;
    }

    Focus() {
        if (this.input) {
            this.input.focus();
        }
    }

    onLineChanged = (e) => {
        this.setState({ to: e.target.value });
    }

    onFocus = (e) => {
        this.props.focused.input = this;
    }

    render() {
        let from = this.props.from.trimStart();
        let to = this.state.to ? this.state.to.trimStart() : "";
        return (<TextField
            label={from}
            placeholder="Missing translation"
            multiline
            margin="normal"
            fullWidth
            value={to}
            onChange={this.onLineChanged}
            onFocus={this.onFocus}
            inputRef={input => { if (input) this.input = input; }}
        />
        )
    }
}