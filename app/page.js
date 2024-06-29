"use client";
import dynamic from "next/dynamic";

// Dynamically import the MatterComponent to ensure it only loads on the client-side
const MatterComponent = dynamic(() => import("./test"), { ssr: false });

const MatterPage = () => {
  return (
    <>
      <div className="h-screen"></div>
      <div id="matter-container" className="h-screen w-screen overflow-hidden">
        <MatterComponent />
      </div>
      <div className="h-screen"></div>
    </>
  );
};

export default MatterPage;
