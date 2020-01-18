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
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { AppContext } from './context';

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: 'darkblue',
    },
    barColorPrimary: {
        backgroundColor: 'lightblue',
    },
})(LinearProgress);


export default class AGSToolbar extends React.Component {
    static contextType = AppContext;

    componentDidMount() {
        setTimeout(this.trackProgress, 500);
    }

    getTo = (line) => {
        const to = this.context.lines[line.index];
        if (to === undefined) {
            return line.to;
        }
        return to;
    }

    isMissing = (line) => {
        return !this.getTo(line);
    }

    trackProgress = () => {
        if (this.props.lines) {
            let full = 0;
            for (const line of this.props.lines) {
                if (!this.isMissing(line)) full += 1;
            }
            this.setState({ full });
        }
        setTimeout(this.trackProgress, 500);
    }

    getFocused = () => {
        for (const [index, line] of this.props.lines.entries()) {
            if (line.ref && line.ref.IsFocused()) {
                return index;
            }
        }
        return -1;
    }

    onNextClicked = () => {
        const current = this.getFocused();
        const toFocus = this.props.lines[(current + 1) % this.props.lines.length];
        toFocus.ref.Focus();
    }

    onPreviousClicked = () => {
        let current = this.getFocused();
        if (current < 1) {
            current = this.props.lines.length;
        }
        const toFocus = this.props.lines[(current - 1) % this.props.lines.length];
        toFocus.ref.Focus();
    }

    onNextMissingClicked = () => {
        let current = this.getFocused();
        if (current < 0) {
            current = 0;
        }
        let cursor = current;
        while (true) {
            cursor = (cursor + 1) % this.props.lines.length;
            const line = this.props.lines[cursor];
            if (this.isMissing(line) || cursor === current) {
                if (cursor >= this.props.lines.length - 1) {
                    cursor = this.props.lines.length - 2;
                }
                this.context.list.scrollToRow(cursor + 1);
                setTimeout(() => {
                    if (line.ref) line.ref.Focus();
                }, 100);
                break;
            }
        }
    }

    onPreviousMissingClicked = () => {
        let current = this.getFocused();
        if (current < 0) {
            current = this.props.lines.length - 1;
        }
        let cursor = current;
        while (true) {
            cursor = (cursor - 1) % this.props.lines.length;
            if (cursor < 0) {
                cursor = this.props.lines.length - 1;
            }
            const line = this.props.lines[cursor];
            if (this.isMissing(line) || cursor === current) {
                if (cursor <= 0) {
                    cursor = 1;
                }
                this.context.list.scrollToRow(cursor - 1);
                setTimeout(() => {
                    if (line.ref) line.ref.Focus();
                }, 100);
                break;
            }
        }
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
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "ags.trs";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    upload = () => {
        this.props.upload();
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
                            </>
                        )}
                        {this.props.loading && (<CircularProgress />)}
                        <div style={{ flexGrow: 1 }} />
                        <Tooltip title="Source Code" aria-label="source code">
                            <IconButton color="inherit" target="_blank" href="https://github.com/tzachshabtay/ags-trs-editor/">
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip >
                    </Toolbar >
                    {this.renderProgress()}
                </AppBar >
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
}