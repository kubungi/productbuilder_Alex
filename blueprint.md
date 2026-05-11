
# Lotto Number Generator & Dinner Recommender

## Overview

This is a modern web application that provides fun utilities: a lotto number generator and a dinner menu recommender. It features a clean, responsive design with dark/light mode and multi-language support (English/Korean), fully optimized for SEO (Google/Naver) and GEO (Generative Engine Optimization).

## Features

*   **Korean Radio**: A real-time streaming feature for popular Korean internet radio stations (KBS, MBC, SBS, CBS, EBS, etc.). It uses official broadcaster APIs (KBS Kong, MBC Mini, SBS Gorealra) to dynamically fetch tokenized HLS (m3u8) streams and real-time "Now Playing" metadata.
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

## Current Task: Radio Fix & API Integration

The goal was to fix the broken radio streams by using official API endpoints and HLS.js for playback.

### Plan

1.  **Research**: Identified API endpoints for KBS, MBC, and SBS stream fetching and metadata.
2.  **main.js**:
    *   Refactored `radioStations` to include broadcaster types and channel IDs.
    *   Implemented `getStreamUrl` logic within `playStation` to fetch tokenized URLs.
    *   Enhanced `fetchNowPlaying` to support KBS and SBS metadata APIs.
    *   Switched to `https` versions of all streams to avoid Mixed Content issues on GitHub Pages.
3.  **Deployment**: Commit and push changes.
