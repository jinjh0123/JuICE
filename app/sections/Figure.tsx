import figure1 from "../../public/images/figure1.png"

export const Figure = () => {
    return <div className="pt-4 pb-8 flex flex-col items-center">
        <img
            src={figure1}
            alt="Figure 1"
            className="w-full max-w-4xl"
        />
        <p className="mt-3 text-sm text-gray-500 text-center max-w-3xl leading-relaxed">
            <strong>Figure 1.</strong> Examples of cultural errors in long-form LLM responses, organized from thinner to thicker
            categories in our taxonomy. While LLM-judges often detect surface-level or verifiable errors, they
            frequently miss thicker cultural errors such as connotation, specificity, and missingness.
        </p>
    </div>
}
