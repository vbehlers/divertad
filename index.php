<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Live-Nav Website</title>
    
    <!-- The <style> block is for writing CSS rules directly -->
    <style>
        body { font-family: sans-serif; }
        .live-nav { background-color: #003366; padding: 10px; }
        .live-nav a { color: white; padding: 10px 15px; text-decoration: none; }
        .live-nav a:hover { background-color: #0059b3; }
    </style>

    <!-- The <link> tag must be a separate element in the <head> -->
    <link rel="stylesheet" href="https://www.soarhs.org/uploaded/themes/madison/css/madison.client.css?1648219230">
    

</head>
<body>

    <header id="page-header">
        <h1>My Website</h1>
        <?php include 'live_parser_script.php'; ?>
    </header>

    <main>
        <h2>Page Content</h2>
        <p>This navigation was pulled directly from a live website!</p>
    </main>

</body>
</html>