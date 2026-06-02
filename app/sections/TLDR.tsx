import { Section } from "../components/Section"
import { ExploreIcon } from "../components/icons"

export const TLDR = () => {
    return <Section title="TL;DR">
        <p>
            We introduce <strong>JuICE</strong>, a multilingual benchmark of 7,470 span-level cultural error annotations
            in long-form LLM responses across four countries (US, South Korea, Indonesia, Bangladesh).
            Even the strongest LLM-judge achieves only F1 of 0.52, and consistently misses <em>thick</em> cultural errors
            that local residents readily identify — suggesting cultural evaluation must move beyond surface-level detection.
        </p>
        <div className="mt-5">
            <a href="#explore" className="icon-label-button w-fit bg-teal-600 pl-3 text-white">
                <ExploreIcon size={22}/>
                <span>Explore Annotations</span>
            </a>
        </div>
    </Section>
}
