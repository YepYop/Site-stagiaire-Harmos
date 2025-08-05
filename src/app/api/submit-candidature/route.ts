import { NextRequest, NextResponse } from 'next/server';

// TODO: Utiliser la nouvelle API nodemailer pour envoyer la candidature et les fichiers
export async function POST(request: NextRequest) {
  console.log('Received request to /api/submit-candidature');
  try {
    const data = await request.json();
    console.log('Request body:', data);
    // TODO: Utiliser la nouvelle API nodemailer pour envoyer la candidature et les fichiers
    return NextResponse.json({ message: 'TODO: nodemailer/formidable implementation pending', success: false }, { status: 501 });
  } catch (error) {
    console.error('Erreur lors du traitement de la candidature:', error);
    return NextResponse.json({ 
      message: 'Erreur serveur', 
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}