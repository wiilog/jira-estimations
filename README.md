# Jira Estimations
Additionne automatiquement les estimations les tâches sélectionnées dans le sprint actif et le backlog

# Installation
Téléchargez le plugin depuis les release GitHub ou en cliquant directement sur
[ce lien](https://github.com/wiilog/jira-estimations/archive/refs/heads/master.zip).
Il faut ensuite décompresser le fichier ZIP téléchargé.

Aller sur [chrome://extensions/](chrome://extensions/) puis activer le mode développeur en cliquant sur le switch en
haut à droite. Une barre de bouttons apparaît, cliquez ensuite sur le bouton *Charger l'extension non empaquetée* et
sélectionner le dossier décompressé.

L'extension est désormais chargée sur Jira après avoir rafraichit la page, un bouton *Estimer les tâches sélectionnées*
apparaîtra dans le sprint actif et dans le backlog.

# Développement
Cloner le projet et lancer `yarn` puis `yarn watch` pour lancer la compilation.
Aller sur [chrome://extensions/](chrome://extensions/) puis activer le mode développeur en cliquant sur le switch en
haut à droite. Une barre de bouttons apparaît, cliquez ensuite sur le bouton *Charger l'extension non empaquetée* et
sélectionner le dossier du projet.

Si le fichier manifest.json est modifié il faut recharger l'extension pour que les modifications apportées au fichier
manifest.json soient prises en compte.