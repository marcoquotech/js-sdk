/**
 * JavaScript and Node.js SDK for OpenFGA
 *
 * API version: 0.1
 * Website: https://openfga.dev
 * Documentation: https://openfga.dev/docs
 * Support: https://discord.gg/8naAwJfWN6
 * License: [Apache-2.0](https://github.com/openfga/js-sdk/blob/main/LICENSE)
 *
 * NOTE: This file was auto generated by OpenAPI Generator (https://openapi-generator.tech). DO NOT EDIT.
 */


import { Configuration, UserConfigurationParams } from "../../configuration";
import { CredentialsMethod } from "../../credentials";

export const OPENFGA_STORE_ID = "test-random-store-id";
export const OPENFGA_API_HOST = "api.fga.example";
export const OPENFGA_API_TOKEN_ISSUER = "tokenissuer.fga.example";
export const OPENFGA_API_AUDIENCE = "https://api.fga.example/";
export const OPENFGA_CLIENT_ID = "some-random-id";
export const OPENFGA_CLIENT_SECRET = "this-is-very-secret";
export const OPENFGA_API_TOKEN = "fga_abcdef";

export const baseConfig: UserConfigurationParams = {
  storeId: OPENFGA_STORE_ID,
  apiHost: OPENFGA_API_HOST,
  credentials: {
    method: CredentialsMethod.ClientCredentials,
    config: {
      apiTokenIssuer: OPENFGA_API_TOKEN_ISSUER,
      apiAudience: OPENFGA_API_AUDIENCE,
      clientId: OPENFGA_CLIENT_ID,
      clientSecret: OPENFGA_CLIENT_SECRET,
    }
  }
};

export const defaultConfiguration = new Configuration(baseConfig);