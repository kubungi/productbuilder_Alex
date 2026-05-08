
# Lotto Number Generator & Dinner Recommender

## Overview

This is a modern web application that provides fun utilities: a lotto number generator and a dinner menu recommender. It features a clean, responsive design with dark/light mode and multi-language support (English/Korean).

## Features

*   **Lotto Generator**: Generates 6 unique random numbers (1-45) with a clean visual display.
*   **Dinner Recommender**: Provides random dinner suggestions with appetizing images.
*   **Partnership Form**: A contact form for business inquiries.
*   **Theme Switching**: Support for Dark and Light (White) modes with persistent settings.
*   **Multi-language Support**: Toggle between English and Korean for all site content.

## Current Task: Add Multi-language Support (EN/KO)

The goal is to implement a global language selection feature that translates all UI elements and dynamic content.

### Plan

1.  **`index.html`**:
    *   Add a language selector in the header (next to the theme toggle).
    *   Add `data-i18n` attributes to all translatable elements for easy selection in JS.

2.  **`style.css`**:
    *   Style the language selector to be consistent with the theme toggle.
    *   Ensure layout remains stable when text lengths change between languages.

3.  **`main.js`**:
    *   Create a `translations` object containing all EN and KO strings.
    *   Implement `updateLanguage()` to iterate over `data-i18n` elements and update their text.
    *   Update dynamic content logic (lotto, dinner, form messages) to respect the current language.
    *   Persist language choice in `localStorage`.

4.  **Deployment**:
    *   Verify all features work in both languages.
    *   Commit all changes.
    *   Push to the remote GitHub repository.

