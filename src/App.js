import React from 'react';
import './App.css';
import File from './trsFile';
import AGSToolbar from './toolbar';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <AGSToolbar lines={this.state && this.state.lines} upload={this.upload} />
        {this.state && <File lines={this.state.lines} comments={this.state.comments} />}
      </div>
    );
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
    for (const line of lines) {
      if (line.startsWith("//")) {
        comments = `${comments}\r\n${line}`;
      } else if (from === null) {
        from = line;
      } else if (to === null) {
        to = line;
      } else {
        result.push({ from, to });
        from = line;
        to = null;
      }
    }
    if (from) {
      result.push({ from, to });
    }
    this.setState({ lines: result, comments });
  }
}

export default App;
