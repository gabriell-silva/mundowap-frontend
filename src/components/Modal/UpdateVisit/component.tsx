import React from "react";
import Title from "../../Title/component";
import Input from "../../FormControl/Input/component";
import { useForm } from "react-hook-form";
import { updateVisitSchema, UpdateVisitSchemaType } from "../../../schemas/Visit/updateVisitSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FlexColumn, FlexRow } from "../../../style/default";
import ButtonSubmit from "../../Button/Submit/component";
import { CloseButton } from "../style";
import { useModal } from "../../../contexts/ModalContext";
import { ResponseViacep } from "../../../@types/ResponseViacep";
import useFetch from "../../../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify"
import { useVisits } from "../../../contexts/VisitContext";
import { Visit } from "../../../@types/Visit";
import ButtonAction from "../../Button/Action/component";

export default function ModalUpdateVisit({visit}: {visit: Visit}) {
  const {closeModal} = useModal();
  const { handleUpdateVisit } = useVisits();
  const [request] = useFetch<ResponseViacep>();
  const [disabled, setDisabled] = React.useState<boolean>(true);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },    
  } = useForm({
    resolver: yupResolver(updateVisitSchema),
  });

  const visitCompleted = watch('completed');

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

  const onSubmitVisit = async (formData: UpdateVisitSchemaType) => {
    try {
      if (!visit.id) return;

      const formDataFormatted = {
        ...formData,
        duration: (Number(formData.amount_form) * 15) + (Number((formData.amount_products)) * 5),
        address: {
          ...formData.address,
          street_number: String(formData.address.street_number)
        },
        completed: visit.completed
      };

      
      await handleUpdateVisit(visit.id, formDataFormatted);

      toast.success('Visita atualizada com sucesso!', {
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

  React.useEffect(() => {
    if (visit) {
      reset({
        date: visit.date,
        amount_form: visit.amount_form,
        amount_products: visit.amount_products,
        completed: visit.completed === '1' ? '1' : '0',
        address: {
          zip_code: visit.address.zip_code,
          uf: visit.address.uf,
          city: visit.address.city,
          neighborhood: visit.address.neighborhood,
          street: visit.address.street,
          street_number: Number(visit.address.street_number)
        }
      });
    }
  }, [visit, reset]);

  return (
    <React.Fragment>
      <ToastContainer />

      <FlexRow style={{ justifyContent: "space-between" }}>
        <Title>Atualizar visita</Title>

        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </FlexRow>

      <FlexColumn>
        <FlexColumn as={"form"} id="form-update-visit" onSubmit={handleSubmit(onSubmitVisit)}>
          <Input
            label="Data da visita"
            type="date"
            disabled={visitCompleted === "1" ? true : false}
            {...register("date")}
            error={errors?.date}
          />

          <FlexRow>
            <Input
              label="Quantidade de formulários"
              type="number"
              min="0"
              style={{ width: "238px" }}
              disabled={visitCompleted === "1" ? true : false}
              {...register("amount_form")}
              error={errors?.amount_form}
            />

            <Input
              label="Quantidade de produtos"
              type="number"
              min="0"
              style={{ width: "238px" }}
              disabled={visitCompleted === "1" ? true : false}
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
              defaultValue={visit.address.zip_code}
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

        <FlexRow style={{ justifyContent: "flex-end"}}>
          <ButtonAction
            style={{ width: "114px", backgroundColor: "#EF4B6E" }}
            onClick={closeModal}
          >
            Cancelar
          </ButtonAction>
          <ButtonSubmit 
            form="form-update-visit"
            style={{ width: "114px" }}
          >
            Atualizar
          </ButtonSubmit>
        </FlexRow>
      </FlexColumn>
    </React.Fragment>
  );
};