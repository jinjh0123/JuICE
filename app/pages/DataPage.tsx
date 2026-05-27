import React, { useEffect, useMemo, useState } from 'react'
import dataUrl from 'url:../data/final_data.json'
import { ALL_CATEGORIES, CategoryBadge, ErrorInfo, HighlightedText } from '../utils/spanHighlight'

type RawError = {
  span: string
  explanation: string
  thick_category: string
  detector_type: string
  detector_id: string
  paragraph_idx_list: number[]
}

type RawErrorGroup = {
  errors: Record<string, RawError>
  thick_categories: string[]
}

type RawEntry = {
  country: string
  language_type: string
  language: string
  query_text: string
  response_text: string
  error_groups: Record<string, RawErrorGroup>
}

type Entry = {
  key: string
  country: string
  language: string
  query: string
  response: string
  errors: ErrorInfo[]
  categories: string[]
}

const COUNTRY_LABELS: Record<string, string> = {
  us: 'United States',
  korea: 'South Korea',
  indonesia: 'Indonesia',
  bangladesh: 'Bangladesh',
}

const LANG_LABELS: Record<string, string> = {
  en: 'English',
  ko: 'Korean',
  id: 'Indonesian',
  bn: 'Bengali',
}

const COUNTRY_COLORS: Record<string, string> = {
  us: 'bg-sky-100 text-sky-700',
  korea: 'bg-rose-100 text-rose-700',
  indonesia: 'bg-green-100 text-green-700',
  bangladesh: 'bg-amber-100 text-amber-700',
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function parseEntries(raw: Record<string, RawEntry>): Entry[] {
  return shuffle(Object.entries(raw).map(([key, v]) => {
    const errors: ErrorInfo[] = []
    const catSet = new Set<string>()
    for (const eg of Object.values(v.error_groups)) {
      for (const err of Object.values(eg.errors)) {
        errors.push({
          span: err.span,
          category: err.thick_category,
          explanation: err.explanation,
          detector_type: err.detector_type,
          paragraph_idx_list: err.paragraph_idx_list,
        })
        catSet.add(err.thick_category)
      }
    }
    return {
      key,
      country: v.country,
      language: v.language,
      query: v.query_text,
      response: v.response_text,
      errors,
      categories: Array.from(catSet),
    }
  }))
}

const PAGE_SIZE = 15

function EntryListItem({
  entry,
  isSelected,
  onClick,
}: {
  entry: Entry
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 transition-colors border-l-2 ${
        isSelected
          ? 'bg-teal-50 border-l-teal-500'
          : 'border-l-transparent hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${COUNTRY_COLORS[entry.country] ?? 'bg-gray-100 text-gray-600'}`}
        >
          {COUNTRY_LABELS[entry.country] ?? entry.country}
        </span>
        <span className="text-xs text-gray-400">{LANG_LABELS[entry.language] ?? entry.language}</span>
        <span className="text-xs text-gray-300 ml-auto shrink-0">{entry.errors.length} err</span>
      </div>
      <p className="text-xs text-gray-600 leading-snug line-clamp-2">{entry.query}</p>
    </button>
  )
}

function EntryDetail({ entry }: { entry: Entry }) {
  // Sort error indices by position of each span in the full response text
  const paragraphs = useMemo(() => entry.response.split('\n\n'), [entry])

  const sortedIndices = useMemo(() =>
    entry.errors
      .map((err, i) => ({ i, pos: entry.response.indexOf(err.span) }))
      .filter(({ pos }) => pos !== -1)
      .sort((a, b) => a.pos - b.pos)
      .map(({ i }) => i),
    [entry]
  )

  // For each paragraph, the set of error indices that belong to it per paragraph_idx_list
  const paragraphErrorSets = useMemo(() => {
    const sets: Set<number>[] = paragraphs.map(() => new Set<number>())
    for (let errIdx = 0; errIdx < entry.errors.length; errIdx++) {
      const idxList = entry.errors[errIdx].paragraph_idx_list ?? []
      for (const p of idxList) {
        if (p < sets.length) sets[p].add(errIdx)
      }
    }
    return sets
  }, [entry, paragraphs])

  const [sortedPos, setSortedPos] = useState(0)
  const errorIndex = sortedIndices[sortedPos] ?? 0
  const totalErrors = sortedIndices.length
  const currentError = entry.errors[errorIndex] ?? null

  const handleSpanClick = (origIdx: number) => {
    const pos = sortedIndices.indexOf(origIdx)
    if (pos !== -1) setSortedPos(pos)
  }

  return (
    <div className="flex-1 flex min-w-0 bg-white rounded-xl shadow-md overflow-hidden">

      {/* Left: query + response */}
      <div className="flex-1 min-w-0 p-6 overflow-y-auto">

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${COUNTRY_COLORS[entry.country] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {COUNTRY_LABELS[entry.country] ?? entry.country}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {LANG_LABELS[entry.language] ?? entry.language}
          </span>
          {entry.categories.map(c => (
            <CategoryBadge key={c} category={c} />
          ))}
        </div>

        {/* Query */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Query</p>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-sm text-gray-700 leading-relaxed mb-6">
          {entry.query}
        </div>

        {/* Response */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">LLM Response</p>
        <div className="border border-gray-200 rounded-lg p-5">
          {paragraphs.map((para, i) => (
            <p key={i} className={`text-sm font-normal leading-relaxed${i > 0 ? ' mt-3' : ''}`}>
              <HighlightedText
                text={para}
                errors={entry.errors}
                activeIndex={totalErrors > 0 ? errorIndex : undefined}
                onSpanClick={handleSpanClick}
                visibleIndices={paragraphErrorSets[i]}
              />
            </p>
          ))}
        </div>
      </div>

      {/* Right: error panel */}
      <div className="w-72 shrink-0 border-l border-gray-100 flex flex-col">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-baseline justify-between">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Annotations</p>
          {totalErrors > 0 && (
            <p className="text-xs text-gray-400">{sortedPos + 1} / {totalErrors}</p>
          )}
        </div>

        {/* Error detail */}
        <div className="flex-1 px-5 py-4 overflow-y-auto">
          {totalErrors === 0 ? (
            <p className="text-sm text-gray-400">No annotations.</p>
          ) : currentError ? (
            <div className="flex flex-col gap-3">
              <CategoryBadge category={currentError.category} />
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
                <p className="font-mono text-xs text-gray-600 leading-relaxed">
                  &ldquo;{currentError.span}&rdquo;
                </p>
              </div>
              <p className="text-sm font-normal text-gray-700 leading-relaxed">
                {currentError.explanation}
              </p>
            </div>
          ) : null}
        </div>

        {/* Navigation */}
        {totalErrors > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-2">
            <button
              disabled={sortedPos === 0}
              onClick={() => setSortedPos(p => p - 1)}
              className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              ← Prev
            </button>
            <div className="flex gap-1 flex-wrap justify-center">
              {sortedIndices.map((origIdx, sp) => (
                <button
                  key={origIdx}
                  onClick={() => setSortedPos(sp)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    sp === sortedPos ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button
              disabled={sortedPos >= totalErrors - 1}
              onClick={() => setSortedPos(p => p + 1)}
              className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function DataPage() {
  const [allEntries, setAllEntries] = useState<Entry[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [filterCountry, setFilterCountry] = useState('all')
  const [filterLang, setFilterLang] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  useEffect(() => {
    fetch(dataUrl)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((raw: Record<string, RawEntry>) => {
        setAllEntries(parseEntries(raw))
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(`Failed to load dataset: ${err.message}`)
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() => {
    if (!allEntries) return []
    return allEntries.filter(e => {
      if (filterCountry !== 'all' && e.country !== filterCountry) return false
      if (filterLang !== 'all' && e.language !== filterLang) return false
      if (filterCategory !== 'all' && !e.categories.includes(filterCategory)) return false
      return true
    })
  }, [allEntries, filterCountry, filterLang, filterCategory])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageEntries = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const selected = useMemo(() => {
    if (selectedKey) {
      const found = pageEntries.find(e => e.key === selectedKey)
      if (found) return found
    }
    return pageEntries[0] ?? null
  }, [selectedKey, pageEntries])

  const resetFilters = () => {
    setPage(0)
    setSelectedKey(null)
  }

  const goToPage = (p: number) => {
    setPage(p)
    setSelectedKey(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 py-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              window.location.hash = ''
            }}
            className="text-sm text-teal-600 hover:text-teal-800 flex items-center gap-1"
          >
            ← Back
          </a>
          <h1 className="text-2xl font-bold text-gray-900">JuICE Data Explorer</h1>
        </div>

        {loading && (
          <div className="text-gray-500 text-sm py-12 text-center">Loading dataset…</div>
        )}
        {error && (
          <div className="text-red-500 text-sm py-12 text-center">{error}</div>
        )}

        {!loading && !error && (
          <div className="flex gap-5 items-start">

            {/* LEFT PANEL: filters + entry list */}
            <div className="w-80 shrink-0 sticky top-6 bg-white rounded-xl shadow-md overflow-hidden">

              {/* Filters */}
              <div className="p-4 border-b border-gray-100 flex flex-col gap-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Filters</p>
                <select
                  value={filterCountry}
                  onChange={e => {
                    setFilterCountry(e.target.value)
                    resetFilters()
                  }}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="all">All countries</option>
                  <option value="us">United States</option>
                  <option value="korea">South Korea</option>
                  <option value="indonesia">Indonesia</option>
                  <option value="bangladesh">Bangladesh</option>
                </select>
                <select
                  value={filterLang}
                  onChange={e => {
                    setFilterLang(e.target.value)
                    resetFilters()
                  }}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="all">All languages</option>
                  <option value="en">English</option>
                  <option value="ko">Korean</option>
                  <option value="id">Indonesian</option>
                  <option value="bn">Bengali</option>
                </select>
                <select
                  value={filterCategory}
                  onChange={e => {
                    setFilterCategory(e.target.value)
                    resetFilters()
                  }}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="all">All error categories</option>
                  {ALL_CATEGORIES.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Entry count */}
              <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-b border-gray-100">
                {filtered.length} entries &middot; page {page + 1} / {totalPages}
              </div>

              {/* Entry list */}
              <div
                className="overflow-y-auto divide-y divide-gray-50"
                style={{ maxHeight: 'calc(100vh - 380px)' }}
              >
                {pageEntries.map(entry => (
                  <EntryListItem
                    key={entry.key}
                    entry={entry}
                    isSelected={selected?.key === entry.key}
                    onClick={() => setSelectedKey(entry.key)}
                  />
                ))}
                {pageEntries.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-6">No entries found.</p>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    disabled={page === 0}
                    onClick={() => goToPage(page - 1)}
                    className="text-sm px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                  >
                    ← Prev
                  </button>
                  <span className="text-xs text-gray-500">
                    {page + 1} / {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages - 1}
                    onClick={() => goToPage(page + 1)}
                    className="text-sm px-3 py-1 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT PANEL: entry detail */}
            {selected ? (
              <EntryDetail key={selected.key} entry={selected} />
            ) : (
              <div className="flex-1 flex items-center justify-center py-20 text-gray-400 text-sm">
                No entries match the current filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
