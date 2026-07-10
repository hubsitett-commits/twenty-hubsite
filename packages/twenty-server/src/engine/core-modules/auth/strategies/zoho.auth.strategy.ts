import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { type Request } from 'express';
import { Strategy } from 'passport-oauth2';
import axios from 'axios';
import { parseJson } from 'twenty-shared/utils';

import {
  AuthException,
  AuthExceptionCode,
} from 'src/engine/core-modules/auth/auth.exception';
import { type SocialSSOSignInUpActionType } from 'src/engine/core-modules/auth/types/signInUp.type';
import { type SocialSSOState } from 'src/engine/core-modules/auth/types/social-sso-state.type';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

export type ZohoRequest = Omit<
  Request,
  'user' | 'workspace' | 'workspaceMetadataVersion'
> & {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    picture: string | null;
    workspaceInviteHash?: string;
    action: SocialSSOSignInUpActionType;
    workspaceId?: string;
    billingCheckoutSessionState?: string;
    returnToPath?: string;
  };
};

@Injectable()
export class ZohoStrategy extends PassportStrategy(Strategy, 'zoho') {
  constructor(private readonly twentyConfigService: TwentyConfigService) {
    const accountsUrl =
      twentyConfigService.get('AUTH_ZOHO_ACCOUNTS_URL') ||
      'https://accounts.zoho.com';
    super({
      authorizationURL: `${accountsUrl}/oauth/v2/auth`,
      tokenURL: `${accountsUrl}/oauth/v2/token`,
      clientID: twentyConfigService.get('AUTH_ZOHO_CLIENT_ID'),
      clientSecret: twentyConfigService.get('AUTH_ZOHO_CLIENT_SECRET'),
      callbackURL: twentyConfigService.get('AUTH_ZOHO_CALLBACK_URL'),
      scope: ['AaaServer.profile.Read'],
      passReqToCallback: true,
    });
  }

  // oxlint-disable-next-line typescript/no-explicit-any
  authenticate(req: Request, options: any) {
    options = {
      ...options,
      state: JSON.stringify({
        workspaceInviteHash: req.query.workspaceInviteHash,
        workspaceId: req.params.workspaceId,
        billingCheckoutSessionState: req.query.billingCheckoutSessionState,
        action: req.query.action,
        locale: req.query.locale,
        returnToPath: req.query.returnToPath,
      }),
    };

    return super.authenticate(req, options);
  }

  // oxlint-disable-next-line typescript/no-explicit-any
  userProfile(
    accessToken: string,
    done: (err?: Error | null, profile?: unknown) => void,
  ): void {
    const accountsUrl =
      this.twentyConfigService.get('AUTH_ZOHO_ACCOUNTS_URL') ||
      'https://accounts.zoho.com';
    axios
      .get(`${accountsUrl}/oauth/v2/uservalider`, {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (!data || !data.Email) {
          return done(new Error('Failed to retrieve user profile from Zoho.'));
        }

        done(null, {
          email: data.Email,
          firstName: data.First_Name || null,
          lastName: data.Last_Name || null,
          displayName: data.Display_Name || null,
        });
      })
      .catch((err) => {
        done(err instanceof Error ? err : new Error(String(err)));
      });
  }

  async validate(
    request: ZohoRequest,
    _accessToken: string,
    _refreshToken: string,
    profile: { email: string; firstName?: string; lastName?: string },
    // oxlint-disable-next-line typescript/no-explicit-any
    done: (err: any, user?: any) => void,
  ): Promise<void> {
    const { email, firstName, lastName } = profile;
    const state = parseJson<SocialSSOState>(request.query.state as string);

    if (!email) {
      throw new AuthException(
        'Email address not provided by Zoho',
        AuthExceptionCode.EMAIL_NOT_VERIFIED,
      );
    }

    // Whitelisted domains check
    const emailDomain = email.split('@')[1]?.toLowerCase();
    const whitelistStr = this.twentyConfigService.get(
      'AUTH_ZOHO_ALLOWED_DOMAINS',
    );
    if (whitelistStr) {
      const allowedDomains = whitelistStr
        .split(',')
        .map((d) => d.trim().toLowerCase());
      if (!allowedDomains.includes(emailDomain)) {
        throw new AuthException(
          'Email domain is not whitelisted for Zoho SSO',
          AuthExceptionCode.OAUTH_ACCESS_DENIED,
        );
      }
    }

    const user: ZohoRequest['user'] = {
      email: email,
      firstName: firstName || null,
      lastName: lastName || null,
      picture: null,
      workspaceInviteHash: state?.workspaceInviteHash,
      workspaceId: state?.workspaceId,
      billingCheckoutSessionState: state?.billingCheckoutSessionState,
      action: state?.action ?? 'list-available-workspaces',
      returnToPath: state?.returnToPath,
    };

    done(null, user);
  }
}
