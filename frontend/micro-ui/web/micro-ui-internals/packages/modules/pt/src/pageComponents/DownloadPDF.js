import React from "react";

function DownloadPdfButton({ targetId }) {
  const handleDownload = () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // Create hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.width = iframe.style.height = "0";
    document.body.appendChild(iframe);

    // Write component HTML into iframe
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Download PDF</title>
          <style>
            /* Optional: include styles from DIGIT UI if needed */
          </style>
        </head>
        <body>${element.outerHTML}</body>
      </html>
    `);
    doc.close();

    // Trigger print (PDF dialog)
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 500);
  };

  return <button onClick={handleDownload}>⬇ Download</button>;
}
export default DownloadPdfButton;