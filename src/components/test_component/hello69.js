import React, { useState } from 'react';

const QuestionHubPage = () => {
  const [viewType, setViewType] = useState('question'); // Default to showing questions

  return (
    <div>
      <div>
        <button onClick={() => setViewType('question')}>Question</button>
        <button onClick={() => setViewType('submissions')}>Submissions</button>
      </div>
      {viewType === 'question' ? <QuestionDetailSection /> : <SubmissionsSection />}
    </div>
  );
};

const QuestionDetailSection = () => {
  // Your question detail section JSX
  return (
    <div>
      <h3>Author</h3>
      <h3>Author</h3>
      <h3>Author</h3>
    </div>
  );
};

const SubmissionsSection = () => {
  // Your submissions section JSX
  return (
    <div>
      <h3>sdfsdfs</h3>
      <h3>dfg</h3>
      <h3>gsfgdfgd</h3>
      <h3>fgddfgd</h3>
    </div>
  );
};

export default QuestionHubPage;
