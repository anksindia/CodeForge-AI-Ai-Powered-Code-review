# CodeForge AI



CodeForge AI is an interactive code review and chat assistant application. It allows users to write, review, and discuss their code with an AI assistant powered by an `get-review` backend. This app provides a seamless experience for coding, review, and AI-driven chat help.
![ Banner](/public/banner.png)

## ✨ Features

### 👨‍💻 1. **Code Editor**

* Enables users to write or paste code snippets.
* Syntax highlighting using `react-simple-code-editor` and `prismjs`.
* Provides a clean and readable interface for coding.

### 🕹️ 2. **Code Review**

* Click "Review Code" to send the code to the AI review backend (`/ai/get-review`).
* Displays AI feedback with Markdown rendering for rich text review.
* Shows a "spark" animation when review is in progress.

### 💬 3. **Integrated Chat Assistant**

* Chat with the AI assistant for coding help, best practices, and error detection.
* Messages are exchanged with the backend (`/ai/get-review`) for AI-generated replies.
* Interactive chat interface that handles both user and AI messages.

### ⚡️ 4. **Loading & Status Indicators**

* Provides visual feedback when the AI is processing a request.
* Displays "Typing…" and "Analyzing your code…" animations.

### 🎨 5. **Modern, Responsive UI**

* Tailwind CSS for sleek design.
* Framer Motion for animations and interactive elements.
* Responsive layout for both desktop and mobile screens.

## ⚙️ Technical Stack

* **Front-end**: React, TailwindCSS, Framer Motion, Markdown & PrismJS for syntax highlighting.
* **Back-end**: REST endpoints (`/ai/get-review`) for review and chat services.

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```
2. Start the app:

   ```bash
   npm run dev
   ```
3. Ensure backend service is running at `http://localhost:3000/ai/get-review`.

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Pull requests and feedback are welcome!

## 🙏 Acknowledgements

<p align="center"> <img src="https://avatars.githubusercontent.com/anksindia" alt="anksindia" width="80" height="80" style="border-radius: 50%;"/> </p> <p align="center"> Built with 💙 by <a href="https://github.com/anksindia" target="_blank">@anksindia</a> </p>