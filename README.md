# Student Management UI - React Application with AI Chatbot

A modern React-based user interface for managing students with create, read, update, and delete operations. This application connects to the Spring Boot Student Management API backend and includes an **AI-powered chatbot assistant**.

## Features

### Student Management
- ✅ Create Students
- ✅ Read Students
- ✅ Update Students
- ✅ Delete Students
- ✅ Real-time validation
- ✅ Toast notifications
- ✅ Responsive design

### AI Chatbot Assistant (NEW)
- 🤖 **AI-Powered Chat** - Powered by OpenAI's GPT-4
- 💬 **Multi-turn Conversations** - Maintains conversation history
- 📊 **Context-Aware Responses** - Access to real-time student database data
- 🎯 **Two Chat Modes**:
  - **General Chat** - Answer questions about student management
  - **With Context** - Queries student database for informed responses
- 🎨 **Beautiful UI** - Floating chatbot button with smooth animations
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Real-time Interactions** - Instant responses with loading states

## Tech Stack

- React 18
- Bootstrap 5
- Axios (HTTP client)
- React Toastify (notifications)
- React Bootstrap (UI components)
- React Icons (icon library)
- UUID (conversation ID generation)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spring Boot Student Management API running on `http://localhost:8080`
- OpenAI API key (for chatbot feature) - set in backend `.env`

## Installation

```bash
git clone https://github.com/myllm135795-eng/student-management-ui.git
cd student-management-ui
npm install
```

## Run the App

```bash
npm start
```

The application runs at `http://localhost:3000`

## Configuration

### Environment Variables

Optional `.env` file:

```bash
# Student Management API
REACT_APP_API_URL=http://localhost:8080/api
```

### Backend Configuration

Ensure the Spring Boot backend has:
1. Chatbot endpoints running on `/api/chatbot`
2. OpenAI API key configured
3. H2 database with student data

## API Endpoints Used

### Student Management
- `GET /api/students` - List all students
- `GET /api/students/{id}` - Get specific student
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Chatbot (NEW)
- `POST /api/chatbot/chat` - Send message (general chat)
- `POST /api/chatbot/chat-with-context` - Send message (with student data context)
- `POST /api/chatbot/clear/{conversationId}` - Clear conversation history
- `GET /api/chatbot/exists/{conversationId}` - Check conversation status
- `GET /api/chatbot/health` - Chatbot service health check

## How to Use the Chatbot

### Opening the Chatbot
1. Look for the 🤖 floating button in the bottom-right corner
2. Click it to open the AI Assistant panel
3. The panel will slide up with smooth animation

### Chatting with the Bot

**Example Questions:**

#### General Chat Mode
```
"How do I add a new student?"
"What are the student management features?"
"Tell me about CRUD operations"
```

#### Context-Aware Chat Mode (with database)
```
"How many students are in the system?"
"List all students in Computer Science"
"What courses are available?"
"Show me student details"
```

### Features

**Toggle Context Mode:**
- Switch between "General" and "With Context" modes using the toggle in the chatbot header
- Context mode provides real-time student database information

**Clear Chat:**
- Click "Clear Chat" button to reset conversation history
- Starts fresh conversation

**Multi-turn Conversations:**
- Each conversation has a unique ID
- Bot remembers previous messages in the conversation
- Maintains context across multiple exchanges

## File Structure

```
src/
├── components/
│   ├── ChatbotPanel.js          # Main chatbot container
│   ├── ChatWindow.js            # Chat interface
│   ├── ChatMessage.js           # Individual message component
│   ├── StudentList.js           # Student list component
│   └── StudentForm.js           # Student form component
├── services/
│   ├── chatbotService.js        # Chatbot API client
│   └── studentService.js        # Student API client
├── styles/
│   ├── ChatbotPanel.css         # Chatbot panel styling
│   ├── ChatWindow.css           # Chat window styling
│   └── ChatMessage.css          # Message styling
├── App.js                        # Main app component
├── App.css                       # App styling
├── index.js                      # Entry point
└── index.css                     # Global styles
```

## Component Details

### ChatbotPanel
- Floating button that toggles chatbot visibility
- Manages open/close state
- Position: fixed bottom-right with animation

### ChatWindow
- Main chat interface
- Message display area with auto-scroll
- Input field with Send button
- Context mode toggle
- Clear chat functionality
- Loading indicators

### ChatMessage
- Displays individual messages
- Different styling for user vs. bot messages
- Supports formatted text with proper line breaks
- Smooth fade-in animation

### chatbotService
API client with methods:
- `sendChat()` - General chat
- `sendChatWithContext()` - Context-aware chat
- `clearConversation()` - Clear history
- `conversationExists()` - Check status
- `health()` - Service health

## Styling & Customization

### Color Scheme
- Primary gradient: `#667eea` to `#764ba2`
- User messages: Purple gradient
- Bot messages: White with border
- Background: Light gray (`#f8f9fa`)

### Responsive Breakpoints
- **Desktop** (>768px): 400px width panel
- **Tablet** (768px): 90% width panel
- **Mobile** (<480px): Full width, bottom slide-up

### Customize Colors

Edit CSS variables in the style files:

**ChatbotPanel.css:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**ChatMessage.css:**
```css
.user-message .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Troubleshooting

### Chatbot Not Responding
1. Check that backend API is running on `http://localhost:8080`
2. Verify OpenAI API key is set in backend
3. Check browser console for errors
4. Ensure chatbot endpoints are accessible

### Messages Not Appearing
1. Verify network requests in DevTools Network tab
2. Check chatbot service API URL
3. Look for CORS errors in console

### Context Mode Not Working
1. Ensure student data is available in database
2. Check that `/api/students` endpoint is accessible
3. Verify backend has context-aware chat endpoint

### Styling Issues
1. Clear browser cache
2. Ensure Bootstrap is properly imported
3. Check CSS file paths
4. Verify React Icons package is installed

## Performance Tips

1. **Lazy Load Chatbot** - Component loads on-demand
2. **Efficient Re-renders** - Uses React hooks optimally
3. **CSS Animations** - GPU-accelerated transitions
4. **Message Virtualization** - Consider for 1000+ messages
5. **Debounce Input** - Already implemented in service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Voice input/output support
- [ ] Message history persistence
- [ ] Download conversation as PDF
- [ ] Dark/Light theme toggle
- [ ] Conversation bookmarking
- [ ] Advanced search in chat history
- [ ] Emoji support
- [ ] Message reactions
- [ ] File upload support
- [ ] WebSocket real-time updates

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation in backend README
3. Check console for error messages
4. Open an issue on GitHub

## Related Repositories

- [Student Management API](https://github.com/myllm135795-eng/student-management-api) - Backend Spring Boot API
- AI Chatbot features depend on the API's OpenAI integration

---

**Happy Learning! 🎓**
