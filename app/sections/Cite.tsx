import { Section } from "../components/Section"

const bibTex = '@misc{jin-etal-2026-juice,<br/>\n\
&emsp;&emsp;title={JuICE: A Benchmark for Evaluating LLM-Judge in Identifying Cultural Errors},<br/>\n\
&emsp;&emsp;author={Jiho Jin and Junho Myung and Juhyun Oh and Junyeong Park and Rifki Afina Putri and Sunipa Dev and Vinodkumar Prabhakaran and Alice Oh},<br/>\n\
&emsp;&emsp;year={2026},<br/>\n\
&emsp;&emsp;eprint={2605.26955},<br/>\n\
&emsp;&emsp;archivePrefix={arXiv},<br/>\n\
&emsp;&emsp;primaryClass={cs.CL},<br/>\n\
&emsp;&emsp;url={https://arxiv.org/abs/2605.26955},<br/>\n\
}'


export const Cite = () => {
    return <Section title="Citing This Work">
        <div className="border-y-[1px] border-slate-400 py-3">
            <div>
                Jiho Jin, Junho Myung, Juhyun Oh, Junyeong Park, Rifki Afina Putri, Sunipa Dev, Vinodkumar Prabhakaran, Alice Oh.
                2026.
                JuICE: A Benchmark for Evaluating LLM-Judge in Identifying Cultural Errors.
                <i>arXiv preprint arXiv:2605.26955</i>.
            </div>
        </div>
        <div className="mt-4">
            <div className="font-bold mb-1">BibTeX</div>
            <p className={"p-3 font-mono text-xs sm:text-sm border-[1px] rounded-lg border-slate-300 decoration-none"} dangerouslySetInnerHTML={{__html: bibTex}}/>
        </div>
        
    </Section>
}
