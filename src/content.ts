chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "ANALYZE_SELECTION") {
      
      const loadingLabel = createFloatingLabel("Checking...", "white", "#333");
      
      const API_URL = 'https://ai-verifier-oleksii-stas-projects.vercel.app/api/check';
  
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: message.text })
        });
  
        const result = await response.json();
        loadingLabel.remove(); 
  
        if (Array.isArray(result) && result[0]) {
          const score = Math.round(result[0].score * 100);
          const label = result[0].label;
          const color = label === "Real" ? "#2ecc71" : "#e74c3c"; 
  
          showFloatingResult(`${label}: ${score}%`, color);
        }
      } catch (error) {
        loadingLabel.remove();
        showFloatingResult("Error connecting to server", "#f39c12");
      }
    }
  });
  
  function createFloatingLabel(text: string, textColor: string, bgColor: string) {
    const label = document.createElement('div');
    
    Object.assign(label.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      backgroundColor: bgColor,
      color: textColor,
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      zIndex: '999999',
      fontFamily: 'sans-serif',
      fontSize: '14px',
      fontWeight: 'bold',
      transition: 'opacity 0.3s ease'
    });
  
    label.innerText = text;
    document.body.appendChild(label);
    return label;
  }
  
  function showFloatingResult(text: string, color: string) {
    const label = createFloatingLabel(text, "white", color);
    
    setTimeout(() => {
      label.style.opacity = '0';
      setTimeout(() => label.remove(), 300);
    }, 4000);
  }