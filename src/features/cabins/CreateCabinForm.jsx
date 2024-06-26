import styled from "styled-components";

// import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEddit = {}, onCloseModal }) {
  const { id: cabinToEditID, ...otherCabinVal } = cabinToEddit;
  const fromEditState = Boolean(cabinToEditID);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: fromEditState ? otherCabinVal : {},
  });
  // creating a cabin
  const { isLoading: isSubmitting, createCabin } = useCreateCabin();
  // updating a cabin
  const { isEditing, editCabin } = useEditCabin();

  const loadingState = isSubmitting || isEditing;
  const formSubmit = (data) => {
    // console.log("imgH?", data.image[0]);
    // checking if it is previos img or upload agian editing time
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (fromEditState) {
      editCabin(
        {
          newCabinData: {
            ...data,
            image: image,
            created_at: cabinToEddit.created_at,
          },
          id: cabinToEditID,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };
  return (
    // onclose modal thaka mane holo form ta modal er moddhe ache so amar modal type er style apply korbo , ar na takle regular style apply hobe == see form.jsx
    <Form
      onSubmit={handleSubmit(formSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {/* onCloseModal akta func ja form ke close korbe, akhon ai func ta modal er moddhe thaka btn theke astese so ata pabe, but resuse korle form ta jodi modal er moddhe na thake tahole pabe na, so ata conditionally aijonno kora hoise */}
        <Button
          size="btn-large"
          type="btn-secondary"
          htmlType="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          size="btn-large"
          type="btn-primary"
          htmlType={"submit"}
          disabled={loadingState}
        >
          {fromEditState ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
