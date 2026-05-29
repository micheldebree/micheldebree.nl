#let meta = toml("./info.toml")

#import "@preview/grotesk-cv:1.0.4": cover-letter, cv-section, recipient-entry
#import meta.import.fontawesome: *

#let first-name = meta.personal.first_name
#let last-name = meta.personal.last_name
#let text-size = eval(meta.layout.text.cover_letter_size)
#show: cover-letter.with(meta)
#set text(size: text-size)



#v(20pt)

// Alternative date formatting
//#datetime.today().display()
//
#datetime.today().display("[day]-[month]-[year]")

= Solicitatie Freelance Java Developer Leiden

Beste lezer,

Graag breng ik mijn expertise als Freelance Senior Java Developer onder de
aandacht voor de opdracht in Leiden. Als ervaren ZZP-er met meer dan 20 jaar
ervaring in softwareontwikkeling, waarvan ruim 15 jaar met Java, ben ik direct
inzetbaar voor 36 uur per week.

Mijn profiel sluit op technisch vlak nauw aan bij de gestelde eisen:

- Java & Backend: Ik werk momenteel met Java 21, spring Boot. In mijn recente projecten (o.a. Digitaal Stelsel Omgevingswet) heb ik complexe, missie-kritische systemen gebouwd waarbij betrouwbaarheid en schaalbaarheid essentieel waren.
- Databases: Ruime ervaring met SQL, specifiek PostgreSQL i.c.m. Hibernate
- Testing & Kwaliteit: Unit testing met JUnit en Mockito, Cucumber en Wiremock
- Frontend (Angular): Mijn ervaring met Angular is gedateerd (voor 2018). Op mijn laatste project heb ik wel ruime ervaring met React opgedaan. waardoor ik op dit punt een korte inwerk tijd voorzie.
- Methodiek & Proces: Ik heb ruime ervaring met Agile/Scrum (waaronder een rol als Interim Scrum Master en ervaring met Scrum-of-scrums). Ik ben gewend om in multidisciplinaire DevOps-teams te werken en neem als senior graag een trekkende rol in het verfijnen van requirements en het begeleiden van junior developers.
- DevOps: Diepgaande kennis van CI/CD (Gitlab CI), Docker en Kubernetes.

Mijn werkwijze is no-nonsense en oplossingsgericht. Ik haal energie uit het bouwen van robuuste backend services, maar ben als full-stack ontwikkelaar breed inzetbaar. De combinatie van een hybride rol in Leiden (met uitzicht op 100% remote) en het werken in een multidisciplinair team past perfect bij mijn huidige focus.

Ik zie een kennismaking graag tegemoet om de technische uitdagingen van deze opdracht en mijn mogelijke bijdrage daaraan te bespreken.

Met vriendelijke groet,

#v(10pt)

#par(justify: true)[
  #first-name #last-name
]
