
# Lotto Number Generator & Dinner Recommender

## Overview

This is a modern web application that provides fun utilities: a lotto number generator and a dinner menu recommender. It features a clean, responsive design with dark/light mode and multi-language support (English/Korean), fully optimized for SEO (Google/Naver) and GEO (Generative Engine Optimization).

## Features

*   **Lotto Generator**: Generates 6 unique random numbers (1-45) with a clean visual display and technical logic notes.
*   **Dinner Recommender**: Provides random dinner suggestions with appetizing images.
*   **Partnership Form**: A contact form for business inquiries using Formspree.
*   **Theme Switching**: Support for Dark and Light (White) modes with persistent settings.
*   **Multi-language Support**: Toggle between English and Korean for all site content, including SEO/GEO metadata and FAQ.
*   **Google Analytics & Microsoft Clarity**: Integrated for traffic and behavior tracking.
*   **SEO & GEO Optimization**: 
    *   Dynamic meta tags and semantic HTML5.
    *   Enhanced JSON-LD Structured Data (WebApplication + FAQPage).
    *   Conversational FAQ section to target AI-powered search engines.
    *   Freshness signals (Last Updated date) and Author authority.
    *   `robots.txt` and `sitemap.xml` for crawler management.

## Current Task: GEO (Generative Engine Optimization)

The goal was to optimize the site for the AI search era (ChatGPT Search, Google AI Overviews, Perplexity) based on Toss Payments' GEO guide.

### Plan

1.  **index.html**:
    *   Add an FAQ section with H2/H3 tags for conversational search.
    *   Add a logic note explaining the generation algorithm.
    *   Enrich JSON-LD with FAQPage schema and author/dateModified fields.
    *   Add a footer with copyright and last updated date.

2.  **main.js**:
    *   Update translations for FAQ and logic notes.
    *   Ensure all new elements respect language switching.

3.  **style.css**:
    *   Add styling for FAQ, logic notes, and the site footer.

4.  **Deployment**:
    *   Commit and push all changes to GitHub.
