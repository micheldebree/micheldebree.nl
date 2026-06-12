#let meta = toml("../info.toml")

#import meta.import.fontawesome: *

#let icon = meta.section.icon.personal
#let language = sys.inputs.at("language", default: "nl")
#let include-icon = meta.personal.include_icons


= #if include-icon [#fa-icon(icon) #h(5pt)] #if (
  language == "en"
) [Personality] else [Persoonlijkheid]

#v(5pt)

#if language == "en" [

  - Analytic thinking
  - Quality conscious
  - Good communicator
  - Independent
  - Team player
  - Proactive
  - Eager to learn

] else [

  - Kwaliteitsbewust
  - Analytisch denker
  - Goede communicator
  - Zelfstandig
  - Teamspeler
  - Proactief
  - Leergierig
]
