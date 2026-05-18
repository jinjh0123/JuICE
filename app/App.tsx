import { Members } from "./sections/Members";
import { Acknowledgments } from "./sections/Acknowledgments";
import { Cite } from "./sections/Cite";
import { Abstract } from "./sections/Abstract";
import { Footer } from "./sections/Footer";
import { Architecture } from "./sections/Architecture";
import { Mockup } from "./sections/Mockup";
import { Dataset } from "./sections/Dataset";
import { Evaluation } from "./sections/Evaluation";

export function App() {
  return (<>
    <main className="container mx-auto px-4 sm:px-12 pt-6">
      <div>
        {/* <div className="font-bold text-lg text-[#ff9164] mb-3">ACL-Findings 2025</div> */}
        <div className="flex items-center gap-3 text-4xl mb-2 font-bold text-red-400">
          <img 
            src={require("../public/images/lemonade.png")}
            alt="juice" 
            className="w-10 h-10 object-contain" 
          />
          JuICE
        </div> 
        <div className="font-light leading-8 sm:leading-[2.5rem] text-2xl sm:text-3xl"><strong>A Benchmark for Evaluating LLM-Judge in Identifying Cultural Errors</strong></div>
      </div>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-12">
        {/* <Mockup/> */}
        <Abstract/>
      </div>
      {/* <Dataset/>
      <Evaluation/>
      <Cite/> */}
      {/* <Acknowledgments/> */}
      <Members/>
    </main><Footer/></>
  );
}
