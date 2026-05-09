#let meta = toml("../info.toml")

#import "@preview/grotesk-cv:1.0.4": experience-entry
#import meta.import.fontawesome: *

#let icon = meta.section.icon.experience
#let language = meta.personal.language
#let include-icon = meta.personal.include_icons

= #if include-icon [#fa-icon(icon) #h(5pt)] #if (
  language == "en"
) [Experience] else [Ervaring]

#v(5pt)

#let data = toml("../michel_de_bree.toml")

#for experience in data.Experience [

  #pad(bottom: 1em)[

    #let daterange = experience.Start
    #if "End" in experience {
      daterange = (
        daterange + sym.space + sym.dash.em + sym.space + experience.End
      )
    }

    #experience-entry(
      title: experience.Title.at(language),
      date: daterange,
      company: experience.Company,
      location: experience.Location,
    )

    #if "Situation" in experience [
      #par(justify: true)[#experience.Situation.at(language)]
    ]

    #if "Task" in experience [
  #emph(if (language == "en") [Responsibilities] else [Verantwoordelijkheden:])
      #for task in experience.Task.at(language) [

        - #par(justify: true)[
            #strong(task.Task) #if "Action" in task [ #task.Action] #if (
              "Result" in task
            ) [#task.Result]
          ]
      ]
    ]

    #if "Keywords" in experience [
      #par(justify: true)[
        #text(size: 0.9em, font: meta.layout.text.font_monospace)[
          #for keyword in experience.Keywords [
            #data.Keywords.at(keyword).Name
          ]
        ]
      ]
    ]
    #line(length: 100%, stroke: 0.5pt)
  ]
]


