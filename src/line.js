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
        let num = "";
        if (from.startsWith("&")) {
            num = from.substring(1, from.indexOf(" "));
            from = from.substring(from.indexOf(" ") + 1);
        }
        let to = this.state.to ? this.state.to.trimStart() : "";
        if (to.startsWith("&")) {
            to = to.substring(to.indexOf(" ") + 1);
        }
        return (<Grid container alignItems="center" direction="row" spacing={0} style={{ marginTop: 5 }}>
            <Grid item xs={1}>
                <span>{num}</span>
            </Grid>
            <Grid item xs={11}>
                <TextField
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
            </Grid>
        </Grid>)
    }
}