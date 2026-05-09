
# Lotto Number Generator & Dinner Recommender

## Overview

This is a modern web application that provides fun utilities: a lotto number generator and a dinner menu recommender. It features a clean, responsive design with dark/light mode and multi-language support (English/Korean), fully optimized for SEO (Google/Naver).

## Features

*   **Lotto Generator**: Generates 6 unique random numbers (1-45) with a clean visual display.
*   **Dinner Recommender**: Provides random dinner suggestions with appetizing images.
*   **Partnership Form**: A contact form for business inquiries using Formspree.
*   **Theme Switching**: Support for Dark and Light (White) modes with persistent settings.
*   **Multi-language Support**: Toggle between English and Korean for all site content, including SEO metadata.
*   **Google Analytics**: Integrated gtag.js for site traffic analysis.
*   **Microsoft Clarity**: Integrated for user behavior tracking and heatmaps.
*   **Favicon**: Custom favicon implemented for better branding.
*   **SEO Optimization**: 
    *   Dynamic meta tags (description, keywords, OG, Twitter).
    *   Semantic HTML5 structure.
    *   Canonical URL.
    *   Structured Data (JSON-LD) for rich results.
    *   `robots.txt` and `sitemap.xml` for search engine crawlers.

## Current Task: SEO Optimization

The goal was to make the site "SEO-perfect" based on Google and Naver guidelines.

### Plan

1.  **index.html**:
    *   Add static meta tags for description, keywords, OG, and Twitter.
    *   Add Canonical URL and JSON-LD structured data.
    *   Add `data-i18n-meta` attributes for dynamic updates.

2.  **main.js**:
    *   Update translations to include SEO-related strings.
    *   Implement logic to dynamically update meta tags on language switch.

3.  **robots.txt & sitemap.xml**:
    *   Create these files to guide search engine crawlers.

4.  **Deployment**:
    *   Commit and push all changes to GitHub.
