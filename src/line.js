import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { AppContext } from './context';

export default class Line extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = { to: props.to };
    }

    componentDidMount() {
        this.context.lines[this.props.index] = this.state.to;
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
        this.context.lines[this.props.index] = e.target.value;
        this.setState({ to: e.target.value });
    }

    onFocus = (e) => {
        this.props.focused.input = this;
    }

    render() {
        let from = this.props.from.trimStart();
        let to = this.state.to ? this.state.to.trimStart() : "";
        return (<Grid container alignItems="center" direction="row" spacing={0} style={{ marginTop: 5 }}>
            <Grid item xs={1}>
                <span>{this.props.index + 1}</span>
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