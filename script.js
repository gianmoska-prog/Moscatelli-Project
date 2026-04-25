
/* Draft II — navigation, gate, cursor, language system, details */
'use strict';

const EXIT_DURATION = 520;
const ENTER_DELAY = 610;
const TRANSITION_LOCK = 900;
const GATE_SUCCESS_DELAY = 1080;
const PANEL_REVEAL_DELAY = 1750;
const BACKGROUND_REVEAL_DELAY = 120;
const EMBLEM_REVEAL_DELAY = 420;
const WORDMARK_REVEAL_DELAY = 2050;
const SUBMARK_REVEAL_DELAY = 2280;
const FORM_REVEAL_DELAY = 2620;
const EMBLEM_FADE_DELAY = 1500;
const THRESHOLD_REVEAL_DELAY = 1750;
const LANG_FADE_OUT = 720;
const LANG_FADE_IN_DELAY = 120;
const LANGUAGE_STORAGE_KEY = 'moscatelli-studio-lang';
const ACCESS_PIN = '062026';

const translations = {"en": {"page": {"title": "Moscatelli Studio — Internal Draft II"}, "sections": {"threshold": "Threshold", "mandate": "Mandate", "atlas": "Atlas", "codex": "Codex", "manufattura": "Manufattura", "circuit": "Circuit"}, "preview": {"threshold": "Private entry point. A room for judgment, rhythm, and alignment before launch.", "mandate": "The current house position: launch priorities, decision rules, and growth discipline.", "atlas": "Visual territories, image references, packaging logic, and colour atmosphere.", "codex": "Locked principles, technical facts, validation rules, and non-negotiables.", "manufattura": "Material decisions, making logic, packaging detail, and the discipline of the object.", "circuit": "People, operating roles, and the route between Rome, Brazil, and launch execution."}, "nav": {"topline": "Navigation", "selected": "Selected", "metaArrows": "Arrows to move", "metaEnter": "Enter to open", "metaEsc": "Esc to close"}, "veil": {"pin": "PIN"}, "detail": {"close": "Close detail"}, "home": {"statusPill": "Internal draft", "statusCopy": "One surface for judgment, rhythm, and alignment.", "eyebrow": "Rome / internal studio / authorial control", "h1": "Protect the standard.<br><em>Advance only</em> what earns the name.", "sub": "This room exists to keep Moscatelli coherent: image, material, ritual, people, and launch decisions held within one controlled surface.", "btnEnter": "Open mandate", "btnMap": "Open map", "band1": "Roman restraint", "band2": "Founder validation", "band3": "Proof before scale", "hint": "Use arrows"}, "mandate": {"title": "Mandate", "kicker": "House position", "h3": "An ultra-luxury Roman house built on restraint, authorship, and ritual.", "p": "Launch must feel institutional, never promotional. The first task is not breadth but authority: a small capsule, exact packaging, disciplined imagery, and decisions strong enough to survive scrutiny.", "btn": "Open atlas", "cardA": {"title": "Launch priority", "p": "Scarf capsule first: Bianco Avorio and Terra Bruna, ivory rigid box, oxblood ritual kept discreet."}, "cardB": {"title": "Decision rule", "p": "Nothing advances without physical validation, founder sign-off, and evidence worth archiving."}, "cardC": {"title": "Growth discipline", "p": "Proof of sales before outside capital. Scale follows traction; it never substitutes for it."}}, "atlas": {"title": "Atlas", "card1": {"title": "Scarf / Bianco Avorio", "p": "Calm exterior. Warm-stone light. Controlled fringe."}, "card2": {"title": "Scarf / Terra Bruna", "p": "The darker counterweight: earth, depth, permanence."}, "card3": {"title": "Packaging / Bianco Avorio", "p": "Institutional calm. Blind presence. No loud signature."}, "card4": {"title": "Ritual / Oxblood reserve", "p": "Oxblood appears as hidden gravity: wax, fold, and interior moment."}, "sideKicker": "Visual doctrine", "sideP": "Keep surfaces matte, shadowed, and quiet. Ivory should feel like warm stone, never bridal white. Oxblood must lean brown, never bright. Every image should imply authority before explanation.", "rule1": "Warm-stone ivory", "rule2": "Brown-based oxblood", "rule3": "Roman shadow", "rule4": "No visual noise"}, "codex": {"title": "Codex", "tag1": "Material", "tag2": "Validation", "tag3": "Commercial", "row1": {"title": "Launch scarf", "sub": "190 × 31 cm, baby alpaca, controlled drape, straight dense fringe.", "tag": "Active"}, "row2": {"title": "Packaging doctrine", "sub": "Ivory rigid box; oxblood reserved for wax seal, envelope, and hidden ritual.", "tag": "Binding"}, "row3": {"title": "Colour approval", "sub": "Physical lab dips under D65 or agreed equivalent. No screen approvals.", "tag": "Binding"}, "row4": {"title": "Investor rule", "sub": "Angel capital only after proof of sales, even at modest initial volume.", "tag": "Locked"}, "row5": {"title": "Validation authority", "sub": "Final aesthetic approval remains with Gianluca alone.", "tag": "Foundational"}}, "manu": {"title": "Manufattura", "quote": "Quiet surfaces.<br>Exact edges.<br>Emotional authority at close range.", "sub": "Current workstreams: scarf sampling, label language, box proportions, launch imagery, and the invisible details that make the house feel inevitable.", "metric1": {"title": "Material", "copy": "Baby alpaca with a compact matte surface and disciplined fall."}, "metric2": {"title": "Validation", "copy": "Founder-only final sign-off, archived evidence, no casual approvals."}, "metric3": {"title": "Ritual", "copy": "Ivory calm outside; oxblood gravity reserved for the interior moment."}, "figureKicker": "Label study", "figureP": "Soft interior label logic. Quiet typography. “Made in Italy” held with dignity, never noise."}, "circuit": {"title": "Circuit", "invite": "Keep the circle small. Keep the standard absolute.", "route": "Route", "note": "Rome as house gravity. Brazil as working extension. Prato first, Biella second. Proof before capital.", "card1": {"name": "Gianluca", "role": "Founder / Creative direction", "p": "Final validation, institutional tone, and the non-negotiable standard."}, "card2": {"name": "Gabriela", "role": "Strategy / Positioning", "p": "Narrative discipline, market framing, and commercial alignment."}, "card3": {"name": "Marcella", "role": "Chief of Staff / Coordination", "p": "Task flow, follow-through, operational rhythm, and continuity across the team."}, "card4": {"name": "Italian network", "role": "Production intelligence / External", "p": "Prato mills, Biella intelligence, rigid-box partners, and the physical truth of materials on the ground."}}, "details": {"atlas1": {"kicker": "Atlas I / colour anchor", "title": "Scarf / Bianco Avorio", "image": "assets/images/atlas-bianco-avorio.webp", "alt": "Moscatelli scarf in Bianco Avorio", "body": "<p>Bianco Avorio is not white. It must read as calm stone warmed by light — dry, noble, and unforced.</p><p>For the scarf, this colour carries the exterior discipline of the house: silence first, softness second. Fringe must remain straight, dense, and governed.</p><p>The objective is composure, not softness for its own sake.</p>"}, "atlas2": {"kicker": "Atlas II / counterweight", "title": "Scarf / Terra Bruna", "image": "assets/images/atlas-terra-bruna.webp", "alt": "Moscatelli scarf in Terra Bruna", "body": "<p>Terra Bruna exists as the darker counterpart to Bianco Avorio: aged wood, raw cacao, earth after rain.</p><p>It should never read as generic brown. The role of this colour is to give the launch pair seriousness, depth, and masculine gravity without aggression.</p><p>Every photographic use should preserve shadow detail and avoid red contamination.</p>"}, "atlas3": {"kicker": "Atlas III / packaging calm", "title": "Packaging / Bianco Avorio", "image": "assets/images/packaging-bianco-avorio.webp", "alt": "Moscatelli packaging in Bianco Avorio", "body": "<p>The rigid box must feel institutional, not decorative. Blind embossing is preferable to noisy contrast.</p><p>Ivory here works as the architectural face of the house: calm, measured, and almost administrative in its restraint.</p><p>The correct sensation is: this object already belongs in an archive.</p>"}, "atlas4": {"kicker": "Atlas IV / hidden gravity", "title": "Ritual / Oxblood reserve", "image": "assets/images/ritual-oxblood.webp", "alt": "Moscatelli ritual packaging in oxblood", "body": "<p>Oxblood is not for public shouting. It belongs to sealed moments: wax, envelope interior, hidden fold, sacred punctuation.</p><p>Its role is ceremonial gravity. It should lean brown, matte, and antique — never lipstick red, never glossy, never festive.</p><p>Used correctly, it deepens the ritual without cheapening the exterior calm.</p>"}, "codex1": {"kicker": "Material / launch object", "title": "Launch scarf", "body": "<p>The launch object is deliberately narrow in scope: one scarf format, one controlled proportion, one material discipline.</p><p><strong>Current fixed points:</strong> 190 × 31 cm, baby alpaca, compact matte hand, controlled drape, and straight dense fringe.</p><p>The point is not novelty. The point is to establish authority through proportion, surface, and finish.</p>"}, "codex2": {"kicker": "Validation / packaging doctrine", "title": "Packaging doctrine", "body": "<p>Primary packaging remains Bianco Avorio. Oxblood is withheld for the inner ritual: wax seal, envelope logic, and hidden moments of gravity.</p><p>This separation matters. Exterior calm builds institutional trust; interior oxblood delivers memorability without theatrical excess.</p><p>Any packaging proposal that reverses this hierarchy should be rejected.</p>"}, "codex3": {"kicker": "Validation / colour truth", "title": "Colour approval", "body": "<p>Colour is approved physically, not digitally. Lab dips must be read under D65 or an agreed neutral equivalent.</p><p>Screen approvals are insufficient because the house standard depends on material truth, not simulated colour.</p><p>Approved swatches must be archived with date, lot reference, and founder validation.</p>"}, "codex4": {"kicker": "Commercial / capital discipline", "title": "Investor rule", "body": "<p>Outside capital enters only after proof of sales. Even modest proof is more valuable than a large speculative story.</p><p>This keeps leverage with the house and prevents narrative inflation before the object has earned its place.</p><p>The order is fixed: object, response, proof, then scale.</p>"}, "codex5": {"kicker": "Validation / authority", "title": "Validation authority", "body": "<p>Final aesthetic approval remains with Gianluca alone. This is not vanity; it is a control mechanism for coherence.</p><p>Contributors may recommend, refine, and challenge. They do not close the matter.</p><p>What enters the archive must reflect one final house standard, not a negotiated average.</p>"}}, "common": {"return": "← Return"}}, "it": {"page": {"title": "Moscatelli Studio — Bozza Interna II"}, "sections": {"threshold": "Soglia", "mandate": "Mandato", "atlas": "Atlas", "codex": "Codex", "manufattura": "Manufattura", "circuit": "Circuit"}, "preview": {"threshold": "Ingresso riservato. Uno spazio per giudizio, ritmo e allineamento prima del lancio.", "mandate": "La posizione attuale della casa: priorità di lancio, regole decisionali e disciplina di crescita.", "atlas": "Territori visivi, immagini di riferimento, logica del packaging e atmosfera cromatica.", "codex": "Principi vincolanti, dati tecnici, regole di validazione e punti non negoziabili.", "manufattura": "Decisioni sui materiali, logica del fare, dettaglio del packaging e disciplina dell’oggetto.", "circuit": "Persone, ruoli operativi e rotta tra Roma, Brasile ed esecuzione del lancio."}, "nav": {"topline": "Navigazione", "selected": "Selezionato", "metaArrows": "Frecce per muoversi", "metaEnter": "Invio per aprire", "metaEsc": "Esc per chiudere"}, "veil": {"pin": "PIN"}, "detail": {"close": "Chiudi dettaglio"}, "home": {"statusPill": "Bozza interna", "statusCopy": "Un’unica superficie per giudizio, ritmo e allineamento.", "eyebrow": "Roma / studio interno / controllo autoriale", "h1": "Proteggere lo standard.<br><em>Far avanzare solo</em> ciò che merita il nome.", "sub": "Questo spazio serve a mantenere Moscatelli coerente: immagine, materia, rituale, persone e decisioni di lancio tenute dentro una sola superficie controllata.", "btnEnter": "Apri mandato", "btnMap": "Apri mappa", "band1": "Riserbo romano", "band2": "Validazione del fondatore", "band3": "Prova prima della scala", "hint": "Usa le frecce"}, "mandate": {"title": "Mandato", "kicker": "Posizione della casa", "h3": "Una casa romana di ultra-lusso fondata su rigore, autorialità e rituale.", "p": "Il lancio deve apparire istituzionale, mai promozionale. Il primo compito non è l’ampiezza ma l’autorità: una capsule ridotta, packaging esatto, immagini disciplinate e decisioni capaci di reggere allo scrutinio.", "btn": "Apri atlas", "cardA": {"title": "Priorità di lancio", "p": "Prima la capsule di sciarpe: Bianco Avorio e Terra Bruna, box rigido avorio, rituale oxblood mantenuto discreto."}, "cardB": {"title": "Regola decisionale", "p": "Nulla avanza senza validazione fisica, firma finale del fondatore ed evidenza degna di archivio."}, "cardC": {"title": "Disciplina di crescita", "p": "Prima la prova di vendita, poi il capitale esterno. La scala segue la trazione; non la sostituisce mai."}}, "atlas": {"title": "Atlas", "card1": {"title": "Sciarpa / Bianco Avorio", "p": "Calma esteriore. Luce di pietra calda. Frangia controllata."}, "card2": {"title": "Sciarpa / Terra Bruna", "p": "Il contrappeso più scuro: terra, profondità, permanenza."}, "card3": {"title": "Packaging / Bianco Avorio", "p": "Calma istituzionale. Presenza cieca. Nessuna firma rumorosa."}, "card4": {"title": "Rituale / riserva oxblood", "p": "L’oxblood appare come gravità nascosta: ceralacca, piega e momento interno."}, "sideKicker": "Dottrina visiva", "sideP": "Le superfici devono restare opache, ombrate e quiete. L’avorio deve sembrare pietra calda, mai bianco nuziale. L’oxblood deve tendere al bruno, mai al brillante. Ogni immagine deve suggerire autorità prima della spiegazione.", "rule1": "Avorio pietra calda", "rule2": "Oxblood brunito", "rule3": "Ombra romana", "rule4": "Nessun rumore visivo"}, "codex": {"title": "Codex", "tag1": "Materiale", "tag2": "Validazione", "tag3": "Commerciale", "row1": {"title": "Sciarpa di lancio", "sub": "190 × 31 cm, baby alpaca, caduta controllata, frangia densa e diritta.", "tag": "Attivo"}, "row2": {"title": "Dottrina del packaging", "sub": "Box rigido avorio; oxblood riservato a ceralacca, busta e rituale nascosto.", "tag": "Vincolante"}, "row3": {"title": "Approvazione colore", "sub": "Lab dip fisici sotto D65 o equivalente concordato. Nessuna approvazione a schermo.", "tag": "Vincolante"}, "row4": {"title": "Regola investitori", "sub": "Capitale angel solo dopo prova di vendita, anche su volumi iniziali contenuti.", "tag": "Bloccato"}, "row5": {"title": "Autorità di validazione", "sub": "L’approvazione estetica finale resta solo a Gianluca.", "tag": "Fondativo"}}, "manu": {"title": "Manufattura", "quote": "Superfici quiete.<br>Bordi esatti.<br>Autorità emotiva a distanza ravvicinata.", "sub": "Filoni di lavoro attuali: campionatura della sciarpa, linguaggio dell’etichetta, proporzioni del box, immagini di lancio e i dettagli invisibili che rendono la casa inevitabile.", "metric1": {"title": "Materiale", "copy": "Baby alpaca con superficie compatta, opaca e una caduta disciplinata."}, "metric2": {"title": "Validazione", "copy": "Firma finale del fondatore, evidenze archiviate, nessuna approvazione casuale."}, "metric3": {"title": "Rituale", "copy": "Calma avorio all’esterno; gravità oxblood riservata al momento interno."}, "figureKicker": "Studio etichetta", "figureP": "Logica di etichetta interna morbida. Tipografia quieta. “Made in Italy” tenuto con dignità, mai con rumore."}, "circuit": {"title": "Circuit", "invite": "Mantenere il cerchio piccolo. Mantenere lo standard assoluto.", "route": "Rotta", "note": "Roma come gravità della casa. Il Brasile come estensione operativa. Prima Prato, poi Biella. Prova prima del capitale.", "card1": {"name": "Gianluca", "role": "Fondatore / Direzione creativa", "p": "Validazione finale, tono istituzionale e standard non negoziabile."}, "card2": {"name": "Gabriela", "role": "Strategia / Posizionamento", "p": "Disciplina narrativa, inquadramento di mercato e allineamento commerciale."}, "card3": {"name": "Marcella", "role": "Chief of Staff / Coordinamento", "p": "Flusso dei compiti, continuità operativa, ritmo e follow-through del team."}, "card4": {"name": "Rete italiana", "role": "Intelligenza produttiva / Esterno", "p": "Lanifici a Prato, intelligence su Biella, partner per il box rigido e verità fisica dei materiali sul campo."}}, "details": {"atlas1": {"kicker": "Atlas I / ancora cromatica", "title": "Sciarpa / Bianco Avorio", "image": "assets/images/atlas-bianco-avorio.webp", "alt": "Sciarpa Moscatelli in Bianco Avorio", "body": "<p>Bianco Avorio non è bianco. Deve leggere come pietra calma scaldata dalla luce — asciutta, nobile, mai forzata.</p><p>Per la sciarpa questo colore porta la disciplina esteriore della casa: prima il silenzio, poi la morbidezza. La frangia deve restare diritta, densa e governata.</p><p>L’obiettivo è la compostezza, non la morbidezza fine a sé stessa.</p>"}, "atlas2": {"kicker": "Atlas II / contrappeso", "title": "Sciarpa / Terra Bruna", "image": "assets/images/atlas-terra-bruna.webp", "alt": "Sciarpa Moscatelli in Terra Bruna", "body": "<p>Terra Bruna esiste come controparte più scura del Bianco Avorio: legno invecchiato, cacao grezzo, terra dopo la pioggia.</p><p>Non deve mai apparire come un marrone generico. Il suo ruolo è dare serietà, profondità e gravità maschile alla coppia di lancio, senza aggressività.</p><p>Ogni uso fotografico deve preservare il dettaglio d’ombra ed evitare contaminazioni rosse.</p>"}, "atlas3": {"kicker": "Atlas III / calma del packaging", "title": "Packaging / Bianco Avorio", "image": "assets/images/packaging-bianco-avorio.webp", "alt": "Packaging Moscatelli in Bianco Avorio", "body": "<p>Il box rigido deve sembrare istituzionale, non decorativo. L’embossing cieco è preferibile a qualsiasi contrasto rumoroso.</p><p>Qui l’avorio lavora come faccia architettonica della casa: calma, misurata, quasi amministrativa nel suo riserbo.</p><p>La sensazione corretta è: questo oggetto appartiene già a un archivio.</p>"}, "atlas4": {"kicker": "Atlas IV / gravità nascosta", "title": "Rituale / riserva oxblood", "image": "assets/images/ritual-oxblood.webp", "alt": "Packaging rituale Moscatelli in oxblood", "body": "<p>L’oxblood non serve a gridare verso l’esterno. Appartiene ai momenti sigillati: ceralacca, interno della busta, piega nascosta, punteggiatura sacra.</p><p>Il suo ruolo è la gravità cerimoniale. Deve virare al bruno, opaco, antico — mai rosso acceso, mai lucido, mai festivo.</p><p>Usato correttamente, approfondisce il rituale senza indebolire la calma dell’esterno.</p>"}, "codex1": {"kicker": "Materiale / oggetto di lancio", "title": "Sciarpa di lancio", "body": "<p>L’oggetto di lancio è volutamente stretto nel suo perimetro: un solo formato, una sola proporzione controllata, una sola disciplina materica.</p><p><strong>Punti fissati ad oggi:</strong> 190 × 31 cm, baby alpaca, mano compatta e opaca, caduta controllata e frangia densa e diritta.</p><p>Il punto non è la novità. Il punto è stabilire autorità attraverso proporzione, superficie e finitura.</p>"}, "codex2": {"kicker": "Validazione / dottrina del packaging", "title": "Dottrina del packaging", "body": "<p>Il packaging primario resta Bianco Avorio. L’oxblood è trattenuto per il rituale interno: ceralacca, logica della busta e momenti di gravità nascosta.</p><p>Questa separazione conta. La calma esterna costruisce fiducia istituzionale; l’oxblood interno consegna memorabilità senza eccesso teatrale.</p><p>Qualsiasi proposta che inverta questa gerarchia va respinta.</p>"}, "codex3": {"kicker": "Validazione / verità del colore", "title": "Approvazione colore", "body": "<p>Il colore si approva fisicamente, non digitalmente. I lab dip vanno letti sotto D65 o sotto un neutro concordato.</p><p>Le approvazioni a schermo non sono sufficienti, perché lo standard della casa dipende dalla verità materiale, non da una simulazione.</p><p>I campioni approvati vanno archiviati con data, riferimento di lotto e validazione del fondatore.</p>"}, "codex4": {"kicker": "Commerciale / disciplina del capitale", "title": "Regola investitori", "body": "<p>Il capitale esterno entra solo dopo una prova di vendita. Anche una prova modesta vale più di una grande storia speculativa.</p><p>Questo mantiene la leva dentro la casa ed evita inflazione narrativa prima che l’oggetto abbia guadagnato il proprio posto.</p><p>L’ordine è fisso: oggetto, risposta, prova, poi scala.</p>"}, "codex5": {"kicker": "Validazione / autorità", "title": "Autorità di validazione", "body": "<p>L’approvazione estetica finale resta a Gianluca soltanto. Non è vanità; è un meccanismo di controllo per la coerenza.</p><p>I collaboratori possono raccomandare, rifinire e contestare. Non chiudono la questione.</p><p>Ciò che entra in archivio deve riflettere uno standard finale della casa, non una media negoziata.</p>"}}, "common": {"return": "← Ritorna"}}, "pt": {"page": {"title": "Moscatelli Studio — Rascunho Interno II"}, "sections": {"threshold": "Limiar", "mandate": "Mandato", "atlas": "Atlas", "codex": "Codex", "manufattura": "Manufattura", "circuit": "Circuit"}, "preview": {"threshold": "Entrada reservada. Um espaço para julgamento, ritmo e alinhamento antes do lançamento.", "mandate": "A posição atual da casa: prioridades de lançamento, regras de decisão e disciplina de crescimento.", "atlas": "Territórios visuais, imagens de referência, lógica de embalagem e atmosfera cromática.", "codex": "Princípios vinculantes, dados técnicos, regras de validação e pontos inegociáveis.", "manufattura": "Decisões de material, lógica de execução, detalhe de embalagem e disciplina do objeto.", "circuit": "Pessoas, papéis operacionais e a rota entre Roma, Brasil e a execução do lançamento."}, "nav": {"topline": "Navegação", "selected": "Selecionado", "metaArrows": "Setas para mover", "metaEnter": "Enter para abrir", "metaEsc": "Esc para fechar"}, "veil": {"pin": "PIN"}, "detail": {"close": "Fechar detalhe"}, "home": {"statusPill": "Rascunho interno", "statusCopy": "Uma superfície única para julgamento, ritmo e alinhamento.", "eyebrow": "Roma / estúdio interno / controle autoral", "h1": "Proteger o padrão.<br><em>Avançar apenas</em> o que merece o nome.", "sub": "Este espaço existe para manter Moscatelli coerente: imagem, matéria, ritual, pessoas e decisões de lançamento reunidas em uma única superfície controlada.", "btnEnter": "Abrir mandato", "btnMap": "Abrir mapa", "band1": "Restração romana", "band2": "Validação do fundador", "band3": "Prova antes da expansão", "hint": "Use as setas"}, "mandate": {"title": "Mandato", "kicker": "Posição da casa", "h3": "Uma casa romana de ultraluxo fundada em rigor, autoria e ritual.", "p": "O lançamento deve parecer institucional, nunca promocional. A primeira tarefa não é amplitude, e sim autoridade: uma cápsula enxuta, embalagem exata, imagens disciplinadas e decisões fortes o bastante para resistir ao escrutínio.", "btn": "Abrir atlas", "cardA": {"title": "Prioridade de lançamento", "p": "Primeiro a cápsula de lenços: Bianco Avorio e Terra Bruna, caixa rígida marfim, ritual oxblood mantido discreto."}, "cardB": {"title": "Regra de decisão", "p": "Nada avança sem validação física, aprovação final do fundador e evidência digna de arquivo."}, "cardC": {"title": "Disciplina de crescimento", "p": "Prova de vendas antes de capital externo. A escala segue a tração; nunca a substitui."}}, "atlas": {"title": "Atlas", "card1": {"title": "Lenço / Bianco Avorio", "p": "Calma exterior. Luz de pedra morna. Franja controlada."}, "card2": {"title": "Lenço / Terra Bruna", "p": "O contrapeso mais escuro: terra, profundidade, permanência."}, "card3": {"title": "Embalagem / Bianco Avorio", "p": "Calma institucional. Presença cega. Nenhuma assinatura ruidosa."}, "card4": {"title": "Ritual / reserva oxblood", "p": "O oxblood surge como gravidade oculta: cera, dobra e momento interior."}, "sideKicker": "Doutrina visual", "sideP": "As superfícies devem permanecer foscas, sombreadas e silenciosas. O marfim deve parecer pedra morna, nunca branco nupcial. O oxblood deve pender para o marrom, nunca para o brilho. Toda imagem deve sugerir autoridade antes da explicação.", "rule1": "Marfim pedra morna", "rule2": "Oxblood de base marrom", "rule3": "Sombra romana", "rule4": "Sem ruído visual"}, "codex": {"title": "Codex", "tag1": "Material", "tag2": "Validação", "tag3": "Comercial", "row1": {"title": "Lenço de lançamento", "sub": "190 × 31 cm, baby alpaca, queda controlada, franja densa e reta.", "tag": "Ativo"}, "row2": {"title": "Doutrina da embalagem", "sub": "Caixa rígida marfim; oxblood reservado para selo, envelope e ritual oculto.", "tag": "Vinculante"}, "row3": {"title": "Aprovação de cor", "sub": "Lab dips físicos sob D65 ou equivalente acordado. Nada de aprovação por tela.", "tag": "Vinculante"}, "row4": {"title": "Regra de investidores", "sub": "Capital anjo só depois de prova de vendas, mesmo em volume inicial modesto.", "tag": "Bloqueado"}, "row5": {"title": "Autoridade de validação", "sub": "A aprovação estética final permanece apenas com Gianluca.", "tag": "Fundacional"}}, "manu": {"title": "Manufattura", "quote": "Superfícies silenciosas.<br>Bordas exatas.<br>Autoridade emocional de perto.", "sub": "Frentes de trabalho atuais: amostragem do lenço, linguagem da etiqueta, proporções da caixa, imagens de lançamento e os detalhes invisíveis que fazem a casa parecer inevitável.", "metric1": {"title": "Material", "copy": "Baby alpaca com superfície compacta, fosca e queda disciplinada."}, "metric2": {"title": "Validação", "copy": "Aprovação final apenas do fundador, evidências arquivadas, nenhuma validação casual."}, "metric3": {"title": "Ritual", "copy": "Calma marfim por fora; gravidade oxblood reservada para o momento interior."}, "figureKicker": "Estudo de etiqueta", "figureP": "Lógica de etiqueta interna macia. Tipografia silenciosa. “Made in Italy” sustentado com dignidade, nunca com ruído."}, "circuit": {"title": "Circuit", "invite": "Mantenha o círculo pequeno. Mantenha o padrão absoluto.", "route": "Rota", "note": "Roma como gravidade da casa. O Brasil como extensão operacional. Primeiro Prato, depois Biella. Prova antes do capital.", "card1": {"name": "Gianluca", "role": "Fundador / Direção criativa", "p": "Validação final, tom institucional e o padrão inegociável."}, "card2": {"name": "Gabriela", "role": "Estratégia / Posicionamento", "p": "Disciplina narrativa, enquadramento de mercado e alinhamento comercial."}, "card3": {"name": "Marcella", "role": "Chief of Staff / Coordenação", "p": "Fluxo de tarefas, acompanhamento, ritmo operacional e continuidade da equipe."}, "card4": {"name": "Rede italiana", "role": "Inteligência produtiva / Externo", "p": "Moinhos em Prato, inteligência de Biella, parceiros de caixa rígida e a verdade física dos materiais no terreno."}}, "details": {"atlas1": {"kicker": "Atlas I / âncora cromática", "title": "Lenço / Bianco Avorio", "image": "assets/images/atlas-bianco-avorio.webp", "alt": "Lenço Moscatelli em Bianco Avorio", "body": "<p>Bianco Avorio não é branco. Precisa ser lido como pedra calma aquecida pela luz — seco, nobre e sem esforço.</p><p>No lenço, essa cor carrega a disciplina exterior da casa: primeiro o silêncio, depois a maciez. A franja precisa permanecer reta, densa e governada.</p><p>O objetivo é compostura, não maciez pela maciez.</p>"}, "atlas2": {"kicker": "Atlas II / contrapeso", "title": "Lenço / Terra Bruna", "image": "assets/images/atlas-terra-bruna.webp", "alt": "Lenço Moscatelli em Terra Bruna", "body": "<p>Terra Bruna existe como contraponto mais escuro ao Bianco Avorio: madeira envelhecida, cacau cru, terra depois da chuva.</p><p>Nunca deve parecer um marrom genérico. Sua função é dar seriedade, profundidade e gravidade masculina ao par de lançamento, sem agressividade.</p><p>Todo uso fotográfico deve preservar o detalhe das sombras e evitar contaminação vermelha.</p>"}, "atlas3": {"kicker": "Atlas III / calma da embalagem", "title": "Embalagem / Bianco Avorio", "image": "assets/images/packaging-bianco-avorio.webp", "alt": "Embalagem Moscatelli em Bianco Avorio", "body": "<p>A caixa rígida precisa parecer institucional, não decorativa. O embossing cego é preferível a qualquer contraste ruidoso.</p><p>Aqui o marfim funciona como a face arquitetônica da casa: calma, medida, quase administrativa em sua contenção.</p><p>A sensação correta é: este objeto já pertence a um arquivo.</p>"}, "atlas4": {"kicker": "Atlas IV / gravidade oculta", "title": "Ritual / reserva oxblood", "image": "assets/images/ritual-oxblood.webp", "alt": "Embalagem ritual Moscatelli em oxblood", "body": "<p>O oxblood não serve para gritar para fora. Ele pertence aos momentos selados: cera, interior do envelope, dobra oculta, pontuação sagrada.</p><p>Sua função é gravidade cerimonial. Deve puxar para o marrom, fosco e antigo — nunca vermelho vivo, nunca brilhante, nunca festivo.</p><p>Quando usado corretamente, aprofunda o ritual sem enfraquecer a calma exterior.</p>"}, "codex1": {"kicker": "Material / objeto de lançamento", "title": "Lenço de lançamento", "body": "<p>O objeto de lançamento é deliberadamente estreito em escopo: um formato, uma proporção controlada, uma disciplina material.</p><p><strong>Pontos hoje fixados:</strong> 190 × 31 cm, baby alpaca, mão compacta e fosca, queda controlada e franja densa e reta.</p><p>O ponto não é novidade. O ponto é estabelecer autoridade por meio de proporção, superfície e acabamento.</p>"}, "codex2": {"kicker": "Validação / doutrina da embalagem", "title": "Doutrina da embalagem", "body": "<p>A embalagem primária permanece Bianco Avorio. O oxblood é retido para o ritual interior: selo de cera, lógica de envelope e momentos de gravidade oculta.</p><p>Essa separação importa. A calma exterior constrói confiança institucional; o oxblood interior entrega memorabilidade sem excesso teatral.</p><p>Qualquer proposta que inverta essa hierarquia deve ser rejeitada.</p>"}, "codex3": {"kicker": "Validação / verdade da cor", "title": "Aprovação de cor", "body": "<p>Cor se aprova fisicamente, não digitalmente. Os lab dips devem ser lidos sob D65 ou sob um neutro acordado.</p><p>Aprovação por tela não basta, porque o padrão da casa depende da verdade material, não de uma simulação.</p><p>As amostras aprovadas devem ser arquivadas com data, referência de lote e validação do fundador.</p>"}, "codex4": {"kicker": "Comercial / disciplina de capital", "title": "Regra de investidores", "body": "<p>Capital externo só entra depois de prova de vendas. Mesmo uma prova modesta vale mais do que uma grande história especulativa.</p><p>Isso mantém a alavanca dentro da casa e evita inflação narrativa antes que o objeto tenha conquistado o próprio lugar.</p><p>A ordem é fixa: objeto, resposta, prova, depois escala.</p>"}, "codex5": {"kicker": "Validação / autoridade", "title": "Autoridade de validação", "body": "<p>A aprovação estética final permanece apenas com Gianluca. Não é vaidade; é um mecanismo de controle para manter coerência.</p><p>Colaboradores podem recomendar, refinar e contestar. Não encerram a questão.</p><p>O que entra no arquivo deve refletir um padrão final da casa, não uma média negociada.</p>"}}, "common": {"return": "← Voltar"}}};

