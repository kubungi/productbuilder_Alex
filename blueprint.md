
# Lotto Number Generator & Dinner Recommender

## Overview

This is a modern web application that provides fun utilities: a lotto number generator and a dinner menu recommender. It features a clean, responsive design with dark/light mode and multi-language support (English/Korean).

## Features

*   **Lotto Generator**: Generates 6 unique random numbers (1-45) with a clean visual display.
*   **Dinner Recommender**: Provides random dinner suggestions with appetizing images.
*   **Partnership Form**: A contact form for business inquiries.
*   **Theme Switching**: Support for Dark and Light (White) modes with persistent settings.
*   **Multi-language Support**: Toggle between English and Korean for all site content.
*   **Google Analytics**: Integrated gtag.js for site traffic analysis.
*   **Microsoft Clarity**: Integrated for user behavior tracking and heatmaps.

## Current Task: Add Microsoft Clarity Tag

The goal is to integrate the Microsoft Clarity script for advanced user behavior analysis.

### Plan

1.  **index.html**:
    *   Insert the Microsoft Clarity script into the head section.

2.  **style.css**:
    *   Style the language selector to be consistent with the theme toggle.
    *   Ensure layout remains stable when text lengths change between languages.

3.  **main.js**:
    *   Create a translations object containing all EN and KO strings.
    *   Implement updateLanguage() to iterate over data-i18n elements and update their text.
    *   Update dynamic content logic (lotto, dinner, form messages) to respect the current language.
    *   Persist language choice in localStorage.

4.  **Deployment**:
    *   Verify all features work in both languages.
    *   Commit all changes.
    *   Push to the remote GitHub repository.
