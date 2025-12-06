# How to Update Profile Images

Since your website is deployed via GitHub and Render, there are two ways to add or change profile images.

## Method 1: The "Permanent" Way (Recommended)
This method keeps images inside your project, ensuring they never expire.

1.  **Save the Image**:
    *   Place your image file (e.g., `new-profile.jpg`) inside the `public/images/` folder of your project on your computer.

2.  **Upload to GitHub**:
    *   Open your terminal/command prompt in the project folder.
    *   Run these commands:
        ```bash
        git add .
        git commit -m "Add new profile image"
        git push
        ```

3.  **Update Admin Panel**:
    *   Once deployed (wait a few minutes), log in to your Admin Page (`/admin`).
    *   Find the team member.
    *   Change the **Profile Image URL** to: `/images/new-profile.jpg`.
    *   Click **Save**.

## Method 2: The "Quick" Way (No Code)
If you don't want to touch the code or Git, you can use an external image host.

1.  **Upload Image**:
    *   Upload your photo to a free image hosting site (like [Imgur](https://imgur.com/) or a cloud storage link that is public).
    *   **Important**: Make sure you get the *direct link* (ends in `.jpg` or `.png`).

2.  **Update Admin Panel**:
    *   Log in to your Admin Page (`/admin`).
    *   Paste the full URL (e.g., `https://i.imgur.com/example.jpg`) into the **Profile Image URL** field.
    *   Click **Save**.

---
**Note**: The Admin Panel currently only saves *text data* (links). It does not store actual image files on the server, which is why you need to either put the file in the code (Method 1) or host it elsewhere (Method 2).
