import {getCliClient} from 'sanity/cli'

async function main() {
  const client = getCliClient({apiVersion: '2026-07-18'}).withConfig({perspective: 'drafts'})
  const documents = await client.fetch(`*[_type == "homePage"]{
    _id,
    language,
    "hero": heroSection.titleLine1,
    "services": count(servicesSection.services),
    "partners": count(partnersSection.partners),
    "testimonials": count(testimonialsSection.testimonials),
    "reasons": count(whyProcessSection.why.reasons),
    "steps": count(whyProcessSection.process.steps)
  }`)
  console.log(JSON.stringify(documents, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
