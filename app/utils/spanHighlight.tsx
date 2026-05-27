import React from 'react'

export type ErrorInfo = {
  span: string
  category: string
  explanation: string
  detector_type?: string
  paragraph_idx_list?: number[]
}

export const CATEGORY_COLORS: Record<string, string> = {
  'Explicit Linguistic Error':  'bg-slate-200 border-b-2 border-slate-500',
  'Implicit Linguistic Error':  'bg-blue-100  border-b-2 border-blue-400',
  'Cultural Inaccuracy':        'bg-orange-100 border-b-2 border-orange-400',
  'Cultural Specificity Error': 'bg-amber-100  border-b-2 border-amber-500',
  'Cultural Incoherence':       'bg-purple-100 border-b-2 border-purple-400',
  'Cultural Connotation Error': 'bg-pink-100   border-b-2 border-pink-400',
  'Cultural Missingness':       'bg-red-100    border-b-2 border-red-400',
  'Logical Error':              'bg-green-100  border-b-2 border-green-400',
}

export const CATEGORY_BADGE: Record<string, string> = {
  'Explicit Linguistic Error':  'bg-slate-100  text-slate-700',
  'Implicit Linguistic Error':  'bg-blue-100   text-blue-700',
  'Cultural Inaccuracy':        'bg-orange-100 text-orange-700',
  'Cultural Specificity Error': 'bg-amber-100  text-amber-700',
  'Cultural Incoherence':       'bg-purple-100 text-purple-700',
  'Cultural Connotation Error': 'bg-pink-100   text-pink-700',
  'Cultural Missingness':       'bg-red-100    text-red-700',
  'Logical Error':              'bg-green-100  text-green-700',
}

export const ALL_CATEGORIES = [
  'Explicit Linguistic Error',
  'Implicit Linguistic Error',
  'Cultural Inaccuracy',
  'Cultural Specificity Error',
  'Cultural Incoherence',
  'Cultural Connotation Error',
  'Cultural Missingness',
  'Logical Error',
]

export const THIN_CATEGORIES = ['Explicit Linguistic Error', 'Cultural Inaccuracy']
export const THICK_CATEGORIES = [
  'Implicit Linguistic Error',
  'Cultural Incoherence',
  'Cultural Specificity Error',
  'Cultural Connotation Error',
  'Cultural Missingness',
]

function stripBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1')
}

type Segment = {
  text: string
  errorIndices: number[]
}

function buildSegments(text: string, errors: ErrorInfo[], visibleIndices?: Set<number>): Segment[] {
  const found: Array<{ start: number; end: number; idx: number }> = []
  for (let i = 0; i < errors.length; i++) {
    if (visibleIndices && !visibleIndices.has(i)) continue
    const start = text.indexOf(errors[i].span)
    if (start === -1) continue
    found.push({ start, end: start + errors[i].span.length, idx: i })
  }
  if (found.length === 0) return [{ text, errorIndices: [] }]

  const pts = new Set<number>([0, text.length])
  for (const f of found) { pts.add(f.start); pts.add(f.end) }
  const sorted = Array.from(pts).sort((a, b) => a - b)

  return sorted.slice(0, -1).map((s, i) => {
    const e = sorted[i + 1]
    return {
      text: text.slice(s, e),
      errorIndices: found.filter(f => f.start <= s && f.end >= e).map(f => f.idx),
    }
  })
}

export const CATEGORY_COLORS_ACTIVE: Record<string, string> = {
  'Explicit Linguistic Error':  'bg-slate-300 border-b-4 border-slate-700',
  'Implicit Linguistic Error':  'bg-blue-200  border-b-4 border-blue-600',
  'Cultural Inaccuracy':        'bg-orange-200 border-b-4 border-orange-600',
  'Cultural Specificity Error': 'bg-amber-200  border-b-4 border-amber-600',
  'Cultural Incoherence':       'bg-purple-200 border-b-4 border-purple-600',
  'Cultural Connotation Error': 'bg-pink-200   border-b-4 border-pink-600',
  'Cultural Missingness':       'bg-red-200    border-b-4 border-red-600',
  'Logical Error':              'bg-green-200  border-b-4 border-green-600',
}

export function HighlightedText({ text, errors, activeIndex, onSpanClick, visibleIndices }: {
  text: string
  errors: ErrorInfo[]
  activeIndex?: number
  onSpanClick?: (errorIndex: number) => void
  visibleIndices?: Set<number>
}) {
  const segments = buildSegments(text, errors, visibleIndices)
  const hasActive = activeIndex !== undefined

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.errorIndices.length === 0) {
          return <React.Fragment key={i}>{stripBold(seg.text)}</React.Fragment>
        }

        const isActiveCovered = hasActive && seg.errorIndices.includes(activeIndex!)
        const displayIdx = isActiveCovered ? activeIndex! : seg.errorIndices[0]
        const category = errors[displayIdx]?.category ?? ''
        const colorClass = isActiveCovered
          ? (CATEGORY_COLORS_ACTIVE[category] ?? 'bg-yellow-200 border-b-4 border-yellow-500')
          : (CATEGORY_COLORS[category] ?? 'bg-yellow-100 border-b-2 border-yellow-400')

        const handleClick = onSpanClick ? () => {
          if (seg.errorIndices.length === 1) {
            onSpanClick(seg.errorIndices[0])
          } else {
            const pos = seg.errorIndices.indexOf(activeIndex ?? -1)
            onSpanClick(seg.errorIndices[(pos + 1) % seg.errorIndices.length])
          }
        } : undefined

        return (
          <span
            key={i}
            className={`${colorClass} rounded-sm${onSpanClick ? ' cursor-pointer' : ''}`}
            onClick={handleClick}
          >
            {stripBold(seg.text)}
          </span>
        )
      })}
    </>
  )
}

export function CategoryBadge({ category, className = '' }: { category: string; className?: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_BADGE[category] ?? 'bg-gray-100 text-gray-700'} ${className}`}>
      {category}
    </span>
  )
}
