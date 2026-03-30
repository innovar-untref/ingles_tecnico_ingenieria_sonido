
const fs = require('fs');
const path = require('path');

const sonidoVocab = {
    2: [
        { w: 'hearing', m: 'audición' },
        { w: 'thus', m: 'por lo tanto' },
        { w: 'disturbances', m: 'alteraciones' },
        { w: 'low', m: 'bajo' },
        { w: 'high', m: 'alto' },
        { w: 'speech', m: 'habla' },
        { w: 'reinforcement', m: 'refuerzo' },
        { w: 'means', m: 'medio' },
        { w: 'research', m: 'investigación' },
        { w: 'scope', m: 'alcance' }
    ],
    3: [
        { w: 'shooting range', m: 'polígono de tiro' },
        { w: 'such as', m: 'tales como' },
        { w: 'who', m: 'quien, el cual' },
        { w: 'venue', m: 'recinto, sitio' },
        { w: 'available', m: 'disponible' },
        { w: 'both', m: 'ambos' },
        { w: 'polished', m: 'lustroso' },
        { w: 'ensuring', m: 'asegurando' },
        { w: 'soundscapes', m: 'paisaje sonoro' },
        { w: 'research', m: 'investigación' },
        { w: 'coding', m: 'codificación' }
    ],
    4: [
        { w: 'before', m: 'antes' },
        { w: 'after', m: 'después' },
        { w: 'turn on', m: 'encender' },
        { w: 'takes place', m: 'tiene lugar' },
        { w: 'done', m: 'hecho' },
        { w: 'builders', m: 'constructores' },
        { w: 'shape', m: 'forma' },
        { w: 'how', m: 'cómo' },
        { w: 'together', m: 'juntos' },
        { w: 'because of this', m: 'por esta causa' },
        { w: 'is built', m: 'es construido' },
        { w: 'teamwork', m: 'trabajo en equipo' }
    ],
    5: [
        { w: 'pleasant', m: 'agradable' },
        { w: 'facilities', m: 'instalaciones' },
        { w: 'properties', m: 'propiedades' },
        { w: 'should', m: 'debería' },
        { w: 'ensure', m: 'asegurar' },
        { w: 'mistaken', m: 'errónea' },
        { w: 'within', m: 'dentro de' },
        { w: 'unless', m: 'a menos que' },
        { w: 'smear', m: 'dispersar' },
        { w: 'unappealing', m: 'poco atractivo' }
    ],
    6: [
        { w: 'subjects', m: 'materias, disciplinas' },
        { w: 'field', m: 'campo' },
        { w: 'way', m: 'modo' },
        { w: 'grow', m: 'crecer' },
        { w: 'environmental', m: 'medioambiental' },
        { w: 'soundscape', m: 'paisaje sonoro' },
        { w: 'deaf', m: 'sordo/a' },
        { w: 'hearing', m: 'escucha' },
        { w: 'listening', m: 'escucha atenta' },
        { w: 'source', m: 'fuente' }
    ],
    7: [
        { w: 'subjects', m: 'materias, disciplinas' },
        { w: 'field', m: 'campo' },
        { w: 'way', m: 'manera' },
        { w: 'grow', m: 'crecer' },
        { w: 'environmental', m: 'ambientales' },
        { w: 'soundscape', m: 'paisaje sonoro' },
        { w: 'deaf', m: 'sordera' },
        { w: 'hearing', m: 'audición' },
        { w: 'listening', m: 'escucha' },
        { w: 'source', m: 'fuente' }
    ],
    8: [
        { w: 'instead of', m: 'en lugar de' },
        { w: 'most', m: 'la mayoría' },
        { w: 'within', m: 'dentro de' },
        { w: 'nearby', m: 'cerca' },
        { w: 'was known', m: 'era conocido' },
        { w: 'together', m: 'juntos' },
        { w: 'improved', m: 'mejoró' },
        { w: 'each other', m: 'mutuamente' },
        { w: 'avoid', m: 'evitar' },
        { w: 'which', m: 'cual, lo cual' }
    ],
    9: [
        { w: 'a site survey', m: 'encuesta' },
        { w: 'so that', m: 'de manera que' },
        { w: 'measures', m: 'medidas' },
        { w: 'approaches', m: 'enfoques' },
        { w: 'studio suite', m: 'monoambiente' },
        { w: 'submit a report', m: 'entregar un informe' },
        { w: 'available', m: 'disponible' },
        { w: 'handheld', m: 'portátil' },
        { w: 'handheld sound level meter', m: 'sonómetro portátil' }
    ],
    10: [
        { w: 'spoken', m: 'hablado/a' },
        { w: 'explanations', m: 'explicaciones' },
        { w: 'physicists', m: 'físicos' },
        { w: 'content', m: 'contenido' },
        { w: 'deals with', m: 'trata de' },
        { w: 'while', m: 'mientras que' },
        { w: 'ducts', m: 'conductos' },
        { w: 'so as to', m: 'para que' },
        { w: 'assessment', m: 'evaluación' },
        { w: 'since', m: 'puesto que' },
        { w: 'damage', m: 'daño' }
    ],
    11: [
        { w: 'background', m: 'de fondo' },
        { w: 'purpose', m: 'propósito' },
        { w: 'amount', m: 'cantidad' },
        { w: 'various', m: 'diversos' },
        { w: 'several', m: 'varios' },
        { w: 'therefore', m: 'por lo tanto' },
        { w: 'most', m: 'mayoría' },
        { w: 'even', m: 'aún' },
        { w: 'while', m: 'mientras' },
        { w: 'shooting range', m: 'polígono de tiro' }
    ]
};

