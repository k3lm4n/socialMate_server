

export type EngineerChemistryType = typeof EngineerChemistry[number]; 
export type EngineerCivilType = typeof EngineerCivil[number];
export type ComputingEngineerType = typeof ComputingEngineer[number];
export type EngineerProductionType = typeof EngineerProduction[number];
export type EngineerMechanicalType = typeof EngineerMechanical[number];
export type EngineerElectricalType = typeof EngineerElectrical[number];
export type ManagementType = typeof Management[number];
export type EconomyType = typeof Economy[number];


export interface GroupedOption {
  label: string;
  icon: string;
  value: string;
  options:  EngineerChemistryType[] |  EngineerCivilType[] | ComputingEngineerType[] | EngineerProductionType[] | EngineerMechanicalType[] | EngineerElectricalType[] | ManagementType[] | EconomyType[];
}

export const EngineerChemistry = [
  {
    label: "Termodinâmica",
    value: "TD",
    icon: "<icon_svg_termodinamica>",
  },
  {
    label: "Reatores Químicos",
    value: "RQ",
    icon: "<icon_svg_reatores_quimicos>",
  },
  {
    label: "Engenharia de Processos",
    value: "EP",
    icon: "<icon_svg_eng_processos>",
  },
  {
    label: "Química Orgânica",
    value: "QO",
    icon: "<icon_svg_quimica_organica>",
  },
  {
    label: "Química Inorgânica",
    value: "QI",
    icon: "<icon_svg_quimica_inorganica>",
  },
  {
    label: "Cinética Química",
    value: "CQ",
    icon: "<icon_svg_cinetica_quimica>",
  },
  {
    label: "Fenômenos de Transporte",
    value: "FT",
    icon: "<icon_svg_felabelnos_transporte>",
  },
  {
    label: "Análise de Processos",
    value: "AP",
    icon: "<icon_svg_analise_processos>",
  },
]


export const EngineerCivil = [
  {
    label: "Estruturas",
    value: "EST",
    icon: "<icon_svg_estruturas>",
  },
  {
    label: "Geotecnia",
    value: "GEO",
    icon: "<icon_svg_geotecnia>",
  },
  {
    label: "Hidráulica",
    value: "HID",
    icon: "<icon_svg_hidraulica>",
  },
  {
    label: "Topografia",
    value: "TOP",
    icon: "<icon_svg_topografia>",
  },
  {
    label: "Planejamento Urbano",
    value: "PU",
    icon: "<icon_svg_planejamento_urbano>",
  },
  {
    label: "Infraestrutura de Transportes",
    value: "IT",
    icon: "<icon_svg_infraestrutura_transportes>",
  },
  {
    label: "Engenharia Ambiental",
    value: "EA",
    icon: "<icon_svg_eng_ambiental>",
  },
  {
    label: "Engenharia de Construção",
    value: "EC",
    icon: "<icon_svg_eng_construcao>",
  },
]

export const ComputingEngineer =  [
  {
    label: "Algoritmos e Estruturas de Dados",
    value: "AED",
    icon: "<icon_svg_algoritmos>",
  },
  {
    label: "Programação",
    value: "PROG",
    icon: "<icon_svg_programacao>",
  },
  {
    label: "Sistemas Operacionais",
    value: "SO",
    icon: "<icon_svg_sistemas_operacionais>",
  },
  {
    label: "Redes de Computadores",
    value: "RC",
    icon: "<icon_svg_redes_computadores>",
  },
  {
    label: "Inteligência Artificial",
    value: "IA",
    icon: "<icon_svg_inteligencia_artificial>",
  },
  {
    label: "Banco de Dados",
    value: "BD",
    icon: "<icon_svg_banco_dados>",
  },
  {
    label: "Engenharia de Software",
    value: "ES",
    icon: "<icon_svg_engenharia_software>",
  },
  {
    label: "Segurança da Informação",
    value: "SI",
    icon: "<icon_svg_seguranca_informacao>",
  },
]

export const EngineerProduction = [
  {
    label: "Gestão de Projetos",
    value: "GP",
    icon: "<icon_svg_gestao_projetos>",
  },
  {
    label: "Logística",
    value: "LOG",
    icon: "<icon_svg_logistica>",
  },
  {
    label: "Qualidade",
    value: "Q",
    icon: "<icon_svg_qualidade>",
  },
  {
    label: "Pesquisa Operacional",
    value: "PO",
    icon: "<icon_svg_pesquisa_operacional>",
  },
  {
    label: "Ergonomia e Segurança do Trabalho",
    value: "EST",
    icon: "<icon_svg_ergonomia_seguranca>",
  },
  {
    label: "Produção e Manufatura",
    value: "PM",
    icon: "<icon_svg_producao_manufatura>",
  },
  {
    label: "Engenharia de Sistemas",
    value: "EnS",
    icon: "<icon_svg_engenharia_sistemas>",
  },
  {
    label: "Inovação e Empreendedorismo",
    value: "IE",
    icon: "<icon_svg_inovacao_empreendedorismo>",
  },
]

