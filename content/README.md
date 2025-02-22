# Content Directory

This directory contains all the content files for the KFC Freight website.

## Structure

```
content/
├── services/        # Service-related MDX files
│   ├── china-consolidated-shipping-rates.mdx
│   ├── cross-strait-three-regions-sea-express-air-transport.mdx
│   ├── japan-sea-express-to-taiwan.mdx
│   └── taiwan-express-delivery-and-sea-freight-to-philippines.mdx
└── README.md        # This file
```

## MDX File Structure

Each MDX file should follow this frontmatter structure:

```mdx
---
title: Service Title
description: Brief description of the service
date: YYYY-MM-DD
image: /path/to/image.jpg (optional)
tags: 
  - tag1
  - tag2
---

Content goes here...
```

## Guidelines

1. All service content should be placed in the `services` directory
2. Use kebab-case for file names
3. Always include required frontmatter (title, description, date)
4. Images should be stored in the public directory and referenced with absolute paths
5. Keep content well-formatted and properly structured with headings
