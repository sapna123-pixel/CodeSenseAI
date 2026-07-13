import { useState } from "react";

function App() {

  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);


  async function reviewCode() {

    setLoading(true);
    setReview("");

    try {

      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          language: language,
          code: code
        }),
      });


      const data = await response.json();

      setReview(data.review);

    } 
    catch(error) {

      setReview("❌ Error connecting to AI server");

    }

    setLoading(false);
  }


  return (
    <div className="container mt-5">

      <h1 className="text-center">
        CodeSense AI
      </h1>

      <p className="text-center">
        AI Powered Multi-Language Code Reviewer
      </p>



      <div className="mt-4">

        <label className="form-label">
          Select Language
        </label>

        <select
          className="form-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>C++</option>
          <option>C</option>
          <option>Java</option>
          <option>Python</option>
          <option>JavaScript</option>
        </select>

      </div>



      <div className="mt-4">

        <label className="form-label">
          Enter Your Code
        </label>

        <textarea
          className="form-control"
          rows="12"
          placeholder={`Paste your ${language} code here...`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

      </div>



      <div className="mt-4 text-center">

        <button
          className="btn btn-primary"
          onClick={reviewCode}
          disabled={loading}
        >

          {
            loading 
            ? "Analyzing Code..." 
            : "Review Code"
          }

        </button>

      </div>




      <div className="mt-5">

        <h3>
          🤖 AI Review Result
        </h3>


        <div 
          className="border rounded p-4 bg-light"
          style={{
            whiteSpace: "pre-wrap",
            minHeight: "200px",
            fontFamily: "monospace"
          }}
        >

          {
            review 
            ? review
            : "Your AI review will appear here..."
          }

        </div>


      </div>


    </div>
  );
}

export default App;