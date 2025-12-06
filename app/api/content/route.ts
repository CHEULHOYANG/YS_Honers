import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Define the path to the content.json file
        const filePath = path.join(process.cwd(), 'src', 'data', 'content.json');

        // Write the updated data to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
        console.error('Error updating content:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update content' },
            { status: 500 }
        );
    }
}
