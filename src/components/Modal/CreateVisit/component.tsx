import React from "react";
import Title from "../../Title/component";
import Input from "../../FormControl/Input/component";
import { useForm } from "react-hook-form";
import { createVisitSchema, CreateVisitSchemaType } from "../../../schemas/Visit/createVisitSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FlexColumn, FlexRow } from "../../../style/default";
import ButtonSubmit from "../../Button/Submit/component";
import { CloseButton } from "../style";
import { useModal } from "../../../contexts/ModalContext";
import { ResponseViacep } from "../../../@types/ResponseViacep";
import useFetch from "../../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify"
import { useVisits } from "../../../contexts/VisitContext";

export default function ModalCreateVisit() {
  const {closeModal} = useModal();
  const { handleCreateVisit } = useVisits();
  const [request] = useFetch<ResponseViacep>();
  const [disabled, setDisabled] = React.useState<boolean>(true);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },    
  } = useForm({
    resolver: yupResolver(createVisitSchema),
  });

  const handleRequestViaCep = async (zipCode: string) => {
    try {
      setDisabled(true);

      if (zipCode.length < 8) {
        return;
      }

      setTimeout(async () => {
        const data = await request({
          url: `https://viacep.com.br/ws/${zipCode}/json/`,
          method: "get",
        });
        
        setValue("address.zip_code", data.cep);
        setValue("address.street", data.logradouro);
        setValue("address.uf", data.uf);
        setValue("address.city", data.localidade);
        setValue("address.neighborhood", data.bairro);
        
        if (!data.bairro || !data.logradouro) {
          setDisabled(false);
        }
      }, 2000);
    } catch (error) {
      toast.error('Cep inválido!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light'
      });
    }
  };

  const onSubmitVisit = async (formData: CreateVisitSchemaType) => {
    try {
      const formDataWithId = {
        ...formData,
        id: Math.ceil(Math.random() * 1000000),
        duration: (Number(formData.amount_form) * 15) + (Number((formData.amount_products)) * 5)
      };
      
      await handleCreateVisit(formDataWithId);

      toast.success('Visita cadastrada com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light'
      });

      closeModal();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao cadastrar visita!';
      
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light'
      });
    }
  };


  return (
    <React.Fragment>
      <ToastContainer />

      <FlexRow style={{ justifyContent: "space-between" }}>
        <Title>Cadastrar visita</Title>

        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </FlexRow>

      <FlexColumn>
        <FlexColumn as={"form"} id="form-create-visit" onSubmit={handleSubmit(onSubmitVisit)}>
          <FlexRow>
            <Input
              label="Data da visita"
              type="date"
              {...register("date")}
              error={errors?.date}
              style={{ width: "250px"}}
            />

            <Box>
              <label>Status da visita</label>

              <FlexRow style={{alignItems: "center"}}>
                <FlexRow style={{alignItems: "center"}}>
                  <Input
                    type="radio"
                    name="completed"
                    onChange={() => setValue("completed", "1")}
                    error={errors?.completed}
                    style={{ width: "16px"}}
                  />

                  <span style={{ fontSize: "14px" }}>Concluída</span>
                </FlexRow>

                <FlexRow style={{alignItems: "center"}}>
                  <Input
                    type="radio"
                    name="completed"
                    onChange={() => setValue("completed", "0")}
                    error={errors?.completed}
                    style={{ width: "16px" }}
                  />

                  <span style={{ fontSize: "14px" }}>Não concluída</span>
                </FlexRow>
              </FlexRow>
            </Box>
          </FlexRow>

          <FlexRow>
            <Input
              label="Quantidade de formulários"
              type="number"
              min="0"
              style={{ width: "238px" }}
              {...register("amount_form")}
              error={errors?.amount_form}
            />

            <Input
              label="Quantidade de produtos"
              type="number"
              min="0"
              style={{ width: "238px" }}
              {...register("amount_products")}
              error={errors?.amount_products}
            />
          </FlexRow>

          <FlexRow>
            <Input
              label="CEP"
              type="text"
              style={{ width: "238px" }}
              name="zip_code"
              onChange={({target}: React.ChangeEvent<HTMLInputElement>) => handleRequestViaCep(target.value)}
              error={errors?.address?.zip_code}
            />
            <Input
              label="Estado"
              type="text"
              style={{ width: "238px" }}
              {...register("address.uf")}
              error={errors?.address?.uf}
              isDisabled={disabled}
            />
          </FlexRow>

          <FlexRow>
            <Input
              label="Cidade"
              type="text"
              style={{ width: "238px" }}
              {...register("address.city")}
              error={errors?.address?.city}
              isDisabled={disabled}
            />
            <Input
              label="Bairro"
              type="text"
              style={{ width: "238px" }}
              {...register("address.neighborhood")}
              error={errors?.address?.neighborhood}
              isDisabled={disabled}
            />
          </FlexRow>

          <FlexRow>
            <Input
              label="Logradouro"
              type="text"
              style={{ width: "238px" }}
              {...register("address.street")}
              error={errors?.address?.street}
              isDisabled={disabled}
            />
            <Input
              label="Número"
              type="text"
              style={{ width: "238px" }}
              {...register("address.street_number")}
              error={errors?.address?.street_number}
            />
          </FlexRow>
        </FlexColumn>

        <ButtonSubmit 
          form="form-create-visit"
          style={{ width: "492px" }}
        >
          Cadastrar
        </ButtonSubmit>
      </FlexColumn>
    </React.Fragment>
  );
};