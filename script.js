
/* v90 — Supplier Desk updated with current mill outreach, second-wave lead tracking, and cache advanced. */
'use strict';

const EXIT_DURATION = 360;
const ENTER_DELAY = 140;
const TRANSITION_LOCK = 560;
const GATE_SUCCESS_DELAY = 1080;
const PANEL_REVEAL_DELAY = 1750;
const BACKGROUND_REVEAL_DELAY = 120;
const EMBLEM_REVEAL_DELAY = 1180;
const WORDMARK_REVEAL_DELAY = 4740;
const SUBMARK_REVEAL_DELAY = 4940;
const FORM_REVEAL_DELAY = 5360;
const EMBLEM_FADE_DELAY = 3320;
const THRESHOLD_REVEAL_DELAY = 4480;
const LANG_FADE_OUT = 720;
const LANG_FADE_IN_DELAY = 120;
const LANGUAGE_STORAGE_KEY = 'moscatelli-studio-lang';
const SESSION_UNLOCK_KEY = 'moscatelli-studio-session-unlocked';
const MINI_THRESHOLD_ENTER_DELAY = 180;
const MINI_THRESHOLD_EXIT_DELAY = 1100;
const ACCESS_PIN = '062026';

const translations = {"en":{"page":{"title":"MOSCATELLI Studio"},"sections":{"threshold":"Dashboard","mandate":"Mandate","atlas":"Atlas","codex":"Codex","manufattura":"Manufattura","circuit":"Circuit","links":"Links","decisions":"Decision Register","lotto":"Lotto (I - II - III)"},"preview":{"threshold":"Operational surface for priorities, open decisions, launch signals, and current momentum.","mandate":"The current house position: launch priorities, decision rules, and growth discipline.","atlas":"Visual territories, image references, packaging logic, and colour atmosphere.","codex":"Locked principles, technical facts, validation rules, and non-negotiables.","manufattura":"Material decisions, making logic, packaging detail, and the discipline of the object.","circuit":"People, operating roles, and the route between Rome, Brazil, and launch execution.","links":"Connected websites, private rooms, and future Moscatelli digital surfaces.","decisions":"Locked, pending, and rejected decisions kept as an internal founder ledger.","lotto":"Product workspace for Lotto I, with II and III reserved until proof is earned."},"nav":{"topline":"Navigation","selected":"Selected","metaArrows":"Arrows to move","metaEnter":"Enter to open","metaEsc":"Esc to close","languageLabel":"Language"},"veil":{"pin":"Access code"},"detail":{"close":"Close detail","openPrefix":"Open"},"home":{"statusPill":"Internal draft","statusCopy":"One surface for judgment, rhythm, and alignment.","eyebrow":"Rome / internal studio / authorial control","h1":"Protect the standard.<br><em>Advance only</em> what earns the name.","sub":"This room exists to keep Moscatelli coherent: image, material, ritual, people, and launch decisions held within one controlled surface.","btnEnter":"Open mandate","btnMap":"Open map","band1":"Roman restraint","band2":"Founder validation","band3":"Proof before scale","hint":"Swipe to navigate"},"mandate":{"title":"Mandate","kicker":"House position","h3":"An ultra-luxury Roman house built on restraint, authorship, and ritual.","p":"Launch must feel institutional, never promotional. The first task is not breadth but authority: a small capsule, exact packaging, disciplined imagery, and decisions strong enough to survive scrutiny.","btn":"Open atlas","cardA":{"title":"Launch priority","p":"Scarf capsule first: Bianco Avorio and Terra Bruna, ivory rigid box, oxblood ritual kept discreet."},"cardB":{"title":"Decision rule","p":"Nothing advances without physical validation, founder sign-off, and evidence worth archiving."},"cardC":{"title":"Growth discipline","p":"Proof of sales before outside capital. Scale follows traction; it never substitutes for it."}},"atlas":{"title":"Atlas","card1":{"title":"Scarf / Bianco Avorio","p":"Calm exterior. Warm-stone light. Controlled fringe."},"card2":{"title":"Scarf / Terra Bruna","p":"The darker counterweight: earth, depth, permanence."},"card3":{"title":"Packaging / Bianco Avorio","p":"Institutional calm. Blind presence. No loud signature."},"card4":{"title":"Ritual / Oxblood reserve","p":"Oxblood appears as hidden gravity: wax, fold, and interior moment."},"sideKicker":"Visual doctrine","sideP":"Keep surfaces matte, shadowed, and quiet. Ivory should feel like warm stone, never bridal white. Oxblood must lean brown, never bright. Every image should imply authority before explanation.","rule1":"Warm-stone ivory","rule2":"Brown-based oxblood","rule3":"Roman shadow","rule4":"No visual noise"},"codex":{"title":"Codex","tag1":"Material","tag2":"Validation","tag3":"Commercial","row1":{"title":"Launch scarf","sub":"190 × 31 cm, baby alpaca, controlled drape, straight dense fringe.","tag":"Active"},"row2":{"title":"Packaging doctrine","sub":"Ivory rigid box; oxblood reserved for wax seal, envelope, and hidden ritual.","tag":"Binding"},"row3":{"title":"Colour approval","sub":"Physical lab dips under D65 or agreed equivalent. No screen approvals.","tag":"Binding"},"row4":{"title":"Investor rule","sub":"Angel capital only after proof of sales, even at modest initial volume.","tag":"Locked"},"row5":{"title":"Validation authority","sub":"Final aesthetic approval remains with Gianluca alone.","tag":"Foundational"}},"manu":{"title":"Manufattura","quote":"Quiet surfaces.<br>Exact edges.<br>Emotional authority at close range.","sub":"Current workstreams: scarf sampling, label language, box proportions, launch imagery, and the invisible details that make the house feel inevitable.","metric1":{"title":"Material","copy":"Baby alpaca with a compact matte surface and disciplined fall."},"metric2":{"title":"Validation","copy":"Founder-only final sign-off, archived evidence, no casual approvals."},"metric3":{"title":"Ritual","copy":"Ivory calm outside; oxblood gravity reserved for the interior moment."},"figureKicker":"Label study","figureP":"Soft interior label logic. Quiet typography. “Made in Italy” held with dignity, never noise."},"circuit":{"title":"Circuit","invite":"Keep the circle small. Keep the standard absolute.","route":"Route","note":"Rome as house gravity. Brazil as working extension. Prato first, Biella second. Proof before capital.","card1":{"name":"Gianluca","role":"Founder / Creative direction","p":"Final validation, institutional tone, and the non-negotiable standard."},"card2":{"name":"Gabriela","role":"Strategy / Positioning","p":"Narrative discipline, market framing, and commercial alignment."},"card3":{"name":"Marcella","role":"Chief of Staff / Coordination","p":"Task flow, follow-through, operational rhythm, and continuity across the team."},"card4":{"name":"Italian network","role":"Production intelligence / External","p":"Prato mills, Biella intelligence, rigid-box partners, and the physical truth of materials on the ground."}},"details":{"atlas1":{"kicker":"Atlas I / colour anchor","title":"Scarf / Bianco Avorio","image":"assets/images/atlas-bianco-avorio.webp","alt":"Moscatelli scarf in Bianco Avorio","body":"<p>Bianco Avorio is not white. It must read as calm stone warmed by light — dry, noble, and unforced.</p><p>For the scarf, this colour carries the exterior discipline of the house: silence first, softness second. Fringe must remain straight, dense, and governed.</p><p>The objective is composure, not softness for its own sake.</p>"},"atlas2":{"kicker":"Atlas II / counterweight","title":"Scarf / Terra Bruna","image":"assets/images/atlas-terra-bruna.webp","alt":"Moscatelli scarf in Terra Bruna","body":"<p>Terra Bruna exists as the darker counterpart to Bianco Avorio: aged wood, raw cacao, earth after rain.</p><p>It should never read as generic brown. The role of this colour is to give the launch pair seriousness, depth, and masculine gravity without aggression.</p><p>Every photographic use should preserve shadow detail and avoid red contamination.</p>"},"atlas3":{"kicker":"Atlas III / packaging calm","title":"Packaging / Bianco Avorio","image":"assets/images/packaging-bianco-avorio.webp","alt":"Moscatelli packaging in Bianco Avorio","body":"<p>The rigid box must feel institutional, not decorative. Blind embossing is preferable to noisy contrast.</p><p>Ivory here works as the architectural face of the house: calm, measured, and almost administrative in its restraint.</p><p>The correct sensation is: this object already belongs in an archive.</p>"},"atlas4":{"kicker":"Atlas IV / hidden gravity","title":"Ritual / Oxblood reserve","image":"assets/images/ritual-oxblood.webp","alt":"Moscatelli ritual packaging in oxblood","body":"<p>Oxblood is not for public shouting. It belongs to sealed moments: wax, envelope interior, hidden fold, sacred punctuation.</p><p>Its role is ceremonial gravity. It should lean brown, matte, and antique — never lipstick red, never glossy, never festive.</p><p>Used correctly, it deepens the ritual without cheapening the exterior calm.</p>"},"codex1":{"kicker":"Material / launch object","title":"Launch scarf","body":"<p>The launch object is deliberately narrow in scope: one scarf format, one controlled proportion, one material discipline.</p><p><strong>Current fixed points:</strong> 190 × 31 cm, baby alpaca, compact matte hand, controlled drape, and straight dense fringe.</p><p>The point is not novelty. The point is to establish authority through proportion, surface, and finish.</p>"},"codex2":{"kicker":"Validation / packaging doctrine","title":"Packaging doctrine","body":"<p>Primary packaging remains Bianco Avorio. Oxblood is withheld for the inner ritual: wax seal, envelope logic, and hidden moments of gravity.</p><p>This separation matters. Exterior calm builds institutional trust; interior oxblood delivers memorability without theatrical excess.</p><p>Any packaging proposal that reverses this hierarchy should be rejected.</p>"},"codex3":{"kicker":"Validation / colour truth","title":"Colour approval","body":"<p>Colour is approved physically, not digitally. Lab dips must be read under D65 or an agreed neutral equivalent.</p><p>Screen approvals are insufficient because the house standard depends on material truth, not simulated colour.</p><p>Approved swatches must be archived with date, lot reference, and founder validation.</p>"},"codex4":{"kicker":"Commercial / capital discipline","title":"Investor rule","body":"<p>Outside capital enters only after proof of sales. Even modest proof is more valuable than a large speculative story.</p><p>This keeps leverage with the house and prevents narrative inflation before the object has earned its place.</p><p>The order is fixed: object, response, proof, then scale.</p>"},"codex5":{"kicker":"Validation / authority","title":"Validation authority","body":"<p>Final aesthetic approval remains with Gianluca alone. This is not vanity; it is a control mechanism for coherence.</p><p>Contributors may recommend, refine, and challenge. They do not close the matter.</p><p>What enters the archive must reflect one final house standard, not a negotiated average.</p>"},"decision1":{"kicker":"Packaging / locked","title":"Ivory packaging confirmed as primary direction","body":"<p>The primary box direction remains Bianco Avorio. The exterior must communicate institutional calm before any decorative emotion appears.</p><p><strong>Rationale:</strong> ivory supports restraint, permanence, and quiet authority. It gives Moscatelli a controlled first impression rather than a theatrical one.</p><p><strong>Decision state:</strong> locked, subject only to physical box-sample validation of material, proportion, and finish.</p>"},"decision2":{"kicker":"Colour / locked","title":"Oxblood reserved as accent and ritual colour","body":"<p>Rosso Essenza / oxblood remains reserved for the interior ritual: wax seal, envelope logic, hidden detail, or controlled accent.</p><p><strong>Rationale:</strong> oxblood is powerful when it appears as discovery. Used as the primary box colour, it becomes too heavy and too theatrical for the first expression of the house.</p>"},"decision3":{"kicker":"Launch / locked","title":"Lotto I remains the proof event","body":"<p>The first scarf launch exists to prove discipline, commercial response, and taste. It is not a vanity launch and should not be inflated before the object earns confidence.</p><p><strong>Rule:</strong> object, response, proof, then scale.</p>"},"decision4":{"kicker":"Product / pending","title":"Fringe length remains pending physical validation","body":"<p>The desired direction remains short, dense, disciplined, and straight. The final length must be confirmed by physical sample rather than screen judgement.</p><p><strong>Open question:</strong> whether the most controlled expression is 3.5 cm or a slightly longer tested alternative.</p>"},"decision5":{"kicker":"Material / pending","title":"GSM remains pending sample validation","body":"<p>The intended hand is compact, refined, matte, and architectural. GSM remains pending because weight alone cannot prove elegance.</p><p><strong>Validation requirement:</strong> hand feel, drape, surface compactness, warmth, and resistance to blanket-like limpness.</p>"},"decision6":{"kicker":"Sourcing / active direction","title":"Supplier approach: Prato first, Biella second","body":"<p>The first reconnaissance direction remains Prato before Biella. This gives Moscatelli a practical route into production conversations before escalating into more selective supplier territory.</p><p><strong>Purpose:</strong> compare seriousness, MOQ flexibility, sample willingness, material understanding, and credibility.</p>"},"rejectedArchive":{"kicker":"Rejected entries / archive","title":"Rejected decision archive","body":"<p><strong>Oxblood primary box</strong><br />Rejected because it makes the first physical impression too heavy, too theatrical, and less institutionally calm than ivory.</p><p><strong>Ornate hemstitch on first scarf</strong><br />Rejected for Lotto I because it introduces decorative noise before the product has proven proportion, material, and surface discipline.</p><p><strong>Introductory discounting</strong><br />Rejected because it weakens luxury price authority and trains early clients to expect commercial concession.</p><p><strong>Pattern-led first scarf</strong><br />Rejected for the first expression because the launch must prove restraint, colour, finish, and hand before visual complexity.</p>"}},"common":{"return":"← Return"},"links":{"title":"Links","kicker":"Internal directory","intro":"A structured index for Moscatelli surfaces, tools, materials, and future private destinations.","warning":"Private MOSCATELLI links shouldn't be shared with third parties outside of the business.","status":{"active":"ACTIVE","construction":"IN CONSTRUCTION","unavailable":"UNAVAILABLE"},"categories":{"public":{"kicker":"01","title":"Public Surfaces"},"tools":{"kicker":"02","title":"Internal Tools"},"finance":{"kicker":"03","title":"Finance"},"investor":{"kicker":"04","title":"Investor Materials"},"product":{"kicker":"05","title":"Product / Manufattura"},"admin":{"kicker":"06","title":"Admin / Infrastructure"},"research":{"kicker":"07","title":"Research"}},"items":{"website":{"title":"MOSCATELLI Website","note":"moscatelli-official.netlify.app","detail":"Public-facing surface. Keep visible here because it is safe to open and share externally."},"mrhg":{"title":"MRHG Website","note":"gianmoska-prog.github.io/MRHG","detail":"Public holding-group surface for Moscatelli Roza Holding Group. Keep visible because it is an active external reference."},"checkout":{"title":"Checkout / purchase path","note":"Public sales flow placeholder","detail":"Reserved for the future public purchase or payment surface once it has been properly tested."},"studioTools":{"title":"Studio tools vault","note":"Internal utilities placeholder","detail":"Reserved for future internal utilities. It is intentionally not linked yet."},"notes":{"title":"Founder notes","note":"Private scratchpad placeholder","detail":"Reserved for a future notes module. It should not hold sensitive data until the app is protected."},"financeSuite":{"title":"Financial Suite","note":"gianmoska-prog.github.io/Finance-Suite","detail":"Live internal finance surface. It remains external to Studio for now."},"financeAdmin":{"title":"Private finance admin","note":"Do not embed yet","detail":"Private finance/admin links should stay out of the static app until protected hosting exists."},"pitchDeck":{"title":"Pitch Deck","note":"gianmoska-prog.github.io/Moscatelli","detail":"Current investor-facing presentation surface. Keep version status under review."},"investorArchive":{"title":"Investor archive","note":"Deck versions and evidence later","detail":"Reserved for future deck versions, investor notes, proof material, and private documents."},"techPack":{"title":"Lotto I technical file","note":"Specs, samples, QC evidence","detail":"Reserved for the future technical file linked to Lotto I sample validation."},"packagingArchive":{"title":"Packaging archive","note":"Box, insert, wax, folding tests","detail":"Reserved for packaging references, physical tests, dimensions, and validation evidence."},"hosting":{"title":"Hosting dashboard","note":"Private admin link withheld","detail":"Do not place hosting, domain, or deployment admin URLs here until access is protected."},"payments":{"title":"Payment dashboard","note":"Private admin link withheld","detail":"Payment and admin links remain excluded from the static directory for safety."},"millResearch":{"title":"Mill research board","note":"Future research surface","detail":"Reserved for verified mill research, not invented supplier lists."},"referenceVault":{"title":"Reference vault","note":"Visual and market references later","detail":"Reserved for structured references once the archive system is built."},"comingSoon":{"title":"Coming Soon Page","note":"moscatelli.co","detail":"Public domain threshold for MOSCATELLI. Keep visible as the primary coming-soon surface while the full commercial website remains under development."},"storyboard":{"title":"Lotto I Storyboard","note":"gianmoska-prog.github.io/Lotto1Storyboard","detail":"Narrative storyboard page for the Lotto I film and launch sequence. Useful for visual continuity, casting, and production alignment."}}},"dashboard":{"kicker":"Internal command surface","title":"Dashboard","intro":"A compact operating view for Moscatelli’s current proof phase: priorities, open decisions, launch readiness, and current momentum.","stateLabel":"Current state","stateValue":"Launch structure in progress","cards":{"lotto":{"label":"Lotto I readiness","value":"Workspace established","copy":"The first static product workspace is now present inside Studio."},"decisions":{"label":"Open decisions","value":"To be registered","copy":"Decision Register is now active; pending items will continue to be refined as evidence appears."},"suppliers":{"label":"Supplier outreach","value":"5 pending / 1 archived / 1 queued","copy":"Five active contact routes are pending; MA.AL.BI. is archived and Kaleidos remains queued."},"budget":{"label":"Budget / runway","value":"Pending financial sync","copy":"Financial truth will be surfaced after the dashboard structure is expanded."},"locked":{"label":"Latest locked decision","value":"Ivory packaging confirmed","copy":"Primary exterior calm remains Bianco Avorio; oxblood stays reserved for the inner ritual."},"launch":{"label":"Launch readiness","value":"Checklist embedded","copy":"A first static readiness panel now sits inside Dashboard."}},"priorities":{"kicker":"Current priorities","copy":"A restrained working list for the proof phase. Not a full task board yet.","item1":"Lock Lotto I technical variables","item2":"Build supplier shortlist","item3":"Prepare Prato outreach"}},"decisions":{"title":"Decision Register","kicker":"Founder validation ledger","intro":"A first static register for locked, active, and pending decisions. This surface exists to prevent repeated debates and preserve the reasoning behind each standard.","status":{"locked":"Locked","pending":"Pending","active":"Active direction"},"entries":{"d1":{"date":"2026","category":"Packaging","title":"Ivory packaging confirmed as primary direction","rationale":"Primary exterior calm remains Bianco Avorio."},"d2":{"date":"2026","category":"Colour / Ritual","title":"Oxblood reserved as accent and ritual colour","rationale":"Used for wax, envelope logic, and interior gravity — not the box body."},"d3":{"date":"2026","category":"Launch","title":"Lotto I scarf launch remains the proof event","rationale":"The launch must prove taste, discipline, and sales response before scale."},"d4":{"date":"2026","category":"Product","title":"Fringe length remains pending physical validation","rationale":"Target discipline exists; final length waits for sample evidence."},"d5":{"date":"2026","category":"Material","title":"GSM remains pending sample validation","rationale":"The target range must be proven by hand, drape, compactness, and surface."},"d6":{"date":"2026","category":"Sourcing","title":"Supplier approach: Prato first, Biella second","rationale":"A practical reconnaissance route before higher-commitment supplier conversations."}},"rejected":{"kicker":"Rejected entries","intro":"Rejected ideas are kept separate so the house remembers what was refused without polluting the active register.","button":"View rejected archive","items":{"r1":{"category":"Packaging","title":"Oxblood primary box","reason":"Rejected for excessive theatrical weight."},"r2":{"category":"Product finish","title":"Ornate hemstitch on first scarf","reason":"Rejected for decorative noise in Lotto I."}}}},"lotto":{"title":"Lotto (I - II - III)","kicker":"Product workspace","intro":"A first static workspace for the proof object. Lotto I is active; Lotto II and III remain reserved until the first product earns expansion.","tabs":{"one":{"label":"I","copy":"Active"},"two":{"label":"II","copy":"Reserved"},"three":{"label":"III","copy":"Reserved"}},"product":{"kicker":"Lotto I","title":"Lotto I Scarf","copy":"The first Moscatelli proof object: narrow, disciplined, materially judged, and not allowed to expand before physical validation."},"status":{"locked":"Locked","pending":"Pending validation","active":"Active direction"},"specs":{"dimensions":{"label":"Dimensions","value":"190 × 31 cm"},"material":{"label":"Material","value":"Baby alpaca"},"yarn":{"label":"Yarn direction","value":"Nm 2/40–2/48, two-ply"},"gsm":{"label":"GSM","value":"Pending sample validation"},"fringe":{"label":"Fringe","value":"3.5 cm target"},"finish":{"label":"Finish","value":"Compact, matte, minimal halo"}},"colours":{"kicker":"Colourways","one":"Terra Bruna","two":"Bianco Avorio"},"packaging":{"kicker":"Packaging dependency","copy":"Ivory primary box; oxblood accent ritual. Final box dimensions wait for real folding tests with the approved scarf sample."},"sample":{"kicker":"Sample validation","copy":"No final approval by screen, theory, or supplier promise. The physical sample must prove hand, drape, colour, edge, fringe, and fold."},"questions":{"kicker":"Open technical questions","copy":"These remain visible so the product does not drift into vague enthusiasm before evidence exists.","q1":"Final GSM","q2":"Final fringe length","q3":"Exact box dimensions after folding test","q4":"Mill-standard dimension tolerance","q5":"Final hand-feel after sample review"}},"supplierDesk":{"buttonKicker":"Internal module","buttonTitle":"Supplier Desk","buttonCopy":"Open contacted mills, pending replies, risks, and future supplier structure.","title":"Supplier Desk","kicker":"Manufattura / sourcing structure","intro":"A reserved workspace for mills, packaging, labels, trims, and production support. Current mill outreach is logged here without treating any supplier as approved.","close":"Close Supplier Desk","categories":{"kicker":"Categories","mills":"Mills","packaging":"Packaging","labels":"Labels / trims","production":"Photography / production support"},"placeholders":{"kicker":"Future slots","copy":"Use this structure only for additional verified or contacted suppliers. Do not invent supplier records.","empty":"Empty slot","name":"Supplier name","location":"Location","status":"Status","action":"Next action","millsNow":"7 mill records / 5 pending / 1 archived / 1 queued","category":"Category","email":"Email"},"example":{"kicker":"Example only","title":"Supplier entry template","categoryLabel":"Category","categoryValue":"Mills","locationLabel":"Location","locationValue":"To specify","statusLabel":"Status","statusValue":"To research","actionLabel":"Next action","actionValue":"Define first contact step","note":"Template row only; replace later with verified supplier data."},"status":{"template":"Template","empty":"Empty","research":"To research","contacted":"Contacted","responded":"Archived for Lotto I","archived":"Archived for Lotto I","indirect":"Indirect contact","queued":"Queued"},"risks":{"kicker":"Supplier risks","copy":"A compact register of issues that can damage Lotto I before production even begins.","r1":"MOQ too high for proof-stage production","r2":"Prototype pricing too expensive for the launch budget","r3":"Finish too soft, fuzzy, or blanket-like","r4":"Supplier unwilling to support a low initial quantity","r5":"Packaging dimensions unresolved before sample folding tests"},"details":{"template":"This row exists only as a structural example. Do not treat it as a real supplier record.","empty":"Reserved position for future verified suppliers. No invented company names should be placed here.","research":"Research status means no commitment, no contact, and no evidence yet."},"contacted":{"kicker":"Mills / contacted","sentStatus":"Contacted 05 May 2026","nextAction":"Await reply; follow up after 5–7 working days if silent.","note":"Initial scarf sample outreach sent. Await capability, sample cost, lead time, MOQ per colour, indicative unit price, and yarn-sourcing answer."},"contacts":{"locatex":{"name":"Locatex"},"maalbi":{"name":"MA.AL.BI."},"mylab":{"name":"MyLab"},"manifatturabig":{"name":"Manifattura BIG","sentStatus":"Contacted 25 May 2026","nextAction":"Await reply; request technical confirmation before treating as active development route.","note":"Second-wave outreach sent for the 100% baby alpaca scarf. Strong Prato accessory-production candidate; await capability, sample cost, lead time, MOQ, and yarn availability."},"sasso":{"name":"Sciarpificio dei Fratelli Sasso / Artknit route","sentStatus":"Contacted via Artknit 25 May 2026","nextAction":"Await Artknit reply or direct Sasso introduction; do not treat as factory-confirmed yet.","note":"Biella scarf-maker lead currently approached through Artknit. Capability must still be verified directly before any sample route is trusted."},"gammatex":{"name":"Gammatex","sentStatus":"Contacted 25 May 2026","nextAction":"Await reply; verify whether their alpaca and scarf capability can meet Lotto I discipline.","note":"Second-wave outreach sent. Public fit is plausible for scarves, stoles and alpaca, but Lotto I requires direct confirmation of fibre, surface, GSM, fringe and MOQ."},"kaleidos":{"name":"Kaleidos","email":"To confirm","sentStatus":"Second-wave lead; not contacted","nextAction":"Research correct contact route before outreach.","note":"Held as a second-wave lead only. Do not advance to contacted status until the correct route is confirmed and the first email is actually sent."}},"responded":{"kicker":"Mills / archived for Lotto I","sentStatus":"Closed politely 06 May 2026","nextAction":"No Lotto I action; retain as future wool/cashmere contact only.","note":"Final reply: no matching article and no routine use of the requested baby alpaca yarn. From-zero development would require testing finishes, yields, yarn sourcing, and several hundred pieces as sampling. Thread closed respectfully; not active for Lotto I."},"archived":{"kicker":"Mills / archived for Lotto I","sentStatus":"Closed politely 06 May 2026","nextAction":"No Lotto I action; retain as future wool/cashmere contact only.","note":"Final reply: no matching article and no routine use of the requested baby alpaca yarn. From-zero development would require testing finishes, yields, yarn sourcing, and several hundred pieces as sampling. Thread closed respectfully; not active for Lotto I."},"indirect":{"kicker":"Mills / indirect route"},"queued":{"kicker":"Mills / second wave"}},"launchReadiness":{"kicker":"Dashboard module","title":"Launch Readiness","intro":"A first static checklist for the conditions that must exist before Lotto I can launch properly.","seal":"Static v1","status":{"progress":"In progress","pendingValidation":"Pending validation","pendingStructure":"Pending structure","notStarted":"Not started","pendingSync":"Pending sync","pendingEvidence":"Pending evidence","pendingReview":"Pending review"},"areas":{"product":{"label":"Product","copy":"Lotto I workspace exists; GSM, fringe, and final hand-feel still need physical validation."},"production":{"label":"Supplier / production","copy":"Seven mill records are logged: five active contact routes pending reply, one archived for Lotto I, and one second-wave lead still not approached."},"packaging":{"label":"Packaging","copy":"Ivory primary direction is locked; exact box dimensions wait for real scarf folding tests."},"website":{"label":"Website / checkout","copy":"The public site and checkout path still need a dedicated launch-readiness review."},"photography":{"label":"Photography","copy":"Editorial direction exists conceptually; no final product shoot package is recorded yet."},"finance":{"label":"Finance","copy":"Finance Suite exists externally; Dashboard does not yet display live or manual KPI truth."},"fulfilment":{"label":"Fulfilment","copy":"Handling, shipping, inserts, and final dispatch sequence are not yet mapped in Studio."},"investor":{"label":"Investor proof","copy":"Investor proof depends on real product, real sales evidence, and documented launch discipline."},"admin":{"label":"Legal / admin","copy":"Legal and admin readiness need a dedicated later module before serious private data is added."}}},"aria":{"languageSelector":"Language selector","languageSelectorMenu":"Language selector inside menu","returnThreshold":"Return to threshold","openNavigation":"Open navigation","closeMenu":"Close menu","sectionRail":"Section rail","version":"MOSCATELLI Studio version v90. Last changed: 25 May 2026, 11:49 CEST","currentState":"Current Studio state","operationalStatus":"Moscatelli operational status","launchChecklist":"Launch readiness checklist","codexFilters":"Codex filters","decisionRegister":"Moscatelli decision register entries","rejectedPreview":"Rejected decision preview","lottoWorkspaces":"Lotto workspaces","lottoTechnical":"Lotto I technical direction","supplierCategories":"Supplier categories","linksDirectory":"MOSCATELLI internal links directory","openWebsite":"Open Moscatelli website in browser","openFinance":"Open Moscatelli Financial Suite in browser","openPitch":"Open Moscatelli pitch deck in browser","mobileNavigation":"Mobile section navigation","openMRHG":"Open MRHG website in browser","openComingSoon":"Open Moscatelli Coming Soon page in browser","openStoryboard":"Open Lotto I Storyboard in browser"},"generated":{"dashboardDetails":{"lotto":"The first static Lotto I workspace is now present: dimensions, material direction, GSM, fringe, colourways, packaging dependency, and open technical questions.","decisions":"Decision Register is now active: locked, pending, active, and rejected entries are held as the first founder-validation ledger.","suppliers":"Supplier Desk now records seven mill records: five active contact routes pending reply, MA.AL.BI. archived for Lotto I, and Kaleidos queued for second-wave research. The Sasso route remains indirect through Artknit until factory-confirmed.","budget":"Reserved for Finance Suite sync or manual KPI entry: budget, committed spend, remaining runway, and unit-economics warnings.","launch":"Launch Readiness is now embedded inside Dashboard as a compact checklist for product, production, packaging, website, finance, fulfilment, investor proof, and admin readiness.","locked":"Reserved for the latest founder-approved decision with date, reasoning, and supporting evidence."},"statusDetails":{"launchProgressProduct":"In progress means the area exists in Studio, but proof, evidence, or final approval remains incomplete.","launchProgressSuppliers":"In progress means supplier outreach is now broader, but no mill is approved until capability, sample cost, lead time, MOQ, yarn availability, fringe discipline, and physical sample quality are confirmed.","launchPendingValidation":"Pending validation means the direction is accepted, but the physical test has not yet confirmed dimensions, fit, or finish.","launchPendingStructure":"Pending structure means the area must be mapped before it can be judged ready or confirmed.","launchNotStarted":"Not started means no approved evidence, schedule, or deliverable has been recorded inside Studio yet.","launchPendingSync":"Pending synchronization means the external tool or source exists, but Dashboard does not yet surface its current truth.","launchPendingEvidence":"Pending evidence means the claim must wait for product, sale, document, or validation proof.","launchPendingReview":"Pending review means the area has not yet been audited enough to receive a serious status.","lottoDimensions":"Working direction: keep this proportion unless mill standardisation improves consistency without weakening the object.","lottoMaterial":"Material direction is confirmed for the first proof object unless sampling exposes a serious quality or sourcing issue.","lottoYarn":"Technical range to discuss with mills; final yarn choice must be proven by sample hand, drape, and surface compactness.","lottoGsm":"Weight cannot be approved by number alone; final GSM must survive touch, drape, compactness, warmth, and anti-blanket discipline.","lottoFringe":"Target remains short and controlled; final approval waits for physical tests of density, splay, parallel fall, and edge discipline.","lottoFinish":"The surface must feel refined and architectural; excessive fuzz, blanket softness, or limp drape should trigger rejection.","lottoTerra":"Deep warm chocolate / mahogany-adjacent brown. Must avoid generic flat brown or visible red contamination.","lottoAvorio":"Warm ivory, not optical white, not bridal, not yellowed. Must read as calm stone warmed by light.","lottoPackaging":"Box dimensions should not be confirmed until the sample is folded, tested for compression, and photographed in the intended ritual sequence.","lottoSample":"Validation requires physical review and evidence worthy of archiving before any production commitment.","supplierTemplate":"This row exists only as a structural example. Do not treat it as a real supplier record.","supplierResearch":"Research status means no commitment, no contact, and no evidence yet.","supplierContacted":"Initial email sent. No supplier is approved until capability, sample cost, lead time, MOQ, yarn availability, fringe discipline, and physical sample quality are confirmed.","supplierResponded":"MA.AL.BI. confirmed that they do not currently hold this type of baby alpaca article or yarn; a from-zero development would require testing finishes, yields, yarn sourcing, and several hundred pieces as sampling. Archived for Lotto I, retained only for future wool/cashmere possibilities.","supplierArchived":"MA.AL.BI. confirmed that they do not currently hold this type of baby alpaca article or yarn; a from-zero development would require testing finishes, yields, yarn sourcing, and several hundred pieces as sampling. Archived for Lotto I, retained only for future wool/cashmere possibilities.","supplierIndirect":"Outreach has gone through an intermediary route. Treat as pending intelligence, not direct factory confirmation, until the actual mill or a reliable representative answers with technical capability.","supplierQueued":"Queued means the lead is recognised but not yet contacted. No assumptions should be made about capability, MOQ, pricing, sample route, or willingness to work with Moscatelli."},"version":{"lastChanged":"Last changed: 25 May 2026, 11:49 CEST"}}},"it":{"page":{"title":"MOSCATELLI Studio"},"sections":{"threshold":"Quadro operativo","mandate":"Mandato","atlas":"Atlas","codex":"Codex","manufattura":"Manufattura","circuit":"Circuito","links":"Link","decisions":"Registro Decisioni","lotto":"Lotto (I - II - III)"},"preview":{"threshold":"Superficie operativa per priorità, decisioni aperte, segnali di lancio e slancio attuale.","mandate":"La posizione attuale della casa: priorità di lancio, regole decisionali e disciplina di crescita.","atlas":"Territori visivi, immagini di riferimento, logica del packaging e atmosfera cromatica.","codex":"Principi vincolanti, dati tecnici, regole di validazione e punti non negoziabili.","manufattura":"Decisioni sui materiali, logica produttiva, dettaglio del packaging e disciplina dell’oggetto.","circuit":"Persone, ruoli operativi e percorso tra Roma, Brasile ed esecuzione del lancio.","links":"Siti collegati, stanze private e future superfici digitali Moscatelli.","decisions":"Decisioni confermate, in sospeso e respinte conservate come registro interno del fondatore.","lotto":"Spazio di prodotto per il Lotto I, con II e III riservati finché la prova non viene ottenuta."},"nav":{"topline":"Navigazione","selected":"Selezionato","metaArrows":"Frecce per muoversi","metaEnter":"Invio per aprire","metaEsc":"Esc per chiudere","languageLabel":"Lingua"},"veil":{"pin":"Codice d’accesso"},"detail":{"close":"Chiudi dettaglio","openPrefix":"Apri"},"home":{"statusPill":"Bozza interna","statusCopy":"Un’unica superficie per giudizio, ritmo e allineamento.","eyebrow":"Roma / studio interno / controllo autoriale","h1":"Proteggere lo standard.<br><em>Far avanzare solo</em> ciò che merita il nome.","sub":"Questo spazio serve a mantenere Moscatelli coerente: immagine, materia, rituale, persone e decisioni di lancio tenute dentro una sola superficie controllata.","btnEnter":"Apri mandato","btnMap":"Apri mappa","band1":"Misura romana","band2":"Validazione del fondatore","band3":"Prova prima dell’espansione","hint":"Scorri per navigare"},"mandate":{"title":"Mandato","kicker":"Posizione della casa","h3":"Una casa romana di ultra-lusso fondata su rigore, autorialità e rituale.","p":"Il lancio deve apparire istituzionale, mai promozionale. Il primo compito non è l’ampiezza ma l’autorità: una capsule ridotta, packaging esatto, immagini disciplinate e decisioni capaci di reggere all’esame.","btn":"Apri Atlas","cardA":{"title":"Priorità di lancio","p":"Prima la capsule di sciarpe: Bianco Avorio e Terra Bruna, scatola rigida avorio, rituale oxblood mantenuto discreto."},"cardB":{"title":"Regola decisionale","p":"Nulla avanza senza validazione fisica, firma finale del fondatore ed evidenza degna di archivio."},"cardC":{"title":"Disciplina di crescita","p":"Prima la prova di vendita, poi il capitale esterno. L’espansione segue la trazione; non la sostituisce mai."}},"atlas":{"title":"Atlas","card1":{"title":"Sciarpa / Bianco Avorio","p":"Calma esteriore. Luce di pietra calda. Frangia controllata."},"card2":{"title":"Sciarpa / Terra Bruna","p":"Il contrappeso più scuro: terra, profondità, permanenza."},"card3":{"title":"Imballaggio / Bianco Avorio","p":"Calma istituzionale. Presenza in rilievo cieco. Nessuna firma rumorosa."},"card4":{"title":"Rituale / riserva oxblood","p":"L’oxblood appare come gravità nascosta: ceralacca, piega e momento interno."},"sideKicker":"Dottrina visiva","sideP":"Le superfici devono restare opache, ombrate e quiete. L’avorio deve sembrare pietra calda, mai bianco nuziale. L’oxblood deve tendere al bruno, mai al brillante. Ogni immagine deve suggerire autorità prima della spiegazione.","rule1":"Avorio da pietra calda","rule2":"Oxblood a base bruna","rule3":"Ombra romana","rule4":"Nessun rumore visivo"},"codex":{"title":"Codex","tag1":"Materiale","tag2":"Validazione","tag3":"Commerciale","row1":{"title":"Sciarpa di lancio","sub":"190 × 31 cm, baby alpaca, caduta controllata, frangia densa e diritta.","tag":"Attivo"},"row2":{"title":"Dottrina dell’imballaggio","sub":"Scatola rigida avorio; oxblood riservato a ceralacca, busta e rituale nascosto.","tag":"Vincolante"},"row3":{"title":"Approvazione colore","sub":"Lab dip fisici sotto D65 o equivalente concordato. Nessuna approvazione a schermo.","tag":"Vincolante"},"row4":{"title":"Regola investitori","sub":"Capitale angel solo dopo prova di vendita, anche su volumi iniziali contenuti.","tag":"Confermato"},"row5":{"title":"Autorità di validazione","sub":"L’approvazione estetica finale resta solo a Gianluca.","tag":"Fondativo"}},"manu":{"title":"Manufattura","quote":"Superfici quiete.<br>Bordi esatti.<br>Autorità emotiva da vicino.","sub":"Filoni di lavoro attuali: campionatura della sciarpa, linguaggio dell’etichetta, proporzioni del box, immagini di lancio e i dettagli invisibili che rendono la casa inevitabile.","metric1":{"title":"Materiale","copy":"Baby alpaca con superficie compatta, opaca e una caduta disciplinata."},"metric2":{"title":"Validazione","copy":"Firma finale del fondatore, evidenze archiviate, nessuna approvazione informale."},"metric3":{"title":"Rituale","copy":"Calma avorio all’esterno; gravità oxblood riservata al momento interno."},"figureKicker":"Studio etichetta","figureP":"Logica dell’etichetta interna morbida. Tipografia quieta. “Made in Italy” tenuto con dignità, mai con rumore."},"circuit":{"title":"Circuito","invite":"Mantenere il cerchio piccolo. Mantenere lo standard assoluto.","route":"Percorso","note":"Roma come gravità della casa. Il Brasile come estensione operativa. Prima Prato, poi Biella. Prova prima del capitale.","card1":{"name":"Gianluca","role":"Fondatore / Direzione creativa","p":"Validazione finale, tono istituzionale e standard non negoziabile."},"card2":{"name":"Gabriela","role":"Strategia / Posizionamento","p":"Disciplina narrativa, inquadramento di mercato e allineamento commerciale."},"card3":{"name":"Marcella","role":"Coordinamento operativo","p":"Flusso dei compiti, continuità operativa, ritmo e seguito esecutivo del team."},"card4":{"name":"Rete italiana","role":"Ricerca produttiva / Esterno","p":"Lanifici di Prato, ricerca sul distretto di Biella, partner per scatole rigide e verifica fisica dei materiali sul campo."}},"details":{"atlas1":{"kicker":"Atlas I / ancora cromatica","title":"Sciarpa / Bianco Avorio","image":"assets/images/atlas-bianco-avorio.webp","alt":"Sciarpa Moscatelli in Bianco Avorio","body":"<p>Bianco Avorio non è bianco. Deve leggersi come pietra calma scaldata dalla luce — asciutta, nobile, mai forzata.</p><p>Per la sciarpa questo colore porta la disciplina esteriore della casa: prima il silenzio, poi la morbidezza. La frangia deve restare diritta, densa e governata.</p><p>L’obiettivo è la compostezza, non la morbidezza fine a sé stessa.</p>"},"atlas2":{"kicker":"Atlas II / contrappeso","title":"Sciarpa / Terra Bruna","image":"assets/images/atlas-terra-bruna.webp","alt":"Sciarpa Moscatelli in Terra Bruna","body":"<p>Terra Bruna esiste come controparte più scura del Bianco Avorio: legno invecchiato, cacao grezzo, terra dopo la pioggia.</p><p>Non deve mai apparire come un marrone generico. Il suo ruolo è dare serietà, profondità e gravità maschile alla coppia di lancio, senza aggressività.</p><p>Ogni uso fotografico deve preservare il dettaglio d’ombra ed evitare contaminazioni rosse.</p>"},"atlas3":{"kicker":"Atlas III / calma dell’imballaggio","title":"Imballaggio / Bianco Avorio","image":"assets/images/packaging-bianco-avorio.webp","alt":"Imballaggio Moscatelli in Bianco Avorio","body":"<p>La scatola rigida deve apparire istituzionale, non decorativa. L’embossing cieco è preferibile a qualsiasi contrasto rumoroso.</p><p>Qui l’avorio lavora come volto architettonico della casa: calmo, misurato, quasi amministrativo nel suo riserbo.</p><p>La sensazione corretta è: questo oggetto appartiene già a un archivio.</p>"},"atlas4":{"kicker":"Atlas IV / gravità nascosta","title":"Rituale / riserva oxblood","image":"assets/images/ritual-oxblood.webp","alt":"Packaging rituale Moscatelli in oxblood","body":"<p>L’oxblood non serve a gridare verso l’esterno. Appartiene ai momenti sigillati: ceralacca, interno della busta, piega nascosta, punteggiatura sacra.</p><p>Il suo ruolo è la gravità cerimoniale. Deve virare al bruno, opaco, antico — mai rosso acceso, mai lucido, mai festivo.</p><p>Usato correttamente, approfondisce il rituale senza indebolire la calma dell’esterno.</p>"},"codex1":{"kicker":"Materiale / oggetto di lancio","title":"Sciarpa di lancio","body":"<p>L’oggetto di lancio è volutamente ristretto nel suo perimetro: un solo formato, una sola proporzione controllata, una sola disciplina materica.</p><p><strong>Punti fissati ad oggi:</strong> 190 × 31 cm, baby alpaca, mano compatta e opaca, caduta controllata e frangia densa e diritta.</p><p>Il punto non è la novità. Il punto è stabilire autorità attraverso proporzione, superficie e finitura.</p>"},"codex2":{"kicker":"Validazione / dottrina dell’imballaggio","title":"Dottrina dell’imballaggio","body":"<p>L’imballaggio primario resta Bianco Avorio. L’oxblood è trattenuto per il rituale interno: ceralacca, logica della busta e momenti di gravità nascosta.</p><p>Questa separazione conta. La calma esterna costruisce fiducia istituzionale; l’oxblood interno consegna memorabilità senza eccesso teatrale.</p><p>Qualsiasi proposta di imballaggio che rovesci questa gerarchia va respinta.</p>"},"codex3":{"kicker":"Validazione / verità del colore","title":"Approvazione colore","body":"<p>Il colore si approva fisicamente, non digitalmente. I lab dip vanno letti sotto D65 o sotto un neutro concordato.</p><p>Le approvazioni a schermo non sono sufficienti, perché lo standard della casa dipende dalla verità materiale, non da una simulazione.</p><p>I campioni approvati vanno archiviati con data, riferimento di lotto e validazione del fondatore.</p>"},"codex4":{"kicker":"Commerciale / disciplina del capitale","title":"Regola investitori","body":"<p>Il capitale esterno entra solo dopo una prova di vendita. Anche una prova modesta vale più di una grande storia speculativa.</p><p>Questo mantiene la leva dentro la casa ed evita inflazione narrativa prima che l’oggetto abbia guadagnato il proprio posto.</p><p>L’ordine è fisso: oggetto, risposta, prova, poi espansione.</p>"},"codex5":{"kicker":"Validazione / autorità","title":"Autorità di validazione","body":"<p>L’approvazione estetica finale resta a Gianluca soltanto. Non è vanità; è un meccanismo di controllo per la coerenza.</p><p>I collaboratori possono raccomandare, rifinire e contestare. Non chiudono la questione.</p><p>Ciò che entra in archivio deve riflettere uno standard finale della casa, non una media negoziata.</p>"},"decision1":{"kicker":"Imballaggio / confermata","title":"Imballaggio avorio confermato come direzione primaria","body":"<p>La direzione della scatola primaria resta Bianco Avorio. L’esterno deve comunicare calma istituzionale prima di qualsiasi emozione decorativa.</p><p><strong>Ragione:</strong> l’avorio sostiene misura, permanenza e autorità silenziosa. Offre a Moscatelli una prima impressione controllata, non teatrale.</p><p><strong>Stato decisione:</strong> confermata, soggetta solo alla validazione fisica del campione scatola per materiale, proporzione e finitura.</p>"},"decision2":{"kicker":"Colore / confermata","title":"Oxblood riservato come accento e colore rituale","body":"<p>Rosso Essenza / oxblood resta riservato al rituale interno: sigillo di ceralacca, logica della busta, dettaglio nascosto o accento controllato.</p><p><strong>Ragione:</strong> l’oxblood è potente quando appare come scoperta. Come colore primario della scatola diventerebbe troppo pesante e troppo teatrale per la prima espressione della casa.</p>"},"decision3":{"kicker":"Lancio / confermata","title":"Il Lotto I resta l’evento di prova","body":"<p>Il primo lancio della sciarpa esiste per provare disciplina, risposta commerciale e gusto. Non è un lancio di vanità e non deve essere gonfiato prima che l’oggetto meriti fiducia.</p><p><strong>Regola:</strong> oggetto, risposta, prova, poi espansione.</p>"},"decision4":{"kicker":"Prodotto / in sospeso","title":"La lunghezza della frangia resta in attesa di validazione fisica","body":"<p>La direzione desiderata resta corta, densa, disciplinata e diritta. La misura finale deve essere confermata dal campione fisico.</p><p><strong>Domanda aperta:</strong> se l’espressione più controllata sia 3,5 cm o una variante leggermente più lunga.</p>"},"decision5":{"kicker":"Materiale / in sospeso","title":"Il GSM resta in attesa di validazione del campione","body":"<p>La mano prevista è compatta, raffinata, opaca e architettonica. Il GSM resta in sospeso perché il peso da solo non prova eleganza.</p><p><strong>Validazione:</strong> mano, caduta, compattezza della superficie, calore e resistenza all’effetto coperta.</p>"},"decision6":{"kicker":"Sourcing / direzione attiva","title":"Approccio fornitori: prima Prato, poi Biella","body":"<p>La prima direzione di ricognizione resta Prato prima di Biella. Offre a Moscatelli una via pratica verso conversazioni produttive prima di salire verso territori di fornitura più selettivi.</p><p><strong>Scopo:</strong> confrontare serietà, flessibilità MOQ, disponibilità al campione, comprensione del materiale e credibilità.</p>"},"rejectedArchive":{"kicker":"Voci respinte / archivio","title":"Archivio decisioni respinte","body":"<p><strong>Scatola primaria oxblood</strong><br />Respinta perché rende la prima impressione fisica troppo pesante, troppo teatrale e meno istituzionalmente calma dell’avorio.</p><p><strong>Hemstitch ornamentale sulla prima sciarpa</strong><br />Respinto per il Lotto I perché introduce rumore decorativo prima che il prodotto abbia provato proporzione, materia e disciplina di superficie.</p><p><strong>Scontistica introduttiva</strong><br />Respinta perché indebolisce l’autorità del prezzo nel lusso e abitua i primi clienti ad aspettarsi concessioni commerciali.</p><p><strong>Prima sciarpa guidata da pattern</strong><br />Respinta per la prima espressione perché il lancio deve provare misura, colore, finitura e mano prima della complessità visiva.</p>"}},"common":{"return":"← Ritorna"},"links":{"title":"Links","kicker":"Directory interna","intro":"Un indice strutturato per superfici Moscatelli, strumenti, materiali e futuri spazi privati.","warning":"I link privati MOSCATELLI non devono essere condivisi con terzi esterni all'azienda.","status":{"active":"ATTIVO","construction":"IN COSTRUZIONE","unavailable":"NON DISPONIBILE"},"categories":{"public":{"kicker":"01","title":"Superfici pubbliche"},"tools":{"kicker":"02","title":"Strumenti interni"},"finance":{"kicker":"03","title":"Finanza"},"investor":{"kicker":"04","title":"Materiali per investitori"},"product":{"kicker":"05","title":"Prodotto / Manufattura"},"admin":{"kicker":"06","title":"Amministrazione / infrastruttura"},"research":{"kicker":"07","title":"Ricerca"}},"items":{"website":{"title":"Sito MOSCATELLI","note":"moscatelli-official.netlify.app","detail":"Superficie pubblica. Resta visibile qui perché è sicura da aprire e condividere esternamente."},"mrhg":{"title":"Sito MRHG","note":"gianmoska-prog.github.io/MRHG","detail":"Sito pubblico del gruppo holding Moscatelli Roza Holding Group. Resta visibile perché è un riferimento esterno attivo."},"checkout":{"title":"Percorso d’acquisto","note":"Segnaposto del flusso pubblico di vendita","detail":"Riservato al futuro percorso pubblico di acquisto o pagamento dopo test adeguati."},"studioTools":{"title":"Archivio strumenti Studio","note":"Segnaposto utility interne","detail":"Riservato a future utility interne. Non è ancora collegato intenzionalmente."},"notes":{"title":"Note del fondatore","note":"Segnaposto scratchpad privato","detail":"Riservato a un futuro modulo note. Non deve contenere dati sensibili finché l'app non è protetta."},"financeSuite":{"title":"Suite finanziaria","note":"gianmoska-prog.github.io/Finance-Suite","detail":"Superficie finanziaria interna attiva. Per ora resta esterna allo Studio."},"financeAdmin":{"title":"Amministrazione finanziaria privata","note":"Non incorporare ancora","detail":"I link privati finanziari e amministrativi devono restare fuori dall’app statica finché non esiste un hosting protetto."},"pitchDeck":{"title":"Presentazione investitori","note":"gianmoska-prog.github.io/Moscatelli","detail":"Superficie attuale di presentazione agli investitori. Mantenere lo stato della versione sotto revisione."},"investorArchive":{"title":"Archivio investitori","note":"Versioni della presentazione ed evidenze più avanti","detail":"Riservato a future versioni del deck, note investitori, materiali di prova e documenti privati."},"techPack":{"title":"File tecnico Lotto I","note":"Specifiche, campioni, evidenze QC","detail":"Riservato al futuro file tecnico collegato alla validazione dei campioni Lotto I."},"packagingArchive":{"title":"Archivio imballaggio","note":"Scatola, inserti, cera, test di piega","detail":"Riservato a riferimenti di imballaggio, test fisici, dimensioni ed evidenze di validazione."},"hosting":{"title":"Pannello hosting","note":"Link amministrativo privato escluso","detail":"Non inserire qui URL di hosting, domini o deployment finché l’accesso non è protetto."},"payments":{"title":"Pannello pagamenti","note":"Link amministrativo privato escluso","detail":"I link di pagamento e amministrazione restano esclusi dalla directory statica per sicurezza."},"millResearch":{"title":"Registro ricerca lanifici","note":"Futura superficie di ricerca","detail":"Riservato a ricerca verificata sui lanifici, non a liste inventate di fornitori."},"referenceVault":{"title":"Archivio riferimenti","note":"Riferimenti visivi e di mercato più avanti","detail":"Riservato a riferimenti strutturati quando il sistema archivio sarà costruito."},"comingSoon":{"title":"Pagina Coming Soon","note":"moscatelli.co","detail":"Soglia pubblica del dominio MOSCATELLI. Resta visibile come superficie coming soon primaria mentre il sito commerciale completo è ancora in sviluppo."},"storyboard":{"title":"Storyboard Lotto I","note":"gianmoska-prog.github.io/Lotto1Storyboard","detail":"Pagina storyboard narrativa per il film e la sequenza di lancio del Lotto I. Utile per continuità visiva, casting e allineamento produttivo."}}},"dashboard":{"kicker":"Superficie di comando interna","title":"Quadro operativo","intro":"Una vista operativa compatta per l’attuale fase di prova Moscatelli: priorità, decisioni aperte, prontezza al lancio e slancio corrente.","stateLabel":"Stato attuale","stateValue":"Struttura di lancio in corso","cards":{"lotto":{"label":"Prontezza Lotto I","value":"Spazio di lavoro definito","copy":"Il primo spazio prodotto statico è ora presente nello Studio."},"decisions":{"label":"Decisioni aperte","value":"Da registrare","copy":"Il Registro Decisioni è ora attivo; gli elementi in sospeso saranno affinati man mano che appariranno evidenze."},"suppliers":{"label":"Contatti fornitori","value":"5 in attesa / 1 archiviato / 1 in coda","copy":"Cinque contatti attivi sono in attesa; MA.AL.BI. è archiviata e Kaleidos resta in coda."},"budget":{"label":"Budget / autonomia finanziaria","value":"Sincronizzazione finanziaria in sospeso","copy":"La verità finanziaria sarà resa visibile dopo l’espansione della struttura del quadro operativo."},"locked":{"label":"Ultima decisione confermata","value":"Imballaggio avorio confermato","copy":"La calma esterna primaria resta Bianco Avorio; l’oxblood rimane riservato al rituale interno."},"launch":{"label":"Prontezza al lancio","value":"Checklist integrata","copy":"Un primo pannello statico di prontezza ora si trova nel quadro operativo."}},"priorities":{"kicker":"Priorità attuali","copy":"Una lista di lavoro misurata per la fase di prova. Non ancora una task board completa.","item1":"Fissare le variabili tecniche del Lotto I","item2":"Costruire la lista ristretta dei fornitori","item3":"Preparare il primo contatto a Prato"}},"decisions":{"title":"Registro Decisioni","kicker":"Registro di validazione del fondatore","intro":"Un primo registro statico per decisioni confermate, attive e in sospeso. Questa superficie esiste per evitare dibattiti ripetuti e conservare il ragionamento dietro ogni standard.","status":{"locked":"Confermata","pending":"In sospeso","active":"Direzione attiva"},"entries":{"d1":{"date":"2026","category":"Imballaggio","title":"Imballaggio avorio confermato come direzione primaria","rationale":"La calma esterna primaria resta Bianco Avorio."},"d2":{"date":"2026","category":"Colore / Rituale","title":"Oxblood riservato come accento e colore rituale","rationale":"Usato per ceralacca, logica della busta e gravità interna — non per il corpo della scatola."},"d3":{"date":"2026","category":"Lancio","title":"Il lancio della sciarpa Lotto I resta l’evento di prova","rationale":"Il lancio deve provare gusto, disciplina e risposta commerciale prima dell’espansione."},"d4":{"date":"2026","category":"Prodotto","title":"La lunghezza della frangia resta in attesa di validazione fisica","rationale":"La direzione disciplinata esiste; la misura finale attende evidenze dal campione."},"d5":{"date":"2026","category":"Materiale","title":"Il GSM resta in attesa di validazione del campione","rationale":"La fascia target deve essere provata da mano, caduta, compattezza e superficie."},"d6":{"date":"2026","category":"Ricerca fornitori","title":"Approccio fornitori: prima Prato, poi Biella","rationale":"Un percorso pratico di ricognizione prima di conversazioni più impegnative."}},"rejected":{"kicker":"Voci respinte","intro":"Le idee respinte restano separate, così la casa ricorda ciò che è stato rifiutato senza contaminare il registro attivo.","button":"Vedi archivio delle scelte respinte","items":{"r1":{"category":"Imballaggio","title":"Scatola primaria oxblood","reason":"Respinta per peso teatrale eccessivo."},"r2":{"category":"Finitura prodotto","title":"Hemstitch ornamentale sulla prima sciarpa","reason":"Respinto per rumore decorativo nel Lotto I."}}}},"lotto":{"title":"Lotto (I - II - III)","kicker":"Spazio prodotto","intro":"Un primo spazio statico per l’oggetto di prova. Il Lotto I è attivo; Lotto II e III restano riservati finché il primo prodotto non merita l’espansione.","tabs":{"one":{"label":"I","copy":"Attivo"},"two":{"label":"II","copy":"Riservato"},"three":{"label":"III","copy":"Riservato"}},"product":{"kicker":"Lotto I","title":"Sciarpa Lotto I","copy":"Il primo oggetto di prova Moscatelli: ristretto, disciplinato, giudicato materialmente e non autorizzato a espandersi prima della validazione fisica."},"status":{"locked":"Confermato","pending":"In attesa di validazione","active":"Direzione attiva"},"specs":{"dimensions":{"label":"Dimensioni","value":"190 × 31 cm"},"material":{"label":"Materiale","value":"Baby alpaca"},"yarn":{"label":"Direzione filato","value":"Nm 2/40–2/48, due capi"},"gsm":{"label":"GSM","value":"Validazione del campione in sospeso"},"fringe":{"label":"Frangia","value":"Target 3,5 cm"},"finish":{"label":"Finitura","value":"Compatta, opaca, alone minimo"}},"colours":{"kicker":"Colori","one":"Terra Bruna","two":"Bianco Avorio"},"packaging":{"kicker":"Dipendenza dall’imballaggio","copy":"Scatola primaria avorio; rituale d’accento oxblood. Le dimensioni finali della scatola attendono prove reali di piega con il campione approvato."},"sample":{"kicker":"Validazione campione","copy":"Nessuna approvazione finale da schermo, teoria o promessa del fornitore. Il campione fisico deve provare mano, caduta, colore, bordo, frangia e piega."},"questions":{"kicker":"Domande tecniche aperte","copy":"Restano visibili affinché il prodotto non scivoli in entusiasmo vago prima che esistano evidenze.","q1":"GSM finale","q2":"Lunghezza finale della frangia","q3":"Dimensioni esatte della scatola dopo la prova di piega","q4":"Tolleranza dimensionale standard del lanificio","q5":"Mano finale dopo revisione del campione"}},"supplierDesk":{"buttonKicker":"Modulo interno","buttonTitle":"Tavolo fornitori","buttonCopy":"Apri lanifici contattati, risposte pendenti, rischi e futura struttura fornitori.","title":"Tavolo fornitori","kicker":"Manufattura / struttura ricerca fornitori","intro":"Uno spazio riservato per lanifici, imballaggio, etichette, finiture e supporto produttivo. I contatti attuali con i lanifici sono registrati qui senza trattare alcun fornitore come approvato.","close":"Chiudi Tavolo fornitori","categories":{"kicker":"Categorie","mills":"Lanifici","packaging":"Imballaggio","labels":"Etichette / finiture","production":"Fotografia / supporto produzione"},"placeholders":{"kicker":"Slot futuri","copy":"Usare questa struttura solo per fornitori aggiuntivi verificati o contattati. Non inventare record fornitori.","empty":"Slot vuoto","name":"Nome fornitore","location":"Località","status":"Stato","action":"Prossima azione","millsNow":"7 record lanifici / 5 in attesa / 1 archiviato / 1 in coda","category":"Categoria","email":"Email"},"example":{"kicker":"Solo esempio","title":"Modello voce fornitore","categoryLabel":"Categoria","categoryValue":"Lanifici","locationLabel":"Località","locationValue":"Da specificare","statusLabel":"Stato","statusValue":"Da ricercare","actionLabel":"Prossima azione","actionValue":"Definire il primo passaggio di contatto","note":"Riga modello soltanto; da sostituire più avanti con dati verificati."},"status":{"template":"Modello","empty":"Vuoto","research":"Da ricercare","contacted":"Contattato","responded":"Archiviato per Lotto I","archived":"Archiviato per Lotto I","indirect":"Contatto indiretto","queued":"In coda"},"risks":{"kicker":"Rischi fornitori","copy":"Un registro compatto dei problemi che possono danneggiare Lotto I prima ancora della produzione.","r1":"MOQ troppo alto per una produzione in fase di prova","r2":"Prezzo prototipo troppo elevato per il budget di lancio","r3":"Finitura troppo morbida, pelosa o simile a una coperta","r4":"Fornitore non disposto a supportare una bassa quantità iniziale","r5":"Dimensioni dell’imballaggio non risolte prima dei test di piega"},"details":{"template":"Questa riga esiste solo come esempio strutturale. Non va trattata come record reale di un fornitore.","empty":"Posizione riservata per futuri fornitori verificati. Non inserire nomi aziendali inventati.","research":"Lo stato da ricercare significa nessun impegno, nessun contatto e nessuna evidenza al momento."},"contacted":{"kicker":"Lanifici / contattati","sentStatus":"Contattato 05 maggio 2026","nextAction":"Attendere risposta; follow-up dopo 5–7 giorni lavorativi se non arriva risposta.","note":"Primo contatto inviato per il campione sciarpa. In attesa di capacità produttiva, costo campione, tempi, MOQ per colore, prezzo unitario indicativo e risposta sull’approvvigionamento filato."},"contacts":{"locatex":{"name":"Locatex"},"maalbi":{"name":"MA.AL.BI."},"mylab":{"name":"MyLab"},"manifatturabig":{"name":"Manifattura BIG","sentStatus":"Contattata 25 maggio 2026","nextAction":"Attendere risposta; richiedere conferma tecnica prima di trattarla come via di sviluppo attiva.","note":"Contatto di seconda ondata inviato per la sciarpa 100% baby alpaca. Forte candidata per accessori tessili a Prato; attendere capacità, costo campione, tempi, MOQ e disponibilità del filato."},"sasso":{"name":"Sciarpificio dei Fratelli Sasso / via Artknit","sentStatus":"Contattato tramite Artknit 25 maggio 2026","nextAction":"Attendere risposta Artknit o introduzione diretta a Sasso; non trattare ancora come conferma del produttore.","note":"Lead di sciarpificio biellese attualmente avvicinato tramite Artknit. La capacità deve essere verificata direttamente prima di fidarsi di qualsiasi percorso campione."},"gammatex":{"name":"Gammatex","sentStatus":"Contattata 25 maggio 2026","nextAction":"Attendere risposta; verificare se la loro capacità su alpaca e sciarpe può rispettare la disciplina del Lotto I.","note":"Contatto di seconda ondata inviato. Il fit pubblico è plausibile per sciarpe, stole e alpaca, ma Lotto I richiede conferma diretta su fibra, superficie, GSM, frangia e MOQ."},"kaleidos":{"name":"Kaleidos","email":"Da confermare","sentStatus":"Lead di seconda ondata; non contattato","nextAction":"Ricercare il corretto canale di contatto prima dell’outreach.","note":"Tenuto solo come lead di seconda ondata. Non avanzare allo stato contattato finché il canale corretto non è confermato e il primo email non è stato effettivamente inviato."}},"responded":{"kicker":"Lanifici / archiviato per Lotto I","sentStatus":"Chiuso cordialmente 06 maggio 2026","nextAction":"Nessuna azione per Lotto I; mantenere solo come contatto futuro per lana/cashmere.","note":"Risposta finale: nessun articolo compatibile e nessun utilizzo abituale del filato baby alpaca richiesto. Lo sviluppo da zero richiederebbe prove di finissaggio, rese, ricerca filato e alcune centinaia di pezzi come campionatura. Conversazione chiusa cordialmente; non attivo per Lotto I."},"archived":{"kicker":"Lanifici / archiviato per Lotto I","sentStatus":"Chiuso cordialmente 06 maggio 2026","nextAction":"Nessuna azione per Lotto I; mantenere solo come contatto futuro per lana/cashmere.","note":"Risposta finale: nessun articolo compatibile e nessun utilizzo abituale del filato baby alpaca richiesto. Lo sviluppo da zero richiederebbe prove di finissaggio, rese, ricerca filato e alcune centinaia di pezzi come campionatura. Conversazione chiusa cordialmente; non attivo per Lotto I."},"indirect":{"kicker":"Lanifici / via indiretta"},"queued":{"kicker":"Lanifici / seconda ondata"}},"launchReadiness":{"kicker":"Modulo del quadro operativo","title":"Prontezza al lancio","intro":"Una prima checklist statica delle condizioni che devono esistere prima che il Lotto I possa essere lanciato correttamente.","seal":"Statico v1","status":{"progress":"In corso","pendingValidation":"In attesa di validazione","pendingStructure":"Struttura da definire","notStarted":"Non avviato","pendingSync":"Sincronizzazione in sospeso","pendingEvidence":"Evidenze in sospeso","pendingReview":"Revisione in sospeso"},"areas":{"product":{"label":"Prodotto","copy":"Lo spazio Lotto I esiste; GSM, frangia e mano finale richiedono ancora validazione fisica."},"production":{"label":"Fornitori / produzione","copy":"Sette record lanifici sono registrati: cinque contatti attivi in attesa di risposta, uno archiviato per Lotto I e un lead di seconda ondata non ancora contattato."},"packaging":{"label":"Imballaggio","copy":"La direzione primaria avorio è confermata; le dimensioni esatte della scatola attendono test reali di piega."},"website":{"label":"Sito / percorso d’acquisto","copy":"Il sito pubblico e il percorso d’acquisto richiedono ancora una revisione dedicata di prontezza al lancio."},"photography":{"label":"Fotografia","copy":"La direzione editoriale esiste concettualmente; nessun pacchetto finale di shooting prodotto è ancora registrato."},"finance":{"label":"Finanza","copy":"La suite finanziaria esiste esternamente; il quadro operativo non mostra ancora KPI live o manuali."},"fulfilment":{"label":"Gestione ordini","copy":"Gestione, spedizione, inserti e sequenza finale di invio non sono ancora mappati nello Studio."},"investor":{"label":"Prova per investitori","copy":"La prova per investitori dipende da prodotto reale, evidenze reali di vendita e disciplina di lancio documentata."},"admin":{"label":"Legale / amministrazione","copy":"La prontezza legale e amministrativa richiede un modulo dedicato prima di inserire dati davvero privati."}}},"aria":{"languageSelector":"Selettore lingua","languageSelectorMenu":"Selettore lingua nel menu","returnThreshold":"Torna alla soglia","openNavigation":"Apri navigazione","closeMenu":"Chiudi menu","sectionRail":"Navigazione sezioni","version":"MOSCATELLI Studio versione v90. Ultima modifica: 25 maggio 2026, 11:49 CEST","currentState":"Stato attuale dello Studio","operationalStatus":"Stato operativo Moscatelli","launchChecklist":"Lista di prontezza al lancio","codexFilters":"Filtri del Codex","decisionRegister":"Voci del registro decisionale Moscatelli","rejectedPreview":"Anteprima decisioni respinte","lottoWorkspaces":"Spazi di lavoro Lotto","lottoTechnical":"Direzione tecnica Lotto I","supplierCategories":"Categorie fornitori","linksDirectory":"Directory interna dei link MOSCATELLI","openWebsite":"Apri il sito Moscatelli nel browser","openFinance":"Apri la suite finanziaria Moscatelli nel browser","openPitch":"Apri la presentazione investitori Moscatelli nel browser","mobileNavigation":"Navigazione mobile delle sezioni","openMRHG":"Aprire il sito MRHG nel browser","openComingSoon":"Aprire la pagina Coming Soon Moscatelli nel browser","openStoryboard":"Aprire lo Storyboard Lotto I nel browser"},"generated":{"dashboardDetails":{"lotto":"Il primo spazio di lavoro statico per il Lotto I è ora presente: dimensioni, direzione materiale, GSM, frangia, varianti cromatiche, vincolo di packaging e questioni tecniche aperte.","decisions":"Il Registro Decisioni è ora attivo: voci confermate, pendenti, attive e respinte sono conservate come primo registro di validazione del fondatore.","suppliers":"La Mesa fornitori ora registra sette record lanifici: cinque contatti attivi in attesa di risposta, MA.AL.BI. archiviata per Lotto I e Kaleidos in coda per la seconda ondata. La via Sasso resta indiretta tramite Artknit finché non sarà confermata dal produttore.","budget":"Riservato alla sincronizzazione con la Suite Finanziaria o all’inserimento manuale dei KPI: budget, spesa impegnata, autonomia residua e avvisi sui costi unitari.","launch":"La Prontezza al lancio è ora integrata nel quadro operativo come checklist compatta per prodotto, produzione, packaging, sito, finanza, gestione ordini, prova per investitori e amministrazione.","locked":"Riservato all’ultima decisione validata dal fondatore, con data, ragionamento ed evidenze di supporto."},"statusDetails":{"launchProgressProduct":"In corso significa che l’area esiste nello Studio, ma prova, evidenze o approvazione finale restano incomplete.","launchProgressSuppliers":"In corso significa che il contatto fornitori è ora più ampio, ma nessun lanificio è approvato finché capacità, costo campione, tempi, MOQ, disponibilità del filato, disciplina della frangia e qualità del campione fisico non sono confermati.","launchPendingValidation":"In attesa di validazione significa che la direzione è accettata, ma il test fisico non ha ancora confermato dimensioni, vestibilità o finitura.","launchPendingStructure":"Struttura da definire significa che l’area deve essere mappata prima di poter essere giudicata pronta o confermata.","launchNotStarted":"Non avviato significa che nello Studio non sono ancora stati registrati evidenze approvate, calendario o consegnabili.","launchPendingSync":"Sincronizzazione in sospeso significa che lo strumento o la fonte esterna esiste, ma il quadro operativo non ne mostra ancora lo stato corrente.","launchPendingEvidence":"Evidenze in sospeso significa che l’affermazione deve attendere prova di prodotto, vendita, documento o validazione.","launchPendingReview":"Revisione in sospeso significa che l’area non è ancora stata analizzata abbastanza da ricevere uno stato serio.","lottoDimensions":"Direzione di lavoro: mantenere questa proporzione salvo che lo standard del lanificio migliori la coerenza senza indebolire l’oggetto.","lottoMaterial":"La direzione materiale è confermata per il primo oggetto di prova, salvo che il campionamento riveli seri problemi di qualità o approvvigionamento.","lottoYarn":"Intervallo tecnico da discutere con i lanifici; la scelta finale del filato deve essere provata da mano, caduta e compattezza superficiale del campione.","lottoGsm":"Il peso non può essere approvato solo numericamente; il GSM finale deve reggere al tatto, alla caduta, alla compattezza, al calore e alla disciplina anti-coperta.","lottoFringe":"L’obiettivo resta corto e controllato; l’approvazione finale attende test fisici di densità, apertura, caduta parallela e disciplina del bordo.","lottoFinish":"La superficie deve risultare raffinata e architettonica; eccesso di pelo, morbidezza da coperta o caduta molle devono attivare il rifiuto.","lottoTerra":"Marrone caldo profondo, vicino al mogano e al cioccolato. Deve evitare il marrone piatto generico o contaminazioni rosse visibili.","lottoAvorio":"Avorio caldo, non bianco ottico, non nuziale, non ingiallito. Deve leggere come pietra calma scaldata dalla luce.","lottoPackaging":"Le dimensioni della scatola non devono essere confermate finché il campione non sarà piegato, testato per compressione e fotografato nella sequenza rituale prevista.","lottoSample":"La validazione richiede revisione fisica ed evidenze degne di archivio prima di qualsiasi impegno produttivo.","supplierTemplate":"Questa riga esiste solo come esempio strutturale. Non deve essere trattata come un vero registro di fornitore.","supplierResearch":"Lo stato “da ricercare” significa nessun impegno, nessun contatto e nessuna evidenza al momento.","supplierContacted":"Primo email inviato. Nessun fornitore è approvato finché capacità, costo campione, tempi, MOQ, disponibilità del filato, disciplina della frangia e qualità del campione fisico non sono confermati.","supplierResponded":"MA.AL.BI. ha confermato di non avere attualmente questa tipologia di articolo o filato in baby alpaca; uno sviluppo da zero richiederebbe prove di finissaggio, rese, ricerca del filato e alcune centinaia di pezzi come campionatura. Archiviato per Lotto I, conservato solo per future possibilità in lana/cashmere.","supplierArchived":"MA.AL.BI. ha confermato di non avere attualmente questa tipologia di articolo o filato in baby alpaca; uno sviluppo da zero richiederebbe prove di finissaggio, rese, ricerca del filato e alcune centinaia di pezzi come campionatura. Archiviato per Lotto I, conservato solo per future possibilità in lana/cashmere.","supplierIndirect":"Il contatto è passato attraverso una via intermediaria. Trattare come intelligence in attesa, non come conferma diretta del produttore, finché il lanificio o un rappresentante affidabile non risponde con capacità tecnica.","supplierQueued":"In coda significa che il lead è riconosciuto ma non ancora contattato. Non fare supposizioni su capacità, MOQ, prezzo, percorso campione o disponibilità a lavorare con Moscatelli."},"version":{"lastChanged":"Ultima modifica: 25 maggio 2026, 11:49 CEST"}}},"pt":{"page":{"title":"MOSCATELLI Studio"},"sections":{"threshold":"Painel operativo","mandate":"Mandato","atlas":"Atlas","codex":"Codex","manufattura":"Manufattura","circuit":"Circuito","links":"Links","decisions":"Registro de Decisões","lotto":"Lotto (I - II - III)"},"preview":{"threshold":"Superfície operativa para prioridades, decisões abertas, sinais de lançamento e ritmo atual.","mandate":"A posição atual da casa: prioridades de lançamento, regras de decisão e disciplina de crescimento.","atlas":"Territórios visuais, imagens de referência, lógica de embalagem e atmosfera cromática.","codex":"Princípios vinculantes, dados técnicos, regras de validação e pontos inegociáveis.","manufattura":"Decisões de material, lógica de produção, detalhe de embalagem e disciplina do objeto.","circuit":"Pessoas, funções operacionais e a rota entre Roma, Brasil e execução do lançamento.","links":"Sites conectados, salas privadas e futuras superfícies digitais Moscatelli.","decisions":"Decisões confirmadas, pendentes e rejeitadas mantidas como registro interno do fundador.","lotto":"Espaço de produto para o Lotto I, com II e III reservados até que a prova seja conquistada."},"nav":{"topline":"Navegação","selected":"Selecionado","metaArrows":"Setas para mover","metaEnter":"Enter para abrir","metaEsc":"Esc para fechar","languageLabel":"Idioma"},"veil":{"pin":"Código de acesso"},"detail":{"close":"Fechar detalhe","openPrefix":"Abrir"},"home":{"statusPill":"Rascunho interno","statusCopy":"Uma superfície única para julgamento, ritmo e alinhamento.","eyebrow":"Roma / estúdio interno / controle autoral","h1":"Proteger o padrão.<br><em>Avançar apenas</em> o que merece o nome.","sub":"Este espaço existe para manter Moscatelli coerente: imagem, matéria, ritual, pessoas e decisões de lançamento reunidas em uma única superfície controlada.","btnEnter":"Abrir mandato","btnMap":"Abrir mapa","band1":"Contenção romana","band2":"Validação do fundador","band3":"Prova antes da expansão","hint":"Deslize para navegar"},"mandate":{"title":"Mandato","kicker":"Posição da casa","h3":"Uma casa romana de ultraluxo fundada em rigor, autoria e ritual.","p":"O lançamento deve parecer institucional, nunca promocional. A primeira tarefa não é amplitude, e sim autoridade: uma cápsula enxuta, embalagem exata, imagens disciplinadas e decisões fortes o bastante para resistir a uma análise séria.","btn":"Abrir atlas","cardA":{"title":"Prioridade de lançamento","p":"Primeiro a cápsula de lenços: Bianco Avorio e Terra Bruna, caixa rígida marfim, ritual oxblood mantido discreto."},"cardB":{"title":"Regra de decisão","p":"Nada avança sem validação física, aprovação final do fundador e evidência digna de arquivo."},"cardC":{"title":"Disciplina de crescimento","p":"Prova de vendas antes de capital externo. A escala segue a tração; nunca a substitui."}},"atlas":{"title":"Atlas","card1":{"title":"Lenço / Bianco Avorio","p":"Calma exterior. Luz de pedra morna. Franja controlada."},"card2":{"title":"Lenço / Terra Bruna","p":"O contrapeso mais escuro: terra, profundidade, permanência."},"card3":{"title":"Embalagem / Bianco Avorio","p":"Calma institucional. Presença em relevo cego. Nenhuma assinatura ruidosa."},"card4":{"title":"Ritual / reserva oxblood","p":"O oxblood surge como gravidade oculta: cera, dobra e momento interior."},"sideKicker":"Doutrina visual","sideP":"As superfícies devem permanecer foscas, sombreadas e silenciosas. O marfim deve parecer pedra morna, nunca branco nupcial. O oxblood deve tender ao marrom, nunca ao brilho. Toda imagem deve sugerir autoridade antes da explicação.","rule1":"Marfim de pedra morna","rule2":"Oxblood de base marrom","rule3":"Sombra romana","rule4":"Sem ruído visual"},"codex":{"title":"Codex","tag1":"Material","tag2":"Validação","tag3":"Comercial","row1":{"title":"Lenço de lançamento","sub":"190 × 31 cm, baby alpaca, caimento controlado, franja densa e reta.","tag":"Ativo"},"row2":{"title":"Doutrina da embalagem","sub":"Caixa rígida marfim; oxblood reservado para selo de cera, envelope e ritual oculto.","tag":"Vinculante"},"row3":{"title":"Aprovação de cor","sub":"Lab dips físicos sob D65 ou equivalente acordado. Nada de aprovação por tela.","tag":"Vinculante"},"row4":{"title":"Regra de investidores","sub":"Capital anjo só depois de prova de vendas, mesmo em volume inicial modesto.","tag":"Confirmado"},"row5":{"title":"Autoridade de validação","sub":"A aprovação estética final permanece apenas com Gianluca.","tag":"Fundacional"}},"manu":{"title":"Manufattura","quote":"Superfícies silenciosas.<br>Bordas exatas.<br>Autoridade emocional à curta distância.","sub":"Frentes de trabalho atuais: amostragem do lenço, linguagem da etiqueta, proporções da caixa, imagens de lançamento e os detalhes invisíveis que fazem a casa parecer inevitável.","metric1":{"title":"Material","copy":"Baby alpaca com superfície compacta, fosca e queda disciplinada."},"metric2":{"title":"Validação","copy":"Aprovação final apenas do fundador, evidências arquivadas, nenhuma aprovação informal."},"metric3":{"title":"Ritual","copy":"Calma marfim por fora; gravidade oxblood reservada para o momento interior."},"figureKicker":"Estudo de etiqueta","figureP":"Lógica da etiqueta interna macia. Tipografia silenciosa. “Made in Italy” sustentado com dignidade, nunca com ruído."},"circuit":{"title":"Circuito","invite":"Mantenha o círculo pequeno. Mantenha o padrão absoluto.","route":"Rota","note":"Roma como gravidade da casa. O Brasil como extensão operacional. Primeiro Prato, depois Biella. Prova antes do capital.","card1":{"name":"Gianluca","role":"Fundador / Direção criativa","p":"Validação final, tom institucional e o padrão inegociável."},"card2":{"name":"Gabriela","role":"Estratégia / Posicionamento","p":"Disciplina narrativa, enquadramento de mercado e alinhamento comercial."},"card3":{"name":"Marcella","role":"Coordenação operacional","p":"Fluxo de tarefas, acompanhamento, ritmo operacional e continuidade da equipe."},"card4":{"name":"Rede italiana","role":"Pesquisa produtiva / Externo","p":"Tecelagens de Prato, pesquisa sobre o distrito de Biella, parceiros de caixa rígida e verificação física dos materiais em campo."}},"details":{"atlas1":{"kicker":"Atlas I / âncora cromática","title":"Lenço / Bianco Avorio","image":"assets/images/atlas-bianco-avorio.webp","alt":"Lenço Moscatelli em Bianco Avorio","body":"<p>Bianco Avorio não é branco. Precisa ser lido como pedra calma aquecida pela luz — seco, nobre e sem artifício.</p><p>No lenço, essa cor carrega a disciplina exterior da casa: primeiro o silêncio, depois a maciez. A franja precisa permanecer reta, densa e governada.</p><p>O objetivo é compostura, não maciez pela maciez.</p>"},"atlas2":{"kicker":"Atlas II / contrapeso","title":"Lenço / Terra Bruna","image":"assets/images/atlas-terra-bruna.webp","alt":"Lenço Moscatelli em Terra Bruna","body":"<p>Terra Bruna existe como contraponto mais escuro ao Bianco Avorio: madeira envelhecida, cacau cru, terra depois da chuva.</p><p>Nunca deve parecer um marrom genérico. Sua função é dar seriedade, profundidade e gravidade masculina ao par de lançamento, sem agressividade.</p><p>Todo uso fotográfico deve preservar o detalhe das sombras e evitar contaminação vermelha.</p>"},"atlas3":{"kicker":"Atlas III / calma da embalagem","title":"Embalagem / Bianco Avorio","image":"assets/images/packaging-bianco-avorio.webp","alt":"Embalagem Moscatelli em Bianco Avorio","body":"<p>A caixa rígida precisa parecer institucional, não decorativa. O relevo cego é preferível a qualquer contraste ruidoso.</p><p>Aqui o marfim funciona como a face arquitetônica da casa: calma, medida, quase administrativa em sua contenção.</p><p>A sensação correta é: este objeto já pertence a um arquivo.</p>"},"atlas4":{"kicker":"Atlas IV / gravidade oculta","title":"Ritual / reserva oxblood","image":"assets/images/ritual-oxblood.webp","alt":"Embalagem ritual Moscatelli em oxblood","body":"<p>O oxblood não serve para gritar para fora. Ele pertence aos momentos selados: cera, interior do envelope, dobra oculta, pontuação sagrada.</p><p>Sua função é gravidade cerimonial. Deve tender ao marrom, fosco e antigo — nunca vermelho vivo, nunca brilhante, nunca festivo.</p><p>Quando usado corretamente, aprofunda o ritual sem enfraquecer a calma exterior.</p>"},"codex1":{"kicker":"Material / objeto de lançamento","title":"Lenço de lançamento","body":"<p>O objeto de lançamento é deliberadamente estreito em escopo: um formato, uma proporção controlada, uma disciplina material.</p><p><strong>Pontos hoje fixados:</strong> 190 × 31 cm, baby alpaca, toque compacto e fosco, caimento controlado e franja densa e reta.</p><p>O ponto não é novidade. O ponto é estabelecer autoridade por meio de proporção, superfície e acabamento.</p>"},"codex2":{"kicker":"Validação / doutrina da embalagem","title":"Doutrina da embalagem","body":"<p>A embalagem primária permanece Bianco Avorio. O oxblood é reservado para o ritual interior: selo de cera, lógica de envelope e momentos de gravidade oculta.</p><p>Essa separação importa. A calma exterior constrói confiança institucional; o oxblood interior entrega memorabilidade sem excesso teatral.</p><p>Qualquer proposta que inverta essa hierarquia deve ser rejeitada.</p>"},"codex3":{"kicker":"Validação / verdade da cor","title":"Aprovação de cor","body":"<p>Cor se aprova fisicamente, não digitalmente. Os lab dips devem ser lidos sob D65 ou sob um neutro acordado.</p><p>Aprovação por tela não basta, porque o padrão da casa depende da verdade material, não de uma simulação.</p><p>As amostras aprovadas devem ser arquivadas com data, referência de lote e validação do fundador.</p>"},"codex4":{"kicker":"Comercial / disciplina de capital","title":"Regra de investidores","body":"<p>Capital externo só entra depois de prova de vendas. Mesmo uma prova modesta vale mais do que uma grande história especulativa.</p><p>Isso mantém a alavanca dentro da casa e evita inflação narrativa antes que o objeto tenha conquistado o próprio lugar.</p><p>A ordem é fixa: objeto, resposta, prova, depois expansão.</p>"},"codex5":{"kicker":"Validação / autoridade","title":"Autoridade de validação","body":"<p>A aprovação estética final permanece apenas com Gianluca. Não é vaidade; é um mecanismo de controle para manter coerência.</p><p>Colaboradores podem recomendar, refinar e contestar. Não encerram a questão.</p><p>O que entra no arquivo deve refletir um padrão final da casa, não uma média negociada.</p>"},"decision1":{"kicker":"Embalagem / confirmada","title":"Embalagem marfim confirmada como direção primária","body":"<p>A direção da caixa primária permanece Bianco Avorio. O exterior deve comunicar calma institucional antes de qualquer emoção decorativa.</p><p><strong>Razão:</strong> o marfim sustenta contenção, permanência e autoridade silenciosa. Dá à Moscatelli uma primeira impressão controlada, não teatral.</p><p><strong>Estado da decisão:</strong> confirmada, sujeita apenas à validação física da amostra da caixa quanto a material, proporção e acabamento.</p>"},"decision2":{"kicker":"Cor / confirmada","title":"Oxblood reservado como acento e cor ritual","body":"<p>Rosso Essenza / oxblood permanece reservado ao ritual interior: selo de cera, lógica de envelope, detalhe escondido ou acento controlado.</p><p><strong>Razão:</strong> oxblood é poderoso quando aparece como descoberta. Como cor primária da caixa, torna-se pesado demais e teatral demais para a primeira expressão da casa.</p>"},"decision3":{"kicker":"Lançamento / confirmada","title":"O Lotto I permanece o evento de prova","body":"<p>O primeiro lançamento do lenço existe para provar disciplina, resposta comercial e gosto. Não é um lançamento de vaidade e não deve ser inflado antes que o objeto conquiste confiança.</p><p><strong>Regra:</strong> objeto, resposta, prova, depois expansão.</p>"},"decision4":{"kicker":"Produto / pendente","title":"O comprimento da franja permanece pendente de validação física","body":"<p>A direção desejada continua curta, densa, disciplinada e reta. O comprimento final deve ser confirmado por amostra física.</p><p><strong>Questão aberta:</strong> se a expressão mais controlada é 3,5 cm ou uma alternativa ligeiramente mais longa.</p>"},"decision5":{"kicker":"Material / pendente","title":"O GSM permanece pendente de validação da amostra","body":"<p>O toque previsto é compacto, refinado, fosco e arquitetônico. O GSM permanece pendente porque o peso sozinho não prova elegância.</p><p><strong>Validação:</strong> toque, caimento, compactação da superfície, calor e resistência ao efeito cobertor.</p>"},"decision6":{"kicker":"Sourcing / direção ativa","title":"Abordagem de fornecedores: primeiro Prato, depois Biella","body":"<p>A primeira direção de reconhecimento continua sendo Prato antes de Biella. Isso oferece à Moscatelli uma rota prática para conversas de produção antes de avançar para territórios de fornecedores mais seletivos.</p><p><strong>Objetivo:</strong> comparar seriedade, flexibilidade de MOQ, disposição para amostras, compreensão de material e credibilidade.</p>"},"rejectedArchive":{"kicker":"Entradas rejeitadas / arquivo","title":"Arquivo de decisões rejeitadas","body":"<p><strong>Caixa primária oxblood</strong><br />Rejeitada porque torna a primeira impressão física pesada demais, teatral demais e menos institucionalmente calma que o marfim.</p><p><strong>Hemstitch ornamental no primeiro lenço</strong><br />Rejeitado no Lotto I porque introduz ruído decorativo antes que o produto tenha provado proporção, matéria e disciplina de superfície.</p><p><strong>Descontos introdutórios</strong><br />Rejeitados porque enfraquecem a autoridade do preço no luxo e treinam os primeiros clientes a esperar concessões comerciais.</p><p><strong>Primeiro lenço guiado por padrão</strong><br />Rejeitado para a primeira expressão porque o lançamento deve provar contenção, cor, acabamento e toque antes da complexidade visual.</p>"}},"common":{"return":"← Voltar"},"links":{"title":"Links","kicker":"Diretório interno","intro":"Um índice estruturado para superfícies Moscatelli, ferramentas, materiais e futuros espaços privados.","warning":"Links privados MOSCATELLI não devem ser compartilhados com terceiros fora do negócio.","status":{"active":"ATIVO","construction":"EM CONSTRUÇÃO","unavailable":"INDISPONÍVEL"},"categories":{"public":{"kicker":"01","title":"Superfícies públicas"},"tools":{"kicker":"02","title":"Ferramentas internas"},"finance":{"kicker":"03","title":"Finanças"},"investor":{"kicker":"04","title":"Materiais para investidores"},"product":{"kicker":"05","title":"Produto / Manufattura"},"admin":{"kicker":"06","title":"Administração / infraestrutura"},"research":{"kicker":"07","title":"Pesquisa"}},"items":{"website":{"title":"Site MOSCATELLI","note":"moscatelli-official.netlify.app","detail":"Superfície pública. Permanece visível aqui porque é segura para abrir e compartilhar externamente."},"mrhg":{"title":"Site MRHG","note":"gianmoska-prog.github.io/MRHG","detail":"Site público do grupo holding Moscatelli Roza Holding Group. Permanece visível porque é uma referência externa ativa."},"checkout":{"title":"Fluxo de compra","note":"Espaço reservado do fluxo público de vendas","detail":"Reservado para o futuro caminho público de compra ou pagamento depois de testes adequados."},"studioTools":{"title":"Arquivo de ferramentas Studio","note":"Espaço reservado de utilidades internas","detail":"Reservado para futuras utilidades internas. Ainda não está linkado por decisão."},"notes":{"title":"Notas do fundador","note":"Espaço reservado de scratchpad privado","detail":"Reservado para um futuro módulo de notas. Não deve conter dados sensíveis até o app estar protegido."},"financeSuite":{"title":"Suite financeira","note":"gianmoska-prog.github.io/Finance-Suite","detail":"Superfície financeira interna ativa. Por enquanto permanece externa ao Studio."},"financeAdmin":{"title":"Administração financeira privada","note":"Não incorporar ainda","detail":"Links privados financeiros e administrativos devem ficar fora do app estático até existir hospedagem protegida."},"pitchDeck":{"title":"Apresentação para investidores","note":"gianmoska-prog.github.io/Moscatelli","detail":"Superfície atual de apresentação para investidores. O estado da versão deve continuar sob revisão."},"investorArchive":{"title":"Arquivo de investidores","note":"Versões da apresentação e evidências depois","detail":"Reservado para futuras versões do deck, notas de investidores, material de prova e documentos privados."},"techPack":{"title":"Arquivo técnico Lotto I","note":"Especificações, amostras, evidências de QC","detail":"Reservado para o futuro arquivo técnico conectado à validação das amostras Lotto I."},"packagingArchive":{"title":"Arquivo de embalagem","note":"Caixa, inserts, cera, testes de dobra","detail":"Reservado para referências de embalagem, testes físicos, dimensões e evidências de validação."},"hosting":{"title":"Painel de hospedagem","note":"Link administrativo privado retido","detail":"Não inserir URLs de hospedagem, domínio ou deploy aqui até que o acesso esteja protegido."},"payments":{"title":"Painel de pagamentos","note":"Link administrativo privado retido","detail":"Links de pagamento e administração permanecem excluídos do diretório estático por segurança."},"millResearch":{"title":"Registro de pesquisa de tecelagens","note":"Futura superfície de pesquisa","detail":"Reservado para pesquisa verificada de tecelagens, não listas inventadas de fornecedores."},"referenceVault":{"title":"Arquivo de referências","note":"Referências visuais e de mercado depois","detail":"Reservado para referências estruturadas quando o sistema de arquivo for construído."},"comingSoon":{"title":"Página Coming Soon","note":"moscatelli.co","detail":"Limiar público do domínio MOSCATELLI. Permanece visível como superfície coming soon principal enquanto o site comercial completo segue em desenvolvimento."},"storyboard":{"title":"Storyboard Lotto I","note":"gianmoska-prog.github.io/Lotto1Storyboard","detail":"Página de storyboard narrativo para o filme e a sequência de lançamento do Lotto I. Útil para continuidade visual, casting e alinhamento de produção."}}},"dashboard":{"kicker":"Superfície interna de comando","title":"Painel operativo","intro":"Uma visão operacional compacta da fase atual de prova da Moscatelli: prioridades, decisões abertas, prontidão de lançamento e avanço atual.","stateLabel":"Estado atual","stateValue":"Estrutura de lançamento em andamento","cards":{"lotto":{"label":"Prontidão Lotto I","value":"Espaço de trabalho definido","copy":"O primeiro espaço estático de produto agora está presente no Studio."},"decisions":{"label":"Decisões abertas","value":"A registrar","copy":"O Registro de Decisões agora está ativo; os itens pendentes continuarão sendo refinados conforme surgirem evidências."},"suppliers":{"label":"Contato com fornecedores","value":"5 pendentes / 1 arquivada / 1 em fila","copy":"Cinco rotas de contato ativas estão pendentes; MA.AL.BI. está arquivada e Kaleidos segue em fila."},"budget":{"label":"Orçamento / runway","value":"Sincronização financeira pendente","copy":"A verdade financeira será apresentada depois que a estrutura do painel operativo for expandida."},"locked":{"label":"Última decisão confirmada","value":"Embalagem marfim confirmada","copy":"A calma exterior primária permanece Bianco Avorio; o oxblood fica reservado ao ritual interno."},"launch":{"label":"Prontidão de lançamento","value":"Checklist integrada","copy":"Um primeiro painel estático de prontidão agora está dentro do painel operativo."}},"priorities":{"kicker":"Prioridades atuais","copy":"Uma lista de trabalho contida para a fase de prova. Ainda não é um quadro completo de tarefas.","item1":"Fixar as variáveis técnicas do Lotto I","item2":"Construir a lista curta de fornecedores","item3":"Preparar a abordagem em Prato"}},"decisions":{"title":"Registro de Decisões","kicker":"Livro de validação do fundador","intro":"Um primeiro registro estático para decisões confirmadas, ativas e pendentes. Esta superfície existe para evitar debates repetidos e preservar o raciocínio por trás de cada padrão.","status":{"locked":"Confirmada","pending":"Pendente","active":"Direção ativa"},"entries":{"d1":{"date":"2026","category":"Embalagem","title":"Embalagem marfim confirmada como direção primária","rationale":"A calma exterior primária permanece Bianco Avorio."},"d2":{"date":"2026","category":"Cor / Ritual","title":"Oxblood reservado como acento e cor ritual","rationale":"Usado para selo de cera, lógica de envelope e gravidade interior — não para o corpo da caixa."},"d3":{"date":"2026","category":"Lançamento","title":"O lançamento do lenço Lotto I permanece o evento de prova","rationale":"O lançamento deve provar gosto, disciplina e resposta comercial antes da expansão."},"d4":{"date":"2026","category":"Produto","title":"O comprimento da franja permanece pendente de validação física","rationale":"A direção disciplinada existe; o comprimento final aguarda evidência da amostra."},"d5":{"date":"2026","category":"Matéria","title":"O GSM permanece pendente de validação da amostra","rationale":"A faixa-alvo deve ser provada por toque, caimento, compactação e superfície."},"d6":{"date":"2026","category":"Busca de fornecedores","title":"Abordagem de fornecedores: primeiro Prato, depois Biella","rationale":"Uma rota prática de reconhecimento antes de conversas de maior compromisso."}},"rejected":{"kicker":"Entradas rejeitadas","intro":"Ideias rejeitadas ficam separadas para que a casa lembre o que foi recusado sem poluir o registro ativo.","button":"Ver arquivo de rejeições","items":{"r1":{"category":"Embalagem","title":"Caixa primária oxblood","reason":"Rejeitada por peso teatral excessivo."},"r2":{"category":"Acabamento","title":"Hemstitch ornamental no primeiro lenço","reason":"Rejeitado por ruído decorativo no Lotto I."}}}},"lotto":{"title":"Lotto (I - II - III)","kicker":"Espaço de produto","intro":"Um primeiro espaço estático para o objeto de prova. O Lotto I está ativo; Lotto II e III permanecem reservados até que o primeiro produto conquiste a expansão.","tabs":{"one":{"label":"I","copy":"Ativo"},"two":{"label":"II","copy":"Reservado"},"three":{"label":"III","copy":"Reservado"}},"product":{"kicker":"Lotto I","title":"Lenço Lotto I","copy":"O primeiro objeto de prova Moscatelli: estreito, disciplinado, julgado materialmente e não autorizado a expandir antes da validação física."},"status":{"locked":"Confirmado","pending":"Validação pendente","active":"Direção ativa"},"specs":{"dimensions":{"label":"Dimensões","value":"190 × 31 cm"},"material":{"label":"Material","value":"Baby alpaca"},"yarn":{"label":"Direção do fio","value":"Nm 2/40–2/48, dois cabos"},"gsm":{"label":"GSM","value":"Validação da amostra pendente"},"fringe":{"label":"Franja","value":"Meta de 3,5 cm"},"finish":{"label":"Acabamento","value":"Compacto, fosco, halo mínimo"}},"colours":{"kicker":"Cores","one":"Terra Bruna","two":"Bianco Avorio"},"packaging":{"kicker":"Dependência da embalagem","copy":"Caixa primária marfim; ritual de acento oxblood. As dimensões finais da caixa aguardam testes reais de dobra com a amostra aprovada."},"sample":{"kicker":"Validação da amostra","copy":"Nenhuma aprovação final por tela, teoria ou promessa do fornecedor. A amostra física deve provar toque, caimento, cor, borda, franja e dobra."},"questions":{"kicker":"Perguntas técnicas abertas","copy":"Elas permanecem visíveis para que o produto não derive para entusiasmo vago antes que exista evidência.","q1":"GSM final","q2":"Comprimento final da franja","q3":"Dimensões exatas da caixa depois do teste de dobra","q4":"Tolerância dimensional padrão da tecelagem","q5":"Toque final após revisão da amostra"}},"supplierDesk":{"buttonKicker":"Módulo interno","buttonTitle":"Mesa de fornecedores","buttonCopy":"Abrir tecelagens contatadas, respostas pendentes, riscos e futura estrutura de fornecedores.","title":"Mesa de fornecedores","kicker":"Manufattura / estrutura de busca de fornecedores","intro":"Um espaço reservado para tecelagens, embalagem, etiquetas, aviamentos e suporte de produção. Os contatos atuais com tecelagens ficam registrados aqui sem tratar nenhum fornecedor como aprovado.","close":"Fechar Mesa de fornecedores","categories":{"kicker":"Categorias","mills":"Tecelagens","packaging":"Embalagem","labels":"Etiquetas / aviamentos","production":"Fotografia / suporte de produção"},"placeholders":{"kicker":"Espaços futuros","copy":"Usar esta estrutura apenas para fornecedores adicionais verificados ou contatados. Não inventar registros de fornecedores.","empty":"Espaço vazio","name":"Nome do fornecedor","location":"Localização","status":"Estado","action":"Próxima ação","millsNow":"7 registros de tecelagens / 5 pendentes / 1 arquivada / 1 em fila","category":"Categoria","email":"Email"},"example":{"kicker":"Apenas exemplo","title":"Modelo de entrada de fornecedor","categoryLabel":"Categoria","categoryValue":"Tecelagens","locationLabel":"Localização","locationValue":"A especificar","statusLabel":"Estado","statusValue":"A pesquisar","actionLabel":"Próxima ação","actionValue":"Definir primeiro passo de contato","note":"Linha modelo apenas; substituir depois por dados verificados."},"status":{"template":"Modelo","empty":"Vazio","research":"A pesquisar","contacted":"Contatado","responded":"Arquivada para Lotto I","archived":"Arquivada para Lotto I","indirect":"Contato indireto","queued":"Em fila"},"risks":{"kicker":"Riscos de fornecedores","copy":"Um registro compacto de problemas que podem prejudicar o Lotto I antes mesmo da produção.","r1":"MOQ alto demais para produção em fase de prova","r2":"Preço de protótipo alto demais para o orçamento de lançamento","r3":"Acabamento macio demais, felpudo ou com aparência de cobertor","r4":"Fornecedor sem disposição para baixa quantidade inicial","r5":"Dimensões da embalagem não resolvidas antes dos testes de dobra"},"details":{"template":"Esta linha existe apenas como exemplo estrutural. Não deve ser tratada como registro real de fornecedor.","empty":"Posição reservada para futuros fornecedores verificados. Não inserir nomes de empresas inventados.","research":"Estado “a pesquisar” significa sem compromisso, sem contato e sem evidência no momento."},"contacted":{"kicker":"Tecelagens / contatadas","sentStatus":"Contatado em 05 de maio de 2026","nextAction":"Aguardar resposta; fazer follow-up após 5–7 dias úteis se não houver retorno.","note":"Primeiro contato enviado para amostra da echarpe. Aguardar capacidade produtiva, custo de amostra, prazo, MOQ por cor, preço unitário indicativo e resposta sobre fornecimento do fio."},"contacts":{"locatex":{"name":"Locatex"},"maalbi":{"name":"MA.AL.BI."},"mylab":{"name":"MyLab"},"manifatturabig":{"name":"Manifattura BIG","sentStatus":"Contatada em 25 de maio de 2026","nextAction":"Aguardar resposta; pedir confirmação técnica antes de tratar como rota ativa de desenvolvimento.","note":"Contato de segunda onda enviado para a echarpe 100% baby alpaca. Forte candidata em acessórios têxteis em Prato; aguardar capacidade, custo de amostra, prazo, MOQ e disponibilidade do fio."},"sasso":{"name":"Sciarpificio dei Fratelli Sasso / rota Artknit","sentStatus":"Contatado via Artknit em 25 de maio de 2026","nextAction":"Aguardar resposta da Artknit ou introdução direta à Sasso; ainda não tratar como confirmação da fábrica.","note":"Lead de sciarpificio de Biella atualmente abordado via Artknit. A capacidade ainda precisa ser verificada diretamente antes de confiar em qualquer rota de amostra."},"gammatex":{"name":"Gammatex","sentStatus":"Contatada em 25 de maio de 2026","nextAction":"Aguardar resposta; verificar se a capacidade deles em alpaca e echarpes pode cumprir a disciplina do Lotto I.","note":"Contato de segunda onda enviado. O encaixe público é plausível para echarpes, estolas e alpaca, mas o Lotto I exige confirmação direta de fibra, superfície, GSM, franja e MOQ."},"kaleidos":{"name":"Kaleidos","email":"A confirmar","sentStatus":"Lead de segunda onda; não contatado","nextAction":"Pesquisar a rota correta de contato antes do outreach.","note":"Mantida apenas como lead de segunda onda. Não avançar para status de contatada até que a rota correta seja confirmada e o primeiro email seja realmente enviado."}},"responded":{"kicker":"Tecelagens / arquivada para Lotto I","sentStatus":"Encerrada cordialmente em 06 de maio de 2026","nextAction":"Nenhuma ação para o Lotto I; manter apenas como contato futuro para lã/cashmere.","note":"Resposta final: nenhum artigo compatível e nenhum uso habitual do fio baby alpaca solicitado. O desenvolvimento do zero exigiria testes de acabamento, rendimento, busca do fio e algumas centenas de peças como amostragem. Conversa encerrada cordialmente; não ativa para o Lotto I."},"archived":{"kicker":"Tecelagens / arquivada para Lotto I","sentStatus":"Encerrada cordialmente em 06 de maio de 2026","nextAction":"Nenhuma ação para o Lotto I; manter apenas como contato futuro para lã/cashmere.","note":"Resposta final: nenhum artigo compatível e nenhum uso habitual do fio baby alpaca solicitado. O desenvolvimento do zero exigiria testes de acabamento, rendimento, busca do fio e algumas centenas de peças como amostragem. Conversa encerrada cordialmente; não ativa para o Lotto I."},"indirect":{"kicker":"Tecelagens / rota indireta"},"queued":{"kicker":"Tecelagens / segunda onda"}},"launchReadiness":{"kicker":"Módulo do painel operativo","title":"Prontidão de lançamento","intro":"Uma primeira checklist estática das condições que precisam existir antes que o Lotto I possa ser lançado corretamente.","seal":"Estático v1","status":{"progress":"Em andamento","pendingValidation":"Validação pendente","pendingStructure":"Estrutura a definir","notStarted":"Não iniciado","pendingSync":"Sincronização pendente","pendingEvidence":"Evidência pendente","pendingReview":"Revisão pendente"},"areas":{"product":{"label":"Produto","copy":"O espaço Lotto I existe; GSM, franja e toque final ainda precisam de validação física."},"production":{"label":"Fornecedores / produção","copy":"Sete registros de tecelagens estão documentados: cinco rotas de contato ativas aguardando resposta, uma arquivada para o Lotto I e um lead de segunda onda ainda não abordado."},"packaging":{"label":"Embalagem","copy":"A direção primária marfim está confirmada; dimensões exatas da caixa aguardam testes reais de dobra."},"website":{"label":"Site / fluxo de compra","copy":"O site público e o fluxo de compra ainda precisam de uma revisão dedicada de prontidão."},"photography":{"label":"Fotografia","copy":"A direção editorial existe conceitualmente; nenhum pacote final de sessão de produto foi registrado ainda."},"finance":{"label":"Finanças","copy":"A suite financeira existe externamente; o painel operativo ainda não mostra KPIs ao vivo ou manuais."},"fulfilment":{"label":"Gestão de pedidos","copy":"Manuseio, envio, inserts e sequência final de despacho ainda não estão mapeados no Studio."},"investor":{"label":"Prova para investidores","copy":"A prova para investidores depende de produto real, vendas reais e disciplina de lançamento documentada."},"admin":{"label":"Jurídico / administração","copy":"A prontidão jurídica e administrativa precisa de um módulo dedicado antes da adição de dados realmente privados."}}},"aria":{"languageSelector":"Seletor de idioma","languageSelectorMenu":"Seletor de idioma dentro do menu","returnThreshold":"Voltar ao limiar","openNavigation":"Abrir navegação","closeMenu":"Fechar menu","sectionRail":"Navegação de seções","version":"MOSCATELLI Studio versão v90. Última alteração: 25 de maio de 2026, 11:49 CEST","currentState":"Estado atual do Studio","operationalStatus":"Estado operacional Moscatelli","launchChecklist":"Checklist de prontidão de lançamento","codexFilters":"Filtros do Codex","decisionRegister":"Entradas do registro de decisões Moscatelli","rejectedPreview":"Prévia de decisões rejeitadas","lottoWorkspaces":"Espaços de trabalho Lotto","lottoTechnical":"Direção técnica Lotto I","supplierCategories":"Categorias de fornecedores","linksDirectory":"Diretório interno de links MOSCATELLI","openWebsite":"Abrir o site Moscatelli no navegador","openFinance":"Abrir a suite financeira Moscatelli no navegador","openPitch":"Abrir a apresentação para investidores Moscatelli no navegador","mobileNavigation":"Navegação mobile de seções","openMRHG":"Abrir o site MRHG no navegador","openComingSoon":"Abrir a página Coming Soon Moscatelli no navegador","openStoryboard":"Abrir o Storyboard Lotto I no navegador"},"generated":{"dashboardDetails":{"lotto":"O primeiro espaço de trabalho estático do Lotto I agora está presente: dimensões, direção de material, GSM, franja, cores, dependência de embalagem e perguntas técnicas abertas.","decisions":"O Registro de Decisões agora está ativo: entradas confirmadas, pendentes, ativas e rejeitadas ficam reunidas como primeiro livro de validação do fundador.","suppliers":"A Mesa de fornecedores agora registra sete tecelagens: cinco rotas de contato ativas aguardando resposta, MA.AL.BI. arquivada para o Lotto I e Kaleidos em fila para pesquisa de segunda onda. A rota Sasso permanece indireta via Artknit até confirmação da própria tecelagem.","budget":"Reservado para sincronização com a Suite Financeira ou inserção manual de KPIs: orçamento, gasto comprometido, runway restante e alertas de custo unitário.","launch":"A Prontidão de lançamento agora está integrada ao painel operativo como checklist compacta para produto, produção, embalagem, site, finanças, gestão de pedidos, prova para investidores e administração.","locked":"Reservado para a decisão mais recente validada pelo fundador, com data, raciocínio e evidências de apoio."},"statusDetails":{"launchProgressProduct":"Em andamento significa que a área existe no Studio, mas prova, evidência ou aprovação final permanecem incompletas.","launchProgressSuppliers":"Em andamento significa que o contato com fornecedores agora é mais amplo, mas nenhuma tecelagem está aprovada até que capacidade, custo de amostra, prazo, MOQ, disponibilidade do fio, disciplina da franja e qualidade da amostra física sejam confirmados.","launchPendingValidation":"Validação pendente significa que a direção foi aceita, mas o teste físico ainda não confirmou dimensões, ajuste ou acabamento.","launchPendingStructure":"Estrutura a definir significa que a área precisa ser mapeada antes de poder ser julgada pronta ou confirmada.","launchNotStarted":"Não iniciado significa que nenhuma evidência aprovada, cronograma ou entrega foi registrada no Studio ainda.","launchPendingSync":"Sincronização pendente significa que a ferramenta ou fonte externa existe, mas o painel operativo ainda não mostra seu estado atual.","launchPendingEvidence":"Evidência pendente significa que a afirmação deve aguardar prova de produto, venda, documento ou validação.","launchPendingReview":"Revisão pendente significa que a área ainda não foi auditada o suficiente para receber um estado sério.","lottoDimensions":"Direção de trabalho: manter esta proporção, salvo se a padronização da tecelagem melhorar a consistência sem enfraquecer o objeto.","lottoMaterial":"A direção de material está confirmada para o primeiro objeto de prova, salvo se a amostra revelar um problema sério de qualidade ou fornecimento.","lottoYarn":"Faixa técnica a discutir com as tecelagens; a escolha final do fio deve ser provada pela mão, pelo caimento e pela compactação da superfície da amostra.","lottoGsm":"O peso não pode ser aprovado apenas por número; o GSM final deve resistir ao teste de toque, caimento, compactação, calor e disciplina anti-cobertor.","lottoFringe":"A meta continua curta e controlada; a aprovação final aguarda testes físicos de densidade, abertura, queda paralela e disciplina da borda.","lottoFinish":"A superfície deve parecer refinada e arquitetônica; excesso de pelo, maciez de cobertor ou caimento mole devem acionar rejeição.","lottoTerra":"Marrom quente profundo, próximo ao chocolate e ao mogno. Deve evitar marrom plano genérico ou contaminação vermelha visível.","lottoAvorio":"Marfim quente, não branco óptico, não nupcial, não amarelado. Deve ler como pedra calma aquecida pela luz.","lottoPackaging":"As dimensões da caixa não devem ser confirmadas até que a amostra seja dobrada, testada para compressão e fotografada na sequência ritual prevista.","lottoSample":"A validação exige revisão física e evidências dignas de arquivo antes de qualquer compromisso de produção.","supplierTemplate":"Esta linha existe apenas como exemplo estrutural. Não deve ser tratada como registro real de fornecedor.","supplierResearch":"Estado “a pesquisar” significa sem compromisso, sem contato e sem evidência no momento.","supplierContacted":"Primeiro email enviado. Nenhum fornecedor está aprovado até que capacidade produtiva, custo de amostra, prazo, MOQ, disponibilidade do fio, disciplina da franja e qualidade da amostra física sejam confirmados.","supplierResponded":"MA.AL.BI. confirmou que não possui atualmente esse tipo de artigo ou fio em baby alpaca; um desenvolvimento do zero exigiria testes de acabamento, rendimento, busca do fio e algumas centenas de peças como amostragem. Arquivada para o Lotto I, mantida apenas para possibilidades futuras em lã/cashmere.","supplierArchived":"MA.AL.BI. confirmou que não possui atualmente esse tipo de artigo ou fio em baby alpaca; um desenvolvimento do zero exigiria testes de acabamento, rendimento, busca do fio e algumas centenas de peças como amostragem. Arquivada para o Lotto I, mantida apenas para possibilidades futuras em lã/cashmere.","supplierIndirect":"O contato passou por uma rota intermediária. Tratar como inteligência pendente, não como confirmação direta da tecelagem, até que a própria tecelagem ou um representante confiável responda com capacidade técnica.","supplierQueued":"Em fila significa que o lead é reconhecido, mas ainda não foi contatado. Não fazer suposições sobre capacidade, MOQ, preço, rota de amostra ou disposição para trabalhar com Moscatelli."},"version":{"lastChanged":"Última alteração: 25 de maio de 2026, 11:49 CEST"}}}};

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
const navList = document.querySelector('.nav-list');
const railDots = Array.from(document.querySelectorAll('.rail-dot'));
const mobileNavBar = document.querySelector('.mobile-nav-bar');
let mobileNavItems = Array.from(document.querySelectorAll('.mobile-nav-item'));
let mobileNavBaseCount = mobileNavItems.length;
let mobileNavLoopJumping = false;
let mobileNavLoopRaf = 0;
let mobileNavSmoothRaf = 0;
let mobileNavSmoothScrolling = false;
let mobileNavLastScrollLeft = 0;
let mobileNavLastScrollTime = 0;
let mobileNavAnticipationTimer = 0;
let mobileNavSettleTimer = 0;
let mobileNavLastSyncedId = null;
let mobileNavFocusedTargetId = null;
let mobileNavLastFocusUpdate = 0;
const MOBILE_NAV_LIVE_FOCUS_INTERVAL = 110;
const MOBILE_NAV_FAST_SCROLL_DELTA = 18;
const NAV_ANTICIPATION_VELOCITY = 2;
const NAV_LOOP_RESISTANCE_DISTANCE = 40;
const SECTION_AMBIENTS = {
  home: 'rgba(182, 142, 88, 0.055)',
  briefing: 'rgba(58, 88, 138, 0.055)',
  atlas: 'rgba(48, 92, 150, 0.060)',
  vault: 'rgba(118, 52, 38, 0.058)',
  decisions: 'rgba(132, 76, 42, 0.056)',
  lotto: 'rgba(152, 110, 70, 0.055)',
  studio: 'rgba(136, 70, 36, 0.060)',
  signal: 'rgba(78, 86, 112, 0.052)',
  links: 'rgba(116, 48, 36, 0.055)'
};
const sections = Array.from(document.querySelectorAll('.section'));
const previewIndex = document.getElementById('nav-preview-index');
const previewTitle = document.getElementById('nav-preview-title');
const previewCopy = document.getElementById('nav-preview-copy');
const navPreviewShell = document.querySelector('.nav-preview-shell');
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
const supplierDeskPanel = document.getElementById('supplier-desk-panel');
const supplierDeskButtons = Array.from(document.querySelectorAll('[data-action="toggle-supplier-desk"]'));
const galleryGrid = document.getElementById('gallery-grid');
const galleryDots = Array.from(document.querySelectorAll('.gallery-dot'));
const mobileLayoutQuery = window.matchMedia('(max-width: 768px)');

