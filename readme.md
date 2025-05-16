# Projet prog-5-ussd

Ce projet implémente un système de menus USSD interactif en TypeScript, utilisant Node.js et le module `readline` pour une interface en console.

---

##  Description du projet

L’application propose un menu principal et plusieurs sous-menus organisés en arborescence pour simuler un service USSD classique.  
Elle gère des options avec navigation avant/arrière, saisie utilisateur validée, et exécution d’actions selon les choix.

---

##  Configuration du linter (ESLint)

- Ce projet utilise **ESLint** avec les règles adaptées au TypeScript.  
- La configuration respecte les conventions suivantes :
  - Variables et fonctions en **camelCase**  
  - Utilisation exclusive de quotes simples `'...'` pour les chaînes de caractères  
  - Pas de variables ou fonctions inutilisées (gérées par `@typescript-eslint/no-unused-vars`)

### Lancer le linter

```bash
npx eslint . --fix
Cette commande analyse tous les fichiers et corrige automatiquement les erreurs possibles.

🔄 Intégration Continue (CI)
Une pipeline CI est configurée avec GitHub Actions pour :

Exécuter ESLint sur chaque push ou Pull Request

Vérifier que le code respecte les règles avant de fusionner

La CI empêche les erreurs de lint d’atteindre la branche principale, garantissant un code propre et homogène.