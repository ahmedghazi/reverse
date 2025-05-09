# Projet Reverse

Bienvenue sur le projet Reverse, une application web moderne développée avec Next.js et TypeScript.

## 🚀 Technologies utilisées

- **Next.js** - Framework React pour le rendu côté serveur
- **TypeScript** - Typage statique pour JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **Lottie** - Animations vectorielles fluides

## 📂 Structure du projet

```
www/
├── app/                            # Dossier principal de l'application Next.js
│   └── components/
│       └── modules/               # Composants de modules réutilisables
│           ├── KeyPointsUI.tsx      # Composant principal pour l'affichage des points clés
│           ├── KeyPointItem.tsx     # Composant pour un point clé individuel
│           └── KeyPointsUI.scss     # Styles pour les composants de points clés
├── studio/
│   └── schemaTypes/
│       └── objects/modules/
│           └── keyPointsUI.ts       # Schéma Sanity pour les points clés
└── ...
```

## 🧩 Composants du module KeyPoints

### KeyPointsUI
Le composant principal qui affiche une grille de points clés. Il gère le titre de la section et le rendu de la liste des points clés.

**Fonctionnalités :**
- Affiche un titre optionnel pour la section
- Gère le rendu d'une grille de points clés
- Responsive avec une disposition en grille

### KeyPointItem
Composant qui représente un point clé individuel dans la grille.

**Fonctionnalités :**
- Affiche une image optionnelle (via le composant Figure)
- Affiche le titre du point clé
- Gère le contenu riche avec PortableText
- Styles personnalisables via SCSS

### Schéma Sanity (keyPointsUI.ts)
Définit la structure des données pour les points clés dans le backoffice Sanity.

**Champs :**
- `title`: Titre de la section (optionnel)
- `items[]`: Tableau de points clés
  - `title`: Titre du point clé
  - `description`: Contenu riche (Portable Text)
  - `image`: Image optionnelle avec texte alternatif

## 🛠 Installation

1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

## 🔜 À venir

- **Backoffice Sanity** : Mise en place d'un CMS headless pour la gestion du contenu
- Gestion des utilisateurs et authentification
- Tableau de bord administrateur
  https://backoffice--reverse.sanity.studio/

## 📝 Licence

MIT
