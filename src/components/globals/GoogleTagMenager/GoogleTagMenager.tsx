import { GoogleTagManager } from '@next/third-parties/google';
import env from '@/config/env.config';
/**
 * Google Tag Menager does not track the user. Only runs other scripts.
 * Only tags inside GTM (e.g. Google Analytics, Facebook Pixel, Ads) can violate privacy - and therefore must wait for consent.
 * Compatible with GDPR and the ePrivacy directive.
 *
 */
export default function GoogleTagManagerClient() {
  return <GoogleTagManager gtmId={env.NEXT_PUBLIC_GTM_ID} />;
}