export const EngineerMechanical = [
  {
    label: "Mecânica dos Sólidos",
    value: "MS",
    icon: "<icon_svg_mecanica_solidos>",
  },
  {
    label: "Termodinâmica",
    value: "TD",
    icon: "<icon_svg_termodinamica>",
  },
  {
    label: "Dinâmica de Fluidos",
    value: "DF",
    icon: "<icon_svg_dinamica_fluidos>",
  },
  {
    label: "Mecânica dos Materiais",
    value: "MM",
    icon: "<icon_svg_mecanica_materiais>",
  },
  {
    label: "Projeto Mecânico",
    value: "PM",
    icon: "<icon_svg_projeto_mecanico>",
  },
  {
    label: "Controle e Automação",
    value: "CA",
    icon: "<icon_svg_controle_automacao>",
  },
  {
    label: "Vibrações Mecânicas",
    value: "VM",
    icon: "<icon_svg_vibracoes_mecanicas>",
  },
  {
    label: "Manutenção Industrial",
    value: "MI",
    icon: "<icon_svg_manutencao_industrial>",
  },
]

export const EngineerElectrical = [
  {
    label: "Circuitos Elétricos",
    value: "CE",
    icon: "<icon_svg_circuitos_eletricos>",
  },
  {
    label: "Sistemas de Controle",
    value: "SC",
    icon: "<icon_svg_sistemas_controle>",
  },
  {
    label: "Eletrônica de Potência",
    value: "EP",
    icon: "<icon_svg_eletronica_potencia>",
  },
  {
    label: "Máquinas Elétricas",
    value: "ME",
    icon: "<icon_svg_maquinas_eletricas>",
  },
  {
    label: "Eletromagnetismo",
    value: "EM",
    icon: "<icon_svg_eletromagnetismo>",
  },
  {
    label: "Comunicações",
    value: "COM",
    icon: "<icon_svg_comunicacoes>",
  },
  {
    label: "Energias Renováveis",
    value: "ER",
    icon: "<icon_svg_energias_renovaveis>",
  },
  {
    label: "Automação Industrial",
    value: "AI",
    icon: "<icon_svg_automacao_industrial>",
  },
]

export const Management = [
  {
    label: "Estratégia Empresarial",
    value: "EE",
    icon: "<icon_svg_estrategia_empresarial>",
  },
  {
    label: "Gestão de Pessoas",
    value: "GP",
    icon: "<icon_svg_gestao_pessoas>",
  },
  {
    label: "Finanças Corporativas",
    value: "FC",
    icon: "<icon_svg_financas_corporativas>",
  },
  {
    label: "Gestão da Inovação",
    value: "GI",
    icon: "<icon_svg_gestao_inovacao>",
  },
  {
    label: "Gestão de Operações",
    value: "GO",
    icon: "<icon_svg_gestao_operacoes>",
  },
  {
    label: "Gestão da Qualidade",
    value: "GQ",
    icon: "<icon_svg_gestao_qualidade>",
  },
  {
    label: "Gestão de Marketing",
    value: "GM",
    icon: "<icon_svg_gestao_marketing>",
  },
  {
    label: "Responsabilidade Social Corporativa",
    value: "RSC",
    icon: "<icon_svg_responsabilidade_social>",
  },
]

export const Economy =  [
  {
    label: "Microeconomia",
    value: "MIC",
    icon: "<icon_svg_microeconomia>",
  },
  {
    label: "Macroeconomia",
    value: "MAC",
    icon: "<icon_svg_macroeconomia>",
  },
  {
    label: "Economia Internacional",
    value: "EI",
    icon: "<icon_svg_economia_internacional>",
  },
  {
    label: "Economia do Setor Público",
    value: "ESP",
    icon: "<icon_svg_economia_setor_publico>",
  },
  {
    label: "Economia Monetária",
    value: "EMO",
    icon: "<icon_svg_economia_monetaria>",
  },
  {
    label: "Economia do Desenvolvimento",
    value: "ED",
    icon: "<icon_svg_economia_desenvolvimento>",
  },
  {
    label: "Economia do Trabalho",
    value: "ET",
    icon: "<icon_svg_economia_trabalho>",
  },
  {
    label: "Economia do Meio Ambiente",
    value: "EMA",
    icon: "<icon_svg_economia_meio_ambiente>",
  },
]


export const groupedOptions: readonly GroupedOption[] = [
  {
    label: "Engenharia Química",
    icon: "<icon_svg_eng_quimica>",
    value: "EQUI",
    options: EngineerChemistry,
    

  },
  {
    label: "Engenharia Civil",
    icon: "<icon_svg_eng_civil>",
    value: "EC",
    options: EngineerCivil,
  },
  {
    label: "Engenharia Informática",
    icon: "<icon_svg_eng_informatica>",
    value: "EINF",
    options: ComputingEngineer,
  },
  {
    label: "Engenharia de Produção Industrial",
    icon: "<icon_svg_eng_producao_industrial>",
    value: "EPI",
    options: EngineerProduction,
  },
  {
    label: "Engenharia Mecânica",
    icon: "<icon_svg_eng_mecanica>",
    value: "EMEC",
    options: EngineerMechanical,
  },
  {
    label: "Engenharia Electrotécnica",
    icon: "<icon_svg_eng_electrotecnica>",
    value: "EELEC",
    options: EngineerElectrical,
  },
  {
    label: "Gestão",
    icon: "<icon_svg_gestao>",
    value: "GES",
    options: Management,
  },
  {
    label: "Economia",
    icon: "<icon_svg_economia>",
    value: "ECOM",
    options: Economy,
  },
];
