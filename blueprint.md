
# Lotto Number Generator

## Overview

This is a simple web application that generates and displays 6 random lottery numbers between 1 and 45.

## Features

*   Generates 6 unique random numbers.
*   Displays the numbers in a visually appealing way.
*   A button to generate new numbers.

## Current Task: Add Dark/Light Mode

### Plan

1.  **`index.html`**:
    *   Add a theme toggle button to the top-right corner of the container or the body.
2.  **`style.css`**:
    *   Define CSS variables for colors (background, text, container background, etc.) in `:root` for light mode and a `[data-theme="dark"]` selector for dark mode.
    *   Update existing styles to use these variables.
    *   Style the theme toggle button.
3.  **`main.js`**:
    *   Implement logic to toggle the `data-theme` attribute on the `<html>` or `<body>` element.
    *   Save the user's theme preference in `localStorage`.
    *   Initialize the theme based on the saved preference or the system's preferred color scheme.