for (let i = 2; i <= 11; i++) {
    const classDir = `clase ${i}`;
    const htmlFile = path.join(classDir, `clase${i}.html`);
    const jsFile = path.join(classDir, `script.js`);

    if (fs.existsSync(htmlFile)) {
        let html = fs.readFileSync(htmlFile, 'utf8');
        html = html.replace(/INGENIERÍA EN COMPUTACIÓN/g, 'Ingeniería en Sonido');
        html = html.replace(/Ingeniería en computación/g, 'Ingeniería en Sonido');
        html = html.replace(/Clase \d+: .*?<\/p>/g, `Clase ${i}: Ingeniería en Sonido</p>`);
        fs.writeFileSync(htmlFile, html, 'utf8');
    }

    if (fs.existsSync(jsFile)) {
        let js = fs.readFileSync(jsFile, 'utf8');
        
        // 1. Replace VOCABULARY
        const vocabItems = sonidoVocab[i];
        let vocabJson = "[\n";
        vocabItems.forEach(item => {
            vocabJson += `    { word: '${item.w}', meaning: '${item.m}', category: 'default' },\n`;
        });
        vocabJson = vocabJson.replace(/,\n$/, "\n]");
        
        js = js.replace(/const VOCABULARY = \[[\s\S]*?\];/g, `const VOCABULARY = ${vocabJson};`);

        // 2. Update AI Lab context
        js = js.replace(/Ingeniería en Sonido/g, 'Ingeniería en Sonido');
        js = js.replace(/Ingeniería en computación/g, 'Ingeniería en Sonido');

        // 3. Handle Crossword (Staircase layout)
        let crosswordDataJson = "[\n";
        let x = 1, y = 1;
        vocabItems.forEach((item, index) => {
            const word = item.w.toUpperCase().replace(/ /g, "").replace(/-/g, "");
            if (word.length > 0) {
                const clue = item.m;
                const dir = y % 2 === 0 ? 'down' : 'across';
                crosswordDataJson += `            { word: '${word}', x: ${x}, y: ${y}, dir: '${dir}', clue: '${clue}' },\n`;
                x += 2;
                y += 2;
            }
        });
        crosswordDataJson = crosswordDataJson.replace(/,\n$/, "\n        ]");
        
        js = js.replace(/const crosswordData = \[[\s\S]*?\];/g, `const crosswordData = ${crosswordDataJson};`);

        fs.writeFileSync(jsFile, js, 'utf8');
    }
}

