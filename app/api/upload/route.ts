import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Clean filename to prevent weird characters
        const filename = file.name.replace(/\s+/g, '-').toLowerCase();
        // Add timestamp to prevent overwriting
        const uniqueFilename = `${Date.now()}-${filename}`;

        // Save to public/uploads directory
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, uniqueFilename);

        await writeFile(filePath, buffer);

        // Return the URL relative to the public folder
        const fileUrl = `/uploads/${uniqueFilename}`;

        return NextResponse.json({
            success: true,
            url: fileUrl,
            message: "File uploaded successfully"
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
