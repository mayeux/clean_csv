const fs = require(fs)
const createCsvParser = require('csv-parser')
const readSteam = fs.createReadStream('data.csv')
const writeStream = fs.createWriteStream('fichier_filtre2.csv')
const csvParser = createCsvParser()

    .pipe(csv())
    .on('data', (data) => {
        // Ajout ID auto-incrémenté
        data.ID = results.length + 1;
        results.push(data);
    })
    .on('end', () => {
        // Écrire les enregistrements modifiés 
        
        for (let i = 0; i < results.length; i++) {
            const values = Object.values(results[i]);
            ws.write(values.join(',') + '\n');
        }
        ws.end();
    });

parser.transform = function (record, callback) {
    const cleanRecord = record
        .filter((field) => field.trim !== '') // supprime les lignes vides
        .filter((_, index) => index !== 1, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14) // supprime les colonnes voulues
    // .map((field) => field.trim())  supprime les espaces en début et fin de chaîne  
    if (cleanRecord.length === 4) {
        callback(null, record)
    } else {
        callback(null, cleanRecord)
    }

}

readSteam
    .pipe(parser)
    .pipe(writeStream)

