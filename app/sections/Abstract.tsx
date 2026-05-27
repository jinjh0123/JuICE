import { Section } from "../components/Section"

export const Abstract = () => {
    return <Section title="Abstract" className="flex-1 pt-0 md:pt-12">
        <p>
        As large language models (LLMs) are increasingly deployed to users around the world, they are integrated into everyday tasks across diverse cultural contexts, from drafting personal communications to brainstorming creative ideas.
        These tasks are inherently cultural: they require contextual appropriateness, symbolic resonance, and tacit cultural expectations that native speakers draw on instinctively, meaning that a response can be factually plausible yet unmistakably wrong to a local reader.
        Existing cultural benchmarks have treated culture as a flat set of facts via fact verification or norm entailment methods, and have adopted LLM-as-a-Judge without examining whether they can capture such thick cultural errors.
        To address this gap, we present JuICE (Benchmark for LLM-Judge in Identifying Cultural Errors), a multilingual dataset of 7,470 span-level annotations of cultural and linguistic errors in long-form LLM responses.
        It covers 1,050 query-response pairs from four countries (the United States, South Korea, Indonesia, and Bangladesh), in both English and their countries' main languages.
        Using JuICE, we find that even the strongest LLM-judge achieves only an F1 of 0.52 in the erroneous span detection task.
        Furthermore, LLM-judges consistently miss thick cultural errors that local residents readily identify. Our findings suggest that robust cultural evaluation must move beyond surface-level detection toward frameworks that account for the depth and situatedness of cultural meaning.
        </p>
    </Section>
}
