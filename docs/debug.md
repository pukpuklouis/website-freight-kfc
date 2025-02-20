Why the Error Occurs
The stack trace points to react-dom-server.browser.development.js and a Timeout._onTimeout, indicating an asynchronous operation exceeds Remix’s SSR timeout (default ~5 seconds) or tries to modify the closed stream. Since Footer.tsx itself has no obvious async code, the issue likely originates from:

The useTheme Hook: If it’s async or improperly handled during SSR.
Parent Route or Layout: An async loader or component higher in the tree might delay rendering, causing a timeout that affects Footer.
Debugging and Fixing
Step 1: Inspect useTheme
Since useTheme isn’t shared, I’ll assume a typical implementation. If it looks like this: