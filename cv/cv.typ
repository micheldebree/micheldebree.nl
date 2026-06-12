#let lang = sys.inputs.at("language", default: "nl")
#let doc-version = toml("./version.toml").Version
#set document(
  title: "CV Michel de Bree v" + doc-version,
  author: "Michel de Bree",
  description: if lang == "en" { "Senior full stack Java developer" } else { "Senior full stack Java ontwikkelaar" },
  keywords: (
    "Java",
    "Developer",
    "Scrum",
    "Backend",
    "REST",
    "Hibernate",
    "Spring Boot",
    "Elasticsearch",
    "JSON",
    "XML",
    "SOAP",
    "Kubernetes",
    "Openshift",
    "Docker",
    "Gitlab",
    "Git",
    "Helm",
    "DevOps",
    "Den Haag",
    "Utrecht",
    "Amsterdam",
    "Rotterdam",
    "Randstad",
  ),
)

#let meta = toml("./info.toml")
#(meta.personal.language = lang)
#set text(lang: lang)
// #set par(justify: true)

#let data = toml("./michel_de_bree.toml")
#(meta.personal.first_name = data.Personal.Name.First)
#(meta.personal.last_name = data.Personal.Name.Last)
#(meta.language.nl.subtitle = data.Summary.Tagline.nl)
#if "en" in data.Summary.Tagline { meta.language.en.subtitle = data.Summary.Tagline.en }


// #import meta.import.path: cv
#import "@preview/grotesk-cv:1.0.4": cv
#let photo-alt = if lang == "en" { "Photo of Michel de Bree" } else { "Foto van Michel de Bree" }
#let photo = image("./img/" + meta.personal.profile_image, alt: photo-alt)

#let import-sections(
  sections,
) = {
  for section in sections {
    include {
      "content/" + section + ".typ"
    }
  }
}

#let left-pane = (
  "profile",
  "experience",
  "education",
)

#let right-pane = (
  "personal",
  "skills",
  "languages",
  // "other_experience",
  // "references",
)

#show: cv.with(
  meta,
  photo: photo,
  use-photo: true,
  left-pane: import-sections(left-pane),
  right-pane: import-sections(right-pane),
  left-pane-proportion: eval(meta.layout.left_pane_width),
)
