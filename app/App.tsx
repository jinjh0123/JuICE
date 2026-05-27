import React, { useEffect, useState } from 'react'
import { Members } from "./sections/Members";
import { Cite } from "./sections/Cite";
import { Abstract } from "./sections/Abstract";
import { Footer } from "./sections/Footer";
import { Dataset } from "./sections/Dataset";
import { Evaluation } from "./sections/Evaluation";
import { TLDR } from "./sections/TLDR";
import { Figure } from "./sections/Figure";
import { DataExplorer } from "./sections/DataExplorer";
import { DataPage } from "./pages/DataPage";
import lemonadeImg from "../public/images/lemonade.png";
import { ArxivIcon, GithubIcon, HuggingfaceIcon } from "./components/icons";

function MainPage() {
  return (
    <>
      <main className="container mx-auto px-4 sm:px-12 pt-16">
        {/* Hero */}
        <div className="pt-6 pb-2">
          <div className="flex items-center gap-3 text-5xl mb-3 font-bold text-red-400">
            <img
              src={lemonadeImg}
              alt="juice"
              className="w-12 h-12 object-contain"
            />
            JuICE
          </div>
          <div className="font-light leading-snug text-2xl sm:text-3xl">
            <strong>A Benchmark for Evaluating LLM-Judge in Identifying Cultural Errors</strong>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-base text-gray-700">
            <a href="https://jinjh0123.github.io/" target="_blank" className="transition-colors hover:text-red-400">Jiho Jin<sup>*,1</sup></a>
            <a href="https://junhomyung.github.io/" target="_blank" className="transition-colors hover:text-red-400">Junho Myung<sup>*,1</sup></a>
            <a href="https://juhyunohh.github.io/" target="_blank" className="transition-colors hover:text-red-400">Juhyun Oh<sup>1</sup></a>
            <a href="https://jjjunyeong.github.io/" target="_blank" className="transition-colors hover:text-red-400">Junyeong Park<sup>1</sup></a>
            <a href="https://rifkiaputri.github.io/" target="_blank" className="transition-colors hover:text-red-400">Rifki Afina Putri<sup>3</sup></a>
            <a href="https://sunipa.github.io/" target="_blank" className="transition-colors hover:text-red-400">Sunipa Dev<sup>2</sup></a>
            <span>Vinodkumar Prabhakaran<sup>2</sup></span>
            <a href="https://aliceoh9.github.io/" target="_blank" className="transition-colors hover:text-red-400">Alice Oh<sup>1</sup></a>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-gray-500">
            <span><sup>1</sup>KAIST</span>
            <span><sup>2</sup>Google</span>
            <span><sup>3</sup>Universitas Gadjah Mada</span>
          </div>
          <div className="mt-1 text-base text-gray-400"><sup>*</sup>Equal contribution</div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mt-7">
          <a className="icon-label-button bg-red-400 pl-4 text-white" href="https://arxiv.org/abs/2605.26955" target="_blank">
            <ArxivIcon size={20}/>
            <span>arXiv</span>
          </a>
          <a className="icon-label-button bg-[#FFD21E] pl-4 text-white" href="https://huggingface.co/datasets/juice-cultural-eval/JuICE" target="_blank">
            <HuggingfaceIcon size={40}/>
            <span>Dataset</span>
          </a>
          <a className="icon-label-button text-white" href="https://github.com/jinjh0123/JuICE" target="_blank">
            <GithubIcon size={28}/>
            <span>GitHub</span>
          </a>
        </div>

        <TLDR/>
        <Figure/>
        <Abstract/>
        <Dataset/>
        <DataExplorer/>
        <Evaluation/>
        <Cite/>
        <Members/>
      </main>
      <Footer/>
    </>
  )
}

export function App() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (hash === '#explore') {
    return <DataPage />
  }

  return <MainPage />
}
