const sendSvgTest = async () => {
  // SVG squares with explicit colors
  const redSquare = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><rect width="50" height="50" fill="red"/></svg>`;
  const blueSquare = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><rect width="50" height="50" fill="blue"/></svg>`;
  const greenSquare = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><rect width="50" height="50" fill="green"/></svg>`;

  try {
    const response = await fetch('http://localhost:5001/api/receive-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@disposable.com',
        from: 'test@example.com',
        subject: 'SVG Color Test',
        body: `
          <div style="padding: 20px; background-color: #f5f5f5;">
            <h2>Testing SVG Colors</h2>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <div style="margin-bottom: 20px;">
                <p><strong>Red Square (SVG):</strong></p>
                <img src="${encodeURIComponent(redSquare)}" alt="Red Square" style="display: block; margin: 10px 0; border: 1px solid #ddd;" />
              </div>
              
              <div style="margin-bottom: 20px;">
                <p><strong>Blue Square (SVG):</strong></p>
                <img src="${encodeURIComponent(blueSquare)}" alt="Blue Square" style="display: block; margin: 10px 0; border: 1px solid #ddd;" />
              </div>
              
              <div style="margin-bottom: 20px;">
                <p><strong>Green Square (SVG):</strong></p>
                <img src="${encodeURIComponent(greenSquare)}" alt="Green Square" style="display: block; margin: 10px 0; border: 1px solid #ddd;" />
              </div>

              <div style="margin-top: 30px; padding: 10px; background-color: #f8f8f8; border-radius: 4px;">
                <p><strong>Direct SVG Test:</strong></p>
                ${redSquare}
                ${blueSquare}
                ${greenSquare}
              </div>
            </div>
          </div>
        `
      })
    });
    
    const data = await response.json();
    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

sendSvgTest();
