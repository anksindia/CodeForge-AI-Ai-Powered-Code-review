'use client';
import React from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { motion } from 'framer-motion';

const ReviewOutput = ({ review, isLoading }) => {
  return (
    <section className="flex-1 rounded-xl p-4 overflow-auto max-h-screen"
      style={{ background: 'transparent' }}
    >
      {isLoading ? (
        <motion.div
          className="text-cyan-500 text-center text-lg mt-10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Analyzing your code…
        </motion.div>
      ) : review ? (
        <div className="prose prose-invert max-w-none">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-10">
          Results will appear here
        </div>
      )}
    </section>
  );
};

export default ReviewOutput;
