<?php
// ADD THESE TWO LINES FOR DEBUGGING
ini_set('display_errors', 1);
error_reporting(E_ALL);

// --- CACHE SETTINGS ---
$cache_file = 'cache/nav_cache.html';
$cache_time_seconds = 3600; // 1 hour

// --- SCRIPT LOGIC ---
if (file_exists($cache_file) && (time() - filemtime($cache_file)) < $cache_time_seconds) {
    // If cache is fresh, read from the file
    readfile($cache_file);
} else {
    // If cache is old, fetch from live site
    require_once 'simple_html_dom.php';

    $live_url = 'https://www.soarhs.org';
    $selector = '.header-bottom';

    // --- NEW: Use cURL to fetch the content like a browser ---
    $ch = curl_init(); // Initialize cURL
    curl_setopt($ch, CURLOPT_URL, $live_url); // Set the URL
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the content as a string
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'); // Set a browser user agent
    $response_html = curl_exec($ch); // Execute the request
    curl_close($ch); // Close the connection
    // --- End of cURL block ---

    if ($response_html) {
        // Use the parser on the HTML string we got from cURL
        $html = str_get_html($response_html);

        $navigation = $html->find($selector, 0);

        if ($navigation) {
            $nav_html = $navigation->outertext;
            echo $nav_html;
            file_put_contents($cache_file, $nav_html, LOCK_EX);
        } else {
            echo "<!-- Could not find element with selector '{$selector}' -->";
        }

        $html->clear();
        unset($html);

    } else {
        echo "<!-- Failed to retrieve content from {$live_url} using cURL. -->";
    }
}
?>