---
title: Importar XML no Lattes
description: "Importar o XML editado na Plataforma Lattes (Importar XML, DTD, Enviar)."
---

# Importar XML na Plataforma Lattes

Depois de editar o XML no seu computador, envie o arquivo na Plataforma Lattes.

## Na interface

1. Login em [Plataforma Lattes](https://lattes.cnpq.br/) → **Atualizar currículo**.
2. **Importar** → **Importar XML**.
3. **Passo 1, enviar arquivo:** escolha o `.xml` gerado (`writeCurriculum`, CLI `set` ou `serialize -o`).
4. O sistema exige conformidade com a **DTD** do Currículo Lattes (saída deste toolkit segue export típico: `ISO-8859-1`, `CURRICULO-VITAE`).
5. **Enviar**, revisar o que a plataforma propõe alterar e **confirmar**.

## Checklist antes de importar

1. `lattes-toolkit validate curriculo.xml` (opcional; requer `xmllint`)
2. Conferir backup: `lattes-toolkit backup list`
3. Importar na Plataforma Lattes e revisar o diff proposto
4. Se algo falhar, `lattes-toolkit restore --last` no arquivo local

## Como o Importar funciona (observado em teste, 2026-11)

O fluxo tem 3 passos, e o que cada um aceita é mais restrito do que parece.

**Passo 1 — arquivo.** Form `fl`, POST multipart para `pkg_importa_xml.inicio`
(`file`, `f_cod`, `f_ctr=I`, `f_ret`). Aceita só `.xml` puro (o ZIP do Exportar
é recusado). Toda violação de DTD rejeita o arquivo INTEIRO com o alerta
"Não foi possível processar o arquivo enviado...":

- o importador valida contra o **DTD antigo** (LMPLCurriculo.DTD), não contra o
  XSD 2022. Caso prático: `NATUREZA="ENSINO"` em `PROJETO-DE-PESQUISA` é
  rejeitado (o DTD só tem DESENVOLVIMENTO/EXTENSAO/PESQUISA/OUTRA);
- o export oficial do CNPq sai com 7 violações benignas no DTD 2004 (atributos
  `ORCID-ID`/`PCD` em DADOS-GERAIS, `ELETRONICO`/`OUTRA-FORMA-DE-CONTATO`/
  `REDE-SOCIAL` em ENDERECO, `STATUS-OASISBR`/`ID-OASIS` em MESTRADO). Essas
  sete importam; qualquer violação ALÉM delas bloqueia o arquivo.

**Passo 2 — módulos e filtro de ano.** 17 caixas `f_chkp` (Artigos completos …
16 Eventos, 17 Bancas) e o filtro **"Produção C&T a partir de"** (`f_ano_prod`),
que LIMITA a lista do passo 3 — para alcançar itens antigos, escolha o menor ano
da lista.

**Passo 3 — lista item a item.** Um checkbox `f_sq` por item (id do SERVIDOR,
não o `SEQUENCIA-PRODUCAO` do arquivo) e marcador verde ("não está cadastrada")
ou vermelho ("está cadastrada", comparado por título).

**O que a importação cobre — e o que NÃO cobre.** Só os 17 módulos de
produção (artigos, livros e capítulos, trabalhos em anais, apresentações,
outras produções bibliográficas, softwares, produtos, processos, trabalhos
técnicos, outras produções técnicas, produção artística/cultural, orientações,
demais trabalhos, eventos, bancas). **Não importa** formação complementar,
monitorias, projetos de pesquisa, estágio, idiomas, áreas de atuação — esses
itens do XML são ignorados e precisam de formulário.

**Regras de sequência.** Um `TRABALHO-EM-EVENTOS` sem `SEQUENCIA-PRODUCAO` é
descartado em silêncio; com sequência em lacuna da exportação, também; com
sequência acima do máximo, é listado e aceito. Item novo recebe número maior
que o máximo do arquivo.

**Marcador vermelho bloqueia.** Confirmar item vermelho responde "Não foi
possível atualizar as informações porque ocorreram os seguintes problemas:"
com lista vazia e consome a solicitação sem importar nada. Como o match é por
título, uma participação em evento cujo título iguala um resumo em "Outras
produções bibliográficas" fica vermelha e não entra — nesse caso cadastre a
participação no formulário do evento.

**"Sucesso" não é conferência.** O passo 3 pode responder
"A operação foi realizada com sucesso!" e o item não entrar (observado com
evento sem a própria pessoa entre os participantes). Evento importado precisa
levar a própria pessoa em `PARTICIPANTE-DE-EVENTOS-CONGRESSOS`. Confira o
resultado na LISTA da seção (ex.: `pkg_evento.lista`) — o Exportar entrega a
versão publicada, não a atual.

**Solicitação pendente.** Uma solicitação não confirmada/descartada trava
novos uploads: o Importar reabre no passo 2/3 dela. Descartar (`f_ctr=D`) ou
confirmar antes de reenviar.

## Dica

Revise na UI antes de salvar. Depois, exporte de novo e compare com `parse` se quiser auditar.

## Relacionado

- [Ciclo de trabalho](./ciclo-de-trabalho.md)
- [Backups](./backups.md)
- [Limitações](./limitacoes.md)
