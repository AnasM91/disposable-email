// Sample base64 encoded small image (a red dot)
const sampleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

const sendTestEmail = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/receive-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@disposable.com',
        from: 'sender@example.com',
        subject: 'Test Email with Image',
        body: `
          <h1>Test Email with Image</h1>
          <p>This is a test email containing an embedded image:</p>
          <img src="${sampleImage}" alt="Test image" />
          <p>If you can see a small red dot above, the image handling is working!</p>
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
