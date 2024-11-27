const sendCssTest = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/receive-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@disposable.com',
        from: 'test@example.com',
        subject: 'CSS Color Test',
        body: `
          <div style="padding: 20px; background-color: #f5f5f5;">
            <h2>Testing CSS Colors</h2>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <div style="margin-bottom: 20px;">
                <p><strong>Red Square (CSS):</strong></p>
                <div style="width: 50px; height: 50px; background-color: red; border: 1px solid #ddd; margin: 10px 0;"></div>
              </div>
              
              <div style="margin-bottom: 20px;">
                <p><strong>Blue Square (CSS):</strong></p>
                <div style="width: 50px; height: 50px; background-color: blue; border: 1px solid #ddd; margin: 10px 0;"></div>
              </div>
              
              <div style="margin-bottom: 20px;">
                <p><strong>Green Square (CSS):</strong></p>
                <div style="width: 50px; height: 50px; background-color: green; border: 1px solid #ddd; margin: 10px 0;"></div>
              </div>

              <div style="margin-bottom: 20px;">
                <p><strong>Rainbow Row:</strong></p>
                <div style="display: flex; gap: 10px;">
                  <div style="width: 30px; height: 30px; background-color: red;"></div>
                  <div style="width: 30px; height: 30px; background-color: orange;"></div>
                  <div style="width: 30px; height: 30px; background-color: yellow;"></div>
                  <div style="width: 30px; height: 30px; background-color: green;"></div>
                  <div style="width: 30px; height: 30px; background-color: blue;"></div>
                  <div style="width: 30px; height: 30px; background-color: purple;"></div>
                </div>
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

sendCssTest();
