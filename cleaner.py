import pandas as pd
# Supprimer les lignes contenant une cellule vide, je n'ai pas réussi à faire quelque chose de propre en js je passe donc en python
df = df.dropna()
# création d'un fichier clean_result.csv qui contient le nouveau fichier sans les lignes vides
df.to_csv('clean_result.csv', index=False)
