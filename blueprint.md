
# Lotto Number Generator & Dinner Recommender

## Overview

This is a modern web application that provides fun utilities: a lotto number generator and a dinner menu recommender. It features a clean, responsive design with dark/light mode and multi-language support (English/Korean), fully optimized for SEO (Google/Naver) and GEO (Generative Engine Optimization).

### Usage
*   **Update Schedule**: Run `node fetch_arirang.js` once a week to refresh the Arirang Radio schedule data from the Public Data Portal. This updates `arirang-schedule.json`.

## Features
...
*   **Arirang Radio Timeline**: A dedicated horizontal timeline at the bottom of the page showing the 24-hour schedule for Arirang Radio. It features a real-time "current time" marker and allows users to start the live stream by clicking on any program block.

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

## Completed: Arirang Radio Integration & Horizontal Timeline

Implemented a robust system for Arirang Radio schedule management:
*   **Fetch Script**: `fetch_arirang.js` handles weekly API calls and data parsing.
*   **Data Storage**: `arirang-schedule.json` provides fast, local access to the schedule.
*   **Timeline UI**: A horizontal, scrollable 24-hour timeline with "LIVE" indicators and real-time markers.
*   **Playback Integration**: Seamlessly plays Arirang Radio when programs are clicked.
