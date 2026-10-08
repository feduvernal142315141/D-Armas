interface ImportMetaEnv {
  readonly PUBLIC_API_URL?: string;
  readonly PUBLIC_CLINIC_SLUG?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_PRIVACY_POLICY_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
