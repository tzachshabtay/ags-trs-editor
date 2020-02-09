import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { AppContext } from './context';

const trimStart = (str) => {
    // NOTE String.trimStart is available on Firefox 61
    return str.replace(/^\s+/, '');
};

export default class Line extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = { to: props.to };
    }

    componentDidMount() {
        this.context.lines[this.props.index] = this.state.to;
        this.context.focus[this.props.index] = this.focus;
    }

    componentWillUnmount() {
        this.context.focus[this.props.index] = null;
    }

    focus = () => {
        if (this.input) {
            this.input.focus();
        }
    }

    onLineChanged = (e) => {
        this.context.lines[this.props.index] = e.target.value;
        this.setState({ to: e.target.value });
    }

    onFocus = (e) => {
        this.context.focused = this.props.index;
    }

    render() {
        let from = trimStart(this.props.from);
        let to = this.state.to ? trimStart(this.state.to) : "";
        return (<Grid container alignItems="center" direction="row" spacing={0} style={{ marginTop: 5 }}>
            <Grid item xs={1}>
                <span>{this.props.index + 1}</span>
            </Grid>
            <Grid item xs={11}>
                <TextField
                    label={from}
                    placeholder="Missing translation"
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