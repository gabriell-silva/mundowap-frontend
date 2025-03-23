import * as yup from "yup";

export const updateVisitSchema = yup.object({
  date: yup.string().required("Data é obrigatório"),
  amount_form: yup.string().required("Qtd. Formulários é obrigatório"),
  amount_products: yup.string().required("Qtd. Produtos é obrigatório"),
  duration: yup.number(),
  completed: yup.string(),
  address: yup.object({
    zip_code: yup.string().required("CEP é obrigatório"),
    uf: yup.string(),
    city: yup.string(),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    street: yup.string().required("Logradouro é obrigatório"),
    street_number: yup.number().required("Número é obrigatório")
  })
});

export type UpdateVisitSchemaType = yup.InferType<typeof updateVisitSchema>;
