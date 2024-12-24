import React, { useEffect } from "react";

const ChatWidget = () => {
  // Function to initialize Freshchat
  const initFreshChat = () => {
    window?.fcWidget?.init({
      config: {
        headerProperty: { hideChatButton: true },
        cssNames: {
          widget: "custom_fc_frame",
          expanded: "custom_fc_expanded",
        },
      },
    });
    window.fcWidget?.hide(); // Hide the widget initially
  };

  // Function to dynamically load the Freshchat script
  const loadFreshChatScript = () => {
    const scriptId = "Freshchat-js-sdk";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.src = "https://equity3.freshchat.com/js/widget.js";
      script.onload = initFreshChat;
      document.head.appendChild(script);
    } else {
      initFreshChat();
    }
  };

  // Trigger the loading of the Freshchat script when the component mounts
  useEffect(() => {
    loadFreshChatScript();
  }, []); // Empty dependency array means this runs once when the component is mounted

  // Show the Freshchat widget when the button is clicked
  const showChatWidget = () => {
    if (window.fcWidget) {
      window.fcWidget.show();
      window.fcWidget.open();
    }
  };

  return (
    <a>
      <button type="button" className="whatsappBtn" onClick={showChatWidget}>
        Chat Support
      </button>
    </a>
  );
};

export default ChatWidget;
