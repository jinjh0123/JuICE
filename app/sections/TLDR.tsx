import { Section } from "../components/Section"

export const TLDR = () => {
    return <Section title="TL;DR">
        <p>
            We introduce <strong>JuICE</strong>, a multilingual benchmark of 7,470 span-level cultural error annotations
            in long-form LLM responses across four countries (US, South Korea, Indonesia, Bangladesh).
            Even the strongest LLM-judge achieves only F1 of 0.52, and consistently misses <em>thick</em> cultural errors
            that local residents readily identify — suggesting cultural evaluation must move beyond surface-level detection.
        </p>
        <div className="mt-5">
            <a
                href="#explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
            >
                Explore Annotations
                <span aria-hidden>→</span>
            </a>
        </div>
    </Section>
}
