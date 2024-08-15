/**
 * JavaScript and Node.js SDK for OpenFGA
 *
 * API version: 1.x
 * Website: https://openfga.dev
 * Documentation: https://openfga.dev/docs
 * Support: https://openfga.dev/community
 * License: [Apache-2.0](https://github.com/openfga/js-sdk/blob/main/LICENSE)
 *
 * NOTE: This file was auto generated by OpenAPI Generator (https://openapi-generator.tech). DO NOT EDIT.
 */


import globalAxios, { AxiosInstance } from "axios";

import { assertParamExists, isWellFormedUriString } from "../validation";
import { FgaApiAuthenticationError, FgaApiError, FgaError, FgaValidationError } from "../errors";
import { attemptHttpRequest } from "../common";
import { buildAttributes } from "../telemetry";
import { ApiTokenConfig, AuthCredentialsConfig, ClientCredentialsConfig, CredentialsMethod } from "./types";
import { Counter, metrics } from "@opentelemetry/api";

export class Credentials {
  private accessToken?: string;
  private accessTokenExpiryDate?: Date;
  private tokenCounter?: Counter;

  public static init(configuration: { credentials: AuthCredentialsConfig }): Credentials {
    return new Credentials(configuration.credentials);
  }

  public constructor(private authConfig: AuthCredentialsConfig, private axios: AxiosInstance = globalAxios) {
    this.initConfig();
    this.isValid();
  }

  /**
   * Sets the default config values
   * @private
   */
  private initConfig() {
    switch (this.authConfig?.method) {
    case CredentialsMethod.ApiToken:

      if (this.authConfig.config) {
        if (!this.authConfig.config.headerName) {
          this.authConfig.config.headerName = "Authorization";
        }
        if (!this.authConfig.config.headerValuePrefix) {
          this.authConfig.config.headerValuePrefix = "Bearer";
        }
      }
      break;
    case CredentialsMethod.ClientCredentials: {
      const meter = metrics.getMeter("@openfga/sdk", "0.6.2");
      this.tokenCounter = meter.createCounter("fga-client.credentials.request");
      break;
    }
    case CredentialsMethod.None:
    default:
      break;
    }
  }

  /**
   *
   * @throws {FgaValidationError}
   */
  public isValid(): void {
    const { authConfig } = this;
    switch (authConfig?.method) {
    case CredentialsMethod.None:
      break;
    case CredentialsMethod.ApiToken:
      assertParamExists("Credentials", "config.token", authConfig.config?.token);
      assertParamExists("Credentials", "config.headerName", authConfig.config?.headerName);
      assertParamExists("Credentials", "config.headerName", authConfig.config?.headerName);
      break;
    case CredentialsMethod.ClientCredentials:
      assertParamExists("Credentials", "config.clientId", authConfig.config?.clientId);
      assertParamExists("Credentials", "config.clientSecret", authConfig.config?.clientSecret);
      assertParamExists("Credentials", "config.apiTokenIssuer", authConfig.config?.apiTokenIssuer);
      assertParamExists("Credentials", "config.apiAudience", authConfig.config?.apiAudience);

      if (!isWellFormedUriString(`https://${authConfig.config?.apiTokenIssuer}`)) {
        throw new FgaValidationError(
          `Configuration.apiTokenIssuer does not form a valid URI (https://${authConfig.config?.apiTokenIssuer})`);
      }
      break;
    }
  }

  /**
   * Get access token, request a new one if not cached or expired
   * @return string
   */
  public async getAccessTokenHeader(): Promise<{ name: string; value: string } | undefined> {
    const accessTokenValue = await this.getAccessTokenValue();
    switch (this.authConfig?.method) {
    case CredentialsMethod.None:
      return;
    case CredentialsMethod.ApiToken:
      return {
        name: this.authConfig.config.headerName,
        value: `${this.authConfig.config.headerValuePrefix ? `${this.authConfig.config.headerValuePrefix} ` : ""}${accessTokenValue}`
      };
    case CredentialsMethod.ClientCredentials:
      return {
        name: "Authorization",
        value: `Bearer ${accessTokenValue}`
      };
    }
  }

  private async getAccessTokenValue(): Promise<string | undefined> {
    switch (this.authConfig?.method) {
    case CredentialsMethod.None:
      return;
    case CredentialsMethod.ApiToken:
      return this.authConfig.config.token;
    case CredentialsMethod.ClientCredentials:
      if (this.accessToken && (!this.accessTokenExpiryDate || this.accessTokenExpiryDate > new Date())) {
        return this.accessToken;
      }

      return this.refreshAccessToken();
    }
  }

  /**
   * Request new access token
   * @return string
   */
  private async refreshAccessToken() {
    const clientCredentials = (this.authConfig as { method: CredentialsMethod.ClientCredentials; config: ClientCredentialsConfig })?.config;
    // Check if the apiTokenIssuer contains protocol prefix before forcing /oauth/token
    const hasProtocolPrefix = /^(http|https):\/\//i.test(clientCredentials.apiTokenIssuer);
    const url = hasProtocolPrefix 
        ? clientCredentials.apiTokenIssuer 
        : `https://${clientCredentials.apiTokenIssuer}/oauth/token`;
    
    try {
      const response = await attemptHttpRequest<{
          client_id: string,
          client_secret: string,
          audience: string,
          grant_type: "client_credentials",
        }, {
        access_token: string,
        expires_in: number,
      }>({
        url,
        method: "post",
        data: {
          client_id: clientCredentials.clientId,
          client_secret: clientCredentials.clientSecret,
          audience: clientCredentials.apiAudience,
          grant_type: "client_credentials",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }, {
        maxRetry: 3,
        minWaitInMs: 100,
      }, globalAxios);

      if (response) {
        this.accessToken = response.data.access_token;
        this.accessTokenExpiryDate = new Date(Date.now() + response.data.expires_in * 1000);
      }

      this.tokenCounter?.add(1, buildAttributes(response, this.authConfig));

      return this.accessToken;
    } catch (err: unknown) {
      if (err instanceof FgaApiError) {
        (err as any).constructor = FgaApiAuthenticationError;
        (err as any).name = "FgaApiAuthenticationError";
        (err as any).clientId = clientCredentials.clientId;
        (err as any).audience = clientCredentials.apiAudience;
        (err as any).grantType = "client_credentials";
      }

      throw err;
    }
  }
}
