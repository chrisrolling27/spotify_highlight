console.log('background.js run');

async function summarizeAlert() {
  let text = window.getSelection().toString();
  console.log(text);
  if (text != '') {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer XXX`,
        },
        body: JSON.stringify({
          prompt: `Please summarize the following text taken from a website: ${text}`,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 0.2,
        }),
      });
      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        console.log(data);
        let summary = data.choices[0].text.trim();
        console.log(summary);
        if (!summary.endsWith('.')) {
          summary += '.';
        }
        alert(summary);
      } else {
        console.error("Unexpected API response format:", data);
        alert("Failed to fetch summary. Please try again.");
      }
    } catch (error) {
      alert(error);
    }
  } else {
    alert('you need to highlight text in the page');
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: summarizeAlert
  });
});
