# 📝 To-Do List Application:

A modern, feature-rich task management application built with vanilla HTML, CSS, and JavaScript. This application helps you organize, prioritize, and track your daily tasks with an intuitive interface and powerful features.

✨ Features

📋 Core Task Management:
Add Tasks: Create new tasks with priority levels (Low, Medium, High)

Edit Tasks: Modify existing tasks and their priorities
Delete Tasks: Remove individual tasks or clear all at once
Mark Complete: Toggle task completion status
Visual Priority: Color-coded borders based on priority

🎯 Advanced Features:

Smart Filtering: Filter tasks by status (All, Pending, Completed, High Priority)
Real-time Statistics: Track total, completed, pending, and high-priority tasks
Data Persistence: Automatically saves tasks using browser's localStorage
Import/Export: Backup and restore tasks using JSON files
Responsive Design: Fully functional on desktop, tablet, and mobile
Keyboard Shortcuts: Speed up your workflow with keyboard navigation

🎨 User Experience:

Clean Interface: Modern design with gradient backgrounds and smooth animations
Visual Feedback: Notifications for all user actions
Empty States: Helpful messages when no tasks exist
Accessibility: Keyboard navigation and screen reader support
Dark/Light Mode: Built-in color variables for easy theming

📁 Project Structure

todo-list-web/
├── index.html          # Main HTML file
├── style.css          # All CSS styles
├── script.js          # JavaScript application logic
├── tasks.json         # Example tasks file (auto-generated)
└── assets/            # Optional assets folder
    └── favicon.ico    # Application icon

🚀 Getting Started:

Prerequisites
A modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
No additional software or dependencies required

Installation-

Method 1: Direct Download

Download the project files
Extract to a folder
Open index.html in your browser

Method 2: Using Git

git clone https://github.com/abhi2467/
cd todo-list-app
# Open index.html in your browser

Method 3: Online Deployment

You can deploy this web on any static hosting service:
GitHub Pages

Netlify
Vercel
AWS S3
Any web server

First Run
Open index.html in your web browser
The application will load with sample tasks (if tasks.json exists)
Start adding your own tasks!

🎮 How to Use:

Adding Tasks-

Type your task in the input field at the top
Select a priority level (Low, Medium, High)
Click "Add Task" or press Enter

Managing Tasks

Complete Task: Click the checkbox next to a task
Edit Task: Click the pencil icon (✏️)
Delete Task: Click the trash icon (🗑️)
Filter Tasks: Use the filter buttons above the task list

File Operations:

Export Tasks: Click "Export to JSON" to download your tasks
Import Tasks: Click "Import from JSON" to restore from a file
View JSON: Click "View JSON Data" to see the raw data
Clear All: Click "Clear All Tasks" to start fresh

Keyboard Shortcuts-

Shortcut  - 	Action
Enter	  -     Add new task
Ctrl/Cmd + Enter  - 	Quick add task
Escape	  -     Close modals
Ctrl/Cmd + F      - 	Focus search input
Space	  -     Toggle task completion
Delete	  -     Delete focused task

🔧 Technical Details:

Technology Stack-

HTML5: Semantic markup and structure
CSS3: Modern styling with CSS Variables and Flexbox/Grid
Vanilla JavaScript: No frameworks or dependencies
LocalStorage: Client-side data persistence
JSON: Data interchange format

Data Structure:-
Tasks are stored as objects with the following properties:

{
  id: Number,           // Unique identifier
  text: String,         // Task description
  completed: Boolean,   // Completion status
  priority: String,     // 'low', 'medium', or 'high'
  createdAt: String,    // ISO date string
  dueDate: String|null  // Optional due date
}

File Format:-
The application uses a JSON format for import/export:

{
  "version": "1.0",
  "generatedAt": "2023-10-15T10:30:00.000Z",
  "totalTasks": 5,
  "completedTasks": 2,
  "tasks": [...]
}
📱 Responsive Design:

The application is fully responsive across all devices:
Desktop (≥1024px): Full feature set with side-by-side layouts
Tablet (768px-1023px): Optimized touch interactions
Mobile (<768px): Stacked layouts for easy one-handed use

🔒 Data Privacy:-

All data is stored locally in your browser's localStorage
No data is sent to external servers
Your tasks remain on your device unless you explicitly export them
You can clear all data by clearing browser storage or using the "Clear All Tasks" feature

🛠️ Development:

Customization-
You can easily customize the application by modifying the CSS variables in style.css:


:root {
  --primary-color: #4b6cb7;      /* Main brand color */
  --secondary-color: #182848;    /* Secondary color */
  --success-color: #28a745;      /* Completed tasks */
  --warning-color: #ffc107;      /* Medium priority */
  --danger-color: #dc3545;       /* High priority */
  /* ... other variables */
}

Adding Features:-

The application is structured to be easily extendable:
Add new task properties: Modify the task object structure in script.js
Add new filters: Extend the filtering logic in the renderTasks() function
Add animations: Use the existing animation framework in style.css
Add themes: Create theme classes that override CSS variables

Building for Production-

Since this is a static application, no build process is required. However, you can:
Minify the CSS and JavaScript for performance
Optimize images (if any)
Add service workers for offline functionality
Implement PWA manifest for mobile installation

📊 Performance:

Load Time: < 2 seconds on average connections
Storage: Efficient localStorage usage with compression
Memory: Minimal memory footprint
Updates: Instant UI updates with no page reloads
Test your changes thoroughly
Update documentation as needed

🐛 Troubleshooting:

Common Issues-

Tasks not saving:

Check if localStorage is enabled in your browser
Try clearing browser cache
Ensure you're not in incognito/private mode

Import not working:

Verify the JSON file format matches the expected structure
Check browser console for errors (F12 → Console)
Ensure the file is a valid JSON file

Slow performance:

Close other tabs to free up memory
Clear old tasks if you have thousands of items
Update your browser to the latest version

Browser Compatibility
✅ Chrome 80+
✅ Firefox 75+
✅ Safari 13+
✅ Edge 80+
⚠️ Internet Explorer (not supported)

📚 Learning Resources:

This project is excellent for learning:
HTML/CSS/JS Fundamentals: See how these technologies work together
DOM Manipulation: Learn how to dynamically update the page
LocalStorage API: Understand client-side data persistence
Event Handling: See how user interactions are managed
Responsive Design: Study the media queries and flexible layouts
JSON Manipulation: Learn how to work with JSON data

👨‍💻 Author

Abhinav Chauhan
GitHub: @abhi2467
Email: rajputabhinav4163@gmail.com

🙏 Acknowledgments:

Icons by Font Awesome
Fonts by Google Fonts
Color palette inspired by modern design systems
Design patterns from popular productivity apps

🌟 Support

If you found this project helpful, please consider:
Giving it a ⭐ on GitHub

Sharing it with others
Reporting bugs or suggesting features

Contributing code improvements
