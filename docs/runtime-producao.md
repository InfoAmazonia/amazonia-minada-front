# Runtime de produção

O Dockerfile.prod registra a configuração já validada: build em Node 24.22.1 LTS e arquivos estáticos em Nginx 1.30.6, ambos fixados por digest. O Compose usa `restart: unless-stopped`.

Instale com Yarn 1 e `yarn install --frozen-lockfile`; o yarn.lock contém patches de compatibilidade da cadeia CRA/Webpack com o Node atual. O SKIP_PREFLIGHT_CHECK se limita ao build e exige validar o resultado antes de publicar. A migração completa do Create React App e os demais alertas de dependências continuam trabalho separado.

Não versione .env. Configure as mesmas variáveis públicas de build e confirme mapa, estatísticas, busca/filtros e CSV antes de substituir a imagem. Mantenha a imagem/configuração anterior para reversão. Esta publicação no GitHub registra o runtime; não dispara redeploy.
