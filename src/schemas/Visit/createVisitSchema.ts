import * as yup from "yup";

export const createVisitSchema = yup.object({
  id: yup.number().nullable(),
  date: yup.string().required("Data é obrigatório"),
  completed: yup.string(),
  amount_form: yup.string().required("Qtd. Formulários é obrigatório"),
  amount_products: yup.string().required("Qtd. Produtos é obrigatório"),
  duration: yup.number().nullable(),
  address: yup.object({
    zip_code: yup.string().required("CEP é obrigatório"),
    uf: yup.string().required("Estado é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    street: yup.string().required("Logradouro é obrigatório"),
    street_number: yup.string().required("Número é obrigatório")
  })
});

export type CreateVisitSchemaType = yup.InferType<typeof createVisitSchema>;