const sectionIds = sections.map(section => section.id.replace('section-', ''));
const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
const pointerState = { enabled: false, visible: false, frame: 0, x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
let lastPointerTarget = null;
let spotlightFrame = 0;
let spotlightTimer = 0;
let spotlightLastCommit = 0;
let pendingSpotlightX = window.innerWidth * 0.5;
let pendingSpotlightY = window.innerHeight * 0.5;
const SPOTLIGHT_UPDATE_INTERVAL = 48;

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
  document.querySelectorAll('[data-i18n]').forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-html]').forEach(node => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(node => {
    node.setAttribute('aria-label', t(node.dataset.i18nAriaLabel));
  });

  document.querySelectorAll('[data-i18n-dashboard-detail]').forEach(node => {
    node.setAttribute('data-dashboard-detail', t(node.dataset.i18nDashboardDetail));
  });

  document.querySelectorAll('[data-i18n-status-detail]').forEach(node => {
    node.setAttribute('data-status-detail', t(node.dataset.i18nStatusDetail));
  });

  document.querySelectorAll('[data-i18n-last-change]').forEach(node => {
    node.setAttribute('data-last-change', t(node.dataset.i18nLastChange));
  });

  document.title = t('page.title');
  if (veilInput) veilInput.setAttribute('aria-label', t('veil.pin'));
  detailCloseButtons.forEach(button => {
    if (button.tagName === 'BUTTON') button.setAttribute('aria-label', t('detail.close'));
  });
  detailTriggers.forEach(trigger => {
    const detail = t(`details.${trigger.dataset.detail}`);
    if (detail?.title) trigger.setAttribute('aria-label', `${t('detail.openPrefix')} ${detail.title}`);
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


function initializeMobileNavLoop() {
  if (!mobileNavBar || mobileNavBar.dataset.loopReady === 'true') return;
  const originals = Array.from(mobileNavBar.querySelectorAll('.mobile-nav-item'));
  if (!originals.length) return;

  mobileNavBaseCount = originals.length;
  const fragment = document.createDocumentFragment();
  const sets = ['prev', 'base', 'next'];

  sets.forEach(setName => {
    originals.forEach((item, index) => {
      const node = setName === 'base' ? item : item.cloneNode(true);
      node.dataset.loopSet = setName;
      node.dataset.loopIndex = String(index);
      node.classList.remove('active', 'near-active', 'far-active', 'current-page', 'anticipating');
      if (setName !== 'base') node.setAttribute('tabindex', '-1');
      fragment.appendChild(node);
    });
  });

  mobileNavBar.innerHTML = '';
  mobileNavBar.appendChild(fragment);
  mobileNavBar.dataset.loopReady = 'true';
  mobileNavItems = Array.from(mobileNavBar.querySelectorAll('.mobile-nav-item'));
  bindMobileNavLoopScroll();
}

function getMobileNavLoopMetrics() {
  if (!mobileNavBar || mobileNavBaseCount <= 0) return null;
  const firstBase = mobileNavBar.querySelector('.mobile-nav-item[data-loop-set="base"]');
  const firstNext = mobileNavBar.querySelector('.mobile-nav-item[data-loop-set="next"]');
  if (!firstBase || !firstNext) return null;

  const setWidth = firstNext.offsetLeft - firstBase.offsetLeft;
  if (!Number.isFinite(setWidth) || setWidth <= 0) return null;

  return {
    setWidth,
    lowerLimit: setWidth,
    upperLimit: setWidth * 2
  };
}

function setMobileNavLoopResistance(active) {
  if (!mobileNavBar) return;
  mobileNavBar.classList.toggle('is-loop-resisting', Boolean(active));
}

function normalizeMobileNavLoopScroll() {
  if (!mobileNavBar || mobileNavLoopJumping) return;
  const metrics = getMobileNavLoopMetrics();
  if (!metrics) return;

  const current = mobileNavBar.scrollLeft;
  let next = current;

  if (current < metrics.lowerLimit) {
    next = current + metrics.setWidth;
  } else if (current >= metrics.upperLimit) {
    next = current - metrics.setWidth;
  }

  if (Math.abs(next - current) < 1) return;

  mobileNavLoopJumping = true;
  setMobileNavLoopResistance(true);
  mobileNavBar.scrollLeft = next;
  requestAnimationFrame(() => {
    mobileNavLoopJumping = false;
    setMobileNavLoopResistance(false);
  });
}

function updateMobileNavLoopResistance() {
  /* v74: disabled during live mobile scrolling.
     The old boundary-resistance class changed transforms during fast gestures,
     which could create visible bottom-nav judder on mobile browsers. */
  setMobileNavLoopResistance(false);
}

function clearMobileNavAnticipation() {
  if (mobileNavAnticipationTimer) {
    window.clearTimeout(mobileNavAnticipationTimer);
    mobileNavAnticipationTimer = 0;
  }
  mobileNavItems.forEach(item => item.classList.remove('anticipating'));
}

function getCenteredMobileNavItem() {
  if (!mobileNavBar || !mobileNavItems.length) return null;
  const center = mobileNavBar.scrollLeft + (mobileNavBar.clientWidth / 2);
  let selected = null;
  let selectedDistance = Infinity;

  mobileNavItems.forEach(item => {
    const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
    const distance = Math.abs(itemCenter - center);
    if (distance < selectedDistance) {
      selected = item;
      selectedDistance = distance;
    }
  });

  return selected;
}

function updateMobileNavAnticipation() {
  /* v74: removed live anticipation glow. It looked elegant when moved slowly,
     but on fast swipes it created unnecessary class churn and perceived glitching. */
  clearMobileNavAnticipation();
}

function settleMobileNavAfterScroll() {
  if (!mobileNavBar) return;
  clearMobileNavAnticipation();
  setMobileNavLoopResistance(false);
  normalizeMobileNavLoopScroll();
  updateMobileNavFocusFromCenter({ force: true });
  mobileNavLastFocusUpdate = performance.now();
}

function scheduleMobileNavSettle() {
  if (mobileNavSettleTimer) window.clearTimeout(mobileNavSettleTimer);
  mobileNavSettleTimer = window.setTimeout(() => {
    mobileNavSettleTimer = 0;
    settleMobileNavAfterScroll();
  }, 140);
}

function handleMobileNavScrollMotion() {
  if (!mobileNavBar) return;
  const previous = mobileNavLastScrollLeft;
  const current = mobileNavBar.scrollLeft;
  const now = performance.now();
  const delta = Math.abs(current - previous);

  mobileNavLastScrollLeft = current;
  mobileNavLastScrollTime = now;

  /* v76: during fast touch swipes, do not keep reclassifying every centred
     nav item. Slow drags may still update discreetly; fast gestures settle
     once scrolling ends, which removes the visible film-strip shimmer. */
  if (!mobileNavSmoothScrolling && delta <= MOBILE_NAV_FAST_SCROLL_DELTA && now - mobileNavLastFocusUpdate >= MOBILE_NAV_LIVE_FOCUS_INTERVAL) {
    updateMobileNavFocusFromCenter();
    mobileNavLastFocusUpdate = now;
  }

  scheduleMobileNavSettle();
}

function bindMobileNavLoopScroll() {
  if (!mobileNavBar || mobileNavBar.dataset.loopScrollReady === 'true') return;
  mobileNavBar.dataset.loopScrollReady = 'true';
  mobileNavLastScrollLeft = mobileNavBar.scrollLeft;
  mobileNavLastScrollTime = performance.now();

  mobileNavBar.addEventListener('scroll', () => {
    if (mobileNavLoopRaf) return;
    mobileNavLoopRaf = requestAnimationFrame(() => {
      mobileNavLoopRaf = 0;
      handleMobileNavScrollMotion();
    });
  }, { passive: true });

  if ('onscrollend' in window) {
    mobileNavBar.addEventListener('scrollend', () => {
      if (mobileNavSettleTimer) {
        window.clearTimeout(mobileNavSettleTimer);
        mobileNavSettleTimer = 0;
      }
      settleMobileNavAfterScroll();
    }, { passive: true });
  }
}
function getCircularNavDistance(indexA, indexB, total) {
  if (indexA < 0 || indexB < 0 || total <= 0) return Infinity;
  const direct = Math.abs(indexA - indexB);
  return Math.min(direct, total - direct);
}

function updateMobileNavFocusByTarget(targetId) {
  if (!targetId || !mobileNavItems.length) return;
  const focusIndex = sectionIds.indexOf(targetId);
  const total = sectionIds.length;
  if (focusIndex < 0 || total <= 0) return;

  mobileNavFocusedTargetId = targetId;
  mobileNavItems.forEach(item => {
    const itemIndex = sectionIds.indexOf(item.dataset.target);
    const distance = getCircularNavDistance(itemIndex, focusIndex, total);
    const isFocused = item.dataset.target === targetId;
    const isCurrentPage = item.dataset.target === state.currentSection;
    item.classList.toggle('active', isFocused);
    item.classList.toggle('near-active', distance === 1 && !isFocused);
    item.classList.toggle('far-active', distance === 2 && !isFocused);
    item.classList.toggle('current-page', isCurrentPage);
  });
}

function updateMobileNavFocusFromCenter(options = {}) {
  const centered = getCenteredMobileNavItem();
  if (!centered?.dataset?.target) return;
  const targetId = centered.dataset.target;
  if (!options.force && mobileNavFocusedTargetId === targetId) return;
  updateMobileNavFocusByTarget(targetId);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function getMobileNavTargetScroll(item) {
  if (!mobileNavBar || !item) return null;
  return item.offsetLeft - ((mobileNavBar.clientWidth - item.offsetWidth) / 2);
}

function getBestMobileNavItemForTarget(targetId) {
  if (!mobileNavBar || !targetId) return null;
  const candidates = mobileNavItems.filter(item => item.dataset.target === targetId);
  if (!candidates.length) return null;

  const center = mobileNavBar.scrollLeft + (mobileNavBar.clientWidth / 2);
  return candidates.reduce((best, item) => {
    const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
    const bestCenter = best.offsetLeft + (best.offsetWidth / 2);
    return Math.abs(itemCenter - center) < Math.abs(bestCenter - center) ? item : best;
  }, candidates[0]);
}

function scrollMobileNavToTarget(targetId) {
  if (!mobileNavBar || !mobileNavItems.length || !targetId) return;
  const targetItem = getBestMobileNavItemForTarget(targetId);
  if (!targetItem) return;

  requestAnimationFrame(() => {
    normalizeMobileNavLoopScroll();

    const refreshedTarget = getBestMobileNavItemForTarget(targetId) || targetItem;
    const target = getMobileNavTargetScroll(refreshedTarget);
    if (!Number.isFinite(target)) return;

    if (mobileNavSmoothRaf) cancelAnimationFrame(mobileNavSmoothRaf);

    const start = mobileNavBar.scrollLeft;
    const distance = target - start;
    const duration = 280;
    const startTime = performance.now();

    if (Math.abs(distance) < 1) {
      updateMobileNavFocusByTarget(targetId);
      normalizeMobileNavLoopScroll();
      return;
    }

    mobileNavSmoothScrolling = true;
    clearMobileNavAnticipation();

    const step = now => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      mobileNavBar.scrollLeft = start + (distance * eased);
      updateMobileNavFocusFromCenter();

      if (progress < 1) {
        mobileNavSmoothRaf = requestAnimationFrame(step);
      } else {
        mobileNavSmoothRaf = 0;
        mobileNavSmoothScrolling = false;
        normalizeMobileNavLoopScroll();
        updateMobileNavFocusByTarget(targetId);
        setMobileNavLoopResistance(false);
      }
    };

    mobileNavSmoothRaf = requestAnimationFrame(step);
  });
}

function scrollMobileNavToActive() {
  scrollMobileNavToTarget(state.currentSection);
}

function prepareMobileNavLabelTransition(id) {
  if (!mobileNavItems.length || mobileNavLastSyncedId === null || mobileNavLastSyncedId === id) {
    mobileNavLastSyncedId = id;
    return;
  }

  const outgoingLabels = mobileNavItems
    .filter(item => item.dataset.target === mobileNavLastSyncedId)
    .map(item => item.querySelector('span:last-child'))
    .filter(Boolean);

  const incomingLabels = mobileNavItems
    .filter(item => item.dataset.target === id)
    .map(item => item.querySelector('span:last-child'))
    .filter(Boolean);

  outgoingLabels.forEach(label => label.classList.add('is-exiting'));
  incomingLabels.forEach(label => label.classList.add('is-entering'));

  requestAnimationFrame(() => {
    incomingLabels.forEach(label => label.classList.remove('is-entering'));
  });

  window.setTimeout(() => {
    outgoingLabels.forEach(label => label.classList.remove('is-exiting'));
    incomingLabels.forEach(label => label.classList.remove('is-entering'));
  }, 220);

  mobileNavLastSyncedId = id;
}

function applySectionAmbientToNav(id) {
  const ambient = SECTION_AMBIENTS[id] || 'rgba(235, 226, 210, 0.045)';
  if (mobileNavBar) mobileNavBar.style.setProperty('--nav-ambient', ambient);
  body.style.setProperty('--body-ambient', ambient);
}

function syncActiveNav(id) {
  prepareMobileNavLabelTransition(id);

  navItems.forEach(item => item.classList.toggle('active', item.dataset.section === id));
  railDots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === id));

  mobileNavItems.forEach(item => {
    item.classList.toggle('current-page', item.dataset.target === id);
    item.classList.remove('anticipating');
  });

  updateMobileNavFocusByTarget(id);
  applySectionAmbientToNav(id);
  scrollMobileNavToTarget(id);
}


