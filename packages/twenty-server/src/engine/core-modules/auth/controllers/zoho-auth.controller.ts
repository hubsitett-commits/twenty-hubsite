import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';

import { AuthOAuthExceptionFilter } from 'src/engine/core-modules/auth/filters/auth-oauth-exception.filter';
import { AuthRestApiExceptionFilter } from 'src/engine/core-modules/auth/filters/auth-rest-api-exception.filter';
import { ZohoOauthGuard } from 'src/engine/core-modules/auth/guards/zoho-oauth.guard';
import { ZohoProviderEnabledGuard } from 'src/engine/core-modules/auth/guards/zoho-provider-enabled.guard';
import { AuthService } from 'src/engine/core-modules/auth/services/auth.service';
import { ZohoRequest } from 'src/engine/core-modules/auth/strategies/zoho.auth.strategy';
import { AuthProviderEnum } from 'src/engine/core-modules/workspace/types/workspace.type';
import { NoPermissionGuard } from 'src/engine/guards/no-permission.guard';
import { PublicEndpointGuard } from 'src/engine/guards/public-endpoint.guard';

@Controller('auth/zoho')
@UseFilters(AuthRestApiExceptionFilter)
export class ZohoAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(
    ZohoProviderEnabledGuard,
    ZohoOauthGuard,
    PublicEndpointGuard,
    NoPermissionGuard,
  )
  async zohoAuth() {
    // Protected by Zoho Auth guard, will trigger Zoho SSO flow redirect
    return;
  }

  @Get('redirect')
  @UseGuards(
    ZohoProviderEnabledGuard,
    ZohoOauthGuard,
    PublicEndpointGuard,
    NoPermissionGuard,
  )
  @UseFilters(AuthOAuthExceptionFilter)
  async zohoAuthRedirect(@Req() req: ZohoRequest, @Res() res: Response) {
    return res.redirect(
      await this.authService.signInUpWithSocialSSO(
        req.user,
        AuthProviderEnum.Zoho,
      ),
    );
  }
}
