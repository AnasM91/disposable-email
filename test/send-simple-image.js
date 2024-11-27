const sendTestEmail = async () => {
  // A very small, simple red square image
  const simpleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVR42mNk+M9Qz0AEYBxVOKpwVCEAoRIGFVuq/sIAAAAASUVORK5CYII=';

  try {
    const response = await fetch('http://localhost:5001/api/receive-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@disposable.com',
        from: 'test@example.com',
        subject: 'Simple Image Test',
        body: `
          <div style="padding: 20px; background-color: #f5f5f5;">
            <h2>Testing Image Display</h2>
            <p>Below should be a small red square:</p>
            <div style="border: 1px solid #ccc; padding: 10px; background: white;">
              <img src="${simpleImage}" alt="Red Square" style="display: block; margin: 10px 0;" />
            </div>
            <p>Did you see the red square above?</p>
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

sendTestEmail();
