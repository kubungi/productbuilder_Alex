
# Lotto Number Generator & Dinner Recommender

## Overview

This is a modern web application that provides fun utilities: a lotto number generator and a dinner menu recommender. It features a clean, responsive design with dark/light mode and multi-language support (English/Korean), fully optimized for SEO (Google/Naver) and GEO (Generative Engine Optimization).

### Usage
*   **Update Schedules**: Run `node fetch_schedules.js` to refresh the radio schedule data from various broadcaster APIs (MBC, KBS, SBS, Arirang). This updates `radio-schedules.json`.

## Features

*   **Internalized Radio Schedules**: Integrated static schedule data for major Korean radio stations (YTN, EBS, CBS, KBS, SBS) derived from Namuwiki. This system automatically updates based on the current day of the week (Weekdays vs Weekends), ensuring reliable program information even if external APIs are unavailable.
*   **Fallback Metadata System**: The "Now Playing" feature now prioritizes internalized schedule data, providing a more stable and faster user experience.
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

## Completed Tasks

### Unified Radio Schedule Grid

Implemented a robust multi-station schedule management system:
*   **Integrated Fetch Script**: `fetch_schedules.js` aggregates data from MBC, SBS, KBS, and Arirang APIs into a single `radio-schedules.json`.
*   **Two-Dimensional Grid UI**: A grid with station names pinned to the left and a 24-hour horizontal timeline.
*   **Real-Time Synchronization**: A vertical marker showing current time across all stations.
*   **Interactive Playback**: Clicking any program block triggers the corresponding station's live stream.
*   **Stream URL Update**: Fixed Arirang Radio playback by updating to a working HLS stream URL (`akamaized.net`).
*   **Metadata Optimization**: Implemented local schedule lookup for Arirang metadata to ensure "Now Playing" info is always available even if external APIs are down.
