module.exports = {
  tutorialSidebar: [
    // 1. Getting Started/Intro Section
    'intro',
    
    // 2. The RAG Chatbot Entry (Placed prominently)
    // NOTE: This MUST match the 'id' in your rag-chatbot.md file
    'rag-chatbot', 
    
    // 3. Document/Chapter Grouping
    {
      type: 'category',
      label: 'Book Chapters',
      collapsible: true,
      collapsed: false, // Set to true if you want the list closed by default
      items: [
        'chapter1',
        'chapter2',
        'chapter3',
        'chapter4',
        'chapter5',
        'conclusion',
      ],
    },

    // 4. Final Section
    'author'
  ],
};