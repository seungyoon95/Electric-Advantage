import React from "react";

export default function About() {
  const [testText, setTestText] = React.useState("About");
  return (
    <div>
      <h2>{testText}</h2>
    </div>
  );
}