function updateNavListAccent(item) {
  if (!navList || !item) return;
  window.requestAnimationFrame(() => {
    if (!navList || !item.isConnected) return;
    const listRect = navList.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const y = itemRect.top - listRect.top + (itemRect.height / 2);
    const height = Math.max(24, itemRect.height * 0.60);
    navList.style.setProperty('--nav-accent-y', `${y}px`);
    navList.style.setProperty('--nav-accent-height', `${height}px`);
    navList.style.setProperty('--nav-accent-scale', '1');
    navList.classList.add('has-accent');
  });
}

function setPreviewContentFromItem(item) {
  if (!item) return;
  previewIndex.textContent = item.dataset.index || '01';
  previewTitle.textContent = t(item.dataset.previewTitleKey || 'sections.threshold');
  previewCopy.textContent = t(item.dataset.previewCopyKey || 'preview.threshold');
}

function applyPreviewAmbientFromItem(item) {
  if (!navPreviewShell || !item) return;
  const ambient = SECTION_AMBIENTS[item.dataset.section] || 'rgba(235, 226, 210, 0.045)';
  navPreviewShell.style.setProperty('--preview-ambient', ambient);
}

function updatePreviewFromItem(item) {
  if (!item) return;
  const previewNodes = [previewIndex, previewTitle, previewCopy].filter(Boolean);

  previewNodes.forEach(node => node.classList.add('is-swapping'));
  applyPreviewAmbientFromItem(item);
  updateNavListAccent(item);

  requestAnimationFrame(() => {
    setPreviewContentFromItem(item);
    requestAnimationFrame(() => {
      previewNodes.forEach(node => node.classList.remove('is-swapping'));
    });
  });

  navItems.forEach(entry => {
    const isActive = state.menuOpen ? entry === item : entry.dataset.section === state.currentSection;
    entry.classList.toggle('active', isActive);
  });
}

