import React from 'react'
import { Section } from '../components/Section'

type ResultRow = {
  model: string
  precision: number
  recall: number
  f1: number
}

// Span-level erroneous span detection results (best-performing prompt setting per model from the paper)
const SPAN_RESULTS: ResultRow[] = [
  { model: 'gemini-3.1-pro-preview', precision: 0.48, recall: 0.57, f1: 0.52 },
  { model: 'gpt-5.5',                precision: 0.46, recall: 0.56, f1: 0.51 },
  { model: 'gpt-4o',                  precision: 0.44, recall: 0.53, f1: 0.48 },
  { model: 'claude-3-5-sonnet',       precision: 0.41, recall: 0.50, f1: 0.45 },
  { model: 'Qwen2.5-72B',             precision: 0.38, recall: 0.48, f1: 0.43 },
  { model: 'Llama-3.3-70B',           precision: 0.34, recall: 0.45, f1: 0.39 },
  { model: 'HCX-003',                 precision: 0.30, recall: 0.38, f1: 0.34 },
  { model: 'claude-3-haiku',          precision: 0.26, recall: 0.35, f1: 0.30 },
]

// Category-wise recall range across all models (approximate from paper)
type CategoryRow = {
  category: string
  type: 'thin' | 'thick'
  recallRange: [number, number]
}

const CATEGORY_RECALL: CategoryRow[] = [
  { category: 'Explicit Linguistic Error',  type: 'thin',  recallRange: [0.37, 0.72] },
  { category: 'Cultural Inaccuracy',         type: 'thin',  recallRange: [0.41, 0.72] },
  { category: 'Implicit Linguistic Error',   type: 'thick', recallRange: [0.29, 0.58] },
  { category: 'Cultural Specificity Error',  type: 'thick', recallRange: [0.30, 0.51] },
  { category: 'Cultural Connotation Error',  type: 'thick', recallRange: [0.28, 0.60] },
  { category: 'Cultural Incoherence',        type: 'thick', recallRange: [0.25, 0.48] },
  { category: 'Cultural Missingness',        type: 'thick', recallRange: [0.21, 0.35] },
]

function RecallBar({ low, high, type }: { low: number; high: number; type: 'thin' | 'thick' }) {
  const pct = (v: number) => `${(v * 100).toFixed(0)}%`
  const barColor = type === 'thin' ? 'bg-gray-300' : 'bg-teal-300'
  const dotColor = type === 'thin' ? 'bg-gray-500' : 'bg-teal-600'
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="relative flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`absolute h-full rounded-full ${barColor}`}
          style={{ left: pct(low), width: pct(high - low) }}
        />
        <div
          className={`absolute w-2 h-2 rounded-full top-1 -translate-x-1 ${dotColor}`}
          style={{ left: pct(high) }}
        />
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap w-20 text-right">
        {pct(low)} – {pct(high)}
      </span>
    </div>
  )
}

export const Evaluation = () => {
  return (
    <Section title="Evaluation">
      <p className="text-gray-700 leading-relaxed mb-8">
        We evaluate LLM-judges on two tasks using JuICE: (1) <strong>erroneous span detection</strong> —
        identifying the text spans in a response that contain cultural or linguistic errors, evaluated with
        Intersection-over-Union (IoU) metrics; and (2) <strong>erroneous sentence classification</strong> —
        binary detection of whether a given sentence contains an error, evaluated with F1.
      </p>

      {/* Key result callout */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 mb-8 flex flex-col sm:flex-row gap-4 items-start">
        <div className="text-4xl font-bold text-teal-600 shrink-0">F1 0.52</div>
        <div className="text-sm text-gray-700 leading-relaxed">
          The strongest LLM-judge (gemini-3.1-pro-preview) achieves only <strong>F1 of 0.52</strong> on
          erroneous span detection — with precision 0.48 and recall 0.57. LLM-judges consistently miss
          <em> thick </em> cultural errors that local residents readily identify, while performing
          comparatively better on surface-level, verifiable errors.
        </div>
      </div>

      {/* Span detection results */}
      <div className="mb-10">
        <h3 className="text-base font-semibold text-gray-700 mb-3">Span Detection Results (F1)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 font-semibold text-gray-600">Model</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-600">Precision</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-600">Recall</th>
                <th className="text-right py-2 pl-3 font-semibold text-gray-600">F1</th>
              </tr>
            </thead>
            <tbody>
              {SPAN_RESULTS.map((r, i) => (
                <tr
                  key={r.model}
                  className={`border-b border-gray-100 ${i === 0 ? 'font-semibold' : ''}`}
                >
                  <td className="py-2 pr-4 text-gray-700">
                    {r.model}
                    {i === 0 && <span className="ml-2 text-xs font-normal text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-full">best</span>}
                  </td>
                  <td className="py-2 px-3 text-right text-gray-600">{r.precision.toFixed(2)}</td>
                  <td className="py-2 px-3 text-right text-gray-600">{r.recall.toFixed(2)}</td>
                  <td className="py-2 pl-3 text-right text-gray-700">{r.f1.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">Results with the best-performing prompting setting per model. See the paper for full per-language and per-category breakdowns.</p>
      </div>

      {/* Category-wise recall */}
      <div>
        <h3 className="text-base font-semibold text-gray-700 mb-1">Category-wise Recall Range</h3>
        <p className="text-sm text-gray-500 mb-4">
          Range across all evaluated models. Thick cultural errors — especially Cultural Missingness — are
          systematically harder to detect than thin surface-level errors.
        </p>
        <div className="flex flex-col gap-3">
          {CATEGORY_RECALL.map(row => (
            <div key={row.category} className="flex items-center gap-3">
              <div className="w-[200px] shrink-0 flex items-center gap-1.5">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${row.type === 'thin' ? 'bg-gray-400' : 'bg-teal-500'}`} />
                <span className="text-xs text-gray-600">{row.category}</span>
              </div>
              <div className="flex-1">
                <RecallBar low={row.recallRange[0]} high={row.recallRange[1]} type={row.type} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-gray-300" /> Thin category
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-teal-300" /> Thick category
          </span>
        </div>
      </div>

      {/* Key findings */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            stat: '50%',
            desc: 'Best recall on human-detected errors — even the top model misses half of the errors that native speakers identify.',
          },
          {
            stat: '+7.6pp',
            desc: 'Improvement in thick error recall from adding taxonomy definitions and few-shot examples to the prompt.',
          },
          {
            stat: '46.5% thick',
            desc: 'Human annotators flagged thick cultural errors at nearly double the rate of the best LLM annotator (23.9%).',
          },
        ].map(f => (
          <div key={f.stat} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">{f.stat}</div>
            <div className="text-xs text-gray-600 leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
