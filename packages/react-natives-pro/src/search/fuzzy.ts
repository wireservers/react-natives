/**
 * Subsequence fuzzy matching, shared by Combobox and CommandPalette.
 *
 * Scoring rewards matches that start a word or run consecutively, so typing "gp" finds
 * "Git Push" ahead of "Grouping". Kept pure so ranking can be tested without a UI.
 */

export interface FuzzyMatch {
  /** Indices in the haystack that matched, for highlighting. */
  indices: number[];
  score: number;
}

/**
 * Returns `null` when `needle` is not a subsequence of `haystack`.
 * An empty needle matches everything with a neutral score.
 */
export function fuzzyMatch(needle: string, haystack: string): FuzzyMatch | null {
  if (needle.length === 0) return { indices: [], score: 0 };
  if (haystack.length === 0) return null;

  const n = needle.toLowerCase();
  const h = haystack.toLowerCase();

  const indices: number[] = [];
  let score = 0;
  let hi = 0;
  let previousIndex = -2;

  for (let ni = 0; ni < n.length; ni += 1) {
    const ch = n[ni];
    let found = -1;
    for (let i = hi; i < h.length; i += 1) {
      if (h[i] === ch) { found = i; break; }
    }
    if (found === -1) return null;

    // Consecutive characters are a much stronger signal than scattered ones.
    if (found === previousIndex + 1) score += 8;
    // Start of the string, or start of a word.
    if (found === 0) score += 10;
    else if (/[\s\-_/.]/.test(h[found - 1])) score += 6;
    // Prefer matches nearer the front.
    score -= Math.min(found, 10) * 0.1;

    indices.push(found);
    previousIndex = found;
    hi = found + 1;
  }

  // Shorter haystacks are more precise matches for the same needle.
  score += Math.max(0, 10 - haystack.length * 0.05);
  // An exact prefix should always win.
  if (h.startsWith(n)) score += 15;
  if (h === n) score += 25;

  return { indices, score };
}

export interface RankableItem {
  id: string;
  label: string;
  /** Extra text to match against (aliases, keywords, group name). */
  keywords?: string;
}

export interface RankedItem<T extends RankableItem> {
  item: T;
  score: number;
  indices: number[];
}

/**
 * Filter + rank items against a query.
 *
 * Ties break on the original order so an empty query preserves the caller's intended ordering
 * rather than shuffling on every keystroke.
 */
export function rankItems<T extends RankableItem>(query: string, items: T[], limit?: number): RankedItem<T>[] {
  const trimmed = query.trim();

  const ranked: (RankedItem<T> & { order: number })[] = [];
  items.forEach((item, order) => {
    const labelMatch = fuzzyMatch(trimmed, item.label);
    const keywordMatch = item.keywords ? fuzzyMatch(trimmed, item.keywords) : null;

    if (!labelMatch && !keywordMatch) return;
    // Keyword hits are real but weaker than a label hit.
    const useLabel = labelMatch != null &&
      (keywordMatch == null || labelMatch.score >= keywordMatch.score - 5);
    const best = useLabel ? labelMatch! : keywordMatch!;
    const score = useLabel ? best.score : best.score - 5;

    ranked.push({ item, score, indices: useLabel ? best.indices : [], order });
  });

  ranked.sort((a, b) => (b.score - a.score) || (a.order - b.order));
  const out = ranked.map(({ item, score, indices }) => ({ item, score, indices }));
  return limit != null ? out.slice(0, limit) : out;
}

/** Split a label into matched / unmatched runs for highlighting. */
export function highlightSegments(label: string, indices: number[]): { text: string; matched: boolean }[] {
  if (indices.length === 0) return [{ text: label, matched: false }];
  const set = new Set(indices);
  const segments: { text: string; matched: boolean }[] = [];
  let current = '';
  let currentMatched = set.has(0);

  for (let i = 0; i < label.length; i += 1) {
    const matched = set.has(i);
    if (matched !== currentMatched) {
      if (current) segments.push({ text: current, matched: currentMatched });
      current = '';
      currentMatched = matched;
    }
    current += label[i];
  }
  if (current) segments.push({ text: current, matched: currentMatched });
  return segments;
}

/** Move a highlighted index within a list, wrapping at both ends. */
export function moveActiveIndex(current: number, delta: number, count: number): number {
  if (count <= 0) return -1;
  const next = current + delta;
  if (next < 0) return count - 1;
  if (next >= count) return 0;
  return next;
}
