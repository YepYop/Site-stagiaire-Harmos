import { IncomingForm } from 'formidable';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const smtpTransport = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'lorenzo@harmos.xyz',
    pass: process.env.HARMOS_EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Configurer formidable avec des limites de taille pour éviter les attaques DoS
  const form = new IncomingForm({ 
    multiples: true,
    maxFileSize: 10 * 1024 * 1024, // Limite à 10 Mo par fichier
    maxFieldsSize: 2 * 1024 * 1024, // Limite à 2 Mo pour les champs de texte
    maxFields: 20 // Limite le nombre de champs
  })
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la réception du formulaire', error: err.message });
    }
    try {
      // Fonction pour échapper les caractères HTML spéciaux et prévenir les attaques XSS
      const escapeHtml = (text) => {
        return String(text)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      };
      
      // Préparer le contenu du mail
      let html = '<h2>Nouvelle candidature Harmos</h2>';
      Object.entries(fields).forEach(([key, value]) => {
        // Échapper les valeurs pour éviter les attaques XSS
        const safeKey = escapeHtml(key);
        const safeValue = escapeHtml(value);
        html += `<p><strong>${safeKey} :</strong> ${safeValue}</p>`;
      });
      // Préparer les pièces jointes
      let attachments = [];
      if (files && Object.keys(files).length > 0) {
        // Normalize files to array
        let fileArray = [];
        Object.values(files).forEach(f => {
          if (Array.isArray(f)) fileArray.push(...f);
          else fileArray.push(f);
        });
        attachments = fileArray.map(file => ({
          filename: file.originalFilename,
          path: file.filepath,
        }));
        // Ajouter des liens pour chaque fichier
        if (attachments.length > 0) {
          html += '<h3>Fichiers joints :</h3>';
          attachments.forEach(att => {
            html += `<p><a href=\"cid:${att.filename}\">${att.filename}</a></p>`;
          });
        }
      }
      // Envoyer l'email
      await smtpTransport.sendMail({
        from: 'lorenzo@harmos.xyz',
        to: 'lorenzo@harmos.xyz', // L'adresse email du destinataire
        cc: fields.emailDestination || '', // Ajouter un destinataire en copie si spécifié
        subject: `Nouvelle candidature Harmos - ${fields.name || ''}`,
        html,
        attachments,
      });
      res.status(200).json({ success: true, message: 'Candidature envoyée avec succès' });
    } catch (e) {
      console.error('Erreur lors de l\'envoi de l\'email:', e);
      // Ne pas exposer les détails de l'erreur dans la réponse
      res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' });
    }
  });
}