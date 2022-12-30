import React from "react";

const Home = () => {
  return (
    <>
      <h1>Welcome To Tekmentors</h1>
      <br />
      <h3 style={{ textAlign: "center" }}>Download demo files for use</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        <a
          href="https://drive.google.com/file/d/1WFFtQ-sL0vu67FjsiemiwzhUXT8KTXYM/view?usp=share_link"
          target="_blank"
        >
          Download CSV File
        </a>

        <a
          href="https://drive.google.com/file/d/1fktHPJnjaa_pOowJ69MJt2vg6hY08ill/view?usp=sharing"
          target="_blank"
        >
          Download JSON File
        </a>
      </div>
    </>
  );
};

export default Home;
