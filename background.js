chrome.runtime.onInstalled.addListener(() => {
  console.log("Design Feedback Extension Installed");
});

// Function to send page data to ChatGPT
async function getDesignFeedback(pageData) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert design lead with over 20 years of experience in UX/UI and product design principles."
        },
        {
          role: "user",
          content: pageData
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getFeedback") {
    getDesignFeedback(request.pageData).then(feedback => {
      sendResponse({ feedback: feedback });
    });
  }
  return true; // Keep the message channel open for async response
});
