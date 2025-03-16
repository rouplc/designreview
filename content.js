function extractPageData() {
  const pageTitle = document.title;
  const pageDescription = document.querySelector("meta[name='description']")?.content || "No description available";
  
  // Gather general design data from the page (simple example)
  const pageElements = {
    title: pageTitle,
    description: pageDescription,
    images: document.images.length,
    links: document.links.length
  };

  return pageElements;
}

// Send the page data to background script for feedback generation
chrome.runtime.sendMessage(
  { action: "getFeedback", pageData: JSON.stringify(extractPageData()) },
  response => {
    const feedback = response.feedback;
    console.log(feedback);
    // You could display the feedback on the page here
  }
);
