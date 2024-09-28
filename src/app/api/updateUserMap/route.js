import {NextResponse} from 'next/server';

import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const {
      id,
      title,
      pinLocation,
      locations,
      userEmail,
      uploadedFileUrls,
      logo,
      helperText,
    } = await req.json();

    if (!title && !pinLocation && !locations && !userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedMap = await prisma.map.update({
      where: { id: id },
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
          deleteMany: {},
          create: locations.map((loc) => ({
            name: loc.name,
            tag: loc.tag,
            latitude: loc.latitude,
            longitude: loc.longitude,
          })),
        },
        images: {
          deleteMany: {},
          create: uploadedFileUrls.map((url) => ({ url })),
        },
        logo: logo,
        helperText: helperText,
      },
    });

    return NextResponse.json({ updatedMap }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Error saving map' }, { status: 500 });
  }
}
