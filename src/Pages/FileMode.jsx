import React from "react";
import { CSVLink } from "react-csv";

const FileMode = () => {
  const [uploadFile, setUploadFile] = React.useState(null);
  const [csvArray, setCsvArray] = React.useState([]);
  const [csvHeaders, setCsvHeaders] = React.useState([]);
  const [csvCalculated, setCsvCalculated] = React.useState(false);

  const getAndUpdateFileData = (e) => {
    e.preventDefault();

    const file = uploadFile;
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text);
    };

    reader.readAsText(file);

    setCsvCalculated(false);
  };

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    setCsvArray(newArray);
    const arrHeaders = Object.keys(newArray[0]);
    setCsvHeaders(arrHeaders);
  };

  const calculateData = () => {
    csvHeaders.push("tax");

    for (let i = 0; i < csvArray.length; i++) {
      if (csvArray[i][csvHeaders[2]] == 0) {
        csvArray[i].tax = (csvArray[i][csvHeaders[1]] * 5) / 100;
      } else if (csvArray[i][csvHeaders[2]] == 1) {
        csvArray[i].tax = (csvArray[i][csvHeaders[1]] * 8) / 100;
      } else if (csvArray[i][csvHeaders[2]] == 2) {
        csvArray[i].tax = (csvArray[i][csvHeaders[1]] * 12) / 100;
      } else {
        csvArray[i].tax = "Not in range";
      }
    }

    setCsvCalculated(true);
  };

  return (
    <div className="filemode_page_body">
      <div className="filemode_page_bodyLift">
        <form onSubmit={getAndUpdateFileData}>
          <label>Upload your csv file</label>
          <input
            required
            type="file"
            accept=".csv"
            onChange={(e) => setUploadFile(e.target.files[0])}
          />
          <input type="submit" value="Upload File" />
        </form>
      </div>
      <div className="filemode_page_bodyRight">
        <button
          disabled={csvCalculated || !uploadFile || csvArray.length === 0}
          onClick={calculateData}
        >
          Calculate Tax
        </button>
        {csvCalculated && (
          <CSVLink data={csvArray} headers={csvHeaders} filename={"result.csv"}>
            Download File
          </CSVLink>
        )}

        {csvArray.length > 0 && (
          <table>
            <thead>
              <tr>
                {csvHeaders.map((el, i) => {
                  return <td key={i}>{el}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {csvArray.map((item, i) => (
                <tr key={i}>
                  {csvHeaders.map((el, j) => {
                    return <td key={j}>{item[el]}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FileMode;
