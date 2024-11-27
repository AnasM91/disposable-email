const sendColorTest = async () => {
  // Three different colored squares
  const redSquare = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABYSURBVDiNY2AY2eA/AwPDf3Q2I7oAIyMjdgPRAYYBjAwMDP8ZGBgYmBhGwQgDLAz//0PYTKMGjho4auCogaMGjhpIYwD5y38kNhOGHAuGPCMDAwMDAwMAyXAGrBJ3p7YAAAAASUVORK5CYII=';
  const blueSquare = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABYSURBVDiNY2AY2eA/AwPDf3Q2E7oAIyMjdgPRAYYBTAwMDAwMDAwMzKMGjho4auCogaMGjhpIYwD5y38kNhOGHDOGPCMDAwMDAwMAyXAGrBJ3p7YAAAAASUVORK5CYII=';
  const greenSquare = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABYSURBVDiNY2AY2eA/AwPDf3Q2M7oAIyMjdgPRAYYBzAwMDAwMDAwMLKMGjho4auCogaMGjhpIYwD5y38kNjOGHAuGPCMDAwMDAwMAyXAGrBJ3p7YAAAAASUVORK5CYII=';

  try {
    const response = await fetch('http://localhost:5001/api/receive-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@disposable.com',
        from: 'test@example.com',
        subject: 'Color Test',
        body: `
          <div style="padding: 20px; background-color: #f5f5f5;">
            <h2>Testing Different Colors</h2>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <div style="margin-bottom: 20px;">
                <p><strong>Red Square:</strong></p>
                <img src="${redSquare}" alt="Red Square" style="display: block; margin: 10px 0; border: 1px solid #ddd;" />
              </div>
              
              <div style="margin-bottom: 20px;">
                <p><strong>Blue Square:</strong></p>
                <img src="${blueSquare}" alt="Blue Square" style="display: block; margin: 10px 0; border: 1px solid #ddd;" />
              </div>
              
              <div style="margin-bottom: 20px;">
                <p><strong>Green Square:</strong></p>
                <img src="${greenSquare}" alt="Green Square" style="display: block; margin: 10px 0; border: 1px solid #ddd;" />
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

sendColorTest();
