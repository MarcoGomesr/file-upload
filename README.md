This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Upload File Drag & Drop

## Description

This repo contain a file uploader using pinata to host the files

## Feature

🎨 Custom Dropzone with Drag and Drop
An interactive, user-friendly dropzone for smooth file uploads.

🚀 File Uploads (Server and Client-side)
Learn to handle both server-side and client-side uploads with @pinatacloud.

🔒 Temporary API Key (Presigned URLs)
Secure your uploads with temporary access using presigned URLs.

❌ File Deletion
Easily delete uploaded files when no longer needed.

🖊️ Signed URLs
Use signed URLs for secure file access.

🖼️ Image Optimization
Optimize images for faster loading and improved performance.

## Libraries

- Tailwindcss (css)
- lucide-react (icons)
- pinata (image server storage)
- react-dropzone(npm)
- sonner(toast)

## Installation

1. First, clone the repository [https://github.com/yourusername/easy-file-uploads.git](https://github.com/MarcoGomesr/file-upload-nextjs-15.git)
2. Install their dependencies:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. create an `.env` file and fill the following variables

```
PINATA_JWT=exxx
NEXT_PUBLIC_GATEWAY_URL=xxx
```

5. Then run the development server

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

this project is under a MIT license.
