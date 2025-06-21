'use client';
import React from 'react';
import { motion } from 'framer-motion';

const ReviewButton = ({ onClick, isLoading }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      className={`bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-3 font-bold text-lg 
        hover:scale-105 transform transition duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed`}
      whileTap={{ scale: 0.95 }}
    >
      {isLoading ? 'Reviewing…' : 'Review Code'}
    </motion.button>
  );
};

export default ReviewButton;
