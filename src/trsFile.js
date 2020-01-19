import React from 'react';
import Line from './line';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { AppContext } from './context';

export default class File extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = { search: null };
    }

    render() {
        this.context.onSearch = this.onSearch;
        const count = this.state.search ? Object.keys(this.state.search).length : this.props.lines.length;
        return (
            <div style={{ paddingLeft: 10, paddingTop: 60, paddingBottom: 10, height: "100%", flexGrow: 1 }} >
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={count}
                            rowHeight={80}
                            rowRenderer={this.rowRenderer}
                            ref={(ref) => { if (ref) this.context.list = ref; }}
                            style={{ paddingBottom: 10 }}
                        />
                    )}
                </AutoSizer>
            </div>)
    }

    onSearch = (text) => {
        if (!text) {
            this.setState({ search: null });
        } else {
            const searchVisualToReal = {};
            const searchRealToVisual = {};
            let mappingIndex = 0;
            for (const [index, line] of this.props.lines.entries()) {
                if (line.from.includes(text) || this.getTo(line).includes(text)) {
                    searchVisualToReal[mappingIndex] = index;
                    searchRealToVisual[index] = mappingIndex;
                    mappingIndex += 1;
                }
            }
            this.context.searchRealToVisual = searchRealToVisual;
            this.context.searchVisualToReal = searchVisualToReal;
            this.setState({ search: searchVisualToReal });
        }
    }

    getTo = (line) => {
        const to = this.context.lines[line.index];
        if (to === undefined) {
            return line.to;
        }
        return to;
    }

    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an over-scanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        if (this.state.search) {
            index = this.state.search[index];
        }
        const l = this.props.lines[index];
        let to = this.context.lines[index];
        if (to === undefined) {
            to = l.to;
        }
        return (
            <div key={key} style={style}>
                <Line from={l.from} to={to} index={index} ref={line => { if (line) l.ref = line; }}></Line>
            </div>
        );
    }
}