function isMobileLayout() { return mobileLayoutQuery.matches; }

function getTransitionTiming() {
  return isMobileLayout()
    ? { exit: 200, enter: 110, lock: 330 }
    : { exit: EXIT_DURATION, enter: ENTER_DELAY, lock: TRANSITION_LOCK };
}

function syncGalleryDots() {
  if (!galleryGrid || !galleryDots.length) return;
  const cards = Array.from(galleryGrid.querySelectorAll('.gallery-cell'));
  if (!cards.length) return;

  if (!isMobileLayout()) {
    galleryDots.forEach((dot, index) => dot.classList.toggle('active', index === 0));
    return;
  }

  const center = galleryGrid.scrollLeft + (galleryGrid.clientWidth * 0.5);
  let activeIndex = 0;
  let smallestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + (card.offsetWidth * 0.5);
    const distance = Math.abs(center - cardCenter);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      activeIndex = index;
    }
  });

  galleryDots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
}

function bindGalleryTracking() {
  if (!galleryGrid || !galleryDots.length) return;
  let rafId = 0;
  const onScroll = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      syncGalleryDots();
      rafId = 0;
    });
  };
  galleryGrid.addEventListener('scroll', onScroll, { passive: true });
  syncGalleryDots();
}

function getViewportHeight() {
  return window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight || 0;
}

