const pairs=[
 ['equipa','equipe'],['Equipa','Equipe'],['equipas','equipes'],['Equipas','Equipes'],
 ['artefact','artefat'],['Artefact','Artefat'],['perspetiv','perspectiv'],['Perspetiv','Perspectiv'],
 ['regist','registr'],['Regist','Registr'],['controlo','controle'],['Controlo','Controle'],
 ['controlos','controles'],['Controlos','Controles'],['utilizador','usuário'],['Utilizador','Usuário'],
 ['ficheiro','arquivo'],['Ficheiro','Arquivo'],['contacto','contato'],['Contacto','Contato'],
 ['descarregar','baixar'],['Descarregar','Baixar'],['descarregue','baixe'],['Descarregue','Baixe'],
 ['descarregados','baixados'],['descarregado','baixado'],['recolha','coleta'],['Recolha','Coleta'],
 ['partilh','compartilh'],['Partilh','Compartilh'],['aceder','acessar'],['Aceder','Acessar'],
 ['acesso autorizado','acesso autorizado'],['planeamento','planejamento'],['Planeamento','Planejamento'],
 ['faturação','faturamento'],['Faturação','Faturamento'],['âmbito','escopo'],['Âmbito','Escopo'],
 ['facto','fato'],['Facto','Fato'],['aceite','aceito'],['Aceite','Aceito'],['aceites','aceitos'],
 ['seleção','seleção'],['receção','recepção'],['aplicação','aplicação'],['alojamento','hospedagem'],['Alojamento','Hospedagem'],
 ['ligações','links'],['ligação','link'],['Ligações','Links'],['Ligação','Link'],
 ['píxeis','pixels'],['píxel','pixel'],['consigo','com você'],['sua organização','sua organização'],
 ['a sua equipa','sua equipe'],['a sua organização','sua organização'],['a sua base','sua base'],
 ['o seu primeiro','seu primeiro'],['as suas','suas'],['os seus','seus'],
 ['Saltar para','Pular para'],['Coloque uma questão','Faça uma pergunta'],['questões','perguntas'],
 ['questão','pergunta'],['Questão','Pergunta'],['revistos','revisados'],['revisto','revisado'],
 ['revistas','revisadas'],['revista','revisada'],['Reveja','Revise'],['rever','revisar'],['Rever','Revisar'],
 ['necessita de','precisa de'],['consegue','consegue'],['documentação','documentação']
];
export function brText(value){
 let text=pairs.reduce((s,[a,b])=>a==='partilh'||a==='Partilh'?s.replace(new RegExp('\\b'+a,'g'),b):s.replaceAll(a,b),value);
 const editorial=[['uma release aceito','uma release aceita'],['release aceito','release aceita'],['main aceito','main aprovada'],['revisão aceito','revisão aceita'],['edição aceito','edição aceita'],['versão aceito','versão aceita'],['revê-lo','revisá-lo'],['revê','revisa'],['revêm','revisam'],['planear','planejar'],['planeia','planeja'],['modelação','modelagem'],['monitorização','monitoramento'],['Monitorização','Monitoramento'],['folha de cálculo','planilha'],['Folha de cálculo','Planilha'],['está a aumentar','está aumentando'],['precisam de tomar','precisam tomar'],['precisa de a tomar','precisa tomá-la'],['torna-se','se torna'],['mantém-se','permanece'],['regressa','retorna'],['desenho contextual','projeto contextual'],['conceção','concepção'],['recolher','coletar'],['Controlo','Controle']];
 return editorial.reduce((s,[a,b])=>s.replaceAll(a,b),text);
}
export function brazilian(value){
 if(typeof value==='string')return brText(value);
 if(Array.isArray(value))return value.map(brazilian);
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,brazilian(v)]));
 return value;
}
