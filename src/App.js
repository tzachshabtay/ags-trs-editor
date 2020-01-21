import React from 'react';
import './App.css';
import File from './trsFile';
import AGSToolbar from './toolbar';
import Typography from '@material-ui/core/Typography';
import { AppContext } from './context';

class AppContainer extends React.Component {
  render() {
    return (
      <AppContext.Provider value={{ focus: {} }}>
        <App />
      </AppContext.Provider>
    );
  }
}

class App extends React.Component {
  static contextType = AppContext;
  render() {
    return (
      <div className="App" style={{ height: "100%" }}>
        <AGSToolbar lines={this.state && this.state.lines} comments={this.state && this.state.comments} upload={this.startUpload} loading={this.state && this.state.loading} />
        {this.state && this.state.lines && <File lines={this.state.lines} comments={this.state.comments} />}
        {(!this.state || !this.state.lines) && <Typography style={{ paddingTop: 100, paddingLeft: 50 }}>Please load a TRS file.</Typography>}
      </div>
    );
  }

  startUpload = () => {
    this.setState({ loading: true }, this.upload);
  }

  upload = () => {
    //https://stackoverflow.com/questions/3582671/how-to-open-a-local-disk-file-with-javascript
    const readFile = function (e) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        var contents = e.target.result;
        fileInput.func(contents)
        document.body.removeChild(fileInput)
      }
      reader.readAsText(file)
    }
    const fileInput = document.createElement("input")
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    fileInput.onchange = readFile
    fileInput.func = this.onUploaded
    document.body.appendChild(fileInput)
    fileInput.click()
  }

  onUploaded = (contents) => {
    const lines = contents.replace(/\r/g, "").split("\n");
    let result = [];
    let from = null;
    let to = null;
    let comments = "";
    let index = 0;
    for (const line of lines) {
      if (line.startsWith("//")) {
        comments = `${comments}\r\n${line}`;
      } else if (from === null) {
        from = line;
      } else if (to === null) {
        to = line;
      } else {
        result.push({ from, to, index });
        index += 1;
        from = line;
        to = null;
      }
    }
    if (from) {
      result.push({ from, to, index });
      index += 1;
    }
    this.context.lines = new Array(result.length);
    this.setState({ lines: result, comments }, () => {
      if (this.context.list) {
        setTimeout(() => {
          this.context.list.forceUpdateGrid();
          this.context.list.forceUpdate();
          this.context.list.scrollToRow(0);
        }, 500);
      }
    });
  }
}

export default AppContainer;
