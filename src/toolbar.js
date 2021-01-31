import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchBar from 'material-ui-search-bar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import TelegramIcon from '@material-ui/icons/Telegram';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import { AppContext } from './context';

//encodings taken from: https://github.com/whatwg/encoding/blob/main/encodings.json
const encodings = require('./encodings.json');

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: 'darkblue',
    },
    barColorPrimary: {
        backgroundColor: 'lightblue',
    },
})(LinearProgress);

const ColorSelect = withStyles({
    inputRoot: {
        color: "black",
        backgroundColor: "white",
        width: 200,
        padding: 0,
        margin: 0,
    },
})(Autocomplete);

export default class AGSToolbar extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.encodings = this.parseEncodings();
        this.state = { searchValue: "", showHelp: false, showJumpToLine: false, jumpLine: 1 };
    }

    parseEncodings() {
        const res = []
        for (const group of encodings) {
            for (const encoding of group.encodings) {
                res.push(encoding.name)
            }
        }
        return res
    }

    componentDidMount() {
        setTimeout(this.trackProgress, 500);
    }

    getAt = (index) => {
        if (this.context.searchVisualToReal) {
            index = this.context.searchVisualToReal[index];
        }
        return this.props.lines[index];
    }

    getTo = (line) => {
        const to = this.context.lines[line.index];
        if (to === undefined) {
            return line.to;
        }
        return to;
    }

    isMissing = (line) => {
        if (!this.isVisible(line)) return false;
        return !this.getTo(line);
    }

    isVisible = (line) => {
        if (!this.context.searchRealToVisual) return true;
        return line.index in this.context.searchRealToVisual;
    }

    trackProgress = () => {
        if (this.props.lines && this.context.lines) {
            let full = 0;
            for (const line of this.props.lines) {
                if (!this.isMissing(line)) full += 1;
            }
            this.setState({ full });
        }
        setTimeout(this.trackProgress, 500);
    }

    getFocused = () => {
        if (this.context.searchRealToVisual) {
            return this.context.searchRealToVisual[this.context.focused] || -1;
        }
        return this.context.focused || -1;
    }

    focusLine = (line) => {
        if (line.index in this.context.focus && this.context.focus[line.index]) {
            this.context.focus[line.index]();
        }
    }

    findNext = (filter) => {
        let current = this.getFocused();
        if (current < 0) {
            current = 0;
        }
        let cursor = current;
        let len = this.props.lines.length;
        if (this.context.searchRealToVisual) {
            len = Object.keys(this.context.searchRealToVisual).length;
        }
        while (true) {
            cursor = (cursor + 1) % len;
            const line = this.getAt(cursor);
            if (filter(line) || cursor === current) {
                if (cursor >= len - 1) {
                    cursor = len - 2;
                }
                if (cursor < 0) {
                    cursor = -1;
                }
                this.context.list.scrollToRow(cursor + 1);
                setTimeout(() => {
                    this.focusLine(line);
                }, 100);
                break;
            }
        }
    }

    findPrev = (filter) => {
        let current = this.getFocused();
        let len = this.props.lines.length;
        if (this.context.searchRealToVisual) {
            len = Object.keys(this.context.searchRealToVisual).length;
        }
        if (current < 0) {
            current = len - 1;
        }
        let cursor = current;
        while (true) {
            cursor = (cursor - 1) % len;
            if (cursor < 0) {
                cursor = len - 1;
            }
            const line = this.getAt(cursor);
            if (filter(line) || cursor === current) {
                if (cursor <= 0) {
                    cursor = 1;
                }
                this.context.list.scrollToRow(cursor - 1);
                setTimeout(() => {
                    this.focusLine(line);
                }, 100);
                break;
            }
        }
    }

    onNextClicked = () => {
        this.findNext(this.isVisible);
    }

    onPreviousClicked = () => {
        this.findPrev(this.isVisible);
    }

    onNextMissingClicked = () => {
        this.findNext(this.isMissing);
    }

    onPreviousMissingClicked = () => {
        this.findPrev(this.isMissing);
    }

    genFile = () => {
        let text = `${this.props.comments}\r\n`;
        for (const line of this.props.lines) {
            text += `${line.from}\r\n${this.getTo(line) || ""}\r\n`;
        }
        this.download(text);
    }

    download = (text) => {
        //https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react/44661948
        const element = document.createElement("a");
        const file = new Blob([text], { type: `text/plain;charset=${this.props.encoding}` });
        element.href = URL.createObjectURL(file);
        element.download = "ags.trs";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    upload = () => {
        this.props.upload();
    }

    onSearch = (text) => {
        this.setState({ searchValue: text });
        setTimeout(() => {
            if (this.state.searchValue === text) {
                const lastRendered = this.context.lastRendered;
                this.context.onSearch(text);
                if (lastRendered) {
                    const visualIndex = this.findVisibleVisualIndex(lastRendered);
                    if (visualIndex !== 0 && !visualIndex) {
                        return;
                    }
                    this.context.list.scrollToRow(visualIndex + 1);
                }
            }
        }, 200);
    }

    onHelpClicked = () => {
        this.setState({ showHelp: true });
    }

    onJumpToLineClicked = () => {
        this.setState({ showJumpToLine: true });
    }

    findVisibleVisualIndex = (index) => {
        if (!this.context.searchVisualToReal) {
            return index;
        }
        while (!(index in this.context.searchRealToVisual) && index >= 0) {
            index -= 1;
        }
        return this.context.searchRealToVisual[index];
    }

    onJumpToLine = () => {
        let jumpLine = parseInt(this.state.jumpLine);
        if (jumpLine >= this.props.lines.length) {
            jumpLine = this.props.lines.length - 1;
            this.setState({ jumpLine });
        } else if (jumpLine < 1) {
            jumpLine = 1;
            this.setState({ jumpLine });
        }
        const line = this.props.lines[jumpLine];
        const visualIndex = this.findVisibleVisualIndex(jumpLine);
        if (visualIndex !== 0 && !visualIndex) {
            return;
        }
        this.context.list.scrollToRow(visualIndex + 1);
        setTimeout(() => {
            this.focusLine(line);
        }, 100);
    }

    render() {
        return (
            <>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" style={{ paddingRight: 50 }}>
                            AGS TRS Editor
                        </Typography>
                        <Tooltip title="Load" aria-label="load">
                            <IconButton edge="start" color="inherit" onClick={this.upload}>
                                <CloudUploadIcon />
                            </IconButton>
                        </Tooltip>
                        {this.props.lines && (
                            <>
                                <Tooltip title="Save" aria-label="save">
                                    <IconButton edge="start" color="inherit" onClick={this.genFile} style={{ marginRight: 50 }}>
                                        <CloudDownloadIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Previous missing line" aria-label="previous missing line">
                                    <IconButton edge="start" color="inherit" onClick={this.onPreviousMissingClicked}>
                                        <SkipPreviousIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Previous line (SHIFT + TAB)" aria-label="previous line">
                                    <IconButton edge="start" color="inherit" onClick={this.onPreviousClicked}>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Next line (TAB)" aria-label="next line">
                                    <IconButton edge="start" color="inherit" onClick={this.onNextClicked}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Tooltip >
                                <Tooltip title="Next missing line" aria-label="next missing line">
                                    <IconButton edge="start" color="inherit" onClick={this.onNextMissingClicked}>
                                        <SkipNextIcon />
                                    </IconButton>
                                </Tooltip >
                                <Tooltip title="Jump to line" aria-label="jump to line">
                                    <IconButton edge="start" color="inherit" style={{ marginLeft: 40 }} onClick={this.onJumpToLineClicked}>
                                        <TelegramIcon />
                                    </IconButton>
                                </Tooltip >
                            </>
                        )}
                        {this.props.loading && (<CircularProgress />)}
                        <div style={{ flexGrow: 1 }} />
                        <ColorSelect
                            id="encoding-select"
                            options={this.encodings}
                            value={this.props.encoding}
                            onChange={this.props.onEncodingChanged}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) =>
                                <TextField {...params} variant="outlined" size="small" />
                            }
                        >
                        </ColorSelect>
                        {this.props.lines && (
                            <SearchBar value={this.state.searchValue} style={{ paddingLeft: 20 }}
                                onChange={this.onSearch} onCancelSearch={() => this.onSearch("")} />)}
                        <Tooltip title="Help" aria-label="help">
                            <IconButton color="inherit" target="_blank" onClick={this.onHelpClicked}>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip >
                        <Tooltip title="Source Code" aria-label="source code">
                            <IconButton color="inherit" target="_blank" href="https://github.com/tzachshabtay/ags-trs-editor/">
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip >
                    </Toolbar >
                    {this.renderProgress()}
                </AppBar >
                {this.renderHelpDialog()}
                {this.renderJumpToLineDialog()}
            </>
        )
    }

    renderProgress() {
        if (!this.props.lines) {
            return null;
        }
        const full = this.state ? this.state.full || 0 : 0;
        const percent = Math.round((full / this.props.lines.length) * 100);
        const progress = `${full}/${this.props.lines.length} Completed (${percent}%)`
        return (
            <Tooltip title={progress} aria-label="progress">
                <ColorLinearProgress variant="determinate" value={percent} />
            </Tooltip>
        )
    }

    renderHelpDialog() {
        return (
            <Dialog
                open={this.state.showHelp}
                onClose={() => this.setState({ showHelp: false })}
                aria-labelledby="help-dialog-title"
                aria-describedby="help-dialog-description"
            >
                <DialogTitle id="help-dialog-title">{"AGS TRS Editor- Help"}</DialogTitle>
                <DialogContent dividers id="help-dialog-description">
                    <Typography gutterBottom>
                        AGS TRS Editor helps edit trs file for translating AGS (Adventure Game Studio) games.
                        Click the load button to load a trs file, make your edits and then click the save button to download it.
                    </Typography>
                    <Typography>
                        - If you don't want to translate a line, just leave the following line blank.
                    </Typography>
                    <Typography>
                        - Special characters such as [ and %%s symbolize things within the game, so should be left in an appropriate place in the message.
                    </Typography>
                </DialogContent>
            </Dialog>);
    }

    renderJumpToLineDialog() {
        return (
            <Dialog
                open={this.state.showJumpToLine}
                onClose={() => this.setState({ showJumpToLine: false })}
                aria-labelledby="jump-dialog-title"
                aria-describedby="jump-dialog-description"
            >
                <DialogTitle id="jump-dialog-title">{"Jump To Line"}</DialogTitle>
                <DialogContent dividers id="jump-dialog-description">
                    <Typography gutterBottom>
                        Select line number to jump:
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lineNumber"
                        label="Line Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{ min: "1", step: "1" }}
                        value={this.state.jumpLine}
                        onChange={e => this.setState({ jumpLine: e.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({ showJumpToLine: false })} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.onJumpToLine} color="primary">
                        Jump
                    </Button>
                </DialogActions>

            </Dialog>);
    }
}