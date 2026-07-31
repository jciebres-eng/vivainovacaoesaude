-- ============================================================
-- VIVA — Etapa 2: schema, RLS e acesso público controlado
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- ---------- enums ----------
CREATE TYPE public.journey_status AS ENUM ('draft','preparing','ready','executing','paused','completed','cancelled');
CREATE TYPE public.choice_decision AS ENUM ('accepted','rejected','skipped','saved_for_later');
CREATE TYPE public.journey_step_status AS ENUM ('pending','active','completed','skipped');
CREATE TYPE public.sharing_precision AS ENUM ('exact','approximate','step_only');
CREATE TYPE public.catalog_category AS ENUM ('situation','need','barrier','strategy','information','training','monitoring','feedback');

-- ---------- util ----------
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============================================================
-- Catálogo demonstrativo (leitura pública, escrita só service_role)
-- ============================================================
CREATE TABLE public.situations (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  context text,
  tags text[] NOT NULL DEFAULT '{}',
  is_demo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.situations TO anon, authenticated;
GRANT ALL ON public.situations TO service_role;
ALTER TABLE public.situations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "situations_public_read" ON public.situations FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER situations_touch BEFORE UPDATE ON public.situations FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.needs (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  details text,
  situation_id text REFERENCES public.situations(id) ON DELETE SET NULL,
  is_demo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.needs TO anon, authenticated;
GRANT ALL ON public.needs TO service_role;
ALTER TABLE public.needs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "needs_public_read" ON public.needs FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER needs_touch BEFORE UPDATE ON public.needs FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.barriers (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  details text,
  is_demo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.barriers TO anon, authenticated;
GRANT ALL ON public.barriers TO service_role;
ALTER TABLE public.barriers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "barriers_public_read" ON public.barriers FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER barriers_touch BEFORE UPDATE ON public.barriers FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.strategies (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  details text,
  answers_barriers text[] NOT NULL DEFAULT '{}',
  is_demo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.strategies TO anon, authenticated;
GRANT ALL ON public.strategies TO service_role;
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "strategies_public_read" ON public.strategies FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER strategies_touch BEFORE UPDATE ON public.strategies FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.information_resources (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  details text,
  format text,
  duration text,
  is_demo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.information_resources TO anon, authenticated;
GRANT ALL ON public.information_resources TO service_role;
ALTER TABLE public.information_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "information_public_read" ON public.information_resources FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER information_touch BEFORE UPDATE ON public.information_resources FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.training_resources (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  details text,
  format text,
  duration text,
  is_demo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.training_resources TO anon, authenticated;
GRANT ALL ON public.training_resources TO service_role;
ALTER TABLE public.training_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "training_public_read" ON public.training_resources FOR SELECT TO anon, authenticated USING (true);
CREATE TRIGGER training_touch BEFORE UPDATE ON public.training_resources FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============================================================
-- Perfis
-- ============================================================
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'Alex',
  is_demo boolean NOT NULL DEFAULT false,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_read_own" ON public.profiles FOR SELECT TO authenticated USING (user_id = auth.uid() OR is_demo);
CREATE POLICY "profiles_read_demo" ON public.profiles FOR SELECT TO anon USING (is_demo);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() AND is_demo = false);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- perfil único de demonstração universal
INSERT INTO public.profiles (id, user_id, display_name, is_demo)
VALUES ('00000000-0000-4000-8000-000000000001', NULL, 'Alex', true);

-- helpers de propriedade
CREATE OR REPLACE FUNCTION public.owns_profile(_profile_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = _profile_id AND p.user_id = auth.uid());
$$;

-- cria perfil automaticamente ao entrar pela primeira vez
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, is_demo)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', 'Alex'), false)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  information_density text NOT NULL DEFAULT 'media',
  step_size text NOT NULL DEFAULT 'media',
  animation_intensity text NOT NULL DEFAULT 'media',
  audio_enabled boolean NOT NULL DEFAULT false,
  low_stimulation boolean NOT NULL DEFAULT false,
  location_sharing_default public.sharing_precision NOT NULL DEFAULT 'step_only',
  extras jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (profile_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_preferences TO authenticated;
GRANT ALL ON public.user_preferences TO service_role;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "prefs_own" ON public.user_preferences FOR ALL TO authenticated
  USING (public.owns_profile(profile_id)) WITH CHECK (public.owns_profile(profile_id));
CREATE TRIGGER prefs_touch BEFORE UPDATE ON public.user_preferences FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============================================================
-- Percursos
-- ============================================================
CREATE TABLE public.journeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  situation_id text REFERENCES public.situations(id) ON DELETE SET NULL,
  title text NOT NULL,
  status public.journey_status NOT NULL DEFAULT 'draft',
  current_step_id uuid,
  place jsonb,
  route jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX journeys_profile_idx ON public.journeys (profile_id, updated_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journeys TO authenticated;
GRANT ALL ON public.journeys TO service_role;
ALTER TABLE public.journeys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "journeys_own" ON public.journeys FOR ALL TO authenticated
  USING (public.owns_profile(profile_id)) WITH CHECK (public.owns_profile(profile_id));
CREATE TRIGGER journeys_touch BEFORE UPDATE ON public.journeys FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE OR REPLACE FUNCTION public.owns_journey(_journey_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.journeys j
    JOIN public.profiles p ON p.id = j.profile_id
    WHERE j.id = _journey_id AND p.user_id = auth.uid()
  );
$$;

CREATE TABLE public.journey_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  support text,
  position integer NOT NULL,
  is_optional boolean NOT NULL DEFAULT false,
  is_fixed boolean NOT NULL DEFAULT false,
  source_entity_id text,
  category public.catalog_category,
  configuration jsonb NOT NULL DEFAULT '{}'::jsonb,
  status public.journey_step_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (journey_id, position) DEFERRABLE INITIALLY DEFERRED
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journey_steps TO authenticated;
GRANT ALL ON public.journey_steps TO service_role;
ALTER TABLE public.journey_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "journey_steps_own" ON public.journey_steps FOR ALL TO authenticated
  USING (public.owns_journey(journey_id)) WITH CHECK (public.owns_journey(journey_id));
CREATE TRIGGER journey_steps_touch BEFORE UPDATE ON public.journey_steps FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.journey_choices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  category public.catalog_category NOT NULL,
  entity_id text NOT NULL,
  title text NOT NULL,
  decision public.choice_decision NOT NULL,
  decision_order integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (journey_id, category, entity_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journey_choices TO authenticated;
GRANT ALL ON public.journey_choices TO service_role;
ALTER TABLE public.journey_choices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "journey_choices_own" ON public.journey_choices FOR ALL TO authenticated
  USING (public.owns_journey(journey_id)) WITH CHECK (public.owns_journey(journey_id));

CREATE TABLE public.journey_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  version_number integer NOT NULL,
  snapshot jsonb NOT NULL,
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (journey_id, version_number)
);
GRANT SELECT, INSERT ON public.journey_versions TO authenticated;
GRANT ALL ON public.journey_versions TO service_role;
ALTER TABLE public.journey_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "journey_versions_own" ON public.journey_versions FOR SELECT TO authenticated USING (public.owns_journey(journey_id));
CREATE POLICY "journey_versions_insert_own" ON public.journey_versions FOR INSERT TO authenticated WITH CHECK (public.owns_journey(journey_id));

CREATE TABLE public.journey_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  response_type text NOT NULL,
  response_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journey_feedback TO authenticated;
GRANT ALL ON public.journey_feedback TO service_role;
ALTER TABLE public.journey_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "journey_feedback_own" ON public.journey_feedback FOR ALL TO authenticated
  USING (public.owns_journey(journey_id)) WITH CHECK (public.owns_journey(journey_id));

CREATE TABLE public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  target_type text NOT NULL,
  target_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (profile_id, target_type, target_id)
);
GRANT SELECT, INSERT, DELETE ON public.favorites TO authenticated;
GRANT ALL ON public.favorites TO service_role;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "favorites_own" ON public.favorites FOR ALL TO authenticated
  USING (public.owns_profile(profile_id)) WITH CHECK (public.owns_profile(profile_id));

CREATE TABLE public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  journey_id uuid REFERENCES public.journeys(id) ON DELETE CASCADE,
  bucket text NOT NULL,
  path text NOT NULL,
  kind text NOT NULL,
  mime_type text,
  size_bytes integer,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (bucket, path)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_assets TO authenticated;
GRANT ALL ON public.media_assets TO service_role;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media_own" ON public.media_assets FOR ALL TO authenticated
  USING (public.owns_profile(profile_id)) WITH CHECK (public.owns_profile(profile_id));
CREATE TRIGGER media_touch BEFORE UPDATE ON public.media_assets FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============================================================
-- Compartilhamento temporário
-- ============================================================
CREATE TABLE public.sharing_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  public_token_hash text NOT NULL UNIQUE,
  precision_mode public.sharing_precision NOT NULL DEFAULT 'step_only',
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.sharing_sessions TO authenticated;
GRANT ALL ON public.sharing_sessions TO service_role;
ALTER TABLE public.sharing_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sharing_sessions_own" ON public.sharing_sessions FOR ALL TO authenticated
  USING (public.owns_profile(owner_id)) WITH CHECK (public.owns_profile(owner_id) AND public.owns_journey(journey_id));

CREATE TABLE public.sharing_viewers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sharing_session_id uuid NOT NULL REFERENCES public.sharing_sessions(id) ON DELETE CASCADE,
  label text,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sharing_viewers TO authenticated;
GRANT ALL ON public.sharing_viewers TO service_role;
ALTER TABLE public.sharing_viewers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sharing_viewers_owner_read" ON public.sharing_viewers FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sharing_sessions s WHERE s.id = sharing_session_id AND public.owns_profile(s.owner_id)));

CREATE TABLE public.location_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sharing_session_id uuid NOT NULL REFERENCES public.sharing_sessions(id) ON DELETE CASCADE,
  latitude double precision,
  longitude double precision,
  accuracy double precision,
  current_step_id uuid,
  step_label text,
  recorded_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX location_updates_session_idx ON public.location_updates (sharing_session_id, recorded_at DESC);
GRANT SELECT, INSERT, DELETE ON public.location_updates TO authenticated;
GRANT ALL ON public.location_updates TO service_role;
ALTER TABLE public.location_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "location_updates_own" ON public.location_updates FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sharing_sessions s WHERE s.id = sharing_session_id AND public.owns_profile(s.owner_id)))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.sharing_sessions s
    WHERE s.id = sharing_session_id AND public.owns_profile(s.owner_id)
      AND s.revoked_at IS NULL AND s.expires_at > now()
  ));

-- ============================================================
-- Consentimentos e eventos técnicos
-- ============================================================
CREATE TABLE public.consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  consent_type text NOT NULL,
  granted boolean NOT NULL,
  version text NOT NULL DEFAULT 'v1',
  created_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz
);
GRANT SELECT, INSERT, UPDATE ON public.consent_records TO authenticated;
GRANT ALL ON public.consent_records TO service_role;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "consent_own" ON public.consent_records FOR ALL TO authenticated
  USING (public.owns_profile(profile_id)) WITH CHECK (public.owns_profile(profile_id));

