# Deployment Instructions

## 1. GitHub Repository
1.  Go to [GitHub](https://github.com/new).
2.  Create a new repository named `mkbiz-clone` (or any name you prefer).
3.  **Do not** initialize with README, .gitignore, or License (since we have them).
4.  Copy the URL of the new repository (e.g., `https://github.com/your-username/mkbiz-clone.git`).

## 2. Push Code
Run the following commands in your terminal:

```bash
git remote add origin https://github.com/your-username/mkbiz-clone.git
git branch -M main
git push -u origin main
```
*(Replace the URL with your actual repository URL)*

## 3. Deploy to Render
1.  Go to [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub account and select the `mkbiz-clone` repository.
4.  Configure the service:
    *   **Name**: `ys-h` (This will create `ys-h.onrender.com`)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
5.  Click **Create Web Service**.

## 4. Verify
Once the deployment finishes, visit: `https://ys-h.onrender.com`
