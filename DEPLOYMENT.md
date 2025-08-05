# Guide de Déploiement Harmos Recruitment

Ce guide vous explique comment configurer et déployer votre site de recrutement avec Vercel et EmailJS.

## 🚀 Déploiement sur Vercel (Gratuit)

### 1. Préparer le projet
```bash
# Installer les dépendances
npm install

# Tester localement
npm run dev
```

### 2. Déployer sur Vercel
1. Créez un compte sur [vercel.com](https://vercel.com)
2. Connectez votre repository GitHub
3. Importez le projet `harmos-recruitment`
4. Vercel détectera automatiquement Next.js
5. Cliquez sur "Deploy"

### 3. Configurer les variables d'environnement sur Vercel
Dans le dashboard Vercel > Settings > Environment Variables, ajoutez :

```

NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_emailjs
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=votre_template_emailjs
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_clé_publique_emailjs
RECRUITMENT_EMAIL=recrutement@harmos.com
```



## 📧 Configuration EmailJS (Gratuit)

### 1. Créer un compte EmailJS
1. Allez sur [emailjs.com](https://emailjs.com)
2. Créez un compte gratuit (200 emails/mois)

### 2. Configurer le service email
1. Dans le dashboard, allez dans "Email Services"
2. Ajoutez un service (Gmail, Outlook, etc.)
3. Suivez les instructions de configuration
4. Notez le **Service ID**

### 3. Créer un template email
1. Allez dans "Email Templates"
2. Créez un nouveau template
3. Utilisez ces variables dans votre template :

```html
<!-- Template pour les candidatures -->
<h2>Nouvelle candidature Harmos</h2>
<p><strong>Nom :</strong> {{candidate_name}}</p>
<p><strong>Email :</strong> {{candidate_email}}</p>

<h3>Détails de la candidature :</h3>
<pre>{{candidature_content}}</pre>

<!-- Ou utilisez les champs individuels -->
<p><strong>Big Five :</strong></p>
<ul>
  <li>Ouverture : {{big_five_1}}/10</li>
  <li>Conscienciosité : {{big_five_2}}/10</li>
  <li>Extraversion : {{big_five_3}}/10</li>
  <li>Agréabilité : {{big_five_4}}/10</li>
  <li>Neuroticisme : {{big_five_5}}/10</li>
</ul>

<p><strong>Communication :</strong> {{communication_style}}</p>
<p><strong>Conflits :</strong> {{conflict_style}}</p>
<p><strong>Portfolio :</strong> {{portfolio}}</p>
<p><strong>Fichiers :</strong> {{files}}</p>
```

4. Notez le **Template ID**

### 4. Récupérer la clé publique
1. Allez dans "Account" > "General"
2. Notez la **Public Key**

## 🔧 Configuration finale

### 1. Mettre à jour .env.local
```bash
# Copiez le fichier d'exemple
cp .env.local.example .env.local

# Éditez avec vos vraies valeurs

NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
RECRUITMENT_EMAIL=recrutement@harmos.com
```

### 2. Tester localement
```bash
npm run dev
```

### 3. Redéployer sur Vercel
Après avoir configuré les variables d'environnement sur Vercel, redéployez :
- Soit en poussant un nouveau commit
- Soit en cliquant "Redeploy" dans le dashboard Vercel

## 📋 Checklist de déploiement

- [ ] Projet déployé sur Vercel
- [ ] Variables d'environnement configurées sur Vercel

- [ ] Bucket de stockage créé
- [ ] Service EmailJS configuré
- [ ] Template email créé
- [ ] Test complet du formulaire
- [ ] Vérification des emails reçus
- [ ] Vérification des données en base

## 🔍 Vérification

### Tester le formulaire
1. Remplissez complètement le formulaire
2. Soumettez la candidature
3. Vérifiez :
   - Message de confirmation affiché
   - Email reçu sur `recrutement@harmos.com`
   

### Déboguer les erreurs

- **Erreurs EmailJS** : Vérifiez les logs dans le dashboard EmailJS
- **Erreurs Vercel** : Vérifiez les logs de fonction dans Vercel

## 💰 Limites gratuites

- **Vercel** : 100GB de bande passante/mois

- **EmailJS** : 200 emails/mois

Ces limites sont largement suffisantes pour un site de recrutement.

## 🆘 Support

En cas de problème :
1. Vérifiez les logs dans chaque service
2. Testez les variables d'environnement

4. Consultez la documentation officielle de chaque service