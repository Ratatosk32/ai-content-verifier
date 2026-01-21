chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "check-ai-content",
      title: "Verify with AI Detector",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "check-ai-content" && tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: "ANALYZE_SELECTION",
        text: info.selectionText
      });
    }
  });