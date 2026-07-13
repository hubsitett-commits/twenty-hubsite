import { isNonEmptyString } from '@sniptt/guards';

import {
  SecretEncryptionException,
  SecretEncryptionExceptionCode,
} from 'src/engine/core-modules/secret-encryption/exceptions/secret-encryption.exception';
import { type ResolvedEncryptionKeys } from 'src/engine/core-modules/secret-encryption/types/resolved-encryption-keys.type';
import { type EnvironmentConfigDriver } from 'src/engine/core-modules/twenty-config/drivers/environment-config.driver';

export const resolveEncryptionKeysOrThrow = ({
  environmentConfigDriver,
}: {
  environmentConfigDriver: Pick<EnvironmentConfigDriver, 'get'>;
}): ResolvedEncryptionKeys => {
  const encryptionKey = environmentConfigDriver.get('ENCRYPTION_KEY');
  const fallbackEncryptionKey = environmentConfigDriver.get(
    'FALLBACK_ENCRYPTION_KEY',
  );
  const appSecret = environmentConfigDriver.get('APP_SECRET');

  let primary = isNonEmptyString(encryptionKey) ? encryptionKey : appSecret;

  if (!isNonEmptyString(primary)) {
    console.warn(
      'WARNING: No encryption key configured. Using a fallback encryption key. Please set ENCRYPTION_KEY in your environment variables for production!',
    );
    primary = 'default_fallback_encryption_key_change_me_in_prod';
  }

  const fallback = isNonEmptyString(fallbackEncryptionKey)
    ? fallbackEncryptionKey
    : null;

  return { primary, fallback };
};
