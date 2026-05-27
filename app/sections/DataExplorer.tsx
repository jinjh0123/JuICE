import React from 'react'
import { Section } from '../components/Section'
import { CategoryBadge, ErrorInfo, HighlightedText } from '../utils/spanHighlight'

type ExampleEntry = {
  country: string
  countryColor: string
  language: string
  query: string
  excerpt: string
  errors: ErrorInfo[]
}

const EXAMPLES: ExampleEntry[] = [
  {
    country: 'Bangladesh',
    countryColor: 'bg-amber-100 text-amber-700',
    language: 'Bengali',
    query: "একটি বাংলাদেশী শহরে একজন অফিস কর্মীর যাত্রার উপর একটি সংক্ষিপ্ত উপন্যাস লিখুন, যেখানে তাদের সকালের যাতায়াত এবং পথে দেখা দৃশ্যাবলীর বিবরণ থাকবে।",
    excerpt: "প্রথম স্টপ: কফির দোকান। দোতলার করিডোর ভাঙা দেয়ালে, প্লাস্টিক কাপে কফির গন্ধ মিশে আছে তেলের খাস্তা গন্ধে। ঠাণ্ডা চা হাতে নিয়ে রাশেদ একটু দাঁড়ায়—দূর থেকে স্কুলগামী বাচ্চারা লাঠি হাতে ঝাঁপরিয়ে আসে, তাদের চিৎকারে হাওয়া কাঁপে।",
    errors: [
      {
        span: 'কফির দোকান',
        category: 'Cultural Missingness',
        explanation: "The reference to a 'কফির দোকান' (coffee shop) as the first morning commute stop is culturally unrealistic in Bangladesh. A much more authentic and common scenario would involve stopping at a traditional roadside tea stall, known locally as a 'টং এর দোকান' — a cultural fixture the story omits entirely.",
      },
    ],
  },
  {
    country: 'Indonesia',
    countryColor: 'bg-green-100 text-green-700',
    language: 'English',
    query: "Write a brief novel about an office worker's journey in an Indonesian city, detailing the process of their morning commute and the scenary they encounter.",
    excerpt: "She got off near Sudirman, stepping into the polished world of glass towers and suited professionals. The scent of jasmine from a street vendor's basket mingled with exhaust fumes. A security guard nodded as she passed through the turnstile of her office building, a sleek tower housing an insurance firm where she'd worked for seven years.",
    errors: [
      {
        span: "The scent of jasmine from a street vendor's basket",
        category: 'Cultural Connotation Error',
        explanation: "In Indonesia, the scent of jasmine (melati) is strongly associated with funerals, traditional ceremonies, or the supernatural (specifically the presence of ghosts), rather than a pleasant ambient city smell. Additionally, vendors selling loose jasmine from baskets are not typical fixtures on the busy sidewalks of the Sudirman business district, where food or coffee vendors are far more common.",
      },
    ],
  },
  {
    country: 'South Korea',
    countryColor: 'bg-rose-100 text-rose-700',
    language: 'Korean',
    query: "한국의 도시에서 직장인이 아침에 집을 나서서 회사에 도착하기까지 겪는 이동 과정과 주변 풍경을 묘사한 짧은 소설을 써줘.",
    excerpt: "회사 건물 앞, 유리와 강철이 반사하는 도시의 얼굴이 나를 맞는다. 보안 출입구에 사원증을 대고 들어가면 로비의 식물과 안내 데스크, 신문을 읽는 사람들을 마주한다. 엘리베이터가 올라가며 창밖으로 보이던 거리의 풍경은 점점 조각으로 줄어든다.",
    errors: [
      {
        span: '신문을 읽는 사람들',
        category: 'Cultural Incoherence',
        explanation: "The description of '신문을 읽는 사람들' (people reading newspapers) in a modern office lobby is unnatural, as it is very rare to see people reading physical newspapers during their morning commute in contemporary South Korea.",
      },
    ],
  },
  {
    country: 'United States',
    countryColor: 'bg-sky-100 text-sky-700',
    language: 'English',
    query: "Write a brief novel about an office worker's journey in an American city, detailing the process of their morning commute and the scenary they encounter.",
    excerpt: "Every morning at 6:17 a.m., Daniel Reyes stepped out of his third-floor apartment in Astoria, Queens, into the hushed breath of a city not yet awake. The air carried the faint tang of yesterday's rain and the promise of exhaust. He wore the same navy coat every winter, its left pocket frayed from years of subway tickets and MetroCards.\n\nThe 7 train arrived with its familiar screech. Inside, the car was half-full—nurses in scrubs, a student buried in textbooks, an older man reading the Daily News.",
    errors: [
      {
        span: 'The 7 train arrived',
        category: 'Cultural Inaccuracy',
        explanation: "The protagonist lives in Astoria, Queens (established in the opening line). The 7 train does not serve Astoria — the N and W trains do. The 7 train runs through Sunnyside, Woodside, Jackson Heights, Corona, and Flushing.",
      },
    ],
  },
]

function ExampleCard({ ex }: { ex: ExampleEntry }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3 bg-white">
      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${ex.countryColor}`}>
          {ex.country}
        </span>
        <span className="text-xs text-gray-400">{ex.language}</span>
      </div>
      <div className="text-xs text-gray-500 italic leading-snug">&ldquo;{ex.query}&rdquo;</div>
      <div className="text-sm text-gray-700 leading-relaxed">
        <HighlightedText text={ex.excerpt} errors={ex.errors} />
      </div>
      <div className="border-t border-gray-100 pt-3 flex flex-col gap-1.5">
        {ex.errors.map((err, i) => (
          <div key={i} className="text-xs text-gray-600 flex gap-2 items-start">
            <CategoryBadge category={err.category} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{err.explanation}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DataExplorer() {
  return (
    <Section title="Dataset Examples">
      <p className="text-gray-600 mb-6 leading-relaxed">
        Each entry in JuICE is a query-response pair with span-level annotations marking cultural and linguistic
        errors. Hover over a highlighted span to see the annotator's explanation. The examples below illustrate
        how a response can be fluent and factually plausible yet culturally wrong to a local reader.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {EXAMPLES.map((ex, i) => (
          <ExampleCard key={i} ex={ex} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a
          href="#explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          Explore all 1,050 examples
          <span aria-hidden>→</span>
        </a>
      </div>
    </Section>
  )
}
