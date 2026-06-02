import React from 'react'
import { Section } from '../components/Section'

type ResultRow = {
  model: string
  precision: number
  recall: number
  f1: number
  std?: { precision: number; recall: number; f1: number }
}

type ResultGroup = {
  group: string
  rows: ResultRow[]
}

const SPAN_RESULT_GROUPS: ResultGroup[] = [
  {
    group: 'Data Construction Models',
    rows: [
      { model: 'gemini-3.1-pro-preview', precision: 0.4798, recall: 0.5735, f1: 0.5225 },
      { model: 'gpt-5.5',                precision: 0.4939, recall: 0.5298, f1: 0.5112 },
    ],
  },
  {
    group: 'Proprietary Models',
    rows: [
      { model: 'claude-opus-4.7',         precision: 0.5653, recall: 0.3741, f1: 0.4503 },
      { model: 'gemini-3-flash-preview',   precision: 0.4044, recall: 0.6025, f1: 0.4839 },
      { model: 'claude-haiku-4.5',         precision: 0.3375, recall: 0.4072, f1: 0.3691 },
      { model: 'gpt-5.4-mini',             precision: 0.4228, recall: 0.2422, f1: 0.3079 },
    ],
  },
  {
    group: 'Open-Source Models',
    rows: [
      { model: 'gemma-4-31B-it',                     precision: 0.6105, recall: 0.3535, f1: 0.4450, std: { precision: 0.0425, recall: 0.0342, f1: 0.0186 } },
      { model: 'gpt-oss-120b',                        precision: 0.3317, recall: 0.4102, f1: 0.3657, std: { precision: 0.0221, recall: 0.0213, f1: 0.0109 } },
      { model: 'Qwen3-30B-A3B-Instruct',              precision: 0.2328, recall: 0.4822, f1: 0.3128, std: { precision: 0.0135, recall: 0.0383, f1: 0.0087 } },
      { model: 'Llama-4-Scout-17B-16E-Instruct',      precision: 0.2216, recall: 0.4219, f1: 0.2805, std: { precision: 0.0290, recall: 0.1003, f1: 0.0156 } },
    ],
  },
]

type CategoryRow = {
  category: string
  type: 'thin' | 'thick'
  recallRange: [number, number]
  avg: number
}

type CategoryGroup = { group: string; rows: CategoryRow[] }

const CATEGORY_RECALL_GROUPS: CategoryGroup[] = [
  {
    group: 'Linguistic Errors',
    rows: [
      { category: 'Explicit Linguistic Error', type: 'thin',  recallRange: [0.37, 0.72], avg: 0.57 },
      { category: 'Implicit Linguistic Error', type: 'thick', recallRange: [0.24, 0.46], avg: 0.36 },
    ],
  },
  {
    group: 'Cultural Errors',
    rows: [
      { category: 'Cultural Inaccuracy',        type: 'thin',  recallRange: [0.41, 0.72], avg: 0.53 },
      { category: 'Cultural Incoherence',       type: 'thick', recallRange: [0.38, 0.62], avg: 0.47 },
      { category: 'Cultural Specificity Error', type: 'thick', recallRange: [0.30, 0.51], avg: 0.42 },
      { category: 'Cultural Connotation Error', type: 'thick', recallRange: [0.28, 0.60], avg: 0.43 },
      { category: 'Cultural Missingness',       type: 'thick', recallRange: [0.21, 0.35], avg: 0.26 },
    ],
  },
]

function RecallBar({ low, high, avg, type }: { low: number; high: number; avg: number; type: 'thin' | 'thick' }) {
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
          style={{ left: pct(avg) }}
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

      <p className="text-gray-700 leading-relaxed mb-8">
        Span-level erroneous span detection proves difficult across all evaluated models —
        the best F1 reaches only <strong>0.52</strong>, and open-source models trail significantly at 0.28–0.45.
        Performance drops sharply on <em>thick</em> cultural errors, such as cultural missingness and connotation errors,
        which require interpretive cultural judgment that models consistently fail to exercise.
      </p>

      {/* Span detection results */}
      <div className="mb-10">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Span Detection Results</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-white border-b-2 border-gray-300">
              <th className="text-center py-2 px-3 font-bold text-gray-900">Model</th>
              <th className="text-center py-2 px-3 font-bold text-gray-900">Precision</th>
              <th className="text-center py-2 px-3 font-bold text-gray-900">Recall</th>
              <th className="text-center py-2 px-3 font-bold text-gray-900">F1</th>
            </tr>
          </thead>
          <tbody>
            {SPAN_RESULT_GROUPS.map((group, gi) => (
              <React.Fragment key={group.group}>
                <tr className={gi > 0 ? 'border-t-2 border-gray-200' : ''}>
                  <td colSpan={4} className="py-1.5 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                    {group.group}
                  </td>
                </tr>
                {group.rows.map(r => (
                  <tr key={r.model} className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-700 font-medium">{r.model}</td>
                    <td className="py-2 px-3 text-gray-600">
                      {r.precision.toFixed(2)}{r.std && <span className="text-gray-400"> ±{r.std.precision.toFixed(2)}</span>}
                    </td>
                    <td className="py-2 px-3 text-gray-600">
                      {r.recall.toFixed(2)}{r.std && <span className="text-gray-400"> ±{r.std.recall.toFixed(2)}</span>}
                    </td>
                    <td className="py-2 px-3 text-gray-700 font-medium">
                      {r.f1.toFixed(2)}{r.std && <span className="text-gray-400 font-normal"> ±{r.std.f1.toFixed(2)}</span>}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 mt-2">Open-source model scores are averaged over four runs. See the paper for full experimental results.</p>
      </div>

      {/* Category-wise recall */}
      <div>
        <h3 className="text-base font-semibold text-gray-700 mb-1">Category-wise Recall Range</h3>
        <p className="text-sm text-gray-500 mb-4">
          Recall range across top-6 models by F1. The dot marks the average. Thick cultural errors —
          especially Cultural Missingness — are systematically harder to detect than thin surface-level errors.
        </p>
        <div className="flex flex-col gap-4">
          {CATEGORY_RECALL_GROUPS.map((group, gi) => (
            <div key={group.group}>
              <div className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ${gi > 0 ? 'mt-2 pt-3 border-t border-gray-200' : ''}`}>
                {group.group}
              </div>
              <div className="flex flex-col gap-2.5">
                {group.rows.map(row => (
                  <div key={row.category} className="flex items-center gap-3">
                    <div className="w-[200px] shrink-0 flex items-center gap-1.5">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${row.type === 'thin' ? 'bg-gray-400' : 'bg-teal-500'}`} />
                      <span className="text-xs text-gray-600">{row.category}</span>
                    </div>
                    <div className="flex-1">
                      <RecallBar low={row.recallRange[0]} high={row.recallRange[1]} avg={row.avg} type={row.type} />
                    </div>
                  </div>
                ))}
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
    </Section>
  )
}
