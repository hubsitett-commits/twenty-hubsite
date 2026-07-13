import { Logger } from '@nestjs/common';

import { type CacheModuleOptions } from '@nestjs/cache-manager';

import { redisInsStore } from 'cache-manager-redis-yet';
import { createClient } from 'redis';

import { CacheStorageType } from 'src/engine/core-modules/cache-storage/types/cache-storage-type.enum';
import { type TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

const cacheStorageLogger = new Logger('CacheStorage');

const REDIS_PING_INTERVAL_MS = 60_000;

const cleanRedisUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    let database: number | undefined;
    if (parsed.pathname && parsed.pathname !== '/') {
      const dbStr = parsed.pathname.substring(1);
      const dbNum = parseInt(dbStr, 10);
      if (!isNaN(dbNum)) {
        database = dbNum;
      }
      parsed.pathname = '';
    }
    return {
      url: parsed.toString(),
      database,
    };
  } catch {
    return { url };
  }
};

export const cacheStorageModuleFactory = (
  twentyConfigService: TwentyConfigService,
): CacheModuleOptions => {
  const redisUrl = twentyConfigService.get('REDIS_URL') || process.env.REDIS_URL;
  const cacheStorageType = redisUrl ? CacheStorageType.Redis : CacheStorageType.Memory;
  const cacheStorageTtl = twentyConfigService.get('CACHE_STORAGE_TTL');
  const cacheModuleOptions: CacheModuleOptions = {
    isGlobal: true,
    ttl: cacheStorageTtl * 1000,
  };

  switch (cacheStorageType) {
    case CacheStorageType.Memory: {
      cacheStorageLogger.log('Using in-memory cache storage');
      return cacheModuleOptions;
    }
    case CacheStorageType.Redis: {
      console.log('DEBUG: process.env.REDIS_URL is:', process.env.REDIS_URL);
      console.log('DEBUG: twentyConfigService.get("REDIS_URL") is:', redisUrl);

      if (!redisUrl) {
        throw new Error(
          `${cacheStorageType} cache storage requires REDIS_URL to be defined, check your .env file`,
        );
      }

      return {
        ...cacheModuleOptions,
        store: async () => {
          const cleaned = cleanRedisUrl(redisUrl);
          const redisClient = createClient({
            url: cleaned.url,
            database: cleaned.database,
            pingInterval: REDIS_PING_INTERVAL_MS,
          });

          redisClient.on('error', (err) => {
            cacheStorageLogger.error('Redis cache-storage client error', err);
          });

          await redisClient.connect();

          return redisInsStore(
            redisClient as Parameters<typeof redisInsStore>[0],
            { ttl: cacheStorageTtl * 1000 },
          );
        },
      };
    }
    default:
      throw new Error(
        `Invalid cache-storage (${cacheStorageType}), check your .env file`,
      );
  }
};
