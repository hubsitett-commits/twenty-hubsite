import { createHash } from 'crypto';

import { isNonEmptyString } from '@sniptt/guards';

import { deriveInstanceHmacKey } from 'src/engine/core-modules/secret-encryption/utils/derive-instance-hmac-key.util';
import { type TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

const SESSION_COOKIE_HMAC_PURPOSE = 'session-cookie';

const buildLegacySessionSecret = (appSecret: string) =>
  createHash('sha256').update(`${appSecret}SESSION_STORE_SECRET`).digest('hex');

export const resolveSessionCookieSecretsOrThrow = ({
  twentyConfigService,
}: {
  twentyConfigService: Pick<TwentyConfigService, 'get'>;
}): string[] => {
  const encryptionKey = twentyConfigService.get('ENCRYPTION_KEY');
  const fallbackEncryptionKey = twentyConfigService.get(
    'FALLBACK_ENCRYPTION_KEY',
  );
  const appSecret = twentyConfigService.get('APP_SECRET');

  let rawPrimary = isNonEmptyString(encryptionKey)
    ? encryptionKey
    : appSecret;

  if (!isNonEmptyString(rawPrimary)) {
    console.warn(
      'WARNING: Neither ENCRYPTION_KEY nor APP_SECRET is set. Using a fallback secret key. Please set APP_SECRET in your environment variables for production!',
    );
    rawPrimary = 'default_fallback_session_cookie_secret_key_change_me_in_prod';
  }

  const secrets: string[] = [
    deriveInstanceHmacKey({
      rawKey: rawPrimary,
      purpose: SESSION_COOKIE_HMAC_PURPOSE,
    }).toString('hex'),
  ];

  if (isNonEmptyString(fallbackEncryptionKey)) {
    secrets.push(
      deriveInstanceHmacKey({
        rawKey: fallbackEncryptionKey,
        purpose: SESSION_COOKIE_HMAC_PURPOSE,
      }).toString('hex'),
    );
  }

  if (isNonEmptyString(appSecret)) {
    secrets.push(buildLegacySessionSecret(appSecret));
  }

  return secrets;
};
