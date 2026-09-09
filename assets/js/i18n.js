/* =====================================================================
   RSA — bilingual layer (EL / EN)
   Baseline markup is English; this translates the DOM to Greek and back.
   Works on static text, common attributes, <title>, and dynamically
   inserted content (Program Finder, wizard) via a MutationObserver.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Dictionary: English (source) -> Greek ---------- */
  var DICT = {
    // --- Navigation / chrome ---
    "Programs": "Προγράμματα",
    "The Academy": "Η Ακαδημία",
    "For Schools": "Για Σχολεία",
    "News": "Νέα",
    "Contact": "Επικοινωνία",
    "Payments": "Πληρωμές",
    "Free Trial": "Δωρεάν Μάθημα",
    "Enquire": "Εκδήλωση ενδιαφέροντος",
    "Need help?": "Χρειάζεστε βοήθεια;",
    "Exit": "Έξοδος",
    "Skip to content": "Μετάβαση στο περιεχόμενο",
    "Menu": "Μενού",
    "Open menu": "Άνοιγμα μενού",
    "Close menu": "Κλείσιμο μενού",
    "Primary": "Κύρια πλοήγηση",
    "Language": "Γλώσσα",
    "On this page": "Σε αυτή τη σελίδα",
    "Legal": "Νομικά",
    "Breadcrumb": "Διαδρομή",
    "Home": "Αρχική",
    "RSA — Robotic & Science Academy home": "RSA — Robotic & Science Academy, αρχική",
    "Call us": "Καλέστε μας",
    "Call": "Κλήση",
    "Call RSA": "Καλέστε το RSA",

    // --- CTAs (shared) ---
    "Book a Free Trial": "Κλείσε Δωρεάν Μάθημα",
    "Book Free Trial": "Κλείσε Δωρεάν Μάθημα",
    "Book a free trial": "Κλείσε δωρεάν μάθημα",
    "Explore Programs": "Δες τα Προγράμματα",
    "Explore programs": "Δες τα προγράμματα",
    "Explore other programs": "Δες άλλα προγράμματα",
    "Compare all programs": "Σύγκρινε όλα τα προγράμματα",
    "Compare all programs →": "Σύγκρινε όλα τα προγράμματα →",
    "View Program": "Δες το Πρόγραμμα",
    "View program": "Δες το πρόγραμμα",
    "Contact Us": "Επικοινωνήστε",
    "Ask a question": "Κάντε μια ερώτηση",
    "All programs": "Όλα τα προγράμματα",

    // --- Hero ---
    "Robotics · AI · STEM": "Ρομποτική · AI · STEM",
    "Where technology becomes an": "Όπου η τεχνολογία γίνεται",
    "experience": "εμπειρία",
    "Hands-on robotics, programming, AI and STEM education for children and teenagers aged 5–18 — learning by building real things.":
      "Βιωματική εκπαίδευση σε ρομποτική, προγραμματισμό, AI και STEM για παιδιά και εφήβους 5–18 ετών — μαθαίνουν φτιάχνοντας πραγματικά πράγματα.",
    "No commitment · Free first lesson · Small groups":
      "Χωρίς δέσμευση · Δωρεάν πρώτο μάθημα · Μικρά τμήματα",
    "Classroom in action": "Η τάξη σε δράση",
    "Two children programming a robot they built during a class at RSA":
      "Δύο παιδιά προγραμματίζουν ένα ρομπότ που έφτιαξαν σε μάθημα στο RSA",

    // --- Stats / trust ---
    "RSA by the numbers": "Το RSA σε αριθμούς",
    "Years of experience": "Χρόνια εμπειρίας",
    "Students taught": "Μαθητές",
    "Students": "Μαθητές",
    "Competition distinctions": "Διακρίσεις σε διαγωνισμούς",
    "Learning paths, ages 5–18": "Προγράμματα, ηλικίες 5–18",
    "Expert educators": "Έμπειροι εκπαιδευτικοί",

    // --- Program finder ---
    "Find the right program": "Βρες το κατάλληλο πρόγραμμα",
    "Tell us your child’s age — we’ll do the rest": "Πες μας την ηλικία του παιδιού — τα υπόλοιπα τα κάνουμε εμείς",
    "No jargon, no program codes. Pick an age and see the recommended path in one tap.":
      "Χωρίς ορολογίες και κωδικούς. Διάλεξε ηλικία και δες το προτεινόμενο πρόγραμμα με ένα άγγιγμα.",
    "How old is your child?": "Πόσων χρονών είναι το παιδί σου;",
    "years": "ετών",
    "Select an age above to see the recommended program and book a free trial.":
      "Διάλεξε ηλικία παραπάνω για να δεις το προτεινόμενο πρόγραμμα και να κλείσεις δωρεάν μάθημα.",
    "Select an age to jump straight to the recommended program.":
      "Διάλεξε ηλικία για να πας κατευθείαν στο προτεινόμενο πρόγραμμα.",
    "Recommended program": "Προτεινόμενο πρόγραμμα",
    "Recommended": "Προτεινόμενο",
    "Duration": "Διάρκεια",
    "Frequency": "Συχνότητα",
    "Location": "Τοποθεσία",
    "Level": "Επίπεδο",
    "Age": "Ηλικία",

    // --- Programs section ---
    "Learning paths for every age": "Διαδρομές μάθησης για κάθε ηλικία",
    "One consistent journey from playful first builds to real AI and engineering.":
      "Ένα ενιαίο ταξίδι, από τις πρώτες παιχνιδιάρικες κατασκευές μέχρι πραγματική AI και μηχανική.",
    "One journey, from first build to real AI": "Ένα ταξίδι, από την πρώτη κατασκευή στην πραγματική AI",
    "Six learning paths designed to grow with your child. Not sure where to start? Pick an age below and we’ll recommend the best fit.":
      "Έξι διαδρομές μάθησης που μεγαλώνουν μαζί με το παιδί σου. Δεν ξέρεις από πού να ξεκινήσεις; Διάλεξε ηλικία παρακάτω και θα σου προτείνουμε την καλύτερη επιλογή.",
    "Compare learning paths": "Σύγκρινε τις διαδρομές μάθησης",
    "Select an age to jump straight to the recommended program.": "Διάλεξε ηλικία για να πας κατευθείαν στο προτεινόμενο πρόγραμμα.",

    // program descriptions
    "Explore robotics through play, construction and creativity — the very first steps into technology.":
      "Εξερεύνηση της ρομποτικής μέσα από παιχνίδι, κατασκευή και δημιουργικότητα — τα πρώτα βήματα στην τεχνολογία.",
    "First steps into robotics through play, construction and creativity.":
      "Πρώτα βήματα στη ρομποτική μέσα από παιχνίδι, κατασκευή και δημιουργικότητα.",
    "Design, build and program working robots while developing genuine problem-solving skills.":
      "Σχεδίαση, κατασκευή και προγραμματισμός λειτουργικών ρομπότ, με ανάπτυξη πραγματικής επίλυσης προβλημάτων.",
    "Design, build and program working robots and develop real problem-solving.":
      "Σχεδίαση, κατασκευή και προγραμματισμός λειτουργικών ρομπότ και ανάπτυξη πραγματικής επίλυσης προβλημάτων.",
    "Deeper engineering, text-based coding and competition robotics for confident makers.":
      "Βαθύτερη μηχανική, προγραμματισμός με κώδικα και αγωνιστική ρομποτική για έμπειρους δημιουργούς.",
    "Engineering, text-based coding and competition robotics for confident makers.":
      "Μηχανική, προγραμματισμός με κώδικα και αγωνιστική ρομποτική για έμπειρους δημιουργούς.",
    "Real programming and artificial intelligence — build portfolio-ready projects for the future.":
      "Πραγματικός προγραμματισμός και τεχνητή νοημοσύνη — έργα έτοιμα για portfolio, για το μέλλον.",
    "Real programming and artificial intelligence — portfolio-ready projects.":
      "Πραγματικός προγραμματισμός και τεχνητή νοημοσύνη — έργα έτοιμα για portfolio.",
    "Flight principles, programming and automation — pilot and code autonomous drones.":
      "Αρχές πτήσης, προγραμματισμός και αυτοματισμός — χειρισμός και κώδικας για αυτόνομα drones.",
    "Flight principles, programming and automation with real drones.":
      "Αρχές πτήσης, προγραμματισμός και αυτοματισμός με πραγματικά drones.",
    "Coding, digital creativity and computational thinking for the connected world.":
      "Προγραμματισμός, ψηφιακή δημιουργικότητα και υπολογιστική σκέψη για τον συνδεδεμένο κόσμο.",

    // levels & ages
    "Beginner": "Αρχάριοι", "Core": "Βασικό", "Intermediate": "Μεσαίο",
    "Advanced": "Προχωρημένο", "All levels": "Όλα τα επίπεδα",
    "5–6 years": "5–6 ετών", "6–8 years": "6–8 ετών", "8–10 years": "8–10 ετών",
    "10–13 years": "10–13 ετών", "6–13 years": "6–13 ετών", "12–18 years": "12–18 ετών",
    "14–18 years": "14–18 ετών", "8–18 years": "8–18 ετών",

    // --- Why RSA ---
    "Why RSA": "Γιατί RSA",
    "A method built on doing, not memorising": "Μια μέθοδος που στηρίζεται στην πράξη, όχι στην αποστήθιση",
    "Learn by doing": "Μάθηση μέσα από την πράξη",
    "Every lesson is hands-on. Ideas become real, working machines.":
      "Κάθε μάθημα είναι βιωματικό. Οι ιδέες γίνονται πραγματικές, λειτουργικές μηχανές.",
    "Build & create": "Κατασκευή & δημιουργία",
    "Students construct, experiment and iterate on their own designs.":
      "Οι μαθητές κατασκευάζουν, πειραματίζονται και βελτιώνουν τα δικά τους σχέδια.",
    "Think & solve": "Σκέψη & επίλυση",
    "Real challenges grow problem-solving and critical thinking.":
      "Πραγματικές προκλήσεις καλλιεργούν την επίλυση προβλημάτων και την κριτική σκέψη.",
    "Tech for the future": "Τεχνολογία για το μέλλον",
    "Programming, AI and robotics — the skills that matter next.":
      "Προγραμματισμός, AI και ρομποτική — οι δεξιότητες που μετράνε στο μέλλον.",

    // --- Process ---
    "The RSA method": "Η μέθοδος RSA",
    "How every project comes to life": "Πώς ζωντανεύει κάθε έργο",
    "Discover": "Ανακάλυψη", "Build": "Κατασκευή", "Program": "Προγραμματισμός",
    "Test": "Δοκιμή", "Improve": "Βελτίωση",
    "Meet a real-world challenge.": "Γνωριμία με μια πραγματική πρόκληση.",
    "Construct the machine.": "Κατασκευή της μηχανής.",
    "Bring it to life with code.": "Ζωντάνεμα με κώδικα.",
    "Try, measure, learn.": "Δοκιμή, μέτρηση, μάθηση.",
    "Iterate and perfect.": "Επανάληψη και τελειοποίηση.",
    "Meet the weekly challenge.": "Γνωριμία με την εβδομαδιαία πρόκληση.",
    "Construct the robot.": "Κατασκευή του ρομπότ.",
    "Code its behaviour.": "Κώδικας για τη συμπεριφορά του.",
    "Run it, measure it.": "Εκτέλεση και μέτρηση.",
    "Refine and present.": "Βελτίωση και παρουσίαση.",

    // --- Schools (home + page) ---
    "Bring STEM learning into the classroom": "Φέρτε τη μάθηση STEM στην τάξη",
    "We partner with schools and educators to deliver robotics, coding and AI as school visits, workshops and long-term collaborations — fully aligned to your curriculum and equipment.":
      "Συνεργαζόμαστε με σχολεία και εκπαιδευτικούς για ρομποτική, προγραμματισμό και AI ως επισκέψεις, εργαστήρια και μακροχρόνιες συνεργασίες — απόλυτα προσαρμοσμένα στο πρόγραμμα και τον εξοπλισμό σας.",
    "Interactive school visits & demos": "Διαδραστικές επισκέψεις & επιδείξεις",
    "Teacher-supported robotics workshops": "Εργαστήρια ρομποτικής με υποστήριξη εκπαιδευτικών",
    "Ongoing educational collaborations": "Συνεχείς εκπαιδευτικές συνεργασίες",
    "Explore School Programs": "Δες τα Σχολικά Προγράμματα",
    "Partner with RSA to deliver robotics, coding and AI to your students — as a one-off visit, a structured workshop series, or a long-term collaboration tailored to your curriculum.":
      "Συνεργαστείτε με το RSA για ρομποτική, προγραμματισμό και AI για τους μαθητές σας — ως μεμονωμένη επίσκεψη, δομημένη σειρά εργαστηρίων ή μακροχρόνια συνεργασία προσαρμοσμένη στο πρόγραμμά σας.",
    "Three ways to work together": "Τρεις τρόποι συνεργασίας",
    "What we offer": "Τι προσφέρουμε",
    "School visits": "Σχολικές επισκέψεις",
    "Interactive, hands-on demos that spark excitement across a whole year group.":
      "Διαδραστικές, βιωματικές επιδείξεις που ενθουσιάζουν ολόκληρη τάξη.",
    "Workshops": "Εργαστήρια",
    "Structured multi-session programs delivered on your premises with our kits.":
      "Δομημένα προγράμματα πολλών συναντήσεων στον χώρο σας, με τον εξοπλισμό μας.",
    "Collaborations": "Συνεργασίες",
    "Long-term partnerships, teacher training and competition-team support.":
      "Μακροχρόνιες συνεργασίες, επιμόρφωση εκπαιδευτικών και υποστήριξη αγωνιστικών ομάδων.",
    "Half / full day": "Μισή / πλήρης ημέρα", "Term-based": "Ανά τρίμηνο", "Ongoing": "Συνεχές",
    "Why schools choose RSA": "Γιατί τα σχολεία επιλέγουν το RSA",
    "Curriculum-aligned, turnkey, proven": "Προσαρμοσμένο στο πρόγραμμα, έτοιμο, δοκιμασμένο",
    "Curriculum aligned": "Ευθυγραμμισμένο με το πρόγραμμα",
    "Mapped to STEM learning objectives and adaptable to any age group.":
      "Αντιστοιχισμένο σε στόχους STEM και προσαρμόσιμο σε κάθε ηλικία.",
    "We bring everything": "Τα φέρνουμε όλα εμείς",
    "Equipment, materials and instructors arrive ready — no setup for your staff.":
      "Εξοπλισμός, υλικά και εκπαιδευτές έρχονται έτοιμα — καμία προετοιμασία για το προσωπικό σας.",
    "Competition ready": "Έτοιμοι για διαγωνισμούς",
    "Optional pathways into WRO and FIRST® LEGO League with our coaches.":
      "Προαιρετικές διαδρομές προς WRO και FIRST® LEGO League με τους προπονητές μας.",
    "Tell us about your school": "Πείτε μας για το σχολείο σας",
    "We’ll reply within two working days with options tailored to your needs.":
      "Θα απαντήσουμε εντός δύο εργάσιμων ημερών με επιλογές προσαρμοσμένες στις ανάγκες σας.",

    // --- Testimonials ---
    "Parents & students": "Γονείς & μαθητές",
    "Trusted by thousands of families": "Μας εμπιστεύονται χιλιάδες οικογένειες",
    "“My son counts down the days to his robotics class. He’s learning to code without even realising it.”":
      "«Ο γιος μου μετράει τις μέρες για το μάθημα ρομποτικής. Μαθαίνει προγραμματισμό χωρίς καν να το καταλαβαίνει.»",
    "“The teachers are patient and genuinely knowledgeable. Our daughter went from shy to leading her competition team.”":
      "«Οι καθηγητές είναι υπομονετικοί και πραγματικά καταρτισμένοι. Η κόρη μας από ντροπαλή έγινε αρχηγός στην αγωνιστική ομάδα.»",
    "“The AI Academy gave me a real project portfolio. It’s the reason I chose to study computer engineering.”":
      "«Το AI Academy μου έδωσε πραγματικό portfolio έργων. Γι’ αυτό επέλεξα να σπουδάσω μηχανικός υπολογιστών.»",
    "“Booking the free trial was effortless and we knew within one lesson it was the right place.”":
      "«Το κλείσιμο του δωρεάν μαθήματος ήταν πανεύκολο και μέσα σε ένα μάθημα καταλάβαμε ότι ήταν το σωστό μέρος.»",
    "Parent · Kids Robotics, age 9": "Γονέας · Kids Robotics, 9 ετών",
    "Parent · Teens Robotics, age 12": "Γονέας · Teens Robotics, 12 ετών",
    "Student · AI Academy, age 17": "Μαθήτρια · AI Academy, 17 ετών",
    "Parent · Junior Robotics, age 6": "Γονέας · Junior Robotics, 6 ετών",
    "Previous testimonials": "Προηγούμενες μαρτυρίες",
    "Next testimonials": "Επόμενες μαρτυρίες",
    "Testimonial navigation": "Πλοήγηση μαρτυριών",
    "5 out of 5 stars": "5 στα 5 αστέρια",

    // --- Achievements ---
    "Achievements": "Διακρίσεις",
    "A decade of distinctions": "Μια δεκαετία διακρίσεων",
    "Our students compete — and win — at national and international level.":
      "Οι μαθητές μας διαγωνίζονται — και κερδίζουν — σε εθνικό και διεθνές επίπεδο.",
    "WRO National Finalists": "Εθνικοί Φιναλίστ WRO",
    "Multiple podium finishes at the World Robot Olympiad.":
      "Πολλαπλές θέσεις στο βάθρο στη World Robot Olympiad.",
    "FIRST® LEGO League": "FIRST® LEGO League",
    "Innovation & teamwork awards across age divisions.":
      "Βραβεία καινοτομίας & ομαδικότητας σε όλες τις ηλικιακές κατηγορίες.",
    "230+ distinctions": "230+ διακρίσεις",
    "Cumulative competition awards earned by RSA students.":
      "Συνολικά βραβεία διαγωνισμών που κέρδισαν μαθητές του RSA.",
    "RoboCup Junior": "RoboCup Junior",
    "Qualified teams in rescue and soccer leagues.":
      "Προκριθείσες ομάδες σε κατηγορίες rescue και soccer.",
    "Panhellenic Robotics": "Πανελλήνια Ρομποτική",
    "Repeated regional and national championship placements.":
      "Επαναλαμβανόμενες διακρίσεις σε περιφερειακά και εθνικά πρωταθλήματα.",
    "STEM Discovery awards": "Βραβεία STEM Discovery",
    "Recognised for teaching innovation and outreach.":
      "Αναγνώριση για εκπαιδευτική καινοτομία και δράση.",
    "See all achievements": "Δες όλες τις διακρίσεις",

    // --- Final CTA ---
    "Ready to start?": "Έτοιμοι να ξεκινήσετε;",
    "Give your child a first taste of the future": "Δώστε στο παιδί σας μια πρώτη γεύση από το μέλλον",
    "Book a free trial lesson and let your child experience robotics and technology firsthand — no commitment, no cost.":
      "Κλείστε ένα δωρεάν μάθημα και αφήστε το παιδί σας να ζήσει τη ρομποτική και την τεχνολογία από πρώτο χέρι — χωρίς δέσμευση, χωρίς κόστος.",
    "Still deciding?": "Ακόμη το σκέφτεστε;",
    "A free trial is the easiest way to know. Your child joins a real class — you watch them light up.":
      "Το δωρεάν μάθημα είναι ο πιο εύκολος τρόπος να σιγουρευτείτε. Το παιδί σας μπαίνει σε πραγματική τάξη — κι εσείς το βλέπετε να λάμπει.",

    // --- Footer ---
    "Academy": "Ακαδημία", "Schools": "Σχολεία",
    "Robotic & Science Academy — where children and teenagers learn technology by building real things.":
      "Robotic & Science Academy — όπου παιδιά και έφηβοι μαθαίνουν τεχνολογία φτιάχνοντας πραγματικά πράγματα.",
    "Robotic & Science Academy — where children learn technology by building real things.":
      "Robotic & Science Academy — όπου τα παιδιά μαθαίνουν τεχνολογία φτιάχνοντας πραγματικά πράγματα.",
    "About": "Σχετικά", "Team": "Ομάδα", "Facilities": "Εγκαταστάσεις", "FAQ": "Συχνές ερωτήσεις",
    "School Visits": "Σχολικές επισκέψεις",
    "Thessaloniki, Greece": "Θεσσαλονίκη, Ελλάδα",
    "© 2026 Robotic & Science Academy. All rights reserved.":
      "© 2026 Robotic & Science Academy. Με επιφύλαξη παντός δικαιώματος.",
    "Privacy": "Απόρρητο", "Terms": "Όροι", "Cookies": "Cookies",
    "RSA on Facebook": "RSA στο Facebook", "RSA on Instagram": "RSA στο Instagram", "RSA on YouTube": "RSA στο YouTube",

    // --- Program detail ---
    "Your child designs, builds and programs working robots — turning curiosity into real engineering and computational thinking, one project at a time.":
      "Το παιδί σας σχεδιάζει, κατασκευάζει και προγραμματίζει λειτουργικά ρομπότ — μετατρέποντας την περιέργεια σε πραγματική μηχανική και υπολογιστική σκέψη, ένα έργο τη φορά.",
    "See what they’ll use": "Δες τι θα χρησιμοποιήσουν",
    "9 months": "9 μήνες",
    "1× / week · 90 min": "1× / εβδομάδα · 90 λεπτά",
    "On-site & centres": "Στον χώρο μας & κέντρα",
    "Overview": "Επισκόπηση", "Learning": "Μάθηση", "Tools": "Εργαλεία", "Schedule": "Πρόγραμμα",
    "What will your child learn?": "Τι θα μάθει το παιδί σας;",
    "Every term builds toward genuine understanding — not memorised steps.":
      "Κάθε περίοδος οδηγεί σε πραγματική κατανόηση — όχι σε αποστηθισμένα βήματα.",
    "Mechanics & motion": "Μηχανική & κίνηση",
    "Gears, motors, sensors and structures — how machines actually move.":
      "Γρανάζια, μοτέρ, αισθητήρες και κατασκευές — πώς πραγματικά κινούνται οι μηχανές.",
    "Block-based coding": "Προγραμματισμός με μπλοκ",
    "Sequencing, loops and logic through visual programming.":
      "Ακολουθίες, επαναλήψεις και λογική μέσα από οπτικό προγραμματισμό.",
    "Problem solving": "Επίλυση προβλημάτων",
    "Breaking challenges into steps and debugging with confidence.":
      "Ανάλυση προκλήσεων σε βήματα και διόρθωση σφαλμάτων με σιγουριά.",
    "Projects": "Έργα",
    "What will they build?": "Τι θα κατασκευάσουν;",
    "Sorting robot": "Ρομπότ διαλογής",
    "Uses a colour sensor to sort objects automatically.":
      "Χρησιμοποιεί αισθητήρα χρώματος για αυτόματη διαλογή αντικειμένων.",
    "Line follower": "Ρομπότ γραμμής",
    "A rover that reads and follows a track on its own.":
      "Ένα όχημα που διαβάζει και ακολουθεί μόνο του μια διαδρομή.",
    "Motorised crane": "Μηχανοκίνητος γερανός",
    "Lifts and moves loads using programmed gears.":
      "Σηκώνει και μετακινεί φορτία με προγραμματισμένα γρανάζια.",
    "Outcomes": "Αποτελέσματα",
    "Skills developed": "Δεξιότητες που αναπτύσσονται",
    "Programming": "Προγραμματισμός", "Robotics": "Ρομποτική", "Teamwork": "Ομαδικότητα",
    "Creativity": "Δημιουργικότητα", "Persistence": "Επιμονή", "Logic": "Λογική", "Focus": "Συγκέντρωση",
    "Kit": "Εξοπλισμός",
    "Tools & technologies": "Εργαλεία & τεχνολογίες",
    "Professional-grade educational hardware and software, sized for young hands and minds.":
      "Επαγγελματικό εκπαιδευτικό υλικό και λογισμικό, φτιαγμένα για μικρά χέρια και μυαλά.",
    "Colour & distance sensors": "Αισθητήρες χρώματος & απόστασης",
    "Motors & gears": "Μοτέρ & γρανάζια",
    "RSA project workbook": "Τετράδιο έργων RSA",
    "Methodology": "Μεθοδολογία",
    "How the program works": "Πώς λειτουργεί το πρόγραμμα",
    "Questions parents ask": "Ερωτήσεις που κάνουν οι γονείς",
    "Does my child need any prior experience?": "Χρειάζεται το παιδί μου προηγούμενη εμπειρία;",
    "None at all. Kids Robotics starts from the fundamentals and progresses at each child’s pace, in small groups.":
      "Καθόλου. Το Kids Robotics ξεκινά από τα βασικά και προχωρά με τον ρυθμό κάθε παιδιού, σε μικρά τμήματα.",
    "How big are the groups?": "Πόσο μεγάλα είναι τα τμήματα;",
    "Groups are kept small so every child gets hands-on time and individual guidance from the instructor.":
      "Τα τμήματα είναι μικρά, ώστε κάθε παιδί να έχει χρόνο στην πράξη και ατομική καθοδήγηση από τον εκπαιδευτή.",
    "Do we need to buy any equipment?": "Χρειάζεται να αγοράσουμε εξοπλισμό;",
    "No. All robotics kits, sensors and software are provided in class. Your child only brings their curiosity.":
      "Όχι. Όλα τα κιτ ρομποτικής, οι αισθητήρες και το λογισμικό παρέχονται στην τάξη. Το παιδί σας φέρνει μόνο την περιέργειά του.",
    "What happens in the free trial?": "Τι γίνεται στο δωρεάν μάθημα;",
    "Your child joins a real class, builds and programs a small project, and you see the teaching first-hand — with no obligation to continue.":
      "Το παιδί σας μπαίνει σε πραγματική τάξη, φτιάχνει και προγραμματίζει ένα μικρό έργο, κι εσείς βλέπετε τη διδασκαλία από κοντά — χωρίς καμία υποχρέωση συνέχειας.",
    "Ready to see it in action?": "Έτοιμοι να το δείτε στην πράξη;",
    "Book a free Kids Robotics trial and watch your child build and program their first robot.":
      "Κλείστε δωρεάν μάθημα Kids Robotics και δείτε το παιδί σας να φτιάχνει και να προγραμματίζει το πρώτο του ρομπότ.",

    // --- Academy page ---
    "Ten years turning curiosity into capability": "Δέκα χρόνια μετατρέπουμε την περιέργεια σε ικανότητα",
    "RSA began with a simple belief: children learn technology best by building it. A decade on, thousands of students later, that belief still shapes every lesson.":
      "Το RSA ξεκίνησε με μια απλή πεποίθηση: τα παιδιά μαθαίνουν καλύτερα την τεχνολογία φτιάχνοντάς την. Μια δεκαετία και χιλιάδες μαθητές μετά, αυτή η πεποίθηση καθορίζει ακόμη κάθε μάθημα.",
    "Our story": "Η ιστορία μας",
    "An academy built by educators and engineers": "Μια ακαδημία φτιαγμένη από εκπαιδευτικούς και μηχανικούς",
    "We bring together experienced teachers and working engineers to create a learning environment that is rigorous, playful and genuinely hands-on. Our curriculum is progressive — each program connects naturally to the next, so a child who starts with playful builds at five can be training an AI model at seventeen.":
      "Φέρνουμε μαζί έμπειρους καθηγητές και ενεργούς μηχανικούς για ένα περιβάλλον μάθησης απαιτητικό, παιχνιδιάρικο και πραγματικά βιωματικό. Το πρόγραμμά μας είναι εξελικτικό — κάθε επίπεδο συνδέεται φυσικά με το επόμενο, ώστε ένα παιδί που ξεκινά με παιχνιδιάρικες κατασκευές στα πέντε, να εκπαιδεύει ένα μοντέλο AI στα δεκαεπτά.",
    "We measure success not by certificates, but by the moment a student realises they can make an idea real.":
      "Δεν μετράμε την επιτυχία με πιστοποιητικά, αλλά με τη στιγμή που ένας μαθητής συνειδητοποιεί ότι μπορεί να κάνει μια ιδέα πραγματικότητα.",
    "The people in the room": "Οι άνθρωποι της τάξης",
    "Educators who are as comfortable with children as they are with code.":
      "Εκπαιδευτικοί εξίσου άνετοι με τα παιδιά όσο και με τον κώδικα.",
    "Program Director": "Διευθυντής Προγράμματος", "Robotics & STEM education": "Εκπαίδευση ρομποτικής & STEM",
    "AI Lead": "Υπεύθυνος AI", "Machine learning & Python": "Μηχανική μάθηση & Python",
    "Competition Coach": "Προπονητής Διαγωνισμών", "WRO & FLL mentor": "Μέντορας WRO & FLL",
    "Junior Lead": "Υπεύθυνη Junior", "Early-years robotics": "Ρομποτική πρώτης ηλικίας",
    "Purpose-built for making": "Φτιαγμένες για δημιουργία",
    "Robotics labs": "Εργαστήρια ρομποτικής",
    "Fully equipped workstations with kits, sensors and prototyping tools.":
      "Πλήρως εξοπλισμένοι σταθμοί με κιτ, αισθητήρες και εργαλεία πρωτοτυποποίησης.",
    "Competition arena": "Αγωνιστική αρένα",
    "Regulation practice fields for WRO and FLL preparation.":
      "Επίσημα πεδία εξάσκησης για προετοιμασία WRO και FLL.",
    "Drone flight zone": "Ζώνη πτήσης drone",
    "Safe, netted indoor space for programmable flight.":
      "Ασφαλής, περιφραγμένος εσωτερικός χώρος για προγραμματιζόμενη πτήση.",
    "Come and see for yourself": "Ελάτε να το δείτε μόνοι σας",
    "The best way to understand RSA is to visit. Book a free trial and step inside a real class.":
      "Ο καλύτερος τρόπος να καταλάβετε το RSA είναι να το επισκεφθείτε. Κλείστε δωρεάν μάθημα και μπείτε σε μια πραγματική τάξη.",
    "Visit us": "Επισκεφθείτε μας",

    // --- Contact page ---
    "We’d love to hear from you": "Θα χαρούμε να ακούσουμε από εσάς",
    "Booking a free trial? Choose that below — it’s the fastest way in. For anything else, send us a message.":
      "Θέλετε δωρεάν μάθημα; Επιλέξτε το παρακάτω — είναι ο πιο γρήγορος τρόπος. Για οτιδήποτε άλλο, στείλτε μας μήνυμα.",
    "Send a message": "Στείλτε μήνυμα",
    "Name": "Όνομα", "Email": "Email", "Phone": "Τηλέφωνο", "Topic": "Θέμα", "Message": "Μήνυμα",
    "General question": "Γενική ερώτηση", "Programs & pricing": "Προγράμματα & τιμές",
    "RSA HUB / Payments": "RSA HUB / Πληρωμές",
    "I agree to RSA’s privacy policy.": "Συμφωνώ με την πολιτική απορρήτου του RSA.",
    "Send message": "Αποστολή μηνύματος",
    "Please enter your name": "Παρακαλώ συμπληρώστε το όνομά σας",
    "Please enter a valid email": "Παρακαλώ δώστε έγκυρο email",
    "Please add a short message": "Παρακαλώ γράψτε ένα σύντομο μήνυμα",
    "Message sent": "Το μήνυμα στάλθηκε",
    "Thanks for reaching out — we’ll reply within one working day.":
      "Ευχαριστούμε για την επικοινωνία — θα απαντήσουμε εντός μίας εργάσιμης ημέρας.",
    "Visit or call": "Επισκεφθείτε ή καλέστε",
    "RSA Centre, Thessaloniki, Greece": "Κέντρο RSA, Θεσσαλονίκη, Ελλάδα",
    "Opening hours": "Ώρες λειτουργίας",
    "Mon–Fri 15:00–21:00 · Sat 10:00–15:00": "Δευ–Παρ 15:00–21:00 · Σάβ 10:00–15:00",
    "Quick answers": "Γρήγορες απαντήσεις",
    "How do I book a free trial?": "Πώς κλείνω δωρεάν μάθημα;",
    "Where do classes take place?": "Πού γίνονται τα μαθήματα;",
    "At our centre in Thessaloniki and partner locations. School programs run on-site at your school.":
      "Στο κέντρο μας στη Θεσσαλονίκη και σε συνεργαζόμενους χώρους. Τα σχολικά προγράμματα γίνονται στο σχολείο σας.",
    "What is RSA HUB?": "Τι είναι το RSA HUB;",
    "RSA HUB is the portal for enrolled students and parents — progress, materials and payments. You’ll get access once your child joins.":
      "Το RSA HUB είναι η πύλη για εγγεγραμμένους μαθητές και γονείς — πρόοδος, υλικό και πληρωμές. Αποκτάτε πρόσβαση μόλις εγγραφεί το παιδί σας.",
    "Map showing the RSA centre location in Thessaloniki": "Χάρτης με την τοποθεσία του κέντρου RSA στη Θεσσαλονίκη",

    // --- Schools form ---
    "School name": "Όνομα σχολείου", "Your role": "Ο ρόλος σας",
    "e.g. Head of STEM": "π.χ. Υπεύθυνος STEM",
    "Interested in": "Ενδιαφέρομαι για",
    "Workshop series": "Σειρά εργαστηρίων", "Ongoing collaboration": "Συνεχής συνεργασία", "Not sure yet": "Δεν είμαι σίγουρος/η ακόμη",
    "Anything else?": "Κάτι άλλο;",
    "Age groups, dates, number of students…": "Ηλικίες, ημερομηνίες, αριθμός μαθητών…",
    "I agree to be contacted by RSA about this enquiry.": "Συμφωνώ να επικοινωνήσει το RSA μαζί μου για αυτό το αίτημα.",
    "Send enquiry": "Αποστολή αιτήματος",
    "Please enter your school name": "Παρακαλώ συμπληρώστε το όνομα του σχολείου",
    "Thank you!": "Ευχαριστούμε!",
    "Your enquiry is on its way. Our schools team will be in touch within two working days.":
      "Το αίτημά σας εστάλη. Η ομάδα σχολείων θα επικοινωνήσει εντός δύο εργάσιμων ημερών.",

    // --- Free trial wizard ---
    "Book your child’s free lesson": "Κλείστε το δωρεάν μάθημα του παιδιού σας",
    "Four quick steps — about a minute. No cost, no commitment.":
      "Τέσσερα γρήγορα βήματα — περίπου ένα λεπτό. Χωρίς κόστος, χωρίς δέσμευση.",
    "Free trial": "Δωρεάν μάθημα",
    "How old is your child?": "Πόσων χρονών είναι το παιδί σου;",
    "We’ll recommend the right program automatically.": "Θα προτείνουμε αυτόματα το σωστό πρόγραμμα.",
    "Continue": "Συνέχεια", "Back": "Πίσω", "Looks good": "Μια χαρά",
    "Confirm free trial": "Επιβεβαίωση δωρεάν μαθήματος",
    "Your recommended program": "Το προτεινόμενο πρόγραμμά σας",
    "Based on your child’s age. You can change this later.": "Με βάση την ηλικία του παιδιού σας. Μπορείτε να το αλλάξετε αργότερα.",
    "A hands-on introduction — your child builds and programs a small project in the very first lesson.":
      "Μια βιωματική εισαγωγή — το παιδί σας φτιάχνει και προγραμματίζει ένα μικρό έργο από το πρώτο κιόλας μάθημα.",
    "When suits you?": "Πότε σας βολεύει;",
    "Pick a preferred day and time — we’ll confirm exact availability.":
      "Διαλέξτε προτιμώμενη μέρα και ώρα — θα επιβεβαιώσουμε τη διαθεσιμότητα.",
    "Preferred day": "Προτιμώμενη μέρα", "Preferred time": "Προτιμώμενη ώρα",
    "Choose a day…": "Επιλέξτε μέρα…", "Choose a time…": "Επιλέξτε ώρα…",
    "Monday": "Δευτέρα", "Tuesday": "Τρίτη", "Wednesday": "Τετάρτη",
    "Thursday": "Πέμπτη", "Friday": "Παρασκευή", "Saturday": "Σάββατο",
    "Afternoon (15:00–17:00)": "Απόγευμα (15:00–17:00)",
    "Late afternoon (17:00–19:00)": "Αργά το απόγευμα (17:00–19:00)",
    "Evening (19:00–21:00)": "Βράδυ (19:00–21:00)",
    "Saturday morning": "Σάββατο πρωί",
    "RSA Centre — Thessaloniki": "Κέντρο RSA — Θεσσαλονίκη",
    "Nearest partner centre": "Πλησιέστερο συνεργαζόμενο κέντρο",
    "Your details": "Τα στοιχεία σας",
    "Just so we can confirm your child’s spot.": "Ώστε να επιβεβαιώσουμε τη θέση του παιδιού σας.",
    "Parent / guardian name": "Όνομα γονέα / κηδεμόνα",
    "Please enter a phone number": "Παρακαλώ δώστε αριθμό τηλεφώνου",
    "I agree to be contacted by RSA to confirm this free trial.":
      "Συμφωνώ να επικοινωνήσει το RSA μαζί μου για την επιβεβαίωση του δωρεάν μαθήματος.",
    "You’re all set!": "Όλα έτοιμα!",
    "We’ve received your request for a free trial. Our team will call or email within one working day to confirm the exact date and time.":
      "Λάβαμε το αίτημά σας για δωρεάν μάθημα. Η ομάδα μας θα σας καλέσει ή θα σας στείλει email εντός μίας εργάσιμης ημέρας για την ακριβή μέρα και ώρα.",
    "A confirmation email is on its way": "Ένα email επιβεβαίωσης είναι καθ’ οδόν",
    "Back to home": "Επιστροφή στην αρχική",
    "Prefer to talk? Call": "Προτιμάτε να μιλήσουμε; Καλέστε",
    "— we’re happy to help.": "— χαρούμε να βοηθήσουμε.",

    // --- mega menu blurbs ---
    "Play-based first steps": "Πρώτα βήματα μέσα από παιχνίδι",
    "Build & program robots": "Φτιάξε & προγραμμάτισε ρομπότ",
    "Engineering & coding": "Μηχανική & προγραμματισμός",
    "Artificial intelligence": "Τεχνητή νοημοσύνη",
    "Flight & automation": "Πτήση & αυτοματισμός",
    "Coding & creativity": "Προγραμματισμός & δημιουργικότητα",
    "Not sure which fits? Use the program finder.": "Δεν ξέρετε ποιο ταιριάζει; Χρησιμοποιήστε τον οδηγό προγραμμάτων.",

    // dynamic finder / wizard program names & meta
    "Junior Robotics · 5–6": "Junior Robotics · 5–6",
    "Kids Robotics · 6–13": "Kids Robotics · 6–13",
    "Teens Robotics · 10–13": "Teens Robotics · 10–13",
    "AI Academy · 14–18": "AI Academy · 14–18",
    "Drone Academy · 12–18": "Drone Academy · 12–18",
    "Digital Skills · 8–18": "Digital Skills · 8–18",

    // Program Finder (rendered by main.js)
    "First steps into robotics through guided play, construction and storytelling — building focus, motor skills and curiosity.":
      "Πρώτα βήματα στη ρομποτική μέσα από καθοδηγούμενο παιχνίδι, κατασκευή και αφήγηση — καλλιεργώντας συγκέντρωση, κινητικές δεξιότητες και περιέργεια.",
    "Children build motorised models and meet block-based coding, connecting cause and effect through hands-on machines.":
      "Τα παιδιά φτιάχνουν μηχανοκίνητα μοντέλα και γνωρίζουν τον προγραμματισμό με μπλοκ, συνδέοντας αιτία και αποτέλεσμα μέσα από πραγματικές μηχανές.",
    "Students design, build and program working robots, developing real problem-solving and computational thinking.":
      "Οι μαθητές σχεδιάζουν, κατασκευάζουν και προγραμματίζουν λειτουργικά ρομπότ, αναπτύσσοντας πραγματική επίλυση προβλημάτων και υπολογιστική σκέψη.",
    "Deeper engineering and text-based coding, competition robotics and autonomous systems for confident makers.":
      "Βαθύτερη μηχανική και προγραμματισμός με κώδικα, αγωνιστική ρομποτική και αυτόνομα συστήματα για έμπειρους δημιουργούς.",
    "Real programming, artificial intelligence, electronics and drones — portfolio-ready projects for future engineers.":
      "Πραγματικός προγραμματισμός, τεχνητή νοημοσύνη, ηλεκτρονικά και drones — έργα έτοιμα για portfolio, για μελλοντικούς μηχανικούς.",
    "1× / week · 60 min": "1× / εβδομάδα · 60 λεπτά",
    "1× / week · 75 min": "1× / εβδομάδα · 75 λεπτά",
    "1× / week · 120 min": "1× / εβδομάδα · 120 λεπτά",
    "Kids Robotics · Foundations": "Kids Robotics · Foundations",
    "AI Academy & Advanced Robotics": "AI Academy & Advanced Robotics",

    // --- Real program architecture (groups, cards, hierarchy) ---
    "Find your path": "Βρες τη διαδρομή σου",
    "Many programs. One clear path.": "Πολλά προγράμματα. Μία ξεκάθαρη διαδρομή.",
    "A core progression — Junior → Kids → Teens — plus specialized programs to go further.":
      "Μια βασική εξέλιξη — Junior → Kids → Teens — και εξειδικευμένα προγράμματα για να πας παρακάτω.",
    "A core progression through Robotics & STEAM — Junior, Kids and Teens — plus specialized programs in programming, AI, drones and digital skills. Browse by age or by interest.":
      "Μια βασική εξέλιξη στη Robotics & STEAM — Junior, Kids και Teens — και εξειδικευμένα προγράμματα σε προγραμματισμό, AI, drones και ψηφιακές δεξιότητες. Αναζήτησε ανά ηλικία ή ενδιαφέρον.",
    "Core path": "Βασική διαδρομή", "Specialized": "Εξειδικευμένο", "Separate": "Ξεχωριστό",
    "Technology & Programming": "Τεχνολογία & Προγραμματισμός",
    "Emerging Technologies": "Αναδυόμενες Τεχνολογίες",
    "Digital Skills": "Ψηφιακές Δεξιότητες",
    "Advanced programming": "Προχωρημένος προγραμματισμός",
    "New for 2026–2027": "Νέο για 2026–2027",
    "Πληροφορική & πιστοποίηση": "Πληροφορική & πιστοποίηση",
    "Explore Program": "Δες το Πρόγραμμα", "Explore Levels": "Δες τα Επίπεδα",
    "See all programs": "Δες όλα τα προγράμματα",
    "2 levels": "2 επίπεδα", "4 levels": "4 επίπεδα", "2 tracks": "2 τμήματα", "Ages 10–18": "Ηλικίες 10–18",
    "Specialized Program": "Εξειδικευμένο Πρόγραμμα",
    "Robotics & STEAM for Teens": "Robotics & STEAM για εφήβους",
    "5–6 years · Προνήπιο–Νήπιο": "5–6 ετών · Προνήπιο–Νήπιο",
    "6–10 years · Α΄–Ε΄ Δημοτικού": "6–10 ετών · Α΄–Ε΄ Δημοτικού",
    "10–18 years · Ε΄–ΣΤ΄ Δημοτικού · Γυμνάσιο · Λύκειο": "10–18 ετών · Ε΄–ΣΤ΄ Δημοτικού · Γυμνάσιο · Λύκειο",
    "Robotics combined with Python programming.": "Ρομποτική σε συνδυασμό με προγραμματισμό σε Python.",
    "Physical computing with Arduino and C++.": "Φυσικός υπολογισμός με Arduino και C++.",
    "Artificial Intelligence & Machine Learning": "Τεχνητή Νοημοσύνη & Μηχανική Μάθηση",
    "Drone Technology — χειρισμός & προγραμματισμός": "Τεχνολογία Drone — χειρισμός & προγραμματισμός",

    // programs page discovery
    "Browse by age — how old is the student?": "Αναζήτηση ανά ηλικία — πόσων χρονών είναι ο μαθητής;",
    "Select an age to see the recommended program and its levels.":
      "Διάλεξε ηλικία για να δεις το προτεινόμενο πρόγραμμα και τα επίπεδά του.",
    "Or browse by interest": "Ή αναζήτησε ανά ενδιαφέρον",
    "Robotics": "Ρομποτική", "Artificial Intelligence": "Τεχνητή Νοημοσύνη", "Drones": "Drones",
    "Not sure which fits?": "Δεν είστε σίγουροι ποιο ταιριάζει;",
    "A free trial is the easiest way to place your child at the right level. Your child joins a real class — you watch them light up.":
      "Το δωρεάν μάθημα είναι ο πιο εύκολος τρόπος να τοποθετηθεί το παιδί σας στο σωστό επίπεδο. Μπαίνει σε πραγματική τάξη — κι εσείς το βλέπετε να λάμπει.",

    // finder dynamic
    "Recommended: Junior Robotics": "Προτεινόμενο: Junior Robotics",
    "Recommended: Kids Robotics": "Προτεινόμενο: Kids Robotics",
    "Recommended: Teens Robotics": "Προτεινόμενο: Teens Robotics",
    "6–8 years · Α΄–Β΄ Δημοτικού": "6–8 ετών · Α΄–Β΄ Δημοτικού",
    "8–10 years · Γ΄–Ε΄ Δημοτικού": "8–10 ετών · Γ΄–Ε΄ Δημοτικού",
    "10–13 years · Robotics & STEAM for Teens": "10–13 ετών · Robotics & STEAM για εφήβους",
    "14–18 years · Γυμνάσιο · Λύκειο": "14–18 ετών · Γυμνάσιο · Λύκειο",
    "Available levels": "Διαθέσιμα επίπεδα", "Possible level": "Πιθανό επίπεδο", "Possible levels": "Πιθανά επίπεδα",
    "Junior Robotics has two levels, one designed per school year.":
      "Το Junior Robotics έχει δύο επίπεδα, ένα για κάθε σχολική χρονιά.",
    "Final level placement may depend on age and existing knowledge.":
      "Η τελική τοποθέτηση στο επίπεδο εξαρτάται από την ηλικία και τις υπάρχουσες γνώσεις.",
    "Older students can also explore our specialized programs.":
      "Οι μεγαλύτεροι μαθητές μπορούν επίσης να δουν τα εξειδικευμένα προγράμματα.",
    "Not every student automatically qualifies for every specialized program.":
      "Δεν πληροί κάθε μαθητής αυτόματα τις προϋποθέσεις για κάθε εξειδικευμένο πρόγραμμα.",
    "Explore specialized programs": "Δείτε τα εξειδικευμένα προγράμματα",

    // --- Program detail (Kids Robotics) ---
    "Four progression levels where children design, build and program working robots — turning curiosity into real engineering and computational thinking, one level at a time.":
      "Τέσσερα επίπεδα εξέλιξης όπου τα παιδιά σχεδιάζουν, κατασκευάζουν και προγραμματίζουν λειτουργικά ρομπότ — μετατρέποντας την περιέργεια σε πραγματική μηχανική και υπολογιστική σκέψη, ένα επίπεδο τη φορά.",
    "See the levels": "Δες τα επίπεδα",
    "Category": "Κατηγορία", "Levels": "Επίπεδα", "Placement": "Τοποθέτηση",
    "6–10 · Α΄–Ε΄ Δημοτικού": "6–10 · Α΄–Ε΄ Δημοτικού",
    "4 (1st – 4th)": "4 (1ο – 4ο)", "RSA centres": "Κέντρα RSA", "By age & experience": "Ανά ηλικία & εμπειρία",
    "Skills": "Δεξιότητες", "Schedule & Cost": "Πρόγραμμα & Κόστος",
    "What is Kids Robotics?": "Τι είναι το Kids Robotics;",
    "Kids Robotics is the core Robotics & STEAM path for primary-school children. Across four progressive levels, students move from guided builds to designing and programming their own working robots — developing real problem-solving, not memorised steps.":
      "Το Kids Robotics είναι η βασική διαδρομή Robotics & STEAM για παιδιά δημοτικού. Σε τέσσερα εξελικτικά επίπεδα, οι μαθητές περνούν από καθοδηγούμενες κατασκευές στη σχεδίαση και τον προγραμματισμό των δικών τους λειτουργικών ρομπότ — αναπτύσσοντας πραγματική επίλυση προβλημάτων, όχι αποστηθισμένα βήματα.",
    "Who is it for?": "Για ποιον είναι;",
    "Children roughly 6–10 years old": "Παιδιά περίπου 6–10 ετών",
    "School level Α΄ – Ε΄ Δημοτικού": "Σχολική βαθμίδα Α΄ – Ε΄ Δημοτικού",
    "Level placement is set by age and existing knowledge": "Η τοποθέτηση στο επίπεδο ορίζεται από την ηλικία και τις γνώσεις",
    "Four levels, one clear progression": "Τέσσερα επίπεδα, μία ξεκάθαρη εξέλιξη",
    "Each level builds on the last. Students typically advance one level per school year.":
      "Κάθε επίπεδο στηρίζεται στο προηγούμενο. Οι μαθητές συνήθως προχωρούν ένα επίπεδο ανά σχολική χρονιά.",
    "Α΄ – Β΄ Δημοτικού": "Α΄ – Β΄ Δημοτικού", "Β΄ – Γ΄ Δημοτικού": "Β΄ – Γ΄ Δημοτικού",
    "Γ΄ – Δ΄ Δημοτικού": "Γ΄ – Δ΄ Δημοτικού", "Δ΄ – Ε΄ Δημοτικού": "Δ΄ – Ε΄ Δημοτικού",
    "What students learn": "Τι μαθαίνουν οι μαθητές",
    "Coding & logic": "Κώδικας & λογική",
    "From block-based programming toward text-based logic as levels progress.":
      "Από τον προγραμματισμό με μπλοκ προς τη λογική με κώδικα, καθώς ανεβαίνουν τα επίπεδα.",
    "Testing and debugging with confidence.": "Δοκιμή και διόρθωση σφαλμάτων με σιγουριά.",
    "Technologies & tools": "Τεχνολογίες & εργαλεία",
    "Everything is provided in class": "Όλα παρέχονται στην τάξη",
    "Educational robotics kits": "Εκπαιδευτικά κιτ ρομποτικής",
    "Sensors & motors": "Αισθητήρες & μοτέρ",
    "Block-based & text coding": "Προγραμματισμός με μπλοκ & κώδικα",
    "RSA project materials": "Υλικό έργων RSA",
    "Schedule & cost": "Πρόγραμμα & κόστος",
    "The schedule for 2026–2027 is formed according to demand and the preferred days submitted during free-trial registration.":
      "Το πρόγραμμα για το 2026–2027 διαμορφώνεται ανάλογα με τη ζήτηση και τις προτιμώμενες ημέρες που δηλώνονται κατά την εγγραφή στο δωρεάν μάθημα.",
    "Days & hours: confirmed after the free trial": "Ημέρες & ώρες: επιβεβαιώνονται μετά το δωρεάν μάθημα",
    "Pricing": "Τιμές",
    "Pricing and payment options are confirmed per level and per centre.":
      "Οι τιμές και οι τρόποι πληρωμής επιβεβαιώνονται ανά επίπεδο και ανά κέντρο.",
    "Pricing available upon request": "Οι τιμές διατίθενται κατόπιν αιτήματος",
    "Contact us for current schedule & availability": "Επικοινωνήστε για τρέχον πρόγραμμα & διαθεσιμότητα",
    "Which level will my child start at?": "Σε ποιο επίπεδο θα ξεκινήσει το παιδί μου;",
    "Level placement (1st–4th) depends on your child’s age and existing knowledge. The free trial helps us recommend the right starting level.":
      "Η τοποθέτηση (1ο–4ο) εξαρτάται από την ηλικία και τις γνώσεις του παιδιού. Το δωρεάν μάθημα μας βοηθά να προτείνουμε το σωστό επίπεδο εκκίνησης.",
    "Does my child need prior experience?": "Χρειάζεται το παιδί μου προηγούμενη εμπειρία;",
    "No. Entry levels start from the fundamentals; students with experience are placed at a matching level.":
      "Όχι. Τα αρχικά επίπεδα ξεκινούν από τα βασικά· οι μαθητές με εμπειρία τοποθετούνται σε αντίστοιχο επίπεδο.",
    "What happens after Kids Robotics?": "Τι γίνεται μετά το Kids Robotics;",
    "Ready to find the right level?": "Έτοιμοι να βρείτε το σωστό επίπεδο;",
    "Book a free Kids Robotics trial and we’ll recommend the ideal starting level for your child.":
      "Κλείστε δωρεάν μάθημα Kids Robotics και θα προτείνουμε το ιδανικό επίπεδο εκκίνησης για το παιδί σας.",

    // --- Remaining visible strings (Greek-only pass) ---
    "Since 2015": "Από το 2015",
    "See all programs →": "Δες όλα τα προγράμματα →",
    "Learning path": "Διαδρομή μάθησης",
    "After Kids Robotics, students continue to": "Μετά το Kids Robotics, οι μαθητές συνεχίζουν σε",
    "or a specialized program.": "ή σε ένα εξειδικευμένο πρόγραμμα.",
    "Step 1 / 4": "Βήμα 1 / 4", "Step 2 / 4": "Βήμα 2 / 4",
    "Step 3 / 4": "Βήμα 3 / 4", "Step 4 / 4": "Βήμα 4 / 4",
    "Time": "Ώρα", "Details": "Στοιχεία",
    "Use the": "Χρησιμοποιήστε τη",
    "flow — pick your child’s age, a time that suits you, and leave your details. It takes about a minute.":
      "φόρμα — διαλέξτε ηλικία, ώρα που σας βολεύει και αφήστε τα στοιχεία σας. Παίρνει περίπου ένα λεπτό.",
    "Enquire for your school": "Εκδήλωση ενδιαφέροντος για το σχολείο σας",
    "School visit": "Σχολική επίσκεψη"
  };

  /* document <title> translations, keyed by English title */
  var TITLES = {
    "RSA — Robotic & Science Academy": "RSA — Robotic & Science Academy",
    "Programs — RSA": "Προγράμματα — RSA",
    "Kids Robotics — RSA": "Kids Robotics — RSA",
    "The Academy — RSA": "Η Ακαδημία — RSA",
    "For Schools — RSA": "Για Σχολεία — RSA",
    "Contact — RSA": "Επικοινωνία — RSA",
    "Book a Free Trial — RSA": "Κλείσε Δωρεάν Μάθημα — RSA"
  };

  var ATTRS = ["aria-label", "placeholder", "alt", "title"];
  var origText = new WeakMap();   // text node -> original EN value
  var origAttr = new WeakMap();   // element  -> { attr: original EN value }
  var origTitle = document.title;
  var lang = "el"; // Greek-only site — language switching removed

  function edgeWhitespace(s) {
    var l = (s.match(/^\s*/) || [""])[0];
    var t = (s.match(/\s*$/) || [""])[0];
    return [l, t];
  }

  function applyTextNode(node) {
    if (!origText.has(node)) origText.set(node, node.nodeValue);
    var orig = origText.get(node);
    var key = orig.trim();
    if (!key) return;
    if (lang === "el" && DICT[key] !== undefined) {
      var w = edgeWhitespace(orig);
      var next = w[0] + DICT[key] + w[1];
      if (node.nodeValue !== next) node.nodeValue = next;
    } else if (node.nodeValue !== orig) {
      node.nodeValue = orig;
    }
  }

  function applyAttrs(el) {
    if (el.nodeType !== 1) return;
    var store = origAttr.get(el);
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      if (!store) { store = {}; origAttr.set(el, store); }
      if (store[a] === undefined) store[a] = el.getAttribute(a);
      var orig = store[a];
      var key = orig.trim();
      if (lang === "el" && DICT[key] !== undefined) el.setAttribute(a, DICT[key]);
      else el.setAttribute(a, orig);
    });
  }

  function walk(root) {
    if (root.nodeType === 3) { applyTextNode(root); return; }
    if (root.nodeType !== 1) return;
    var tag = root.tagName;
    if (tag === "SCRIPT" || tag === "STYLE") return;
    applyAttrs(root);
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (p && (p.tagName === "SCRIPT" || p.tagName === "STYLE")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = tw.nextNode())) applyTextNode(n);
    // attributes on descendants
    root.querySelectorAll("[aria-label],[placeholder],[alt],[title]").forEach(applyAttrs);
  }

  function applyTitle() {
    if (TITLES[origTitle] !== undefined) document.title = lang === "el" ? TITLES[origTitle] : origTitle;
  }

  function render() {
    document.documentElement.lang = lang;
    walk(document.body);
    applyTitle();
    document.querySelectorAll(".lang-toggle [data-lang]").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.setAttribute("aria-pressed", String(on));
      b.classList.toggle("is-active", on);
    });
  }

  function setLang(l) {
    lang = l === "en" ? "en" : "el";
    localStorage.setItem("rsa-lang", lang);
    render();
  }

  /* ---------- Toggle UI ---------- */
  function makeToggle() {
    var wrap = document.createElement("div");
    wrap.className = "lang-toggle";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Language");
    wrap.innerHTML =
      '<button type="button" data-lang="el" aria-pressed="false">ΕΛ</button>' +
      '<button type="button" data-lang="en" aria-pressed="false">EN</button>';
    return wrap;
  }

  function injectToggles() {
    var headerActions = document.querySelector(".header-actions");
    if (headerActions && !headerActions.querySelector(".lang-toggle")) {
      var t = makeToggle();
      var firstBtn = headerActions.querySelector(".btn, .nav-toggle");
      headerActions.insertBefore(t, firstBtn || null);
    }
    var mFoot = document.querySelector(".mobile-nav__foot");
    if (mFoot && !mFoot.querySelector(".lang-toggle")) {
      var t2 = makeToggle();
      t2.classList.add("lang-toggle--mobile");
      mFoot.appendChild(t2);
    }
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".lang-toggle [data-lang]");
    if (b) setLang(b.getAttribute("data-lang"));
  });

  /* ---------- Observe dynamically inserted content ---------- */
  var observer = new MutationObserver(function (muts) {
    if (lang !== "el") return; // EN baseline needs no work on insert
    muts.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType === 1 || node.nodeType === 3) walk(node);
      });
    });
  });

  function start() {
    render(); // Greek-only: no language toggle injected
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();

  window.RSAi18n = { set: setLang, get: function () { return lang; } };
})();
