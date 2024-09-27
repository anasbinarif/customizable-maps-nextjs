import {NextResponse} from 'next/server';

import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const {
            title,
            pinLocation,
            locations,
            userEmail,
            uploadedFileUrls,
            logo,
            helperText,
        } = await req.json();

        if (!title || !pinLocation || !locations || !userEmail) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const map = await prisma.map.create({
            data: {
                title,
                user: {
                    connect: { email: userEmail },
                },
                pinLatitude: pinLocation.latitude,
                pinLongitude: pinLocation.longitude,
                pinName: pinLocation.name,
                pinImageUrl: pinLocation.imageUrl,
                locations: {
                    create: locations.map((loc) => ({
                        name: loc.name,
                        tag: loc.tag,
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    })),
                },
                images: {
                    create: uploadedFileUrls.map((url) => ({
                        url,
                    })),
                },
                logo: logo,
                helperText: helperText,
            },
        });

        return NextResponse.json({ map }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: 'Error saving map' }, { status: 500 });
    }
}