const state = {
  currentSection: 'home',
  currentIndex: 0,
  isTransitioning: false,
  menuOpen: false,
  hoveredNavIndex: 0,
  currentLang: 'en',
  openDetailKey: null,
  activeCodexFilter: null,
};

const header = document.getElementById('site-header');
const body = document.body;
const root = document.documentElement;
const navOverlay = document.getElementById('nav-overlay');
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const sectionLabel = document.getElementById('section-label');
const sectionIndex = document.getElementById('section-index');
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const railDots = Array.from(document.querySelectorAll('.rail-dot'));
const sections = Array.from(document.querySelectorAll('.section'));
const previewIndex = document.getElementById('nav-preview-index');
const previewTitle = document.getElementById('nav-preview-title');
const previewCopy = document.getElementById('nav-preview-copy');
const introVeil = document.getElementById('intro-veil');
const veilForm = document.getElementById('veil-form');
const veilPanel = document.querySelector('.veil-panel');
const veilInput = document.getElementById('veil-input');
const veilLabel = document.getElementById('veil-label');
const veilPinSlots = Array.from(document.querySelectorAll('.veil-pin-slot'));
const pointer = document.querySelector('.mc-pointer');
const langSwitchers = Array.from(document.querySelectorAll('[data-lang-switcher]'));
const langChoices = Array.from(document.querySelectorAll('.lang-choice'));
const textNodes = Array.from(document.querySelectorAll('[data-i18n]'));
const htmlNodes = Array.from(document.querySelectorAll('[data-i18n-html]'));
const detailTriggers = Array.from(document.querySelectorAll('.is-detail-trigger'));
const detailOverlay = document.getElementById('detail-overlay');
const detailImage = document.getElementById('detail-image');
const detailKicker = document.getElementById('detail-kicker');
const detailTitle = document.getElementById('detail-title');
const detailBody = document.getElementById('detail-body');
const detailCloseButtons = Array.from(document.querySelectorAll('[data-detail-close]'));
const codexFilters = Array.from(document.querySelectorAll('[data-codex-filter]'));
const codexRows = Array.from(document.querySelectorAll('.archive-row'));

