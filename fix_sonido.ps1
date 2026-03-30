
$classes = 2..11
$sonidoVocab = @{
    2 = @(@{w='hearing';m='audición'}, @{w='thus';m='por lo tanto'}, @{w='disturbances';m='alteraciones'}, @{w='low';m='bajo'}, @{w='high';m='alto'}, @{w='speech';m='habla'}, @{w='reinforcement';m='refuerzo'}, @{w='means';m='medio'}, @{w='research';m='investigación'}, @{w='scope';m='alcance'})
    3 = @(@{w='shooting range';m='polígono de tiro'}, @{w='such as';m='tales como'}, @{w='who';m='quien, el cual'}, @{w='venue';m='recinto, sitio'}, @{w='available';m='disponible'}, @{w='both';m='ambos'}, @{w='polished';m='lustroso'}, @{w='ensuring';m='asegurando'}, @{w='soundscapes';m='paisaje sonoro'}, @{w='research';m='investigación'}, @{w='coding';m='codificación'})
    4 = @(@{w='before';m='antes'}, @{w='after';m='después'}, @{w='turn on';m='encender'}, @{w='takes place';m='tiene lugar'}, @{w='done';m='hecho'}, @{w='builders';m='constructores'}, @{w='shape';m='forma'}, @{w='how';m='cómo'}, @{w='together';m='juntos'}, @{w='because of this';m='por esta causa'}, @{w='is built';m='es construido'}, @{w='teamwork';m='trabajo en equipo'})
    5 = @(@{w='pleasant';m='agradable'}, @{w='facilities';m='instalaciones'}, @{w='properties';m='propiedades'}, @{w='should';m='debería'}, @{w='ensure';m='asegurar'}, @{w='mistaken';m='errónea'}, @{w='within';m='dentro de'}, @{w='unless';m='a menos que'}, @{w='smear';m='dispersar'}, @{w='unappealing';m='poco atractivo'})
    6 = @(@{w='subjects';m='materias, disciplinas'}, @{w='field';m='campo'}, @{w='way';m='modo'}, @{w='grow';m='crecer'}, @{w='environmental'; m='medioambiental'}, @{w='soundscape';m='paisaje sonoro'}, @{w='deaf';m='sordo/a'}, @{w='hearing';m='escucha'}, @{w='listening';m='escucha atenta'}, @{w='source';m='fuente'})
    7 = @(@{w='subjects';m='materias, disciplinas'}, @{w='field';m='campo'}, @{w='way';m='manera'}, @{w='grow';m='crecer'}, @{w='environmental';m='ambientales'}, @{w='soundscape';m='paisaje sonoro'}, @{w='deaf';m='sordera'}, @{w='hearing';m='audición'}, @{w='listening';m='escucha'}, @{w='source';m='fuente'})
    8 = @(@{w='instead of';m='en lugar de'}, @{w='most';m='la mayoría'}, @{w='within';m='dentro de'}, @{w='nearby';m='cerca'}, @{w='was known';m='era conocido'}, @{w='together';m='juntos'}, @{w='improved';m='mejoró'}, @{w='each other';m='mutuamente'}, @{w='avoid';m='evitar'}, @{w='which';m='cual, lo cual'})
    9 = @(@{w='a site survey';m='encuesta'}, @{w='so that';m='de manera que'}, @{w='measures';m='medidas'}, @{w='approaches';m='enfoques'}, @{w='studio suite';m='monoambiente'}, @{w='submit a report';m='entregar un informe'}, @{w='available';m='disponible'}, @{w='handheld';m='portátil'}, @{w='handheld sound level meter';m='sonómetro portátil'})
    10 = @(@{w='spoken';m='hablado/a'}, @{w='explanations';m='explicaciones'}, @{w='physicists';m='físicos'}, @{w='content';m='contenido'}, @{w='deals with';m='trata de'}, @{w='while';m='mientras que'}, @{w='ducts';m='conductos'}, @{w='so as to';m='para que'}, @{w='assessment';m='evaluación'}, @{w='since';m='puesto que'}, @{w='damage';m='daño'})
    11 = @(@{w='background';m='de fondo'}, @{w='purpose';m='propósito'}, @{w='amount';m='cantidad'}, @{w='various';m='diversos'}, @{w='several';m='varios'}, @{w='therefore';m='por lo tanto'}, @{w='most';m='mayoría'}, @{w='even';m='aún'}, @{w='while';m='mientras'}, @{w='shooting range';m='polígono de tiro'})
}

$enc = New-Object System.Text.UTF8Encoding $false

foreach ($i in $classes) {
    $jsPath = "clase $i/script.js"
    $htmlPath = "clase $i/clase$i.html"
    
    if (Test-Path $jsPath) {
        $js = [System.IO.File]::ReadAllText((Resolve-Path $jsPath), $enc)
        
        # Vocab
        $v = $sonidoVocab[$i]
        $vStr = "["
        foreach($item in $v) {
            $w=$item.w; $m=$item.m
            $vStr += "`n    { word: '$w', meaning: '$m', category: 'default' },"
        }
        $vStr = $vStr.TrimEnd(',') + "`n];"
        $js = [regex]::Replace($js, 'const VOCABULARY = \[[\s\S]*?\];', "const VOCABULARY = $vStr")
        
        # Crossword
        $cStr = "["
        $x=1; $y=1
        foreach($item in $v) {
            $word = $item.w.ToUpper().Replace(' ','').Replace('-','')
            $clue = $item.m
            $dir = if ($y % 2 -eq 0) {'down'} else {'across'}
            $cStr += "`n            { word: '$word', x: $x, y: $y, dir: '$dir', clue: '$clue' },"
            $x += 2; $y += 2
        }
        $cStr = $cStr.TrimEnd(',') + "`n        ];"
        $js = [regex]::Replace($js, 'const crosswordData = \[[\s\S]*?\];', "const crosswordData = $cStr")
        
        # Ref
        $js = $js -replace 'Ingeniería Informática', 'Ingeniería en Sonido'
        $js = $js -replace 'Ingeniería en computación', 'Ingeniería en Sonido'
        
        [System.IO.File]::WriteAllText((Resolve-Path $jsPath), $js, $enc)
    }

    if (Test-Path $htmlPath) {
        $html = [System.IO.File]::ReadAllText((Resolve-Path $htmlPath), $enc)
        $html = $html -replace 'INGENIERÍA EN COMPUTACIÓN', 'INGENIERÍA EN SONIDO'
        $html = $html -replace 'Ingeniería en computación', 'Ingeniería en sonido'
        $html = [regex]::Replace($html, 'Clase \d+: .*?</p>', "Clase ${i}: Ingeniería en sonido</p>")
        [System.IO.File]::WriteAllText((Resolve-Path $htmlPath), $html, $enc)
    }
}
