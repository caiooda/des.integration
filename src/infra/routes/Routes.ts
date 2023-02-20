import { Request, Response, Router } from "express";
import request from "request";
import { connection } from "../database/Connection";

interface HistoricoDeServicos {
  idempresa: number;
  pessoaconsultor: string;
  dataemissao: Date;
  datafechamento: Date;
  numero: number;
  pessoa: string;
  descricaonotafiscal: string;
  cpfproprietario: string;
  proprietario: string;
  modelo: string;
  anofabricacao: number;
  anomodelo: number;
  cor: string;
  placa: string;
  chassi: string;
  ostipo: string;
  tiposervico: string;
  fonepessoa: string;
  descricaoitem: string;
  valortotal: number;
  municipio: string;
  numerocomercial: string;
  numerocelular: string;
  enderecolink: string;
  pessoaenderecologradouro: string;
  cep: string;
  telefoneempresa: string;
  cpfoucnpj: string;
  tecnico: string;
  quilometragem: number;
  bairro: string;
  logradouro: string;
  numeroendereco: string;
  pessoaemissaodocumento: string;
  cepproprietario: string;
  municipioproprietario: string;
  enderecoproprietario: string;
  bairroproprietario: string;
  foneresidencialproprietario: string;
  fonecomercialproprietario: string;
  fonecelularproprietario: string;
  enderecolinkproprietario: string;
  pessoaapelido: string;
}

interface HistoricoDeVendas {
  idempresa: number;
  idpessoavendedor: number;
  datavenda: string;
  docfiscal: string;
  tipomovimento: string;
  docfiscalentrada: string;
  estadoveiculo: string;
  diasestoque: number;
  cpfoucnpj: string;
  pessoa: string;
  modelo: string;
  veiculomodelogrupo: string;
  categoria: string;
  anofabr: number;
  anomod: number;
  cor: string;
  placa: string;
  quilometragem: number;
  tipovenda: string;
  valortotaldocumentofiscal: number;
  proposta: number;
  valorfinanciamento: number;
  valorjuros: number;
  motivocompra: string;
  chassi: string;
  renavam: string;
  valortotalcustocontabil: number;
  valorsugeridofabrica: number;
  marca: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  municipiouf: string;
  email: string;
  telefonecelular: string;
  telefoneresidencial: string;
  telefonecomercial: string;
  datanascimentoouabertura: string;
}
const bearerToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZGUwYzgyYS05NDAyLTQyNGMtOWI5OC0wNDk0Zjk1ZGZjM2IiLCJvcmciOiJvcmcwMDAzMTgifQ.Ggb34k-v87it7G4hNsgYKObi11FJ1ovJ-kvXVyyxIOo";
const bodyVendas = {
  idrelatorioconfiguracao: 88,
  idrelatorioconsulta: 50,
  idrelatorioconfiguracaoleiaute: 88,
  idrelatoriousuarioleiaute: 655,
  ididioma: 1,
  listaempresas: [2, 3, 4, 5, 6, 7, 8, 9, 26, 10, 11, 12, 13, 14, 15, 24, 25],
  filtros:
    "Municipio=null;AnoFabricacaoFinal=9999;AnoModeloFinal=9999;TipoVenda=null;OrigemVenda=null;Modelo=null;Vendedor=null;Cor=null;AnoFabricacaoInicial=0;AnoModeloInicial=0;Estado=null;DataConclusaoInicial=2022-11-01 00:00;DataConclusaoFinal=2022-11-03 00:00;CRMEquipe=null",
};
const bodyServico = {
  idrelatorioconfiguracao: 188,
  idrelatorioconsulta: 95,
  idrelatorioconfiguracaoleiaute: 188,
  idrelatoriousuarioleiaute: 648,
  ididioma: 1,
  listaempresas: [2, 3, 4, 5, 6, 7, 8, 9, 26, 10, 11, 12, 13, 14, 15, 24, 25],
  filtros:
    "NaoIncluirPessoa=null;TipoDeVeiculoModelo=null;Segmento=null;IdsServicos=null;IdsMercadorias=null;SituacaoConcluidaNF=null;NomeEmissaoDocumento=null;TipoBaixaDocumento=null;SomenteManutencaoFrotista=False;GrupoDoModelo=null;EquipeAtendimentoFrotista=null;NumeroContratoFrotista=;TipoVeiculoOS=null;TipoOrdemServicoInterno=null;Tipodeordemdeservico=null;Pessoa=null;EstadoVeiculo=null;Consultor=null;Periododeconclusaofinal=2022-11-03;Modelo=null;Tipoitem=3,1,4,2;Municipio=null;VeiculoCliente=null;ItensServicosCancelados=False;AnoFinal=9999;AnoInicial=0;Tecnico=null;Periododeconclusaoinicial=2022-11-03;Tiposervico=null;NumeroOS=null;TipoRecepcao=null",
};
const Routes = Router();

