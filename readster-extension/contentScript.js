// This script runs on the Readster website (localhost:5173)
// It checks for pending data from the extension and relays it to the React app

function relayPendingData() {
  chrome.storage.local.get(["readster_pending_data"], (result) => {
    if (result.readster_pending_data) {
      const data = result.readster_pending_data;
      
      // Only relay if the data is fresh (less than 30 seconds old)
      // to avoid re-populating on every refresh
      const now = Date.now();
      if (now - data.timestamp < 30000) {
        console.log("[Readster Extension] Relaying data to app...");
        
        window.postMessage({
          type: "READSTER_TRANSFER",
          payload: data
        }, "*");
      }
      
      // Clear storage after relaying
      chrome.storage.local.remove("readster_pending_data");
    }
  });
}

// Listen for the app signaling it is ready
window.addEventListener("message", (event) => {
  if (event.data?.type === "READSTER_READY") {
    relayPendingData();
  }
});

// Fallback: Check once after a short delay in case the signal was missed
setTimeout(relayPendingData, 1000);
