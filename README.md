# TechTalks 2026 Event Website

A single-page application for a 1-day technical event, featuring a searchable schedule.

## Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** HTML5, CSS3, Vanilla JavaScript

## Features
- **One-Day Schedule:** 10:00 AM start, 6 talks (1h each) with 10-minute transitions.
- **Lunch Break:** 1-hour break after the 3rd talk.
- **Category Search:** Real-time filtering by technology keywords.
- **Responsive Design:** Mobile-friendly "Modern Light" aesthetic.

## How to Run Locally

1. **Navigate to the project folder:**
   ```bash
   cd ~/gemini-cli-projects/event-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **Access the website:**
   Open your browser and navigate to `http://localhost:3000`.

## Testing the Search
- Type "AI" in the search bar to see Artificial Intelligence related talks.
- Type "Cloud" to see infrastructure and DevOps talks.
- Clear the search bar to view the full schedule.
