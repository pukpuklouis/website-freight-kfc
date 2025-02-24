#!/bin/bash

# Create the services images directory if it doesn't exist
mkdir -p public/images/services

# Download placeholder images from placeholder.com
curl "https://placehold.co/1920x1080/007ACC/ffffff/png?text=Ocean+Freight" -o public/images/services/ocean-freight.jpg
curl "https://placehold.co/1920x1080/00ACC1/ffffff/png?text=Logistics" -o public/images/services/logistics.jpg
curl "https://placehold.co/1920x1080/00BFA5/ffffff/png?text=Express+Delivery" -o public/images/services/express.jpg
curl "https://placehold.co/1920x1080/004D40/ffffff/png?text=Freight+Services" -o public/images/services/default-hero.jpg
