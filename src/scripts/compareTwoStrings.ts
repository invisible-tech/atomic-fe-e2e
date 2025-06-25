export function compareTwoStrings(a: string, b: string): number {
    if (!a || !b || a.length < 2 || b.length < 2) return 0;
    if (a === b) return 1;
  
    const bigrams = (str: string): string[] => {
      const s = str.toLowerCase();
      return Array.from({ length: s.length - 1 }, (_, i) => s.slice(i, i + 2));
    };
  
    const pairsA = bigrams(a);
    const pairsB = bigrams(b);
    const totalPairs = pairsA.length + pairsB.length;
  
    let matches = 0;
    const seen = new Set<number>();
  
    for (const pairA of pairsA) {
      const index = pairsB.findIndex((pairB, i) => pairA === pairB && !seen.has(i));
      if (index !== -1) {
        matches++;
        seen.add(index);
      }
    }
  
    return (2 * matches) / totalPairs;
  }