const sectionIds = sections.map(section => section.id.replace('section-', ''));
const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
const pointerState = { enabled: false };

function getSection(id) {
  return document.getElementById(`section-${id}`);
}

function getSectionPosition(id) {
  return sectionIds.indexOf(id);
}

function getNavItemBySection(id) {
  return navItems.find(item => item.dataset.section === id);
}

function getActiveSection() {
  return getSection(state.currentSection);
}

function getTranslationValue(path, lang = state.currentLang) {
  const source = translations[lang] || translations.en;
  return path.split('.').reduce((accumulator, part) => accumulator && accumulator[part], source);
}

function t(path, lang = state.currentLang) {
  return getTranslationValue(path, lang) ?? getTranslationValue(path, 'en') ?? path;
}

function getSectionLabel(section) {
  return t(section?.dataset.labelKey || 'sections.threshold');
}

function setDocumentLanguage(lang) {
  body.dataset.lang = lang;
  root.lang = lang === 'pt' ? 'pt-BR' : lang;
}

function syncLanguageSwitchers() {
  langSwitchers.forEach(switcher => {
    switcher.dataset.lang = state.currentLang;
    const choices = switcher.querySelectorAll('.lang-choice');
    choices.forEach(choice => {
      const active = choice.dataset.lang === state.currentLang;
      choice.classList.toggle('is-active', active);
      choice.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  });
}

function updateStaticTranslations() {
  textNodes.forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });

  htmlNodes.forEach(node => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });

  document.title = t('page.title');
  if (veilInput) veilInput.setAttribute('aria-label', t('veil.pin'));
  detailCloseButtons.forEach(button => {
    if (button.tagName === 'BUTTON') button.setAttribute('aria-label', t('detail.close'));
  });
}

