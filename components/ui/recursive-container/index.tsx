import { RECURSIVE_CONTAINER_PROPS } from "../../../data";
import { Field } from "./components";

export const RecursiveContainer: React.FC<RECURSIVE_CONTAINER_PROPS> = (
  props
) => {
  let {
    config,
    formik,
    validationSchema,
    formContainerProps,
    formContainer: FormContainer = null,
  } = props;

  // To understand the formContainer prop
  // formContainer = {
  //   component: ExampleComponent, // this prop is a component that is used to wrap the recursivecontainer form within it. (like shown below in the return statement)
  //   props: exampleProps
  // }
  if (config) config = config.filter((el) => el);
  const recursiveContainer = (
    <div {...formContainerProps}>
      {config.map((c, index) => {
        return (
          <Field
            {...c}
            formik={formik}
            validationSchema={validationSchema}
            key={index}
          />
        );
      })}
    </div>
  );

  return FormContainer ? (
    <FormContainer
      {...formContainerProps}
      form={recursiveContainer} // recursiveContainer form is given to use your own styles and functionalities by wrapping it inside your own elements.
    />
  ) : (
    recursiveContainer
  );
};
