"use client";
import dynamic from 'next/dynamic';

// Dynamically import the MatterComponent to ensure it only loads on the client-side
const MatterComponent = dynamic(() => import('./test'), { ssr: false });

const MatterPage = () => {
  return (
    <div>
      <MatterComponent />
    </div>
  );
};

export default MatterPage;
