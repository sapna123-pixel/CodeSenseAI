import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

function App() {

  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [darkMode, setDarkMode] = useState(false);  
  const [loading, setLoading] = useState(false);


  async function reviewCode() {

    setLoading(true);
    setReview("");

    try {

      const response = await fetch("https://codesenseai-7zfy.onrender.com/review", {
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

      console.log(data);

      setReview(data.review);

    } 
    catch(error) {

      setReview("❌ Error connecting to AI server");

    }

    setLoading(false);
  }


  return (
    <div className={darkMode ? "dark-theme container mt-5" : "container mt-5"}>  


    <div className="text-end mb-3">
        <button
            className="btn btn-secondary"
            onClick={() => setDarkMode(!darkMode)}
  >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
    </div>

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
          className={darkMode ? "form-control bg-dark text-white" : "form-control"}
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
  className={
    darkMode
    ? "border rounded p-4 bg-dark text-white"
    : "border rounded p-4 bg-light"
  }
  style={{
    minHeight: "200px",
  }}
>

{
  review ? (
    <ReactMarkdown
  components={{
    code({node, inline, className, children, ...props}) {

      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter
          language={match[1]}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code {...props}>
          {children}
        </code>
      );
    }
  }}
>
  {review}
</ReactMarkdown>
  ) : (
    "Your AI review will appear here..."
  )
}

</div>


      </div>


    </div>
  );
}

export default App;