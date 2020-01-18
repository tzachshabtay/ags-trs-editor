import React from 'react';
import Line from './line';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { AppContext } from './context';

export default class File extends React.Component {
    static contextType = AppContext;
    focused = { input: null };

    componentDidMount() {
        this.context.lines = new Array(this.props.lines.length);
    }

    render() {
        return (
            <div style={{ paddingLeft: 10, paddingTop: 60, paddingBottom: 10, height: "100%", flexGrow: 1 }} >
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={this.props.lines.length}
                            rowHeight={50}
                            rowRenderer={this.rowRenderer}
                            ref={(ref) => { if (ref) this.context.list = ref; }}
                        />
                    )}
                </AutoSizer>
            </div>)
    }

    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an over-scanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        const l = this.props.lines[index];
        return (
            <div key={key} style={style}>
                <Line from={l.from} to={l.to} index={index} focused={this.focused} ref={line => { if (line) l.ref = line; }}></Line>
            </div>
        );
    }
}

