import wordsData from '../data/words.json';
import quotesData from '../data/greats.json';

const CONTENT_SOURCES = {
  swahiliWords: wordsData.map((entry) => ({
    id: `word-${entry.id}`,
    text: entry.sw,
    meta: {
      category: 'word',
      difficulty: 'beginner',
      language: 'sw',
      sourceAttribution: 'Chaptyp Swahili core vocabulary',
      authorOrigin: 'Chaptyp curated word list',
      tags: ['swahili', 'vocabulary', 'foundation'],
      translation: entry.en,
    },
  })),
  swahiliQuotes: quotesData.map((entry, index) => ({
    id: `quote-${index + 1}`,
    text: entry.quote,
    meta: {
      category: 'quote',
      difficulty: entry.quote.split(/\s+/).length > 20 ? 'intermediate' : 'beginner',
      language: 'sw',
      sourceAttribution: entry.book,
      authorOrigin: entry.author,
      year: entry.year,
      tags: ['swahili', 'literature', 'quote'],
    },
  })),
};

export const PRACTICE_MODES = [
  {
    id: 'swahili-words',
    name: 'Swahili Words',
    description: 'Build consistency with high-frequency Swahili vocabulary drills.',
    sourceKey: 'swahiliWords',
    sessionType: 'generated',
    sessionSize: 40,
    defaultFilters: {
      category: 'word',
      language: 'sw',
    },
    metadata: {
      category: 'Vocabulary',
      difficulty: 'Beginner',
      language: 'Swahili',
      sourceAttribution: 'Chaptyp Swahili core vocabulary',
      authorOrigin: 'Chaptyp curated word list',
      tags: ['swahili', 'vocabulary', 'daily practice'],
    },
  },
  {
    id: 'swahili-quotes',
    name: 'Swahili Quotes',
    description: 'Practice longer passages with culturally rooted quotations and excerpts.',
    sourceKey: 'swahiliQuotes',
    sessionType: 'entry',
    defaultFilters: {
      category: 'quote',
      language: 'sw',
    },
    metadata: {
      category: 'Quotes',
      difficulty: 'Mixed',
      language: 'Swahili',
      sourceAttribution: 'Great African thinkers and literature',
      authorOrigin: 'Mwalimu Julius Nyerere, Shaban Robert, and more',
      tags: ['swahili', 'quotes', 'culture', 'literature'],
    },
  },
];

const matchesFilter = (value, filterValue) => {
  if (Array.isArray(value)) {
    return value.includes(filterValue);
  }

  return value === filterValue;
};

const shuffle = (items) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

export const getPracticeModes = () => PRACTICE_MODES;

export const getPracticeMode = (modeId) =>
  PRACTICE_MODES.find((mode) => mode.id === modeId) ?? null;

export const getPracticeEntries = (modeId, filters = {}) => {
  const mode = getPracticeMode(modeId);

  if (!mode) {
    return [];
  }

  const source = CONTENT_SOURCES[mode.sourceKey] ?? [];

  return source.filter((entry) =>
    Object.entries(filters).every(([key, value]) => matchesFilter(entry.meta[key], value))
  );
};

const buildGeneratedSession = (mode, entries) => {
  const selectedEntries = shuffle(entries).slice(0, mode.sessionSize);

  return {
    id: `${mode.id}-${Date.now()}`,
    modeId: mode.id,
    text: selectedEntries.map((entry) => entry.text).join(' '),
    entryIds: selectedEntries.map((entry) => entry.id),
    translations: selectedEntries.map((entry) => entry.meta.translation ?? null),
    meta: {
      category: mode.metadata.category,
      difficulty: mode.metadata.difficulty,
      language: mode.metadata.language,
      sourceAttribution: mode.metadata.sourceAttribution,
      authorOrigin: mode.metadata.authorOrigin,
      tags: mode.metadata.tags,
    },
  };
};

const buildEntrySession = (mode, entries) => {
  const entry = entries[Math.floor(Math.random() * entries.length)];

  return {
    id: `${mode.id}-${entry.id}-${Date.now()}`,
    modeId: mode.id,
    text: entry.text,
    entryIds: [entry.id],
    meta: {
      category: entry.meta.category,
      difficulty: entry.meta.difficulty,
      language: entry.meta.language,
      sourceAttribution: entry.meta.sourceAttribution,
      authorOrigin: entry.meta.authorOrigin,
      year: entry.meta.year,
      tags: entry.meta.tags,
    },
  };
};

export const getPracticeSession = (modeId) => {
  const mode = getPracticeMode(modeId);

  if (!mode) {
    return null;
  }

  const entries = getPracticeEntries(modeId, mode.defaultFilters);

  if (!entries.length) {
    return null;
  }

  if (mode.sessionType === 'generated') {
    return buildGeneratedSession(mode, entries);
  }

  return buildEntrySession(mode, entries);
};