function updateHeaderMeta(section) {
  const label = getSectionLabel(section);
  const index = section?.dataset.index || '01';

  sectionLabel.style.opacity = '0';
  sectionIndex.style.opacity = '0';

  window.setTimeout(() => {
    sectionLabel.textContent = label;
    sectionIndex.textContent = index;
    sectionLabel.style.opacity = '1';
    sectionIndex.style.opacity = '1';
  }, 120);
}

function setBodySection(id) {
  body.dataset.section = id;
}

function syncActiveNav(id) {
  navItems.forEach(item => item.classList.toggle('active', item.dataset.section === id));
  railDots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === id));
}

function updatePreviewFromItem(item) {
  if (!item) return;
  previewIndex.textContent = item.dataset.index || '01';
  previewTitle.textContent = t(item.dataset.previewTitleKey || 'sections.threshold');
  previewCopy.textContent = t(item.dataset.previewCopyKey || 'preview.threshold');

  navItems.forEach(entry => {
    const isActive = state.menuOpen ? entry === item : entry.dataset.section === state.currentSection;
    entry.classList.toggle('active', isActive);
  });
}

function updateSectionSizing() {
  sections.forEach(section => {
    const inner = section.querySelector('.section-inner');
    if (!inner) return;
    const style = window.getComputedStyle(section);
    const availableHeight = window.innerHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    const needsScroll = inner.scrollHeight > availableHeight - 2;
    section.classList.toggle('is-scrollable', needsScroll);
    if (!needsScroll) section.scrollTop = 0;
  });
  updateHeaderScrolled();
}

