
import React from "react";


function DownloadPdfButton({ targetId }) {
   const { data: { stateInfo, uiHomePage } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  const handleDownload = () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // Clone the element so we can modify styles
    const clonedElement = element.cloneNode(true);

    // Ensure scrollable divs/tables expand fully in print
    clonedElement.querySelectorAll("div[style], table").forEach((el) => {
      if (el.style.overflowX === "auto") {
        el.style.overflowX = "visible";
        el.style.width = "100%";
      }
    });

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
          // <title>Download PDF</title>
          <style>
            /* Make sure tables take full width */
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
            /* Ensure scroll areas expand */
            div { overflow: visible !important; }
          </style>
        </head>
        <body>${clonedElement.outerHTML}</body>
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

  return <button onClick={handleDownload}>  <img src={stateInfo?.uiImageAssets?.downloadiconsmall} alt="ALT Download" style={{ width:"18px",height:"18px",display:"inline-flex" }} />  Download</button>;
}

export default DownloadPdfButton;






// import React from "react";

// function DownloadPdfButton({ targetId }) {
//   const handleDownload = () => {
//     const element = document.getElementById(targetId);
//     if (!element) return;

//     // Grab the HTML content
//     const htmlContent = `
//       <html>
//         <head>
//           <title>Download</title>
//         </head>
//         <body>${element.outerHTML}</body>
//       </html>
//     `;

//     // Create a blob
//     const blob = new Blob([htmlContent], { type: "text/html" });

//     // Create a link element and click it
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "document.html"; // saved file
//     link.click();

//     // Cleanup
//     URL.revokeObjectURL(link.href);
//   };

//   return <button onClick={handleDownload}>⬇ Download</button>;
// }

// export default DownloadPdfButton;











// import React from "react";

// function DownloadPdfButton({ targetId }) {
//   const handleDownload = async () => {
//     const element = document.getElementById(targetId);
//     if (!element) return;

//     // Use built-in browser API to take snapshot
//     const svg = `
//       <svg xmlns="http://www.w3.org/2000/svg" width="${element.offsetWidth}" height="${element.offsetHeight}">
//         <foreignObject width="100%" height="100%">
//           ${new XMLSerializer().serializeToString(element)}
//         </foreignObject>
//       </svg>
//     `;

//     // Convert to image
//     const img = new Image();
//     const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
//     const url = URL.createObjectURL(blob);

//     img.onload = () => {
//       // Create canvas
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0);

//       URL.revokeObjectURL(url);

//       // Convert canvas to image data
//       const imgData = canvas.toDataURL("image/jpeg");

//       // Build a minimal PDF file (base64 encoded)
//       const pdf = `
//         %PDF-1.3
//         1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
//         2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
//         3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 ${img.width} ${img.height}]
//         /Resources <</XObject <</Im0 4 0 R>>>> /Contents 5 0 R>> endobj
//         4 0 obj <</Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB
//         /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgData.length}>>stream
//         ${atob(imgData.split(",")[1])}
//         endstream endobj
//         5 0 obj <</Length 44>>stream
//         q
//         ${img.width} 0 0 ${img.height} 0 0 cm
//         /Im0 Do
//         Q
//         endstream endobj
//         xref
//         0 6
//         0000000000 65535 f 
//         0000000010 00000 n 
//         0000000079 00000 n 
//         0000000178 00000 n 
//         0000000377 00000 n 
//         0000009999 00000 n 
//         trailer <</Size 6/Root 1 0 R>>
//         startxref
//         1111
//         %%EOF
//       `;

//       // Create blob for PDF
//       const pdfBlob = new Blob([pdf], { type: "application/pdf" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(pdfBlob);
//       link.download = "document.pdf";
//       link.click();
//     };

//     img.src = url;
//   };

//   return <button onClick={handleDownload}>⬇ Download PDF</button>;
// }

// export default DownloadPdfButton;






// import React from "react";

// function DownloadPdfButton({ targetId }) {
//   const handleDownload = () => {
//     const element = document.getElementById(targetId);
//     if (!element) return;

//     // Create SVG with DOM snapshot
//     const svg = `
//       <svg xmlns="http://www.w3.org/2000/svg" width="${element.offsetWidth}" height="${element.offsetHeight}">
//         <foreignObject width="100%" height="100%">
//           ${new XMLSerializer().serializeToString(element)}
//         </foreignObject>
//       </svg>
//     `;

//     // Convert SVG to image
//     const img = new Image();
//     const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
//     const url = URL.createObjectURL(blob);

//     img.onload = () => {
//       // Draw image on canvas
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0);
//       URL.revokeObjectURL(url);

//       // Convert canvas to image data
//       const imgData = canvas.toDataURL("image/jpeg");

//       // 👉 Trick: create a fake PDF by embedding the image in <iframe>
//       const pdfWindow = window.open("");
//       pdfWindow.document.write(`
//         <html>
//           <head><title>PDF</title></head>
//           <body style="margin:0">
//             <img src="${imgData}" style="width:100%"/>
//           </body>
//         </html>
//       `);
//       pdfWindow.document.close();

//       // Ask browser to "Save as PDF"
//       pdfWindow.print();
//     };

//     img.src = url;
//   };

//   return <button onClick={handleDownload}>⬇ Download PDF</button>;
// }

// export default DownloadPdfButton;

