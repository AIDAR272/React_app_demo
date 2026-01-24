# UnoLingo

**UnoLingo** is a web application inspired by Duolingo that allows users to **translate words** and **actively train their vocabulary**. The goal is to provide a simple, interactive platform for learning new words and tracking user progress.

---

## Features

- **Translate Words**  
  Translate any word using the **Google Cloud Translation API** (currently English → Russian, more languages planned).

- **Train Translations**  
  Practice previously translated words in training mode to improve retention and test knowledge.

- **User Progress Tracking**  
  Monitor your learning progress with real-time score updates and history of correct answers.

- **Responsive Frontend**  
  Built with **React**, HTML, and CSS for a clean, interactive, and mobile-friendly interface.

- **Backend API**  
  Powered by **FastAPI** to handle translations, training sessions, and score tracking.

---

## How It Works

1. **User Inputs a Word**  
   The frontend captures the word to be translated.

2. **Translation Request**  
   The backend sends the word to the **Google Cloud Translation API** and retrieves the translation.

3. **Display and Store Translation**  
   The translated word is shown to the user and stored in the database for training purposes.

4. **Training Mode**  
   Users practice words by translating them back or matching them with correct translations. Scores are updated based on accuracy.

5. **Progress Tracking**  
   User scores are tracked in real-time, enabling learners to monitor their progress over time.

---

## Purpose

The purpose of **UnoLingo** is to provide an **interactive language learning tool** that combines translation and practice in one platform. Inspired by Duolingo, it emphasizes **active learning** through repeated practice, helping users retain vocabulary more effectively.

---

## Tech Stack

- **Frontend**: React, HTML, CSS
- **Backend**: Python, FastAPI
- **Translation API**: Google Cloud Translation API
- **Database**: PostgreSQL

---

## Future Improvements

- Add support for **more languages**
- Implement **user authentication and profiles**
- Enhance training mode with **timed challenges** and **difficulty levels**
- Improve UI/UX for **mobile responsiveness**

---

