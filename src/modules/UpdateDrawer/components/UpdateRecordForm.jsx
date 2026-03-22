import { Form } from "antd";

import FormFields from "../../../components/FormField";

const UpdateRecordForm = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <FormFields />
    </Form>
  );
};

export default UpdateRecordForm;
