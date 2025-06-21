'use client';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReviewButton from './components/ReviewButton';
import ReviewOutput from './components/ReviewOutput';
import CodeEditor from './components/CodeEditor';
import { motion } from 'framer-motion';

const App = () => {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSpark, setShowSpark] = useState(false);

  const editorRef = useRef(null);
  const outputRef = useRef(null);

  async function reviewCode() {
    setIsLoading(true);
    setShowSpark(true);
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', {
        code,
      });
      // ✅ IMPORTANT: Response ke andar reply se review set karo
      const replyText = response.data?.reply || 'No review available.';
      setReview(replyText);
    } catch (error) {
      setReview('⚠️ Error fetching review. Try again.');
      console.error(error);
    }
    setIsLoading(false);
    // Hide spark after animation finishes
    setTimeout(() => setShowSpark(false), 1000);
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 p-4 space-y-4 md:space-y-0 md:space-x-4 relative z-10">
      <div ref={editorRef} className="flex-1 flex flex-col space-y-3">
        <CodeEditor code={code} onChange={setCode} />
        <ReviewButton onClick={reviewCode} isLoading={isLoading} />
      </div>

      <div ref={outputRef} className="flex-1">
        <ReviewOutput review={review} isLoading={isLoading} />
      </div>

      {showSpark && (
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '50%',
            left: '25%',
            width: '2px',
            height: '2px',
            background: 'cyan',
            boxShadow: '0px 0px 12px cyan',
            zIndex: 20,
          }}
          animate={{
            top: ['50%', '40%'], // Slight move up
            left: ['25%', '75%'], // Move from Editor -> Output
            scale: [1, 2, 1],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1 }}
        />
      )}
    </div>
  );
};

export default App;
