import React, { useCallback } from 'react';

interface CopyEmailProps {
  email: string;
}

const CopyEmail: React.FC<CopyEmailProps> = ({ email }) => {
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      console.log('Email copied to clipboard');
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  }, [email]);

  return (
    <div className="flex flex-row items-center space-x-2">
      <span>{email}</span>
      <button
        onClick={copyToClipboard}
        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Copy Email
      </button>
    </div>
  );
};

export default CopyEmail;
