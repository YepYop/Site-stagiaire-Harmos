// API proxy pour contourner les restrictions CORS de l'API iTunes
export default async function handler(req, res) {
  // Vérifier la méthode HTTP
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Récupérer le terme de recherche depuis la requête
    const { term } = req.query;
    
    if (!term) {
      return res.status(400).json({ message: 'Le paramètre "term" est requis' });
    }

    // Construire l'URL de l'API iTunes
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=10`;
    
    // Faire la requête à l'API iTunes
    const response = await fetch(url);
    const data = await response.json();
    
    // Renvoyer les résultats
    res.status(200).json(data);
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API iTunes:', error);
    res.status(500).json({ message: 'Erreur lors de la requête à l\'API iTunes' });
  }
}