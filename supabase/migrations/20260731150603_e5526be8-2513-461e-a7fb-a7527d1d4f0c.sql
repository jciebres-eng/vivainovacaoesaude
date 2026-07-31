-- extensões nunca aceitas em nenhum bucket do VIVA
CREATE OR REPLACE FUNCTION public.arquivo_permitido(_name text)
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT lower(_name) !~ '\.(exe|sh|bat|cmd|com|scr|msi|apk|jar|js|mjs|cjs|php|py|rb|pl|ps1|vbs|dll|so|dylib|bin|deb|rpm|html|htm|svg)$';
$$;
REVOKE ALL ON FUNCTION public.arquivo_permitido(text) FROM PUBLIC, anon, authenticated;

-- pastas pessoais: primeiro segmento do caminho = id do usuário
CREATE POLICY "viva_arquivos_ler_proprios" ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id IN ('viva-perfil','viva-feedback','viva-audio','viva-anexos','viva-thumbnails')
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "viva_arquivos_enviar_proprios" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id IN ('viva-perfil','viva-feedback','viva-audio','viva-anexos','viva-thumbnails')
  AND (storage.foldername(name))[1] = auth.uid()::text
  AND public.arquivo_permitido(name)
);

CREATE POLICY "viva_arquivos_atualizar_proprios" ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id IN ('viva-perfil','viva-feedback','viva-audio','viva-anexos','viva-thumbnails')
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id IN ('viva-perfil','viva-feedback','viva-audio','viva-anexos','viva-thumbnails')
  AND (storage.foldername(name))[1] = auth.uid()::text
  AND public.arquivo_permitido(name)
);

CREATE POLICY "viva_arquivos_excluir_proprios" ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id IN ('viva-perfil','viva-feedback','viva-audio','viva-anexos','viva-thumbnails')
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- recursos demonstrativos: leitura para quem está identificado
CREATE POLICY "viva_demonstrativo_leitura" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'viva-demonstrativo');