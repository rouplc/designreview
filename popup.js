chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "displayFeedback") {
    document.getElementById("feedback").innerText = request.feedback;
  }
});
