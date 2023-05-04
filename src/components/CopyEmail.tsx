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
    <div>
      <span>{email}</span>
      <button onClick={copyToClipboard}>Copy Email</button>
    </div>
  );
};

export default CopyEmail;