function updateHeaderScrolled() {
  const activeSection = getActiveSection();
  if (!activeSection) return;
  header.classList.toggle('scrolled', activeSection.scrollTop > 24 || body.classList.contains('detail-open'));
}

function sanitizePinValue(value) {
  return String(value || '').replace(/\D+/g, '').slice(0, 6);
}

function updatePinSlots(value = '') {
  const clean = sanitizePinValue(value);
  veilPinSlots.forEach((slot, index) => {
    const filled = index < clean.length;
    slot.classList.toggle('is-filled', filled);
    slot.classList.toggle('is-current', clean.length < 6 && index === clean.length);
    slot.setAttribute('data-pin-bullet', filled ? '•' : '');
  });
}

function focusPinInput() {
  if (!veilInput || !body.classList.contains('gate-active')) return;
  try { veilInput.removeAttribute('readonly'); } catch (error) {}
  try { veilInput.focus({ preventScroll: true }); } catch (error) { try { veilInput.focus(); } catch (error2) {} }
  try {
    const len = veilInput.value.length;
    if (typeof veilInput.setSelectionRange === 'function') veilInput.setSelectionRange(len, len);
  } catch (error) {}
}


function requestPinKeyboard() {
  focusPinInput();
}



function bindVeilFocusInteractions() {
  const focusHandler = () => {
    if (!body.classList.contains('gate-active')) return;
    focusPinInput();
  };
  [introVeil, veilForm, document.querySelector('.veil-panel'), document.querySelector('.veil-pin-shell'), document.querySelector('.veil-pin-slots')].forEach(node => {
    if (!node) return;
    node.addEventListener('click', focusHandler);
    node.addEventListener('touchend', focusHandler);
    node.addEventListener('touchstart', focusHandler, { passive: true });
    node.addEventListener('pointerdown', focusHandler);
    node.addEventListener('pointerup', focusHandler);
  });
}

