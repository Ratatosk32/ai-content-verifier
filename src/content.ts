"use strict";

document.addEventListener('mouseup', async () => {
    const selection = window.getSelection()?.toString().trim();
    
    if (selection && selection.length > 50) {
        console.log('--- AI Content Analysis ---');
        console.log('Target text:', selection);
        console.log('Status: Sending to serverless inference engine...');
        const API_URL = 'https://ai-verifier-oleksii-stas-projects.vercel.app/api/check';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: selection })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Result received:', result);
            if (Array.isArray(result) && result[0]) {
                const { label, score } = result[0];
                const confidence = Math.round(score * 100);
                
                alert(`🧬 AI Detection Result:\n\nType: ${label}\nConfidence: ${confidence}%`);
            } else if (result.error) {
                alert(`API Error: ${result.details || result.error}`);
            }

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
});