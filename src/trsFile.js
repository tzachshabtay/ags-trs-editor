import React from 'react';
import Line from './line';

export default class File extends React.Component {
    render() {
        const focused = { input: null };
        const lines = this.props.lines.map((l, index) => <Line key={index} from={l.from} to={l.to} focused={focused} ref={line => { if (line) l.ref = line; }}></Line>)
        return (
            <div style={{ paddingLeft: 10 }}>
                {lines}
            </div>)
    }
}