function resetPinFeedback() {
  veilForm?.classList.remove('is-error', 'is-success');
  veilLabel?.classList.remove('is-error');
}

function flashVeilError() {
  veilForm?.classList.remove('is-error');
  veilPanel?.classList.remove('is-error');
  if (veilForm) void veilForm.offsetWidth;
  if (veilPanel) void veilPanel.offsetWidth;
  veilForm?.classList.add('is-error');
  veilPanel?.classList.add('is-error');
  window.setTimeout(() => {
    veilLabel?.classList.remove('is-error');
    veilForm?.classList.remove('is-error');
    veilPanel?.classList.remove('is-error');
  }, 1200);
}

function unlockGate() {
  if (veilForm) veilForm.classList.add('is-success');
  window.setTimeout(() => {
    body.classList.add('gate-cleared');
    body.classList.remove('gate-active');
    introVeil?.setAttribute('aria-hidden', 'true');
    veilInput?.blur();
    window.setTimeout(() => { if (introVeil) introVeil.style.pointerEvents = 'none'; }, 1200);
  }, GATE_SUCCESS_DELAY);
}

function handleVeilSubmit(event) {
  event.preventDefault();
  if (!veilInput) return;
  const value = sanitizePinValue(veilInput.value);
  if (value.length < 6) return;
  if (value === ACCESS_PIN) {
    unlockGate();
    return;
  }
  veilInput.value = '';
  updatePinSlots('');
  flashVeilError();
  requestPinKeyboard();
}



function revealVeilSequence() {
  window.setTimeout(() => body.classList.add('background-revealed'), BACKGROUND_REVEAL_DELAY);
  window.setTimeout(() => body.classList.add('emblem-revealed'), EMBLEM_REVEAL_DELAY);
  window.setTimeout(() => body.classList.add('emblem-fading'), EMBLEM_FADE_DELAY);
  window.setTimeout(() => body.classList.add('threshold-revealed', 'panel-revealed'), THRESHOLD_REVEAL_DELAY);
  window.setTimeout(() => body.classList.add('wordmark-revealed'), WORDMARK_REVEAL_DELAY);
  window.setTimeout(() => body.classList.add('submark-revealed'), SUBMARK_REVEAL_DELAY);
  window.setTimeout(() => {
    body.classList.add('form-revealed');
    focusPinInput();
  }, FORM_REVEAL_DELAY);
}