function getSectionAvailableHeight(section) {
  const style = window.getComputedStyle(section);
  const paddingTop = parseFloat(style.paddingTop) || 0;
  const paddingBottom = parseFloat(style.paddingBottom) || 0;
  return Math.max(0, getViewportHeight() - paddingTop - paddingBottom);
}

function measureNaturalSectionHeight(inner) {
  const previousMaxHeight = inner.style.maxHeight;
  const previousOverflow = inner.style.overflow;

  inner.style.maxHeight = 'none';
  inner.style.overflow = 'visible';

  const naturalHeight = Math.ceil(Math.max(
    inner.scrollHeight || 0,
    inner.offsetHeight || 0,
    inner.getBoundingClientRect().height || 0
  ));

  inner.style.maxHeight = previousMaxHeight;
  inner.style.overflow = previousOverflow;

  return naturalHeight;
}

function updateSectionSizing() {
  const mobile = isMobileLayout();

  sections.forEach(section => {
    const inner = section.querySelector('.section-inner');
    if (!inner) return;

    const isActive = section.classList.contains('active');

    if (mobile && isActive) {
      inner.style.maxHeight = 'none';
      inner.style.height = 'auto';
      inner.style.overflow = 'visible';
    } else {
      inner.style.maxHeight = '';
      inner.style.height = '';
      inner.style.overflow = '';
    }

    const availableHeight = getSectionAvailableHeight(section);
    const naturalHeight = measureNaturalSectionHeight(inner);
    const clippedByFrame = inner.scrollHeight > inner.clientHeight + 2;
    const needsScroll = (mobile && isActive) ? true : (naturalHeight > availableHeight - 2 || clippedByFrame);

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

function rememberGateSession() {
  try {
    window.sessionStorage?.setItem(SESSION_UNLOCK_KEY, '1');
  } catch (_) {}
}

function hasGateSession() {
  try {
    return window.sessionStorage?.getItem(SESSION_UNLOCK_KEY) === '1';
  } catch (_) {
    return false;
  }
}

function completeGateClear() {
  body.classList.add('gate-cleared');
  body.classList.remove('gate-active', 'session-returning');
  requestAnimationFrame(() => scrollMobileNavToActive());
  introVeil?.setAttribute('aria-hidden', 'true');
  veilInput?.blur();
  window.setTimeout(() => { if (introVeil) introVeil.style.pointerEvents = 'none'; }, 1200);
}

function unlockGate(options = {}) {
  const {
    rememberSession = true,
    delay = GATE_SUCCESS_DELAY,
    markSuccess = true
  } = options;

  if (rememberSession) rememberGateSession();
  if (markSuccess && veilForm) veilForm.classList.add('is-success');
  window.setTimeout(completeGateClear, delay);
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
  const emblemStage = document.getElementById('veil-emblem-stage');
  const emblemImage = emblemStage?.querySelector('img[data-src]');
  const primeEmblemImage = () => {
    if (!emblemStage || !emblemImage) return;
    if (!emblemImage.getAttribute('src')) {
      emblemImage.setAttribute('src', emblemImage.dataset.src);
    }
    emblemStage.classList.add('image-primed');
  };

  window.setTimeout(() => body.classList.add('background-revealed'), BACKGROUND_REVEAL_DELAY);
  window.setTimeout(primeEmblemImage, Math.max(0, EMBLEM_REVEAL_DELAY - 280));
  window.setTimeout(() => {
    primeEmblemImage();
    if (emblemStage) emblemStage.removeAttribute('style');
    body.classList.add('emblem-revealed');
  }, EMBLEM_REVEAL_DELAY);
  window.setTimeout(() => body.classList.add('emblem-fading'), EMBLEM_FADE_DELAY);
  window.setTimeout(() => body.classList.add('threshold-revealed', 'panel-revealed'), THRESHOLD_REVEAL_DELAY);
  window.setTimeout(() => body.classList.add('wordmark-revealed'), WORDMARK_REVEAL_DELAY);
  window.setTimeout(() => body.classList.add('submark-revealed'), SUBMARK_REVEAL_DELAY);
  window.setTimeout(() => {
    body.classList.add('form-revealed');
    focusPinInput();
  }, FORM_REVEAL_DELAY);
}


function revealReturningSessionMiniThreshold() {
  body.classList.add('session-returning');
  introVeil?.setAttribute('aria-hidden', 'false');

  window.setTimeout(() => body.classList.add('background-revealed'), BACKGROUND_REVEAL_DELAY);
  window.setTimeout(() => {
    body.classList.add('threshold-revealed', 'panel-revealed', 'wordmark-revealed', 'submark-revealed');
  }, MINI_THRESHOLD_ENTER_DELAY);
  window.setTimeout(() => {
    unlockGate({ rememberSession: false, delay: 0, markSuccess: false });
  }, MINI_THRESHOLD_EXIT_DELAY);
}


function goToSection(targetId) {
  if (state.isTransitioning || targetId === state.currentSection || body.classList.contains('detail-open')) return;
  const current = getSection(state.currentSection);
  const next = getSection(targetId);
  if (!next) return;

  const timing = getTransitionTiming();
  state.isTransitioning = true;
  const fromIndex = getSectionPosition(state.currentSection);
  const toIndex = getSectionPosition(targetId);
  const directionClass = toIndex > fromIndex ? 'transition-forward' : 'transition-backward';
  body.classList.remove('transition-forward', 'transition-backward');
  body.classList.add('is-transitioning', directionClass);

  if (current) {
    current.classList.remove('active');
    current.classList.add('exiting');
    window.setTimeout(() => { current.classList.remove('exiting'); current.scrollTop = 0; }, timing.exit);
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
    scheduleSectionSizing();
    window.setTimeout(scheduleSectionSizing, 80);
    syncGalleryDots();
  }, timing.enter);

  window.setTimeout(() => {
    state.isTransitioning = false;
    body.classList.remove('is-transitioning', 'transition-forward', 'transition-backward');
    updateSectionSizing();
    syncGalleryDots();
  }, timing.lock);
}

function goHome() { goToSection('home'); }
function goRelative(step) {
  if (!sectionIds.length) return;
  const nextIndex = (state.currentIndex + step + sectionIds.length) % sectionIds.length;
  goToSection(sectionIds[nextIndex]);
}

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
  if (!state.menuOpen && !navOverlay?.classList.contains('open')) return;
  state.menuOpen = false;

  if (navOverlay) {
    navOverlay.classList.remove('is-opening');

    const finishClosing = event => {
      if (event && event.target !== navOverlay) return;
      if (event && event.type === 'transitionend' && event.propertyName !== 'opacity' && event.propertyName !== 'transform') return;
      navOverlay.classList.remove('open', 'is-closing');
      navOverlay.removeEventListener('transitionend', finishClosing);
      body.classList.remove('menu-open');
    };

    navOverlay.addEventListener('transitionend', finishClosing);
    navOverlay.setAttribute('aria-hidden', 'true');
    menuToggle?.setAttribute('aria-expanded', 'false');

    window.requestAnimationFrame(() => {
      navOverlay.classList.add('is-closing');
    });

    window.setTimeout(finishClosing, 1100);
    return;
  }

  navOverlay?.classList.remove('open', 'is-closing');
  navOverlay?.setAttribute('aria-hidden', 'true');
  menuToggle?.setAttribute('aria-expanded', 'false');
  body.classList.remove('menu-open');
}


function updateSpotlight(x, y) {
  body.style.setProperty('--spot-x', `${x}px`);
  body.style.setProperty('--spot-y', `${y}px`);
}

function commitSpotlightUpdate() {
  spotlightFrame = 0;
  spotlightLastCommit = performance.now();
  updateSpotlight(pendingSpotlightX, pendingSpotlightY);
}

function scheduleSpotlightUpdate(x, y) {
  pendingSpotlightX = x;
  pendingSpotlightY = y;
  if (spotlightFrame || spotlightTimer) return;

  const elapsed = performance.now() - spotlightLastCommit;
  const delay = Math.max(0, SPOTLIGHT_UPDATE_INTERVAL - elapsed);

  const queueFrame = () => {
    spotlightTimer = 0;
    spotlightFrame = requestAnimationFrame(commitSpotlightUpdate);
  };

  if (delay > 0) {
    spotlightTimer = window.setTimeout(queueFrame, delay);
    return;
  }

  queueFrame();
}

function enableCustomPointer() { if (!pointer || !pointerQuery.matches) return; pointerState.enabled = true; root.classList.add('has-mc-pointer'); }
function disableCustomPointer() {
  pointerState.enabled = false;
  pointerState.visible = false;
  if (pointerState.frame) {
    cancelAnimationFrame(pointerState.frame);
    pointerState.frame = 0;
  }
  root.classList.remove('has-mc-pointer');
  pointer?.classList.remove('is-visible', 'is-hover-text', 'is-hover-action', 'is-hover-media', 'is-hover-input', 'is-pressed');
}
function showPointer() {
  if (!pointerState.enabled || !pointer || pointerState.visible) return;
  pointerState.visible = true;
  pointer.classList.add('is-visible');
}
function hidePointer() {
  pointerState.visible = false;
  if (!pointer) return;
  pointer.classList.remove('is-visible', 'is-pressed');
}
function movePointer(x, y) {
  if (!pointerState.enabled || !pointer) return;
  pointerState.x = x;
  pointerState.y = y;
  pointer.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

function classifyPointerTarget(target) {
  if (!pointer) return;
  const isAction = !!target.closest('a, button, [role="button"], [data-action], .nav-item, .rail-dot, .mobile-nav-item, .archive-row, .gallery-cell, .header-logo, .menu-toggle, .contact-link, .contact-email, .btn-primary, .btn-ghost, .btn-back, .lang-choice, .detail-close, .vault-filter, .directory-item, .directory-status');
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

let sectionSizingFrame = 0;
function scheduleSectionSizing() {
  if (sectionSizingFrame) cancelAnimationFrame(sectionSizingFrame);
  sectionSizingFrame = requestAnimationFrame(() => {
    sectionSizingFrame = 0;
    updateSectionSizing();
  });
}

function bindSectionSizingObservers() {
  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(scheduleSectionSizing) : null;

  sections.forEach(section => {
    const inner = section.querySelector('.section-inner');
    if (inner && resizeObserver) resizeObserver.observe(inner);
  });

  document.querySelectorAll('img').forEach(image => {
    if (!image.complete) image.addEventListener('load', scheduleSectionSizing, { once: true });
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scheduleSectionSizing, { passive: true });
  }
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
    scheduleSectionSizing();
    window.setTimeout(scheduleSectionSizing, 90);
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
    scheduleSectionSizing();
    scrollMobileNavToActive();
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

function toggleSupplierDesk(forceOpen = null) {
  if (!supplierDeskPanel) return;
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !supplierDeskPanel.classList.contains('is-open');
  supplierDeskPanel.hidden = !shouldOpen;
  supplierDeskPanel.classList.toggle('is-open', shouldOpen);
  supplierDeskPanel.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
  supplierDeskButtons.forEach(button => button.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false'));
  window.setTimeout(() => {
    scheduleSectionSizing();
    if (shouldOpen) supplierDeskPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, shouldOpen ? 40 : 0);
}

document.addEventListener('click', event => {
  if (event.target.closest('[data-placeholder-link]')) {
    event.preventDefault();
    return;
  }
  const trigger = event.target.closest('[data-action]');
  if (!trigger) return;
  const action = trigger.dataset.action;
  switch (action) {
    case 'go-home': goHome(); break;
    case 'go-section': if (trigger.dataset.target) goToSection(trigger.dataset.target); break;
    case 'toggle-supplier-desk': toggleSupplierDesk(); break;
    case 'open-menu': openMenu(); break;
    default: break;
  }
});

veilForm?.addEventListener('submit', handleVeilSubmit);
introVeil?.addEventListener('pointerdown', () => { if (body.classList.contains('gate-active') && !body.classList.contains('session-returning')) requestPinKeyboard(); }, { passive: true });
introVeil?.addEventListener('touchstart', () => { if (body.classList.contains('gate-active') && !body.classList.contains('session-returning')) requestPinKeyboard(); }, { passive: true });
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
veilInput?.addEventListener('focus', () => {
  document.body.classList.add('pin-focused');
  window.setTimeout(() => window.scrollTo(0, 0), 0);
});
veilInput?.addEventListener('blur', () => document.body.classList.remove('pin-focused'));
veilInput?.addEventListener('keydown', event => { if (event.key === 'Escape') event.stopPropagation(); });

document.addEventListener('keydown', event => {
  const isLanguageControl = !!event.target.closest('.lang-switcher');

  if (body.classList.contains('gate-active') && !body.classList.contains('session-returning') && event.target !== veilInput && !isLanguageControl) {
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
  if (pointerState.enabled) {
    movePointer(event.clientX, event.clientY);
    showPointer();

    if (event.target !== lastPointerTarget) {
      lastPointerTarget = event.target;
      classifyPointerTarget(event.target);
    }
  }

  scheduleSpotlightUpdate(event.clientX, event.clientY);
}, { passive: true });
window.addEventListener('mousemove', event => {
  if (pointerState.enabled) return;
  scheduleSpotlightUpdate(event.clientX, event.clientY);
}, { passive: true });
window.addEventListener('pointerdown', () => { if (!pointerState.enabled || !pointer) return; pointer.classList.add('is-pressed'); }, { passive: true });
window.addEventListener('pointerup', () => pointer?.classList.remove('is-pressed'), { passive: true });
window.addEventListener('pointerleave', hidePointer, { passive: true });
window.addEventListener('blur', hidePointer, { passive: true });

pointerQuery.addEventListener('change', event => { event.matches ? enableCustomPointer() : disableCustomPointer(); });

window.addEventListener('load', () => {
  body.classList.remove('preload');
  updateSectionSizing();
  if (hasGateSession()) {
    revealReturningSessionMiniThreshold();
  } else {
    revealVeilSequence();
  }
});
window.addEventListener('resize', () => { scheduleSectionSizing(); syncGalleryDots(); }, { passive: true });

(function init() {
  const storedLang = getStoredLanguage();
  const initialLang = translations[storedLang] ? storedLang : detectBrowserLanguage();
  if (translations[initialLang]) state.currentLang = initialLang;
  const homeSection = getSection('home');
  if (homeSection) { homeSection.classList.add('active'); state.currentSection = 'home'; state.currentIndex = 0; }
  enableCustomPointer();
  initializeMobileNavLoop();
  bindSectionScrolls();
  bindSectionSizingObservers();
  syncActiveNav('home');
  setBodySection('home');
  applyLanguage(true);
  bindVeilFocusInteractions();
  bindGalleryTracking();
  updatePinSlots('');
  updateCodexFilter();
  updateSpotlight(window.innerWidth * 0.5, window.innerHeight * 0.5);
  updateSectionSizing();
  syncGalleryDots();
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
  if (!document.hidden && body.classList.contains('gate-active') && !body.classList.contains('session-returning') && body.classList.contains('form-revealed')) {
    requestPinKeyboard();
  }
});

if (typeof mobileLayoutQuery.addEventListener === 'function') {
  mobileLayoutQuery.addEventListener('change', () => { scheduleSectionSizing(); syncGalleryDots(); });
} else if (typeof mobileLayoutQuery.addListener === 'function') {
  mobileLayoutQuery.addListener(() => { scheduleSectionSizing(); syncGalleryDots(); });
}
