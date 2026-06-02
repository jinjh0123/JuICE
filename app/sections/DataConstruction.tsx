import { Section } from "../components/Section"
import figure2 from "../../public/images/Figure2.png"

export const DataConstruction = () => {
    return (
        <Section title="Data Construction">
            <p className="text-gray-700 leading-relaxed mb-6">
                JuICE is built through a <strong>human-LLM collaborative pipeline</strong> involving 44 native speakers
                across four countries. Human annotators and LLM-judges independently annotate span-level errors,
                which are then cross-validated into a conservative consensus set.
            </p>
            <div className="flex flex-col items-center">
                <img
                    src={figure2}
                    alt="Figure 2"
                    className="w-full max-w-4xl"
                />
                <p className="mt-3 text-sm text-gray-500 text-center max-w-3xl leading-relaxed">
                    <strong>Figure 2.</strong> Human-LLM collaborative dataset construction pipeline for collecting
                    cultural and linguistic error annotations in long-form LLM responses.
                </p>
            </div>
        </Section>
    )
}