function goToSection(targetId) {
  if (state.isTransitioning || targetId === state.currentSection || body.classList.contains('detail-open')) return;
  const current = getSection(state.currentSection);
  const next = getSection(targetId);
  if (!next) return;

  state.isTransitioning = true;
  const fromIndex = getSectionPosition(state.currentSection);
  const toIndex = getSectionPosition(targetId);
  const directionClass = toIndex > fromIndex ? 'transition-forward' : 'transition-backward';
  body.classList.remove('transition-forward', 'transition-backward');
  body.classList.add('is-transitioning', directionClass);

  if (current) {
    current.classList.remove('active');
    current.classList.add('exiting');
    window.setTimeout(() => { current.classList.remove('exiting'); current.scrollTop = 0; }, EXIT_DURATION);
  }

  state.currentSection = targetId;
  state.currentIndex = toIndex;
  updateHeaderMeta(next);
  syncActiveNav(targetId);
  setBodySection(targetId);
  updatePreviewFromItem(getNavItemBySection(targetId));

  window.setTimeout(() => {
    next.classList.add('active');
    next.scrollTop = 0;
    updateHeaderScrolled();
  }, ENTER_DELAY);

  window.setTimeout(() => {
    state.isTransitioning = false;
    body.classList.remove('is-transitioning', 'transition-forward', 'transition-backward');
    updateSectionSizing();
  }, TRANSITION_LOCK);
}

function goHome() { goToSection('home'); }
function goRelative(step) { const nextIndex = state.currentIndex + step; if (nextIndex < 0 || nextIndex >= sectionIds.length) return; goToSection(sectionIds[nextIndex]); }

function openMenu() {
  if (state.menuOpen || body.classList.contains('gate-active') || body.classList.contains('detail-open')) return;
  state.menuOpen = true;
  navOverlay.classList.add('open');
  navOverlay.setAttribute('aria-hidden', 'false');
  menuToggle?.setAttribute('aria-expanded', 'true');
  body.classList.add('menu-open');
  const activeNav = getNavItemBySection(state.currentSection);
  state.hoveredNavIndex = Math.max(0, navItems.indexOf(activeNav));
  updatePreviewFromItem(activeNav);
}

function closeMenu() {
  if (!state.menuOpen) return;
  state.menuOpen = false;
  navOverlay.classList.remove('open');
  navOverlay.setAttribute('aria-hidden', 'true');
  menuToggle?.setAttribute('aria-expanded', 'false');
  body.classList.remove('menu-open');
}

function updateSpotlight(x, y) {
  body.style.setProperty('--spot-x', `${x}px`);
  body.style.setProperty('--spot-y', `${y}px`);
}

function enableCustomPointer() { if (!pointer || !pointerQuery.matches) return; pointerState.enabled = true; root.classList.add('has-mc-pointer'); }
function disableCustomPointer() { pointerState.enabled = false; root.classList.remove('has-mc-pointer'); pointer?.classList.remove('is-visible', 'is-hover-text', 'is-hover-action', 'is-hover-media', 'is-hover-input', 'is-pressed'); }
function showPointer() { if (!pointerState.enabled || !pointer) return; pointer.classList.add('is-visible'); }
function hidePointer() { if (!pointer) return; pointer.classList.remove('is-visible', 'is-pressed'); }
function movePointer(x, y) { if (!pointerState.enabled || !pointer) return; pointer.style.left = `${x}px`; pointer.style.top = `${y}px`; }

function classifyPointerTarget(target) {
  if (!pointer) return;
  const isAction = !!target.closest('a, button, [role="button"], [data-action], .nav-item, .rail-dot, .archive-row, .gallery-cell, .header-logo, .menu-toggle, .contact-link, .contact-email, .btn-primary, .btn-ghost, .btn-back, .lang-choice, .detail-close, .vault-filter');
  const isInput = !!target.closest('input, textarea, select, [contenteditable="true"]');
  const isMedia = !!target.closest('.gallery-cell, .focus-panel, .side-note, .veil-panel, .studio-figure, .team-card, .circuit-note, .detail-dialog');
  const isText = !isAction && (!!target.closest('p, h1, h2, h3, blockquote, .sub, .studio-sub, .contact-invite, .archive-sub, .detail-body, .gallery-meta') || isInput);
  pointer.classList.toggle('is-hover-action', isAction);
  pointer.classList.toggle('is-hover-media', !isAction && !isInput && isMedia);
  pointer.classList.toggle('is-hover-text', !isAction && isText);
  pointer.classList.toggle('is-hover-input', !isAction && isInput);
}

function bindSectionScrolls() {
  sections.forEach(section => {
    section.addEventListener('scroll', () => { if (section.classList.contains('active')) updateHeaderScrolled(); }, { passive: true });
  });
}

function persistLanguage(lang) { try { window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang); } catch (error) {} }
function getStoredLanguage() { try { return window.localStorage.getItem(LANGUAGE_STORAGE_KEY); } catch (error) { return null; } }

function detectBrowserLanguage() {
  const langs = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || navigator.userLanguage || 'en'];

  const normalized = langs
    .filter(Boolean)
    .map(lang => String(lang).toLowerCase());

  if (normalized.some(lang => lang.startsWith('it'))) return 'it';
  if (normalized.some(lang => lang === 'pt-br' || lang.startsWith('pt'))) return 'pt';
  return 'en';
}

function populateDetail() {
  if (!state.openDetailKey) return;
  const detail = t(`details.${state.openDetailKey}`);
  if (!detail) return;
  detailKicker.textContent = detail.kicker || '';
  detailTitle.textContent = detail.title || '';
  detailBody.innerHTML = detail.body || '';

  if (detail.image) {
    detailImage.style.opacity = '0';
    detailImage.style.transition = '';
    detailImage.onload = null;
    detailImage.alt = detail.alt || '';
    detailOverlay.classList.remove('no-media');

    detailImage.onload = () => {
      detailImage.style.transition = 'opacity 380ms ease';
      detailImage.style.opacity = '1';
      detailImage.onload = null;
    };

    detailImage.src = detail.image;

    if (detailImage.complete) {
      detailImage.style.transition = 'opacity 380ms ease';
      detailImage.style.opacity = '1';
      detailImage.onload = null;
    }
  } else {
    detailImage.onload = null;
    detailImage.removeAttribute('src');
    detailImage.alt = '';
    detailImage.style.opacity = '1';
    detailOverlay.classList.add('no-media');
  }
}

function openDetail(key) {
  if (!key) return;
  state.openDetailKey = key;
  populateDetail();
  body.classList.add('detail-open');
  detailOverlay.classList.add('open');
  detailOverlay.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => updateHeaderScrolled());
}

function closeDetail() {
  if (!state.openDetailKey) return;
  state.openDetailKey = null;
  body.classList.remove('detail-open');
  detailOverlay.classList.remove('open');
  detailOverlay.setAttribute('aria-hidden', 'true');
  requestAnimationFrame(() => updateHeaderScrolled());
}

