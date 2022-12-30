import React from "react";

const UIMode = () => {
  const [uploadFile, setUploadFile] = React.useState(null);
  const [formValue, setFormValue] = React.useState({
    amount: "",
    item_type: ""
  });
  const [jsonArray, setJsonArray] = React.useState([]);
  const [showDataFlage, setShowDataFlage] = React.useState(false);
  const [calculatedValue, setCalculatedValue] = React.useState("Calculate now");

  const getAndUpdateFileData = (e) => {
    e.preventDefault();
    const file = uploadFile;
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      const data = JSON.parse(text);
      setJsonArray(data.invoices);
    };

    reader.readAsText(file);
  };

  const addDataInFile = (e) => {
    e.preventDefault();
    let arr = [...jsonArray];
    arr.push(formValue);
    setJsonArray(arr);
    setFormValue({
      amount: "",
      item_type: ""
    });
  };

  const handleDeleteFun = (i) => {
    let arr = [...jsonArray];
    arr.splice(i, 1);
    setJsonArray(arr);
  };

  const handleValue = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleCalculateTaxFun = (amount, type) => {
    if (type == 0) {
      setCalculatedValue((amount * 5) / 100);
    } else if (type == 1) {
      setCalculatedValue((amount * 8) / 100);
    } else if (type == 2) {
      setCalculatedValue((amount * 12) / 100);
    } else {
      setCalculatedValue("Not In Range");
    }
  };

  return (
    <div className="uimode_page_body">
      {!showDataFlage ? (
        <div className="uimode_page_bodyLift">
          <form onSubmit={getAndUpdateFileData}>
            <label>Upload your json file</label>
            <input
              required
              type="file"
              accept=".json"
              onChange={(e) => setUploadFile(e.target.files[0])}
            />
            <input type="submit" value="Upload File" />
          </form>

          <br />

          <p style={{ textAlign: "center", fontSize: "20px" }}>
            Add Data One by One
          </p>
          <form onSubmit={addDataInFile} className="uimode_page_bodyLiftform">
            <label>Amount : </label>
            <input
              required
              type="number"
              name="amount"
              value={formValue.amount}
              onChange={(e) => handleValue(e)}
            />
            <label>Item Type : </label>
            <input
              required
              type="number"
              name="item_type"
              value={formValue.item_type}
              onChange={(e) => handleValue(e)}
            />
            <input required type="submit" value="Add Data" />
          </form>

          <h3>Data List - </h3>
          {jsonArray.length > 0 && (
            <table>
              <thead></thead>
              <tbody>
                {jsonArray.map((item, i) => (
                  <tr key={i}>
                    <td>S.No. - </td>
                    <td>{i + 1}</td>
                    <td>Amount - </td>
                    <td>{item.amount}</td>
                    <td>Item Type - </td>
                    <td>{item.item_type}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDeleteFun(i);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <br />
          <hr style={{ width: "100%" }} />
          <br />
          <button
            disabled={jsonArray.length === 0}
            onClick={() => setShowDataFlage(true)}
          >
            Show Table
          </button>
        </div>
      ) : (
        <div className="uimode_page_bodyRight">
          <div className="uimode_page_bodyRightTop">
            <span></span>
            <span style={{ fontSize: "24px" }}>
              Calculated Tax Value :{" "}
              <b
                style={{
                  padding: "5px 10px",
                  border: "1px solid black",
                  borderRadius: "5px"
                }}
              >
                {calculatedValue}
              </b>
            </span>
            <button onClick={() => setShowDataFlage(false)}>Close Table</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Amount</th>
                <th>Item Type</th>
                <th>Calculate Tax</th>
              </tr>
            </thead>
            <tbody>
              {jsonArray.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.amount}</td>
                  <td>{item.item_type}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleCalculateTaxFun(item.amount, item.item_type);
                      }}
                    >
                      Calculate Tax
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default UIMode;
