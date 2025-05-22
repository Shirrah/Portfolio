<?php
header('Content-Type: application/json');

$jsonFile = 'page_visits.json';

// Read the current count
$data = json_decode(file_get_contents($jsonFile), true);
$data['visits']++;

// Save the updated count
file_put_contents($jsonFile, json_encode($data));

// Return the current count
echo json_encode($data);
?> 