Routes.get("/historico-vendas", (req: Request, res: Response) => {
  const options = {
    url: "https://microworkcloud.com.br/api/integracao/terceiro",
    json: bodyVendas,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: bearerToken,
    },
  };
  request.post(
    options,
    async (erro: any, response: any, body: HistoricoDeVendas[]) => {
      if (body) {
        const data = body.map((linha) => {
          return {
            Id_User: linha.idpessoavendedor,
            Cpf_Cnpj: linha.cpfoucnpj.replace(/[^\d]+/g, ""),
            Chassi: linha.chassi,
            Id_Client: linha.idempresa,
            Address: linha.logradouro,
            Address_Compl: linha.complemento,
            Address_District: linha.bairro,
            Address_Number: Number(linha.numero),
            Address_State: linha.municipiouf,
            Address_Zip_Code: linha.cep,
            Brand: linha.marca,
            Category: linha.categoria,
            Color: linha.cor,
            Customer: linha.pessoa,
            Doc_Invoice: linha.docfiscal,
            Doc_Invoice_Delete: linha.docfiscalentrada,
            Dt_Invoice: linha.datavenda,
            Email: linha.email,
            Family: linha.veiculomodelogrupo,
            KM: linha.quilometragem,
            Model: linha.modelo,
            Payment_Type: linha.tipovenda,
            Phone_Cel: linha.telefonecelular,
            Phone_Com: linha.telefonecomercial,
            Phone_Res: linha.telefoneresidencial,
            Plate: linha.placa,
            Purchase_Reason: linha.motivocompra,
            Renavam: linha.renavam,
            Status_Delete: false,
            Status_Sales: false,
            Stock_Days: linha.diasestoque,
            Tp_Mov_Fiscal: linha.tipomovimento,
            Value_Purchase: linha.valortotalcustocontabil,
            Value_Sales: linha.valortotaldocumentofiscal,
            Value_Sugested: linha.valorsugeridofabrica,
            Year_Fab: String(linha.anofabr),
            Year_Mod: String(linha.anomod),
            Proposal: linha.proposta,
          };
        });
        for (const linha of data) {
          const customer = await connection.tb_Customer.findFirst({
            where: { Cpf_Cnpj: linha.Cpf_Cnpj },
          });
          if (!customer) {
            await connection.tb_Customer.create({
              data: {
                Cpf_Cnpj: linha.Cpf_Cnpj,
                Name: linha.Customer,
                Email: linha.Email,
              },
            });
          }
          const chassi = await connection.tb_Customer_Car.findFirst({
            where: { Chassi: linha.Chassi },
          });
          if (!chassi) {
            await connection.tb_Customer_Car.create({
              data: {
                Id_Client: linha.Id_Client,
                Id_Category: 2,
                Plate: linha.Plate,
                Brand: linha.Brand,
                Cpf_Cnpj: linha.Cpf_Cnpj,
                Model: linha.Model,
                Chassi: linha.Chassi,
                Color: linha.Color,
                Name: linha.Customer,
              },
            });
          }
          connection.hist_Sale.create({data: linha}).then((result) => console.log("Inserido com sucesso!"))
        }
        return res
          .status(200)
          .json({ success: "Informações carregadas com sucesso!" })
          .end();
      }
      if (erro) {
        return res
          .status(400)
          .json({ success: "Não foi possível carreagr informações!" })
          .end();
      }
    }
  );
});

export default Routes;
