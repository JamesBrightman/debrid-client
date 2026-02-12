import { z } from "zod";

export const settingsResponseSchema = z.object({
  download_ports: z.array(z.string()),
  download_port: z.string(),
  locales: z.record(z.string(), z.string()),
  locale: z.string(),
  streaming_qualities: z.array(z.string()),
  streaming_quality: z.string(),
  mobile_streaming_quality: z.string(),
  streaming_languages: z.record(z.string(), z.string()),
  streaming_language_preference: z.string(),
  streaming_cast_audio: z.array(z.string()),
  streaming_cast_audio_preference: z.string(),
});

export type SettingsResponse = z.infer<typeof settingsResponseSchema>;
