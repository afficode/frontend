import React from "react";
import { Formik } from "formik";
import TextArea from "../../../components/FormComponents/TextArea";
import { postRemark, useNotify } from "../../../hooks";
import { data, info } from "autoprefixer";
import { useQueryClient } from "react-query";

export const ContactAdminForm = ({ ads_id }) => {
  const notify = useNotify();
  const queryClient = useQueryClient();
  const initialValue = { text: "" };
  const mutation = postRemark();
  const handleSubmit = async (values, { resetForm }) => {
    mutation.mutate(
      { ...values, ads_id },
      {
        onSuccess: (data) => {
          notify(`Admin is now notify. We strive to serve you better.`, info);
        },
        onError: (error) => {
          notify("Error contacting Admin. Try again", error);
          queryClient.invalidateQueries(["remark", ads_id]);
        },
      }
    );
    resetForm();
  };
  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit}>
      {({ isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TextArea
            name={"text"}
            className="rounded-md p-2 placeholder:text-gray-400 text-sm focus:ring-primary focus:ring-1"
            placeholder="Post a remark or review for admin"
            maxLength={400}
            required={true}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white px-4 py-2 hover:bg-primary/70 rounded-sm"
          >
            Submit for review
          </button>
        </form>
      )}
    </Formik>
  );
};