CREATE TABLE public.audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  severity text NOT NULL DEFAULT 'info',
  context jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_events TO authenticated;
GRANT ALL ON public.audit_events TO service_role;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_read_own" ON public.audit_events FOR SELECT TO authenticated USING (public.owns_profile(profile_id));
CREATE POLICY "audit_insert_own" ON public.audit_events FOR INSERT TO authenticated
  WITH CHECK (profile_id IS NULL OR public.owns_profile(profile_id));

-- ============================================================
-- Acompanhamento público por token (única porta para anon)
-- ============================================================
CREATE OR REPLACE FUNCTION public.follow_shared_journey(_token text)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE
  _hash text;
  _s public.sharing_sessions;
  _j public.journeys;
  _loc public.location_updates;
  _result jsonb;
BEGIN
  IF _token IS NULL OR length(_token) < 16 THEN
    RETURN jsonb_build_object('status','invalid');
  END IF;
  _hash := encode(extensions.digest(_token, 'sha256'), 'hex');
  SELECT * INTO _s FROM public.sharing_sessions WHERE public_token_hash = _hash;
  IF _s.id IS NULL THEN RETURN jsonb_build_object('status','invalid'); END IF;
  IF _s.revoked_at IS NOT NULL THEN RETURN jsonb_build_object('status','revoked'); END IF;
  IF _s.expires_at <= now() THEN RETURN jsonb_build_object('status','expired'); END IF;

  SELECT * INTO _j FROM public.journeys WHERE id = _s.journey_id;
  SELECT * INTO _loc FROM public.location_updates
    WHERE sharing_session_id = _s.id ORDER BY recorded_at DESC LIMIT 1;

  _result := jsonb_build_object(
    'status','active',
    'precision', _s.precision_mode,
    'expires_at', _s.expires_at,
    'journey', jsonb_build_object(
      'title', _j.title,
      'status', _j.status,
      'step_label', COALESCE(_loc.step_label, NULL)
    ),
    'updated_at', _loc.recorded_at
  );

  IF _s.precision_mode = 'exact' AND _loc.latitude IS NOT NULL THEN
    _result := _result || jsonb_build_object('location',
      jsonb_build_object('latitude', _loc.latitude, 'longitude', _loc.longitude, 'accuracy', _loc.accuracy));
  ELSIF _s.precision_mode = 'approximate' AND _loc.latitude IS NOT NULL THEN
    _result := _result || jsonb_build_object('location',
      jsonb_build_object(
        'latitude', round(_loc.latitude::numeric, 2),
        'longitude', round(_loc.longitude::numeric, 2),
        'accuracy', 1500));
  END IF;

  RETURN _result;
END; $$;
REVOKE ALL ON FUNCTION public.follow_shared_journey(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.follow_shared_journey(text) TO anon, authenticated;

-- Realtime para o lado de quem é dono da sessão
ALTER PUBLICATION supabase_realtime ADD TABLE public.location_updates;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sharing_sessions;