function updateCodexFilter() {
  const filter = state.activeCodexFilter;
  codexFilters.forEach(btn => {
    const active = btn.dataset.codexFilter === filter;
    btn.classList.toggle('is-filter-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  codexRows.forEach(row => {
    if (!filter) {
      row.classList.remove('is-filter-hidden');
      return;
    }
    const categories = (row.dataset.categories || '').split(/\s+/);
    row.classList.toggle('is-filter-hidden', !categories.includes(filter));
  });
  window.setTimeout(updateSectionSizing, 20);
}

function applyLanguage(immediate = false) {
  setDocumentLanguage(state.currentLang);
  syncLanguageSwitchers();

  const performUpdate = () => {
    updateStaticTranslations();
    updateHeaderMeta(getActiveSection());
    const previewSource = state.menuOpen ? navItems[state.hoveredNavIndex] || getNavItemBySection(state.currentSection) : getNavItemBySection(state.currentSection);
    updatePreviewFromItem(previewSource);
    if (state.openDetailKey) populateDetail();
  };

  if (immediate) {
    performUpdate();
    return;
  }

  body.classList.add('lang-switching');
  window.setTimeout(() => {
    performUpdate();
  }, LANG_FADE_OUT + 10);
  window.setTimeout(() => {
    body.classList.remove('lang-switching');
  }, LANG_FADE_OUT + LANG_FADE_IN_DELAY);
}

function setLanguage(lang, immediate = false) {
  if (!translations[lang]) return;
  state.currentLang = lang;
  persistLanguage(lang);
  applyLanguage(immediate);
}

menuToggle?.addEventListener('click', () => { state.menuOpen ? closeMenu() : openMenu(); });
menuClose?.addEventListener('click', closeMenu);

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => { state.hoveredNavIndex = navItems.indexOf(item); updatePreviewFromItem(item); });
  item.addEventListener('click', () => { closeMenu(); window.setTimeout(() => goToSection(item.dataset.section), 70); });
});

langChoices.forEach(choice => { choice.addEventListener('click', () => setLanguage(choice.dataset.lang)); });

detailTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => openDetail(trigger.dataset.detail));
  trigger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetail(trigger.dataset.detail); }
  });
});

detailCloseButtons.forEach(btn => btn.addEventListener('click', closeDetail));

codexFilters.forEach(button => {
  button.addEventListener('click', () => {
    state.activeCodexFilter = state.activeCodexFilter === button.dataset.codexFilter ? null : button.dataset.codexFilter;
    updateCodexFilter();
  });
});

document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-action]');
  if (!trigger) return;
  const action = trigger.dataset.action;
  switch (action) {
    case 'go-home': goHome(); break;
    case 'go-section': if (trigger.dataset.target) goToSection(trigger.dataset.target); break;
    case 'open-menu': openMenu(); break;
    default: break;
  }
});

veilForm?.addEventListener('submit', handleVeilSubmit);
introVeil?.addEventListener('pointerdown', () => { if (body.classList.contains('gate-active')) requestPinKeyboard(); }, { passive: true });
introVeil?.addEventListener('touchstart', () => { if (body.classList.contains('gate-active')) requestPinKeyboard(); }, { passive: true });
veilInput?.addEventListener('input', () => {
  if (!veilInput) return;
  const clean = sanitizePinValue(veilInput.value);
  if (veilInput.value !== clean) veilInput.value = clean;
  resetPinFeedback();
  updatePinSlots(clean);
  if (clean.length === 6) {
    window.setTimeout(() => {
      if (sanitizePinValue(veilInput.value).length === 6) {
        handleVeilSubmit({ preventDefault: () => {} });
      }
    }, 120);
  }
});
veilInput?.addEventListener('focus', () => document.body.classList.add('pin-focused'));
veilInput?.addEventListener('blur', () => document.body.classList.remove('pin-focused'));
veilInput?.addEventListener('keydown', event => { if (event.key === 'Escape') event.stopPropagation(); });

document.addEventListener('keydown', event => {
  const isLanguageControl = !!event.target.closest('.lang-switcher');

  if (body.classList.contains('gate-active') && event.target !== veilInput && !isLanguageControl) {
    if (event.key === 'Tab') return;
    event.preventDefault();
    requestPinKeyboard();
    return;
  }

  if (event.key === 'Escape') {
    if (state.openDetailKey) { closeDetail(); return; }
    if (state.menuOpen) { closeMenu(); return; }
  }

  if (state.menuOpen) {
    if (event.key === 'ArrowDown') { event.preventDefault(); state.hoveredNavIndex = (state.hoveredNavIndex + 1) % navItems.length; updatePreviewFromItem(navItems[state.hoveredNavIndex]); }
    if (event.key === 'ArrowUp') { event.preventDefault(); state.hoveredNavIndex = (state.hoveredNavIndex - 1 + navItems.length) % navItems.length; updatePreviewFromItem(navItems[state.hoveredNavIndex]); }
    if (event.key === 'Enter') { event.preventDefault(); const selected = navItems[state.hoveredNavIndex] || getNavItemBySection(state.currentSection); if (!selected) return; closeMenu(); window.setTimeout(() => goToSection(selected.dataset.section), 70); }
    return;
  }

  if (state.openDetailKey) return;
  if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); goRelative(1); }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); goRelative(-1); }
  if (event.key.toLowerCase() === 'm') { event.preventDefault(); openMenu(); }
  if (event.key.toLowerCase() === 'h') { event.preventDefault(); goHome(); }
});

window.addEventListener('pointermove', event => {
  if (!pointerState.enabled) return;
  movePointer(event.clientX, event.clientY);
  updateSpotlight(event.clientX, event.clientY);
  showPointer();
  classifyPointerTarget(event.target);
}, { passive: true });
window.addEventListener('mousemove', event => updateSpotlight(event.clientX, event.clientY), { passive: true });
window.addEventListener('pointerdown', () => { if (!pointerState.enabled || !pointer) return; pointer.classList.add('is-pressed'); }, { passive: true });
window.addEventListener('pointerup', () => pointer?.classList.remove('is-pressed'), { passive: true });
window.addEventListener('pointerleave', hidePointer, { passive: true });
window.addEventListener('blur', hidePointer, { passive: true });

pointerQuery.addEventListener('change', event => { event.matches ? enableCustomPointer() : disableCustomPointer(); });

window.addEventListener('load', () => {
  body.classList.remove('preload');
  updateSectionSizing();
  revealVeilSequence();
});
window.addEventListener('resize', updateSectionSizing, { passive: true });

(function init() {
  const storedLang = getStoredLanguage();
  const initialLang = translations[storedLang] ? storedLang : detectBrowserLanguage();
  if (translations[initialLang]) state.currentLang = initialLang;
  const homeSection = getSection('home');
  if (homeSection) { homeSection.classList.add('active'); state.currentSection = 'home'; state.currentIndex = 0; }
  enableCustomPointer();
  bindSectionScrolls();
  syncActiveNav('home');
  setBodySection('home');
  applyLanguage(true);
  bindVeilFocusInteractions();
  updatePinSlots('');
  updateCodexFilter();
  updateSpotlight(window.innerWidth * 0.5, window.innerHeight * 0.5);
  updateSectionSizing();
})();


// PWA foundation
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  window.deferredInstallPrompt = deferredInstallPrompt;
});
window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  window.deferredInstallPrompt = null;
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      registration.update().catch(() => {});
    }).catch(() => {});
  });
}


document.addEventListener('visibilitychange', () => {
  if (!document.hidden && body.classList.contains('gate-active') && body.classList.contains('form-revealed')) {
    requestPinKeyboard();
  }
});
