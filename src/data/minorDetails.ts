import type { MajorDetail } from './majorDetails'
import { wandsDetails } from './details/wands'
import { cupsDetails } from './details/cups'
import { swordsDetails } from './details/swords'
import { pentaclesDetails } from './details/pentacles'

/** Extended interpretations for all 56 Minor Arcana card pages. */
export const minorDetails: Record<string, MajorDetail> = {
  ...wandsDetails,
  ...cupsDetails,
  ...swordsDetails,
  ...pentaclesDetails,
}
